import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { Creators as TransactionActions } from '../ducks/transaction';

const api = axios.create({
  baseURL: 'https://nextar.flip.id/',
  timeout: 6000,
});

export function* listTransaction() {
  try {
    const response = yield call(api.get, `/frontend-test`);
    yield put(TransactionActions.getListTransactionSuccess(response.data));
  } catch (err) {
    yield put(TransactionActions.getListTransactionFailure(STRINGS.failedWentWrong));
  }
}
