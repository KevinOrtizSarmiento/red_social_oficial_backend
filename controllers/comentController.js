const Comentario = require("../models/Comentarios");
const Cliente = require("../models/Client");

module.exports.crear = async (req, res) => {
  const { publicacionId, autor, info, username, img } = req.body;
  await Comentario.create({ publicacionId, autor, info, username, img  })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.json(error);
    });
};
module.exports.obtener = async (req, res) => {
  const {id} = req.params;
  await Comentario.find({publicacionId:id}).then(response=>{
    var arr1 = response.reverse()
      res.json(arr1)
  }).catch(error=> {
      res.json(error)
  })
};
