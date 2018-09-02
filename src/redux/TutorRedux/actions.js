import { makeCRUDConstantCreator, makeCRUDActionsCreator } from '../crudCreator/actions';

export const MODEL = 'tutor';
export const IGNORE_ACTIONS = ['CREATE'];
export const EmergencyTypeTypes = {
  ...makeCRUDConstantCreator(MODEL, IGNORE_ACTIONS),
};
const CRUDEmergencyTypeActions = makeCRUDActionsCreator(MODEL, IGNORE_ACTIONS);

export default { ...CRUDEmergencyTypeActions };
