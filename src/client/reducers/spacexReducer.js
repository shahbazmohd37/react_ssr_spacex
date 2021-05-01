/* eslint-disable import/prefer-default-export */
const initialState = {
};

export function spacex(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'SET_SPACE_X_DATA':
      return { ...state, spacexData: payload };
    default:
      return state;
  }
}
