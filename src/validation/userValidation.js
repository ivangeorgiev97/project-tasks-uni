export const validateUsername = username => {
  return username ? username.length >= 3 : false
};

export const validatePassword = password => {
  return password ? password.length >= 4 : false
};
