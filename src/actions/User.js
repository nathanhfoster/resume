import { ReduxActions } from "../constants";
import { Axios, AxiosForm } from ".";
import Cookies from "js-cookie";
import qs from "qs";
import { CookieMap } from "../constants";
import { GetUserSettings } from "./Settings";

const ChangeUser = payload => ({ type: ReduxActions.USER_SET, payload });

const UserLogin = (payload, rememberMe) => dispatch =>
  Axios()
    .post("login/", qs.stringify(payload))
    .then(res => {
      const { id, token } = res.data;
      const eightHours = 1 / 3;
      rememberMe
        ? Cookies.set(CookieMap.USER_TOKEN, res.data.token)
        : Cookies.set(CookieMap.USER_TOKEN, res.data.token, {
            expires: eightHours
          });
      dispatch(RefreshPatchUser(token, id));
      dispatch(GetUserSettings(token, id));
      dispatch({
        type: ReduxActions.USER_SET,
        payload: res.data
      });
    })
    .catch(e => console.log("UserLogin: ", e.response));

const RefreshPatchUser = (token, id) => dispatch =>
  Axios(token)
    .get(`users/${id}/refresh/`)
    .then(res => {
      Cookies.set(CookieMap.USER_LAST_LOGIN, new Date());
      dispatch({
        type: ReduxActions.USER_SET,
        payload: res.data
      });
    })
    .catch(e =>
      e.response && e.response.status == 401
        ? dispatch({
            type: ReduxActions.USER_SET_LOGOUT,
            payload: null
          })
        : console.log(e)
    );

const UserLogout = () => dispatch => {
  Cookies.remove(CookieMap.USER_TOKEN);
  return dispatch({
    type: ReduxActions.USER_SET_LOGOUT,
    payload: null
  });
};

const CreateUser = (payload, rememberMe) => async dispatch =>
  await Axios()
    .post("users/", qs.stringify(payload))
    .then(async res => await dispatch(UserLogin(payload, rememberMe)))
    .catch(e => console.log("CreateUser: ", e.response));

const UpdateUser = (id, token, payload) => async dispatch =>
  await Axios(token)
    .patch(`users/${id}/`, qs.stringify(payload))
    .then(async res => dispatch({ type: ReduxActions.USER_UPDATE_SUCCESS, payload: res.data }))
    .catch(e => console.log("UpdateUser: ", e.response));

const UpdateProfile = (id, token, payload) => async dispatch => {
  await dispatch({ type: ReduxActions.USER_UPDATE_LOADING });
  return await AxiosForm(token, payload)
    .patch(`users/${id}/`, payload)
    .then(res => {
      res.data.token = Cookies.get(CookieMap.USER_TOKEN);
      dispatch({
        type: ReduxActions.USER_UPDATE_SUCCESS,
        payload: res.data
      });
    })
    .catch(e => console.log("UpdateProfile: ", e.response));
};

const Logout = () => dispatch => {
  Cookies.remove(CookieMap.USER_TOKEN);
  return dispatch({
    type: ReduxActions.USER_SET_LOGOUT,
    payload: null
  });
};

const ClearUserApi = () => ({
  type: ReduxActions.CLEAR_USER_API
});

export {
  ChangeUser,
  UserLogin,
  RefreshPatchUser,
  UserLogout,
  CreateUser,
  UpdateUser,
  UpdateProfile,
  Logout,
  ClearUserApi
};
