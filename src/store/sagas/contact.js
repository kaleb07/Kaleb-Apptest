import {call, put} from 'redux-saga/effects';
import axios from 'axios';
import {Creators as ContactActions} from '../ducks/contact';
import {showMessage} from 'react-native-flash-message';

const api = axios.create({
  baseURL: 'https://simple-contact-crud.herokuapp.com',
  timeout: 6000,
});

export function* listContact() {
  try {
    const response = yield call(api.get, `/contact`);
    if (response.data) {
      yield put(ContactActions.getListContactSuccess(response.data.data));
    }
  } catch (err) {
    yield put(ContactActions.getListContactFailure('Something when wrong!'));
    showMessage({
      message: err.data?.message?.toString() || 'Something when wrong!',
      type: 'danger',
      icon: 'danger',
    });
  }
}

export function* postContact(action) {
  const {data} = action.payload;
  try {
    const response = yield call(api.post, `/contact`, data);
    if (response.data) {
      yield put(ContactActions.postingContactSuccess(response.data));
      showMessage({
        message: response.data?.message,
        type: 'success',
        icon: 'success',
      });
      yield call(listContact);
    }
  } catch (err) {
    yield put(ContactActions.postingContactFailure('Something when wrong!'));
    showMessage({
      message: err.data?.message?.toString() || 'Something when wrong!',
      type: 'danger',
      icon: 'danger',
    });
  }
}

export function* updateContact(action) {
  const {id, data} = action.payload;
  try {
    const response = yield call(api.put, `/contact/${id}`, data);
    if (response.data) {
      yield put(ContactActions.updateContactSuccess(response.data));
      showMessage({
        message: response.data?.message,
        type: 'success',
        icon: 'success',
      });
      yield call(listContact);
    }
  } catch (err) {
    yield put(ContactActions.updateContactFailure('Something when wrong!'));
    showMessage({
      message: err.data?.message?.toString() || 'Something when wrong!',
      type: 'danger',
      icon: 'danger',
    });
  }
}

export function* deleteContact(action) {
  const {id} = action.payload;
  try {
    const response = yield call(api.delete, `/contact/${id}`);
    if (response.data) {
      yield put(ContactActions.deleteContactSuccess(response.data));
      showMessage({
        message: response.data?.message,
        type: 'success',
        icon: 'success',
      });
      yield call(listContact);
    }
  } catch (err) {
    yield put(ContactActions.deleteContactFailure('Something when wrong!'));
    showMessage({
      message: err.data?.message?.toString() || 'Something when wrong!',
      type: 'danger',
      icon: 'danger',
    });
  }
}
