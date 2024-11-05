import shopAPI from "../axios/configAxios";

const USER_ENDPOINTS = {
  GET_ALL_USER: "/v1/admin/listUsers",
  GET_USER_BY_ID: "/v1/admin/:id",
  GET_USER_DATA: "/v1/auth/me",
  CREATE_USER: "/v1/admin",
  UPDATE_USER: "/v1/admin/:id",
  UPDATE_USER_INFO: "/v1/admin/update/:id",
  DELETE_USER: "/v1/admin/:id",
  LOGIN_USER: "/v1/auth/signin",
  SIGNUP_USER: "/v1/auth/signup",
};

const userApi = {
  getAllUser: async (loadingScreen = true) => {
    const res = await shopAPI.get(USER_ENDPOINTS.GET_ALL_USER);
    if (loadingScreen) {
      await new Promise((state) => setTimeout(state, 2000));
    }
    return res;
  },
  getUserById: async (id, LoadingScreen = true) => {
    const res = await shopAPI.get(
      USER_ENDPOINTS.GET_USER_BY_ID.replace(":id", id)
    );
    if (LoadingScreen) {
      await new Promise((state) => setTimeout(state, 2000));
    }
    return res;
  },

  createUser: async (userData, LoadingScreen = true) => {
    const res = await shopAPI.post(USER_ENDPOINTS.CREATE_USER, userData, {
      header: {
        "Content-type": "application/json",
      },
    });
    if (LoadingScreen) {
      await new Promise((state) => setTimeout(state, 2000));
    }
    return res;
  },

  loginUser: async (userData, LoadingScreen = true) => {
    const res = await shopAPI.post(USER_ENDPOINTS.LOGIN_USER, userData);
    const token = res.token;
    localStorage.setItem("authToken", token);
    console.log("token: ",token);
    const userRes = await shopAPI.get(USER_ENDPOINTS.GET_USER_DATA, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (LoadingScreen) {
      await new Promise((state) => setTimeout(state, 2000));
    }
    console.log("userRes: ",userRes);
    return userRes;
  },

  signUpUser: async (userData, LoadingScreen = true) => {
    const res = await shopAPI.post(USER_ENDPOINTS.SIGNUP_USER, userData);
    if (LoadingScreen) {
      await new Promise((state) => setTimeout(state, 2000));
    }
    return res;
  },

  updateUser: async (id, userData, LoadingScreen = true) => {
    const res = await shopAPI.put(
      USER_ENDPOINTS.UPDATE_USER.replace(":id", id),
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (LoadingScreen) {
      await new Promise((state) => setTimeout(state, 2000));
    }
    return res;
  },

  updateUserInfo: async (id, userData, LoadingScreen = true) => {
    const res = await shopAPI.put(
      USER_ENDPOINTS.UPDATE_USER_INFO.replace(":id", id),
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (LoadingScreen) {
      await new Promise((state) => setTimeout(state, 2000));
    }
    return res;
  },

  deleteUser: async (id, LoadingScreen) => {
    const res = await shopAPI.delete(
      USER_ENDPOINTS.DELETE_USER.replace(":id", id)
    );
    if (LoadingScreen) {
      await new Promise((state) => setTimeout(state, 2000));
    }
    return res;
  },
};

export default userApi;
