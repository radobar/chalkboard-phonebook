import * as BaseJoi from '@hapi/joi';
import * as Extension from '@hapi/joi-date';

import ISO8601_DATE from '../../../../common/const/date-format.const';
import password from '../../../../common/const/signup.password.const';
import text from '../../../../common/const/text.const';
import regex from '../../../../common/regex';

const Joi = BaseJoi.extend(Extension);

const signupSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .max(text.maxLength)
    .required(),
  password: Joi.string()
    .valid(Joi.ref('passwordConfirmation'))
    .min(password.minLength)
    .regex(regex.password)
    .max(text.maxLength)
    .required(),
  passwordConfirmation: Joi.string()
    .min(password.minLength)
    .regex(regex.password)
    .max(text.maxLength)
    .required(),
  lastName: Joi.string()
    .max(text.maxLength)
    .required(),
  firstName: Joi.string()
    .max(text.maxLength)
    .required(),
  middleName: Joi.string()
    .max(text.maxLength)
    .required(),
  birthday: Joi.date()
    .format(ISO8601_DATE)
    .required(),
  biography: Joi.string()
    .max(text.maxLength)
    .required(),
});

export { signupSchema };
