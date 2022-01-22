const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Cliente = new Schema({
  name: { type: String, required: true},
  last: { type: String, required: true},
  email: { type: String, required: true },
  password: { type: String, required: true },
  img: {type: String, required: true},
  des: {type: String, default: ""},
  genero: {type:String, default:""},
  followers: {type: Array, default:[]},
  following: {type: Array, default:[]},
  favoritos: {type:Array, default:[]}
});

const Client = mongoose.model("Cliente", Cliente);

module.exports = Client;
