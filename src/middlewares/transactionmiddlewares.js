import { transactionSchema } from "../schemas/transactionSchema.js";

function transactionmiddlewares(req, res, next) {
  const { description, value, type } = req.body;

  const isValid = transactionSchema.validate({
    description,
    value,
    type,
  });

  if (isValid.error) {
    return res.sendStatus(400);
  }

  if (type.toLowerCase() !== "credit" && type.toLowerCase() !== "debit") {
    return res.sendStatus(400);
  }
  next();
}

export { transactionmiddlewares };
