import {
  makeCRUDConstantCreator,
  makeCRUDActionsCreator
} from '../crudCreator/actions';

export const MODEL = 'subjects';
export const IGNORE_ACTIONS = [];
export const EmergencyTypeTypes = {
  ...makeCRUDConstantCreator(MODEL, IGNORE_ACTIONS)
};
const CRUDEmergencyTypeActions = makeCRUDActionsCreator(MODEL, IGNORE_ACTIONS);

export default { ...CRUDEmergencyTypeActions };
