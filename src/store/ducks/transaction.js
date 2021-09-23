import Immutable from 'seamless-immutable';

export const Types = {
  GET_LIST_TRANSACTION_REQUEST: 'GET_LIST_TRANSACTION_REQUEST',
  GET_LIST_TRANSACTION_SUCCESS: 'GET_LIST_TRANSACTION_SUCCESS',
  GET_LIST_TRANSACTION_FAILURE: 'GET_LIST_TRANSACTION_FAILURE',
};

const initialState = Immutable({
  loading: false,
  error: false,
  errorMessage: null,
  listData: [],
});

export const Creators = {
  getListTransactionRequest: () => ({
    type: Types.GET_LIST_TRANSACTION_REQUEST,
  }),

  getListTransactionSuccess: payload => ({
    type: Types.GET_LIST_TRANSACTION_SUCCESS,
    payload,
  }),

  getListTransactionFailure: payload => ({
    type: Types.GET_LIST_TRANSACTION_FAILURE,
    payload,
  }),
};

/* delete key and save their value into an array */
function cleanData(data){
  let newData = [];
  Object.keys(data).map(key => {
    newData.push(data[key]);
  });

  return newData;
}
/*   */

const transaction = (state = initialState, { type, payload }) => {
  switch (type) {
    case Types.GET_LIST_TRANSACTION_REQUEST:
      return {
        ...state,
        listData: [],
        loading: true,
        error: false,
        errorMessage: null,
      };

    case Types.GET_LIST_TRANSACTION_SUCCESS:
      return {
        ...state,
        listData: cleanData(payload),
        loading: false,
        error: false,
        errorMessage: null,
      };

    case Types.GET_LIST_TRANSACTION_FAILURE:
      return {
        ...state,
        listData: payload.data,
        loading: false,
        error: true,
        errorMessage: payload,
      };

    default:
      return state;
  }
};

export default transaction;
