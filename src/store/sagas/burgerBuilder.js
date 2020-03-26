import { put } from "redux-saga/effects";
import axios from "../../axios-orders";

import {
  setIngredients,
  fetchIngredientsFailed
} from "../actions/burgerBuilder";

export function* initIngredientsSaga(action) {
  try {
    const response = yield axios.get(
      "https://react-my-burger-1fced.firebaseio.com/ingredients.json"
    );
    yield put(setIngredients(response.data));
  } catch (err) {
    yield put(fetchIngredientsFailed());
  }
}
