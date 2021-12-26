import Immutable from 'seamless-immutable';

export const Types = {
  GET_LIST_CONTACT_REQUEST: 'GET_LIST_CONTACT_REQUEST',
  GET_LIST_CONTACT_SUCCESS: 'GET_LIST_CONTACT_SUCCESS',
  GET_LIST_CONTACT_FAILURE: 'GET_LIST_CONTACT_FAILURE',

  POST_CONTACT_REQUEST: 'POST_CONTACT_REQUEST',
  POST_CONTACT_SUCCCES: 'POST_CONTACT_SUCCCES',
  POST_CONTACT_FAILURE: 'POST_CONTACT_FAILURE',

  DELETE_CONTACT_REQUEST: 'DELETE_CONTACT_REQUEST',
  DELETE_CONTACT_SUCCESS: 'DELETE_CONTACT_SUCCESS',
  DELETE_CONTACT_FAILURE: 'DELETE_CONTACT_FAILURE',

  PUT_CONTACT_REQUEST: 'PUT_CONTACT_REQUEST',
  PUT_CONTACT_SUCCESS: 'PUT_CONTACT_SUCCESS',
  PUT_CONTACT_FAILURE: 'PUT_CONTACT_FAILURE',
};

function cleanData(data) {
  const _data = data.sort((a, b) => {
    if (a.firstName < b.firstName) return -1;
    return a.firstName > b.firstName ? 1 : 0;
  });

  let finalData = [];
  let stickeyIndex = [];
  _data.forEach((name, i) => {
    if (
      i == 0 ||
      name.firstName.substr(0, 1) != _data[i - 1]?.firstName?.substr(0, 1)
    ) {
      stickeyIndex.push(i + stickeyIndex.length);
      finalData.push({
        id: i.toString() + 'head',
        name: name?.firstName?.substr(0, 1),
        type: 'head',
        imageUrl: 'N/A',
      });
    }
    finalData.push({
      id: i.toString() + 'name',
      firstName: name?.firstName,
      lastName: name?.lastName,
      name: `${name?.firstName} ${name?.lastName}`,
      age: name?.age,
      type: 'name',
      imageUrl: name?.photo?.toString(),
      personId: name?.id,
    });
  });

  return {finalData, stickeyIndex};
}

const initialState = Immutable({
  loading: false,
  error: false,
  errorMessage: null,
  listData: [],

  loadingPost: false,
  succcessPost: false,
  postStatus: {},

  loadingDelete: false,
  succcessDelete: false,
  deletStatus: {},

  loadingUpdate: false,
  succcessUpdate: false,
  updateStatus: {},
});

export const Creators = {
  getListContactRequest: () => ({
    type: Types.GET_LIST_CONTACT_REQUEST,
  }),
  getListContactSuccess: payload => ({
    type: Types.GET_LIST_CONTACT_SUCCESS,
    payload,
  }),
  getListContactFailure: payload => ({
    type: Types.GET_LIST_CONTACT_FAILURE,
    payload,
  }),

  postingContactRequest: payload => ({
    type: Types.POST_CONTACT_REQUEST,
    payload,
  }),
  postingContactSuccess: payload => ({
    type: Types.POST_CONTACT_SUCCCES,
    payload,
  }),
  postingContactFailure: payload => ({
    type: Types.POST_CONTACT_FAILURE,
    payload,
  }),

  deleteContactRequest: payload => ({
    type: Types.DELETE_CONTACT_REQUEST,
    payload,
  }),
  deleteContactSuccess: payload => ({
    type: Types.DELETE_CONTACT_SUCCESS,
    payload,
  }),
  deleteContactFailure: payload => ({
    type: Types.DELETE_CONTACT_FAILURE,
    payload,
  }),

  updateContactRequest: payload => ({
    type: Types.PUT_CONTACT_REQUEST,
    payload,
  }),
  updateContactSuccess: payload => ({
    type: Types.PUT_CONTACT_SUCCESS,
    payload,
  }),
  updateContactFailure: payload => ({
    type: Types.PUT_CONTACT_FAILURE,
    payload,
  }),
};

const contact = (state = initialState, {type, payload}) => {
  switch (type) {
    case Types.GET_LIST_CONTACT_REQUEST:
      return {
        ...state,
        loading: true,
        succcessPost: false,
        succcessDelete: false,
        succcessUpdate: false,
        listData: [],
        postStatus: {},
        deletStatus: {},
        updateStatus: {},
        error: false,
        errorMessage: null,
      };

    case Types.GET_LIST_CONTACT_SUCCESS:
      return {
        ...state,
        listData: cleanData(payload),
        loading: false,
        error: false,
        errorMessage: null,
      };

    case Types.GET_LIST_CONTACT_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: payload,
      };

    case Types.POST_CONTACT_REQUEST:
      return {
        ...state,
        postStatus: {},
        loadingPost: true,
        succcessPost: false,
        error: false,
        errorMessage: null,
      };

    case Types.POST_CONTACT_SUCCCES:
      return {
        ...state,
        postStatus: payload,
        succcessPost: true,
        loadingPost: false,
        error: false,
        errorMessage: null,
      };

    case Types.POST_CONTACT_FAILURE:
      return {
        ...state,
        loadingPost: false,
        succcessPost: false,
        error: true,
        errorMessage: payload,
      };

    case Types.DELETE_CONTACT_REQUEST:
      return {
        ...state,
        loadingDelete: true,
        succcessDelete: false,
        deletStatus: {},
        error: false,
        errorMessage: null,
      };

    case Types.DELETE_CONTACT_SUCCESS:
      return {
        ...state,
        loadingDelete: false,
        succcessDelete: true,
        deletStatus: payload,
        error: false,
        errorMessage: null,
      };

    case Types.DELETE_CONTACT_FAILURE:
      return {
        ...state,
        loadingDelete: false,
        succcessDelete: false,
        error: true,
        errorMessage: payload,
      };

    case Types.PUT_CONTACT_REQUEST:
      return {
        ...state,
        loadingUpdate: true,
        succcessUpdate: false,
        updateStatus: {},
        error: false,
        errorMessage: null,
      };

    case Types.PUT_CONTACT_SUCCESS:
      return {
        ...state,
        loadingUpdate: false,
        succcessUpdate: true,
        updateStatus: payload,
        error: false,
        errorMessage: null,
      };

    case Types.PUT_CONTACT_FAILURE:
      return {
        ...state,
        loadingUpdate: false,
        succcessUpdate: false,
        error: true,
        errorMessage: payload,
      };

    default:
      return state;
  }
};

export default contact;
