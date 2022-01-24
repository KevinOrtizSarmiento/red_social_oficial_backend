const { Router } = require("express");
const cloudinary = require("../utils/cloudinary")
const Publicacion = require("../models/Publicacion")
const Usuario = require("../models/Usuarios")
const multer = require("../utils/multer")
const router = Router();

router.put("/upload/profile/image/:id/:idPublic", multer.single('image'), async (req, res) => {
    const {id, idPublic} = req.params
    try {
        if(idPublic){
            const deleting = await cloudinary.uploader.destroy(idPublic)
        }
        const result = await cloudinary.uploader.upload(req.file.path)
        if(result){
            await Usuario.findByIdAndUpdate({_id:id}, {$set:{imgProfile:result.secure_url, idPublic: result.public_id}}).then(response=> {
                res.json("Actualizado")
            }).catch(error=> {
                console.log(error)
            })
        }
    } catch (error) {
        console.log(error)
    }
})
router.post("/upload/image", multer.single('image'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path)
        if(result){
            await Publicacion.create({imgPublicacion:result.secure_url, idPublic: result.public_id}).then(response=> {
                res.json("creado")
            }).catch(error=> {
                console.log(error)
            })
        }
    } catch (error) {
        console.log(error)
    }
})
router.get("/get/image", async (req, res) => {
    await Publicacion.find().then(response=> {
        res.json(response)
    }).catch(error=>{
        console.log(error)
    })
})
router.delete("/delete/image/:id/:idPublic", async (req, res) => {
    const {id, idPublic} = req.params;
    try {
        const result = await cloudinary.uploader.destroy(idPublic)
        if(result){
            await Publicacion.findByIdAndDelete({_id:id}).then(response=>{
                res.json("Eliminado")
            }).catch(error=> {
                console.log(error)
            })
        }
    } catch (error) {
        console.log(error)
    }
})
module.exports = router;