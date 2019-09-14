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
        var base64Data = req.body.base64Data.replace(/^data:image\/png;base64,/, "");
        fs.writeFile("image.jpg", new Buffer(base64Data, "base64"), (response) => {
            console.log("response", response);
            console.log("new file has been saved");
        })
        
        const client = new vision.ImageAnnotatorClient({
            keyFilename: './routes/apiKey.json'
        });
        
        const request = {
            image: {content: fs.readFileSync('veggiesfruits.jpg')},
            /*
            image: {
                content: req.body.base64Data
            }
            */
        };
        
          let [result] = await client.objectLocalization(request);
          let objects = result.localizedObjectAnnotations;
          let fruits = []
          objects.forEach(object => {
            console.log("Name: " + object.name);
            console.log("Confidence: " + object.score);

            if(object.name != "Vegetable" && object.name != "Food" && object.name != "Fruit"){
                fruits.push(object.name);
                console.log(object.name);
            }
        })

        let url = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + fruits.join(",+") + "&ignorePantry=true&apiKey=b68cedbfb5cc42939208a4b5bb63c5e3";
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

