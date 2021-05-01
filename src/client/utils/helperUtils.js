import qs from 'qs';

export function stringifyQueryParams(obj) {
  let queryString = '';
  Object.keys(obj).map(key => {
    let objKey = obj[key];
    if (Array.isArray(objKey)) {
      objKey = objKey.join(',');
    }
    if (!objKey) {
      return false;
    } // return if ObjectKey is falsy
    queryString += `${key}=${objKey}&`;
    return queryString;
  });
  return queryString.length
    ? `?${queryString.substr(0, queryString.length - 1)}`
    : '';
}

export function getQueryStringAsObj(query = window.location.search.substring(1)) {
  const queryObj = {};
  if (query !== '') {
    const keyValPair = query.split('&');

    for (let i = 0; i < keyValPair.length; i++) {
      const pair = keyValPair[i].split('=');
      queryObj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
  }
  return queryObj;
}

export const addParamToUrl = (relativeUrl, queryParam, isFetch) => {
  const kvp = relativeUrl.split('?');
  let existing = {};
  if (kvp.length > 1) {
    existing = qs.parse(kvp[1]);
  }
  if (isFetch) {
    existing = { ...queryParam, ...existing };
  } else {
    existing = { ...existing, ...queryParam };
  }
  return `${kvp[0]}${stringifyQueryParams(existing)}`;
};