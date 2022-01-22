const Cliente = require("../models/Client");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const time = 60 * 60 * 24;


module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuario = await Cliente.findOne({ email: email })
    const current = await bcrypt.compare(password, usuario.password);
    if (current) {
      const generate = {
        id: usuario._id,
        rol: usuario.rol
      };
      const token =  jwt.sign(generate, process.env.ACESS, { expiresIn: time });
      res.cookie("token", token, { httpOnly: true, maxAge: time * 1000, sameSite: 'none', secure: true})
      res.status(200).json(usuario)
    }else {
      res.status(401).json({password:"Correo y/o contraseña incorrectas", email:"Correo y/o contraseña incorrectas"})
  }
    } catch (error) {
    res.status(401).json({password:"Correo y/o contraseña incorrectas", email:"Correo y/o contraseña incorrectas"});
  }
  
};
module.exports.register = async (req, res) => {
  const numero = Math.floor(Math.random() * (820 - 1)) + 1;
  const img = "https://rickandmortyapi.com/api/character/avatar/"+numero+".jpeg"
  const { name, last, email, password} = req.body;
  const user = await Cliente.findOne({ email: email });
  if (user)
    return res.status(401).json({password:"Hubo un error", email:"Hubo un error"});
  try {
    const pass_encoded = await bcrypt.hash(password, salt);
    const usuario = await Cliente.create({
      name,
      img,
      last,
      email,
      password: pass_encoded
    });
    res.status(200).json(usuario);
  } catch (error) {
    res.status(401).json({password:"Hubo un error", email:"Hubo un error"});
  }
};
module.exports.logout = (req, res) => {
  res.cookie("token", "", { sameSite: 'none', secure: true, httpOnly: true, maxAge: 1})
  res.status(200).json(null)
}
module.exports.info = async (req, res)=>{
  const token = req.cookies.token;
  if(token){
     jwt.verify(token, process.env.ACESS, async (err, decodeToken)=>{
      if(err){
        res.status(401).json(null);
      }else{
        let user = await Cliente.findById({_id:decodeToken.id});
        res.status(200).json(user)
      }
    })
  }else{
    res.status(401).json(null)
  }
}