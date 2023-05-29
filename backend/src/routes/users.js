const express = require("express");
const router = new express.Router();

const { generateHash, isValidPassword } = require("../middleware/auth");
const userSchema = require("../models/user");
const { verifyToken, generateAccessToken } = require("../middleware/jwt");
const { sendWelcomeEmail } = require("../email/mail");

router.post("/new", async (req, res) => {
  try {
    const { name, lastName, email, password } = req.body;
    const usr = await userSchema.findOne({ email });
    if (usr) {
      return res.status(409).send({ msg: "Ya existe un usuario asociado a esta cuenta de correo electrónico." });
    }
    const newUserObj = {
      name,
      lastName,
      email,
      password,
    };
    newUserObj.password = await generateHash(password);
    const token = generateAccessToken({ email });
    const newUser = new userSchema(newUserObj);
    await newUser.save();
    // sendWelcomeEmail(email, `${name} ${lastName}.`);
    res.status(200).json({ respuesta: "Si jaló", token });
  } catch (error) {
    res.status(404).send({msg: 'El servicio no se encuentra disponible por el momento, inténtalo de nuevo más tarde.'});
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userSchema.findOne({ email });

  if (isValidPassword(password, user.password)) {
    const token = generateAccessToken(email);
    res.status(200).json({ respuesta: "Si jaló contraseña", token });
  } else {
    res.status(401).json({ respuesta: "No jaló contraseña" });
  }
});

router.post("/verify", verifyToken, async (req, res) => {
  const { email } = req.body;
  const user = await userSchema.findOne({ email });

  const token = req.token;

  if (user) {
    res.status(200).json({ msg: "Token válido", token });
  } else {
    res.status(404).json({ msg: "No hay un usuario con ese correo." });
  }
});

router.get("/user", verifyToken, async (req, res) => {
  const { email } = req.body;
  const user = await userSchema.findOne({ email });
  const { name, lastName } = user;
  if (user) {
    res.status(200).json({ name, lastName, email });
  } else {
    res.status(404).json({ msg: "No hay un usuario con ese correo." });
  }
});

module.exports = router;
