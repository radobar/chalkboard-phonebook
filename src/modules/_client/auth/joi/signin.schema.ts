import * as Joi from '@hapi/joi';

const signinSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required(),
});

export { signinSchema };
