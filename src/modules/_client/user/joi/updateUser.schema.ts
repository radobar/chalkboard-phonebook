import * as BaseJoi from '@hapi/joi';
import * as Extension from '@hapi/joi-date';

import ISO8601_DATE from '../../../../common/const/date-format.const';
import text from '../../../../common/const/text.const';

const Joi = BaseJoi.extend(Extension);

const updateUserSchema = Joi.object().keys({
  lastName: Joi.string().max(text.maxLength),
  firstName: Joi.string().max(text.maxLength),
  middleName: Joi.string().max(text.maxLength),
  birthday: Joi.date().format(ISO8601_DATE),
  biography: Joi.string().max(text.maxLength),
});

export { updateUserSchema };
