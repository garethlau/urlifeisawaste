// const express = require('express');
// const app = express();
// const vision = require('@google-cloud/vision');
// // Creates a client
// const client = new vision.ImageAnnotatorClient({
//   keyFilename: './routes/apiKey.json'
// });

// // Performs label detection on the image file
// client
//   .labelDetection('fruits1.jpg')
//   .then(results => {
//     const labels = results[0].labelAnnotations;

//     console.log('Labels:');
//     // labels.forEach(label => console.log(label));
//     console.log(results[0]);
//   })
//   .catch(err => {
//     console.error('ERROR:', err);
//   });

// app.listen(5000, '127.0.0.1', () => console.log('Server running'));


const express = require('express');
const app = express();

const vision = require('@google-cloud/vision');
const fs = require('fs');
// const fileName = `veggiesfruits.jpg`;

app.post("/getFruits", async (fileName) => {

  // Creates a client
  const client = new vision.ImageAnnotatorClient({
    keyFilename: './routes/apiKey.json'
  });
  const request = {
    image: {content: fs.readFileSync('veggiesfruits.jpg')},
  };

  console.log("1")
  const [result] = await client.objectLocalization(request);
  const objects = result.localizedObjectAnnotations;
  objects.forEach(object => {
    console.log(`Name: ${object.name}`);
    console.log(`Confidence: ${object.score}`);
    const vertices = object.boundingPoly.normalizedVertices;
    vertices.forEach(v => console.log(`x: ${v.x}, y:${v.y}`));
  });
});

app.listen(5000, () => console.log(`LISTENING ON PORT 5000`));