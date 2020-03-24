import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("auth reducer", () => {
  const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: "/"
  };

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should store the token upon login", () => {
    const expectedState = {
      token: "some-token",
      userId: "some-user-id",
      error: null,
      loading: false,
      authRedirectPath: "/"
    };

    expect(
      reducer(initialState, {
        type: actionTypes.AUTH_SUCCESS,
        token: "some-token",
        userId: "some-user-id"
      })
    ).toEqual(expectedState);
  });
});
