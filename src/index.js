import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import joi from "joi";
import { v4 as uuid } from "uuid";
import { MongoClient } from "mongodb";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;
mongoClient.connect().then(() => {
  db = mongoClient.db("mywallet");
});

const singUpSchema = joi.object({
  name: joi.string().required(),
	password: joi.string().required(),
  email: joi.string().email().required()
});

const singInSchema = joi.object({
	password: joi.string().required(),
  email: joi.string().email().required()
});

app.post("/singUp", async (req, res) => {
  const { name, email, password } = req.body;
  const validate = singUpSchema.validate({
    name,
    email,
    password
  });

  if (validate.error) {
    return res.sendStatus(400);
  }
  const encryptPassword = bcrypt.hashSync(password, 10);
  try {
    db.collection("users").insertOne({
      name,
      email,
      password: encryptPassword,
    });
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.post("/singIn", async (req, res) => {
  const { email, password } = req.body;
  const validate = singInSchema.validate({
    email,
    password
  });

  if (validate.error){
    return res.sendStatus(400)
  }
  try {
    const user = await db.collection("users").findOne({
      email,
    });
    const validatePassword = bcrypt.compareSync(password, user.password);

    if (!user || !validatePassword) {
      return res.sendStatus(401);
    }
    const token = uuid();
    db.collection("sessions").insertOne({
      userId: user._id,
      token,
    });
    return res.send(token);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

app.listen(5000, () => {
  console.log("Server running in port 5000");
});
