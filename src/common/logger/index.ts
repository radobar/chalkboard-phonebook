import * as log4js from 'log4js';

const CustomLogger = log4js.getLogger('logger');
CustomLogger.level = 'error';

export default CustomLogger;
