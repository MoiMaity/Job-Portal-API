export const users = [];

export const registerUser = (user) => {
  users.push(user);
};

export const authenticateUser = ({ email, password }) => {
  return users.find(
    (user) => user.email === email && user.password === password
  );
};
