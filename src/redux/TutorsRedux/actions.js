import { makeCRUDConstantCreator, makeCRUDActionsCreator } from '../crudCreator/actions';
import { makeActionCreator, makeConstantCreator } from '../../utils/reduxUtils';

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
