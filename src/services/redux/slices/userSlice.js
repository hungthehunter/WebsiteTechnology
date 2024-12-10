import { createSlice } from "@reduxjs/toolkit";
import { userThunk } from "../thunks/thunk";

const initialState = {
  listUser: [],
  userCurrentLogged: null,
  selectedUser: null,
  isLoading: false,
  isError: false,
  isLoggingOut: false,
  isLoggingError: null,
  signupError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearSelectedUserId: (state) => {
      state.selectedUser = null;
    },
    selectedUserId: (state, action) => {
      state.selectedUser = action.payload;
    },
    setUserLoggedIn: (state, action) => {
      state.userCurrentLogged = action.payload;
      state.isLoggingOut = false;
    },
    clearUserLoggedIn: (state) => {
      state.userCurrentLogged = null;
      state.isLoggingOut = true;
    },
    setLoginError: (state, action) => {
      state.loginError = action.payload; // Thiết lập lỗi đăng nhập
    },
  },
  extraReducers: (builder) => {
    // getAllUsers
    builder
      .addCase(userThunk.getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userThunk.getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.listUser = action.payload;
      })
      .addCase(userThunk.getAllUsers.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });

    // getUserById
    builder
      .addCase(userThunk.getUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userThunk.getUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        if (action.payload && action.payload.id) {
          state.selectedUser = action.payload;
        } else {
          console.error("Invalid payload received in getUserById.fulfilled");
        }
      })
      .addCase(userThunk.getUserById.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.selectedUser = null;
      });

    // createUser
    builder
      .addCase(userThunk.createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userThunk.createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.listUser.push(action.payload);
      })
      .addCase(userThunk.createUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });

    // loginUser
    builder
      .addCase(userThunk.loginUser.pending, (state) => {
        state.isLoading = true;
        state.loginError = null; // Xóa lỗi trước khi bắt đầu đăng nhập
      })
      .addCase(userThunk.loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.userCurrentLogged = action.payload; // Cập nhật người dùng hiện tại
      })
      .addCase(userThunk.loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.loginError = action.error.message; // Lưu lỗi đăng nhập
      });

    // signupUser
    builder
      .addCase(userThunk.signUpUser.pending, (state) => {
        state.isLoading = true;
        state.signupError = null;
      })
      .addCase(userThunk.signUpUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.listUser.push(action.payload);
      })
      .addCase(userThunk.signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.signupError = action.payload; // Lưu lỗi đăng ký
      });

    // updateUser
    builder
      .addCase(userThunk.updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userThunk.updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;

        // Update User
        const index = state.listUser.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.listUser[index] = action.payload;
        }
      })
      .addCase(userThunk.updateUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });

    // updateUserInfo
    builder
      .addCase(userThunk.updateUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userThunk.updateUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        const index = state.listUser.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.listUser[index] = action.payload;
        }
      })
      .addCase(userThunk.updateUserInfo.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });

    // deleteUser
    builder
      .addCase(userThunk.deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userThunk.deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.listUser = state.listUser.filter(
          (user) => user.id !== action.payload
        );
        if (state.selectedUser === action.payload) {
          state.selectedUser = null;
        }
      })
      .addCase(userThunk.deleteUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const {
  clearSelectedUserId,
  selectedUserId,
  setUserLoggedIn,
  clearUserLoggedIn,
  setLoginError,
} = userSlice.actions;
export default userSlice.reducer;
