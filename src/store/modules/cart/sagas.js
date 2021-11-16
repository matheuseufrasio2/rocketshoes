import { call, select, put, all, takeLatest } from 'redux-saga/effects'
import { toast } from 'react-toastify'

import api from "../../../services/api";
import { formatPrice } from '../../../utils/format';

import { addToCartSuccess, updateAmountSuccess } from './actions'

function* addToCart({ id }) {
  const productExist = yield select(
    state => state.cart.find(p => p.id === id)
  )

  const stock = yield call(api.get, `/stock/${id}`);
  console.log(stock.data)

  const stockAmount = stock.data.amount;
  const currentAmount = productExist ? productExist.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    toast.error("Quantidade solicitada fora do estoque")
    return;
  }

  if (productExist) {
    yield put(updateAmountSuccess(id, amount))
  } else {
    const response = yield call(api.get, `/products/${id}`);
    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price)
    }

    yield put(addToCartSuccess(data))
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) {
    toast.error("Para excluir clique na lixeira ao lado")
    return;
  }

  const stock = yield call(api.get, `/stock/${id}`);
  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    toast.error("Quantidade solicitada está fora de estoque")
    return;
  }

  yield put(updateAmountSuccess(id, amount));
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
])