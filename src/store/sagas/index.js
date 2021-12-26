import {all, takeLatest} from 'redux-saga/effects';
import {Types as ContactTypes} from '../ducks/contact';
import {
  listContact,
  postContact,
  deleteContact,
  updateContact,
} from './contact';

export default function* rootSaga() {
  return yield all([
    takeLatest(ContactTypes.GET_LIST_CONTACT_REQUEST, listContact),
    takeLatest(ContactTypes.POST_CONTACT_REQUEST, postContact),
    takeLatest(ContactTypes.DELETE_CONTACT_REQUEST, deleteContact),
    takeLatest(ContactTypes.PUT_CONTACT_REQUEST, updateContact),
  ]);
}
