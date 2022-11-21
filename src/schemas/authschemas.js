import joi from "joi";

const singUpSchema = joi.object({
  name: joi.string().required(),
  password: joi.string().required(),
  email: joi.string().email().required(),
});

const singInSchema = joi.object({
  password: joi.string().required(),
  email: joi.string().email().required(),
});

export { singInSchema, singUpSchema };
