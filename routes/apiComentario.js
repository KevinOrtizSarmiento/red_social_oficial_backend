const { Router } = require("express");
const controladorComentario = require("../controllers/comentController")
const router = Router();

router.get("/get/:id", controladorComentario.obtener)
router.post("/new", controladorComentario.crear);
module.exports = router;