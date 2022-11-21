import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import db from "../db/db.js"
import { singInSchema, singUpSchema } from "../schemas/authschemas.js";

async function singUp(req, res) {
  const { name, email, password } = req.body;
  const validate = singUpSchema.validate({
    name,
    email,
    password,
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
}

async function singIn(req, res) {
  const { email, password } = req.body;
  const validate = singInSchema.validate({
    email,
    password,
  });

  if (validate.error) {
    return res.sendStatus(400);
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
}

export { singIn, singUp };
