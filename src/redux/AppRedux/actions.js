import { makeActionCreator } from '../../utils/reduxUtils';

export const Types = {
  STARTUP: 'STARTUP',
};

const startup = () => makeActionCreator(Types.STARTUP);
export default {
  startup,
};
