const vision = require('@google-cloud/vision');
// Creates a client
const client = new vision.ImageAnnotatorClient({
  keyFilename: 'apiKey.json'
});
const fs = require('fs');

module.exports = app => {
    app.get("/test", (req, res) => {
        res.send({message: "hello"})
    })

    app.post("/getFruits", async (req, res) => {
        const client = new vision.ImageAnnotatorClient({
            keyFilename: './routes/apiKey.json'
          });
          const request = {
            image: {content: fs.readFileSync('veggiesfruits.jpg')},
          };
        
        //   console.log("1")
          const [result] = await client.objectLocalization(request);
          const objects = result.localizedObjectAnnotations;
          objects.forEach(object => {
            console.log(`Name: ${object.name}`);
            console.log(`Confidence: ${object.score}`);
            const vertices = object.boundingPoly.normalizedVertices;
            vertices.forEach(v => console.log(`x: ${v.x}, y:${v.y}`));
          });
      })
}

