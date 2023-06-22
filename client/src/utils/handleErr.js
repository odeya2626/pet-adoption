import { ErrMessagesObj } from "../utils/Messages";
export const userErrMessage = (err, setMessage) => {
  const error = err.response.data;
  ErrMessagesObj[error] ? setMessage(ErrMessagesObj[error]) : setMessage(error);
};
export const clearCurrentUser = (setCurrentUser) => {
  setCurrentUser({});
  localStorage.removeItem("currentUser");
};
export const handleAuthErr = (err, cbClearUser, showModal) => {
  if (err.response.status === 401) {
    cbClearUser();
    showModal(true);
  } else if (err.response.status === 403) {
    window.location.href = "/access-denied";
  }
};
