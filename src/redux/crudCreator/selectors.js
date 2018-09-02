export const getDataArr = (state, resources) => {
  const { data } = state[resources];
  const { ids } = state[resources];
  return ids.map(id => data[id]);
};
export const getTotal = (state, resources) => {
  const { total } = state[resources];
  return total;
};
