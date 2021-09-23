import { all, takeLatest } from 'redux-saga/effects';
import { Types as TransactionTypes } from '../ducks/transaction';
import { listTransaction } from './transaction';

export default function* rootSaga() {
  return yield all([
    takeLatest(TransactionTypes.GET_LIST_TRANSACTION_REQUEST, listTransaction),
  ]);
};
