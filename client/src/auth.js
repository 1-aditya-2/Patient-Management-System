import { getUserByEmail, registerUser } from './db';

async function login(email, password) {
  const user = await getUserByEmail(email);
  console.log(user);
  if (!user) return { success: false, message: "User not found" };
  if (user.password !== password) return { success: false, message: "Incorrect password" };

  localStorage.setItem('user', JSON.stringify(user));
  return { success: true };
}

async function register(name, email, password, treatment = '', department = '') {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if(!emailRegex.test(email)) {
        return {success: false, message: "Incorrect email format"};
    }
    if(password.length < 8) {
        return {success: false, message: "Password should have atleast 8 characters"};
    }
    return registerUser(name, email, password, treatment, department);
}

function logout() {
  localStorage.removeItem('user');
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'));
}

export { login, register, logout, getCurrentUser };
