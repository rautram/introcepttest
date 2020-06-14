const initialState = {
  lists: [],
  filteredList: [],
};

export function dataReducers(state = initialState, action) {
  switch (action.type) {
    case 'ADD_DATA':
      return {
        ...state,
        lists: [...state.lists, action.payload],
      };

    case 'FILTER':
      if (action.country !== '' && action.brand !== '') {
        console.log('1st case');
        const newData = state.lists.filter(
          (item) =>
            item.country === action.country && item.brand === action.brand,
        );
        return {
          ...state,
          filteredList: newData,
        };
      } else if (action.country !== '' && action.brand === '') {
        console.log('2nd case');
        const newCountry = state.lists.filter(
          (item) => item.country === action.country,
        );
        return {
          ...state,
          filteredList: newCountry,
        };
      } else {
        console.log('3rd case');
        const newBrand = state.lists.filter(
          (item) => item.brand === action.brand,
        );
        return {
          ...state,
          filteredList: newBrand,
        };
      }
    default:
      return state;
  }
}
