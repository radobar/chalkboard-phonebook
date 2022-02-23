import * as BaseJoi from '@hapi/joi';
import * as Extension from '@hapi/joi-date';

import { PhoneNumberType } from '../../../../entity/PhoneNumber';

const Joi = BaseJoi.extend(Extension);

const updateContactSchema = Joi.object().keys({
  // id: Joi.string().uuid(),
  id: Joi.number,
  phoneNumbers: Joi.array()
    .object()
    .keys({ number: Joi.string(), type: Joi.string().valid(...Object.values(PhoneNumberType)) }),
  name: Joi.string(),
  email: Joi.date(),
  address: Joi.string(),
});

export { updateContactSchema };
