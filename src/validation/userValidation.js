export const validateUsername = username => {
  return (username && username.trim().length >= 3)
};

export const validatePassword = password => {
  return (password && password.trim().length >= 4)
};
