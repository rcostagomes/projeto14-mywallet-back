import db from "../db/db.js";
import dayjs from "dayjs";
import { transactionSchema } from "../schemas/transactionSchema.js";
const time = dayjs().format("D/M");

async function postTransaction(req, res) {
  const value = req.body;
  const { id } = req.headers;

  try {
    const { error } = transactionSchema.validate(value, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).send(errors);
    }

    await db.insertOne({
      value: value.value,
      description: value.description,
      type: value.type,
      time: time,
      user: id,
    });

    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
}

async function getTransaction(req, res) {
  const { userId } = req.headers;
  console.log(req.headers);
  try {
    const isUser = await db.findOne({ userId }).toArray();
    console.log(isUser);
    if (!isUser) {
      return res.sendStatus(401);
    }

    res.send({ isUser });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export { postTransaction, getTransaction };
