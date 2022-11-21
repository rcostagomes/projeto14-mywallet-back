import db from "../db/db.js";

async function insert(req, res) {
  const { session } = res.locals;
  try {
    db.collection("transactions").insertOne({
      description,
      value,
      type,
      userId: session.userId,
      date: +new Date(),
    });
    return res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

async function list(req, res) {
  const { user } = res.locals;

  try {
    const transactions = await db
      .collection("transactions")
      .findOne({
        userId: user._id,
      })
      .toArray();

    const total = transactions.reduce((acc, curr) => {
      if (curr.type === "debit") {
        return acc - curr.value;
      }
      return acc + curr.value;
    }, 0);

    transactions.push({
      type: "total",
      value: total,
    });
    return res.send(transactions);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
}

export { insert, list };
