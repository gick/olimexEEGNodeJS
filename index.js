const mongoose = require('mongoose');
const {registerPackets}=require('./eegReader/pushToDB')
const {startListening}=require('./eegReader/serialReader')
mongoose.connect('mongodb://localhost:27017/eeg', {useNewUrlParser: true, useUnifiedTopology: true});

db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connecté à Mongoose")
  startListening(registerPackets)
});

