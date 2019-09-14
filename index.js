const express = require('express');
const bodyParser = require('body-parser');
const admin = require("firebase-admin");
const cors = require('cors');

const serviceAccount = require("./firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://waste-36a96.firebaseio.com"
});

let db = admin.database();
let ref = db.ref("server");

const app = express();

app.set("ref", ref);
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}))
require('./routes/api.js')(app);


app.listen(5000, () => console.log("listening"));