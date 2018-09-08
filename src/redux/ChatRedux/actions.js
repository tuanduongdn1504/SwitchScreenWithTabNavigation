import { makeCRUDConstantCreator, makeCRUDActionsCreator } from '../crudCreator/actions';
import { makeConstantCreator, makeActionCreator } from '../../utils/reduxUtils';

export const MODEL = 'Chat';
export const IGNORE_ACTIONS = [];
export const Types = {
  ...makeCRUDConstantCreator(MODEL, IGNORE_ACTIONS),
  ...makeConstantCreator('WATCH_CHAT', 'CLOSE_CHAT'),
};
const CRUDEmergencyTypeActions = makeCRUDActionsCreator(MODEL, IGNORE_ACTIONS);
const watchChat = data => makeActionCreator(Types.WATCH_CHAT, { data });
const closeChat = data => makeActionCreator(Types.CLOSE_CHAT, { data });
export default { ...CRUDEmergencyTypeActions, watchChat, closeChat };
