const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Usuarios = new Schema({
  name: { type: String, required: true},
  last: { type: String, required: true},
  email: { type: String, required: true },
  password: { type: String, required: true },
  imgProfile: {type: String, required: true},
  idPublic:{type:String, default: "example"},
  imgCover:{type:String},
  des: {type: String, default: ""},
  genero: {type:String, default:""},
  followers: {type: Array, default:[]},
  following: {type: Array, default:[]},
  favoritos: {type:Array, default:[]}
});

const User = mongoose.model("Usuarios", Usuarios);

module.exports = User;
