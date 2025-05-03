import { getUserByEmail } from './db';

async function login(email, password) {
  const user = await getUserByEmail(email);
  console.log(user);
  if (!user) return { success: false, message: "User not found" };
  if (user.password !== password) return { success: false, message: "Incorrect password" };

  localStorage.setItem('user', JSON.stringify(user));
  return { success: true };
}

function logout() {
  localStorage.removeItem('user');
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'));
}

export { login, logout, getCurrentUser };
