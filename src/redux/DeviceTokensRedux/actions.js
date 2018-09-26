import { makeCRUDConstantCreator, makeCRUDActionsCreator } from '../crudCreator/actions';

export const MODEL = 'device-tokens';
export const IGNORE_ACTIONS = ['GET_ALL', 'GET_ONE', 'EDIT'];
export const DeviceTokensTypes = {
  ...makeCRUDConstantCreator(MODEL, IGNORE_ACTIONS),
};
const CRUDDeviceTokensActions = makeCRUDActionsCreator(MODEL, IGNORE_ACTIONS);
/**
 * getAllDeviceTokens({pageSize, page })
 * getOneDeviceTokens(data)
 * createDeviceTokens(data)
 * deleteDeviceTokens()
 * editDeviceTokens(data)
 */
export default { ...CRUDDeviceTokensActions };
