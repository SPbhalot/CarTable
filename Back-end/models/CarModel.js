const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-auto-increment');

const carSchema = new mongoose.Schema({
  carNo: {
    type: String,
    unique: true
  },
  userNo: String,
  arName: String,
  enName: String,
  cardNo: String, 
  beginDate: Date,
  endDate: Date,
  company: String, 
  color: { 
    type: String,
    enum: ['Red', 'Blue', 'Green', 'Yellow']
  },
  model: String
});

// carSchema.plugin(autoIncrement.plugin, {
//     model: 'Car',
//     field: 'carNo',
//     startAt: 1,
//     incrementBy: 1
//   });
const Car = mongoose.model('Car', carSchema);

module.exports = Car;
