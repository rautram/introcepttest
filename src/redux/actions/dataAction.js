export function addData(data) {
  return function (dispatch) {
    dispatch({type: 'ADD_DATA', payload: data});
  };
}

export function filterCountry(country) {
  return function (dispatch) {
    dispatch({type: 'FILTER_BY_COUNTRY', payload: country});
  };
}

export function filterBrand(brand) {
  return function (dispatch) {
    dispatch({type: 'FILTER_BY_BRAND', payload: brand});
  };
}

export function filter(country, brand) {
  return function (dispatch) {
    dispatch({type: 'FILTER', country, brand});
  };
}
