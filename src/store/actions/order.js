import { PURCHASE_BURGUER_SUCCESS, PURCHASE_BURGUER_FAILED, PURCHASE_BURGUER_START, PURCHASE_INIT, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAILED, FETCH_ORDERS_START } from '../actions/actionTypes'
import axios from '../../axios-orders';


export const purchaseBurgerStart = () => {
  return {
    type: PURCHASE_BURGUER_START
  }
}


export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: PURCHASE_BURGUER_SUCCESS,
    orderId: id,
    orderData
  }
}

export const purchaseBurgerFailed = (error) => {
  return {
    type: PURCHASE_BURGUER_FAILED,
    error
  }
}

export const purchaseBurger = (orderData) => {
  return dispatch => {
    dispatch(purchaseBurgerStart())
    axios
    .post('/orders.json', orderData)
    .then(response => {
      console.log(response.data)
      dispatch(purchaseBurgerSuccess(response.data.name, orderData))
    })
    .catch(error => {
      dispatch(purchaseBurgerFailed(error))
    });
  }
}

export const purchaseInit = () => {
  return {
    type: PURCHASE_INIT,
  }
}

export const fetchOrdersSuccess = (orders) => {
  return {
    type: FETCH_ORDERS_SUCCESS,
    orders
  }
}

export const fetchOrdersFail = () => {
  return {
    type: FETCH_ORDERS_FAILED
  }
}

export const fetchOrdersStart = () => {
  return { 
    type: FETCH_ORDERS_START,
    loading: true
  }
}

export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersStart())
    axios.get('/orders.json')
      .then(res => {
        const fetchedOrders = []
        for(let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          })
        }
        dispatch(fetchOrdersSuccess(fetchedOrders))
      })
      .catch((error) => {
        dispatch(fetchOrdersFail(error))
      })
  }
}