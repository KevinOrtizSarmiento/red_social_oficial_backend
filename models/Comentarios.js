const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Comentario = new Schema({
  publicacionId: { type: String, required: true },
  autor: { type: String, required: true },
  info: { type: String, required: true },
  username: {type: String, required:true},
  img: {type: String, required: true}
});

const Coment = mongoose.model("Comentario", Comentario);

module.exports = Coment;
