import 'isomorphic-fetch';
import {
  addParamToUrl,
} from '../utils/helperUtils';

const SPACE_X_URL = 'https://api.spacexdata.com/v3/launches?limit=100';

export function sendSpaceXData(payload) {
  return {
    type: 'SET_SPACE_X_DATA',
    payload,
  };
}
export function fetchCompleteData(queryParams = {}) {
  return async dispatch => {
    try {
      const data = await fetch(addParamToUrl(SPACE_X_URL, queryParams), {
        method: 'GET'
      }).then(res => res.json());
      dispatch(sendSpaceXData(data))
      return data;
    } catch(err) {
      console.log('error occured in catch ', err);
    }
  };
}
