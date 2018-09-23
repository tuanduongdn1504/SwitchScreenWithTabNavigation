import {
  makeCRUDConstantCreator,
  makeCRUDActionsCreator,
} from '../crudCreator/actions';

export const MODEL = 'tutors';
export const IGNORE_ACTIONS = [];
export const TutorsTypes = {
  ...makeCRUDConstantCreator(MODEL, IGNORE_ACTIONS),
};
const CRUDTutorsActions = makeCRUDActionsCreator(MODEL, IGNORE_ACTIONS);
/**
 * getAllTutors({pageSize, page })
 * getOneTutors(data)
 * createTutors(data)
 * deleteTutors()
 * editTutors(data)
 */
export default { ...CRUDTutorsActions };
