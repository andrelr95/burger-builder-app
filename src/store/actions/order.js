import { PURCHASE_BURGUER_SUCCESS, PURCHASE_BURGUER_FAILED } from '../actions/actionTypes'
import axios from '../../axios-orders';


export const purchaseBurguesSuccess = (id, orderData) => {
  return {
    type: PURCHASE_BURGUER_SUCCESS,
    orderId: id,
    orderData
  }
}

export const purchaseBurguesFailed = (error) => {
  return {
    type: PURCHASE_BURGUER_FAILED,
    error
  }
}

export const purchaseBurguerStart = (orderData) => {
  return dispatch => {
    axios
    .post('/orders.json', orderData)
    .then(response => {
      console.log(response.data)
      dispatch(purchaseBurguesSuccess(response.data, orderData))
    })
    .catch(error => {
      purchaseBurguesFailed(error)
    });
  }
}