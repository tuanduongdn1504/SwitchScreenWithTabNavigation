import _ from 'lodash';
import { makeCRUDConstantCreator, makeCRUDActionsCreator } from '../crudCreator/actions';
import { makeActionCreator, makeConstantCreator } from '../../utils/reduxUtils';

export const makeFilterForTutor = filter => {
  return {
    longitude: filter.location.longitude,
    latitude: filter.location.latitude,
    subjects: _.keys(_.pickBy(filter.subjects, item => item)).join(','),
    session_types: _.keys(_.pickBy(filter.session_types, item => item)).join(','),
  };
};

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
