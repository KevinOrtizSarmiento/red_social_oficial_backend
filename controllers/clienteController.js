const Cliente = require("../models/Usuarios");
const Comentarios = require("../models/Comentarios")

module.exports.obtener = async (req, res) => {
  await Cliente.find()
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.json(error);
    });
};
module.exports.buscar = async (req, res) => {
  const { id } = req.params;
  await Cliente.findById({ _id: id })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.json(error);
    });
};
module.exports.follow = async (req, res) => {
  const { nuevoSeguidor, personaAseguir } = req.body;
  const busqueda = await Cliente.findById({ _id: personaAseguir });
  if (busqueda.followers.includes(nuevoSeguidor)) {
    res.json("Ya sigues a " + busqueda.name);
  } else {
    const seguir = await Cliente.findByIdAndUpdate(
      { _id: personaAseguir },
      { $push: { followers: nuevoSeguidor } }
    );
    const seguidor = await Cliente.findByIdAndUpdate(
      { _id: nuevoSeguidor },
      { $push: { following: personaAseguir } }
    );
    if (seguir && seguidor) {
      res.json("Todo bien");
    }
  }
};

module.exports.unfollow = async (req, res) => {
  const { eliminarSeguidor, personaAnoSeguir } = req.body;
  const busqueda = await Cliente.findById({ _id: eliminarSeguidor });
  if (!busqueda.following.includes(personaAnoSeguir)) {
    res.json("No sigues a esta persona");
  }
  const dejar = await Cliente.findByIdAndUpdate(
    { _id: eliminarSeguidor },
    { $pull: { following: personaAnoSeguir } }
  );
  const dejo = await Cliente.findByIdAndUpdate(
    { _id: personaAnoSeguir },
    { $pull: { followers: eliminarSeguidor } }
  );
  if (dejar && dejo) {
    res.json("Dejaste de seguir a " + dejo.name);
  }
};
module.exports.meFollowers = async (req, res) => {
  const {data} = req.body;
  await Cliente.find({_id:{$in:data}}).then(response=> {
    res.json(response)
  }).catch(error=> {
    res.json(error)
  })
}
module.exports.me_fav = async (req, res) => {
  const {favoritos} = req.body;
  console.log(favoritos)
  await Nota.find({_id:{$in:favoritos}}).then(response=> {
    res.json(response)
  }).catch(error=> {
    res.json(error)
  })
}
module.exports.update = async (req, res) => {
  const {id} = req.params;
  const {names, des} = req.body;
  if(names.trim().length >0){
    await Cliente.findByIdAndUpdate({_id:id},{$set:{names:names, des: des}}).then(response=> {
      res.json(response)
    }).catch(error=> {
      console.log(error)
    })
  }
}


module.exports.fav = async (req, res) => {
  const {idPublicacion, id} = req.body;
  const user = await Cliente.findById({_id:id});
  if(user.favoritos.includes(idPublicacion)){
    await Cliente.findByIdAndUpdate({_id:id}, {$pull:{favoritos:idPublicacion}}).then(response=> {
      res.json("desguardar")
    }).catch(error=> {
      res.json(error)
    })
  }else{
    await Cliente.findByIdAndUpdate({_id:id}, {$push:{favoritos:idPublicacion}}).then(response=> {
      res.json("guardado")
    }).catch(error=> {
      res.json(error)
    })
  }
}
