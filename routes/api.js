const vision = require('@google-cloud/vision');
const axios = require('axios');
const fetch = require("node-fetch");

// Creates a client
/*
const client = new vision.ImageAnnotatorClient({
  keyFilename: './routes/apiKey.json'
});
*/
const fs = require('fs');

module.exports = app => {
    app.get("/test", (req, res) => {
        res.send({message: "hello"})
    })

    app.post("/getFruits", async (req, res) => {


        console.log(req.body.base64Data.slice(0, 50));
        var base64Data = req.body.base64Data.replace(/^data:image\/jpeg;base64,/, "");
        fs.writeFileSync("image.jpg", base64Data, 'base64', (response) => {
            console.log("response", response);
        })
        
        const client = new vision.ImageAnnotatorClient({
            keyFilename: './routes/apiKey.json'
        });
        

        
        const request = {
            image: {content: fs.readFileSync('image.jpg')},
        };
        
          let [result] = await client.objectLocalization(request);
          console.log("i made it")
          let objects = result.localizedObjectAnnotations;
          let fruits = []
          objects.forEach(object => {
            console.log("Name: " + object.name);
            console.log("Confidence: " + object.score);

            if(object.name != "Food"  && object.name != "Packaged goods" && object.name != "Vegetable" && object.name != "vegetable" && object.name != "Fruits"){
                fruits.push(object.name);
                console.log(object.name);
            }
        })

        let url = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + fruits.join(",+") + "&ignorePantry=true&apiKey=b32822355598421986e052faa2ac93b1";
        console.log(url);
        // let url = "";
        fetch(url)
		.then((data) => data.json())
        .then((urlResponse) => res.send({data: urlResponse}));
    });

    app.post("/api/saveFavourite", (req, res) => {
        let recipeRef = req.app.get('ref').child('recipe');
        let newRecipe = recipeRef.push();
        let {name, ingredients, time, imageSrc} = req.body;
        newRecipe.set({
            name: name,
            ingredients: ingredients,
            time: time,
            imageSrc: imageSrc
        });
        res.send({message: "nice"});
    });

    app.get("/api/getFavourites", (req, res) => {
        let ref = req.app.get('ref');
        ref.once("value", (snapshot) => {
            console.log(snapshot.val());
            res.send({data: snapshot.val()});
        });
    })

}

