import * as types from '../constants/ActionTypes';

export function setSearchEngine(engine, details) {
  return { type: types.SET_SEARCH_ENGINE, engine, details }
}
