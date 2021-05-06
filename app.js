const express = require('express');
const app = express()
var cors = require('cors')
const port = 3000;
const mongoose = require('mongoose');
app.use(cors())
app.use(express.json());
app.use(require("./routes/app.router"));
mongoose.connect('mongodb+srv://MahmoudElwan:01015776658@mahmoudelwan-nodejs.jfspq.mongodb.net/APIEXAm', { useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify:false });
app.listen( process.env.PORT || port, () => console.log(`Example app listening on port port!`))