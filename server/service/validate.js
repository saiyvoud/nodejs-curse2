export const ValidateData = (data) => {
  return Object.keys(data).filter((key) => !data[key]);
};
// --------- auth -------
export const ValidateRegister = (user) => {
  const { username, password, email, phone } = user;
  return ValidateData({ username, password, email, phone });
};
export const ValidateLogin = (user) => {
  const { password, email } = user;
  return ValidateData({ password, email });
};
export const ValidateProfile = (user) => {
  const { username, phone } = user;
  return ValidateData({ username, phone });
};
