import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
  searchEngine: 'google',
};

const actionsMap = {
  [ActionTypes.SET_SEARCH_ENGINE](state, action) {
    let details
    if (details) details = action.details
    return {
      searchEngine: engine,
      details: details,
      ...state
    };
  }
};

export default function todos(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
