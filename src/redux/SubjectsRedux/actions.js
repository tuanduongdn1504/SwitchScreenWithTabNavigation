import { makeCRUDConstantCreator, makeCRUDActionsCreator } from '../crudCreator/actions';
import { makeActionCreator, makeConstantCreator } from '../../utils/reduxUtils';

export const MODEL = 'subjects';
export const IGNORE_ACTIONS = [];
export const SubjectsTypes = {
  ...makeCRUDConstantCreator(MODEL, IGNORE_ACTIONS),
  ...makeConstantCreator('SEARCH_SUBJECTS'),
};
const CRUDEmergencyTypeActions = makeCRUDActionsCreator(MODEL, IGNORE_ACTIONS);
const searchSubjects = text => makeActionCreator(SubjectsTypes.SEARCH_SUBJECTS, { text });

export default { ...CRUDEmergencyTypeActions, searchSubjects };
