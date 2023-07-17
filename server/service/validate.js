export const ValidateData = (data) => {
  return Object.keys(data).filter((key) => !data[key]);
};
export const ValidateRegister = (user) => {
  const { username, password, email, phone } = user;
  return ValidateData({ username, password, email, phone });
};
