const mongoose = require('mongoose');
const {registerPackets}=require('./pushToDB')
const {startListening}=require('./serialReader')
mongoose.connect('mongodb://localhost:27017/eeg', {useNewUrlParser: true, useUnifiedTopology: true});

db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connecté à Mongoose")
  startListening(registerPackets)
});

