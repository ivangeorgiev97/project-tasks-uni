export const validateUsername = (username) => {
  if (username && username.length >= 3) return true;
  return false;
};

export const validatePassword = (password) => {
  if (password && password.length >= 3) return true;
  return false;
};
