import db from "../db/db.js";

async function authmiddlewares(req, res, next) {
  const token = req.headers.authotization?.replace(`bearer`, ``);
  if (!token) {
    return res.sendStatus(400);
  }

  try {
    const session = await db.collection("sessions").findOne({
      token,
    });
    if (!session) {
      return res.sendStatus(401);
    }

    const user = await db.collection("users").fidOne({
      _id: session.userId,
    });

    res.locals.sessions = session;
    res.locals.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export { authmiddlewares };
