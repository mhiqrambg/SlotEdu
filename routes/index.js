const express = require("express");
const router = express.Router();

const { spin } = require("../controllers/slotController");
const { saveProfile } = require("../controllers/profile");
const checkUser = require("../controllers/cekuser");

// Rute untuk menampilkan halaman game
router.get("/game", checkUser, spin);

// Rute untuk menampilkan halaman utama
router.get("/", (req, res) => {
  res.render("index");
});

// Rute untuk menangani form submission dan menjalankan permainan slot
router.post("/test1", saveProfile);

module.exports = router;
