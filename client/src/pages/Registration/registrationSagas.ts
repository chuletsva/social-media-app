import { put, call, takeLatest, select, all } from "@redux-saga/core/effects";
import authAPI from "api/authAPI";
import RegistrationErrorResponse from "model/registration/RegistrationErrorResponse";
import RegistrationSuccessResponse from "model/registration/RegistrationSuccessResponse";
import { actions } from "./registrationSlice";
import { actions as commonActions } from "redux/commonSlice";

function* registerUser({ payload }: ReturnType<typeof actions.registerUser>) {
  const response: RegistrationSuccessResponse | RegistrationErrorResponse =
    yield call(authAPI.registerUser, payload);

  if (isSuccess(response)) {
    yield put(commonActions.fetchUser(response.userId));
  } else {
    yield put(actions.registerUserFailed(response.errors));
  }
}

function* watchRegisterUser() {
  yield takeLatest(actions.registerUser.type, registerUser);
}

function isSuccess(
  response: RegistrationSuccessResponse | RegistrationErrorResponse,
): response is RegistrationSuccessResponse {
  return "userId" in response;
}

export default function* registrationSagas() {
  yield all([watchRegisterUser()]);
}
