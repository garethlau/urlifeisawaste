const express = require('express');

const app = express();
require('./routes/api.js')(app);

app.listen(5000);