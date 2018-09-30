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
  ...makeConstantCreator(
    'SEARCH_TUTOR',
    'CREATE_REVIEWS',
    'CREATE_REVIEWS_SUCCESS',
    'CREATE_REVIEWS_FAILURE',
  ),
};

/**
 * getAllTutors({pageSize, page })
 * getOneTutors(data)
 * createTutors(data)
 * deleteTutors()
 * editTutors(data)
 */
const CRUDTutorsActions = makeCRUDActionsCreator(MODEL, IGNORE_ACTIONS);

const searchTutor = text => makeActionCreator(TutorsTypes.SEARCH_TUTOR, { text });

const createReviews = data => makeActionCreator(TutorsTypes.CREATE_REVIEWS, { data });
const createReviewsSuccess = response => makeActionCreator(TutorsTypes.CREATE_REVIEWS_SUCCESS, { response });
const createReviewsFailure = error => makeActionCreator(TutorsTypes.CREATE_REVIEWS_FAILURE, { error });

export default {
  ...CRUDTutorsActions,
  searchTutor,
  createReviews,
  createReviewsSuccess,
  createReviewsFailure,
};
