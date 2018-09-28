import { makeCRUDConstantCreator, makeCRUDActionsCreator } from '../crudCreator/actions';
import { makeActionCreator, makeConstantCreator } from '../../utils/reduxUtils';

export const MODEL = 'tutors';
export const IGNORE_ACTIONS = [];
export const TutorsTypes = {
  ...makeCRUDConstantCreator(MODEL, IGNORE_ACTIONS),
  ...makeConstantCreator('SEARCH_TUTOR'),
};
const CRUDTutorsActions = makeCRUDActionsCreator(MODEL, IGNORE_ACTIONS);
/**
 * getAllTutors({pageSize, page })
 * getOneTutors(data)
 * createTutors(data)
 * deleteTutors()
 * editTutors(data)
 */
const searchTutor = text => makeActionCreator(TutorsTypes.SEARCH_TUTOR, { text });

export default { ...CRUDTutorsActions, searchTutor };
