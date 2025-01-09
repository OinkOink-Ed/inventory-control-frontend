interface Auth {
  state: {
    isAuth: boolean;
  };
}

export async function isAuth() {
  const storedAuth = localStorage.getItem("authStorage");

  const auth = storedAuth
    ? ((await JSON.parse(storedAuth)) as Auth).state.isAuth
    : null;

  return auth;
}
