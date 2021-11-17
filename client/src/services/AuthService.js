const AuthService = async () => {
  const user = await JSON.parse(localStorage.getItem('user'));

  if (user?.token) {
    return true;
  }
  return false;
};

export default AuthService;
