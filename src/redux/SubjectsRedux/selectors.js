import _ from 'lodash';

export const getUserCreateSubjects = state => _.keyBy(state.subjects.userCreateSubjects, '_id');
export const getUserCreateSubjectsIds = state => {
  return state.subjects.userCreateSubjects.map(data => data._id);
};
