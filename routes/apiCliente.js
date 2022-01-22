const { Router } = require("express");
const controladorCliente = require("../controllers/clienteController")
const router = Router();

router.get("/obtener", controladorCliente.obtener);
router.get("/obtener/:id", controladorCliente.buscar)
router.put("/follow", controladorCliente.follow)
router.put("/unfollow", controladorCliente.unfollow)
router.put("/update/user/:id", controladorCliente.update);
router.post("/followers/me", controladorCliente.meFollowers)
router.post("/save/me/favorite", controladorCliente.fav)
router.post("/me/favoritos", controladorCliente.me_fav)
module.exports = router;