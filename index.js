const express = require('express');

const app = express();
require('./routes/api');

app.listen(5000);