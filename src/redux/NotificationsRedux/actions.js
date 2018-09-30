import {
  makeCRUDConstantCreator,
  makeCRUDActionsCreator,
} from '../crudCreator/actions';

export const MODEL = 'notifications';
export const IGNORE_ACTIONS = ['GET_ONE', 'DELETE', 'EDIT', 'CREATE'];
export const NotificationsTypes = {
  ...makeCRUDConstantCreator(MODEL, IGNORE_ACTIONS),
};
const CRUDNotificationsActions = makeCRUDActionsCreator(MODEL, IGNORE_ACTIONS);
/**
 * getAllNotifications({pageSize, page })
 * getOneNotifications(data)
 * createNotifications(data)
 * deleteNotifications()
 * editNotifications(data)
 */
export default { ...CRUDNotificationsActions };
