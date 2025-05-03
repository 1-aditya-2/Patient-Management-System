export const setSession = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };
  
  export const getSession = () => {
    return JSON.parse(localStorage.getItem('user'));
  };
  
  export const clearSession = () => {
    localStorage.removeItem('user');
  };
  