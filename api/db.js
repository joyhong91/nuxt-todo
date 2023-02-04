const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose
  .connect("mongodb+srv://joyhong:330300@joyhong.cwungwg.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log('MongoDB Connected...');
});

module.exports = db;