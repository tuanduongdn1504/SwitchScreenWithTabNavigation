import { makeReducerCreator } from '../../utils/reduxUtils';
import { makeCRUDReducerCreator, INITIAL_CRUD_STATE } from '../crudCreator/reducer';
import { MODEL, IGNORE_ACTIONS, TutorsTypes } from './actions';

// Create
export const createReviews = state => state.merge({
  reviews: {
    loading: true,
  },
});

export const createReviewsSuccess = (state, { data }) => state.merge({
  reviews: {
    loading: false,
  },
});

export const createReviewsFailure = (state, { data }) => state.merge({
  reviews: {
    loading: false,
  },
});

const reducer = makeReducerCreator(INITIAL_CRUD_STATE, {
  ...makeCRUDReducerCreator(MODEL, IGNORE_ACTIONS),
  [TutorsTypes.CREATE_REVIEWS]: createReviews,
  [TutorsTypes.CREATE_REVIEWS_SUCCESS]: createReviewsSuccess,
  [TutorsTypes.CREATE_REVIEWS_FAILURE]: createReviewsFailure,
});

export default reducer;
