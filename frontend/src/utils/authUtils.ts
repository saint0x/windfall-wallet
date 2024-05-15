// frontend/src/utils/authUtils.ts

export const setAuthUser = (token: string) => {
    localStorage.setItem('authToken', token);
  };

  export const getAuthUser = () => {
    return localStorage.getItem('authToken');
  };

  export const removeAuthUser = () => {
    localStorage.removeItem('authToken');
  };
