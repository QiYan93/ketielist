var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  account:String,
  password:String
})

var ContentSchema = new Schema({
  userId:String,
  name:String,
  content:String,
  dateTime:String
})

exports.User = mongoose.model('User',UserSchema);
exports.Content = mongoose.model('Content',ContentSchema);