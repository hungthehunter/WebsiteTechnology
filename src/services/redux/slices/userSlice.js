import { createSlice } from "@reduxjs/toolkit";
import { userThunk } from "../thunks/thunk";

const initialState = {
    listUser: [],
    userCurrentLogged:null,
    selectedUser: null,
    isLoading: false,
    isError: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearSelectedUserId: (state) => {
            state.selectedUser = null;
        },
        selectedUserId: (state,action) => {
           state.selectedUser = action.payload;
        },
        setUserLoggedIn: (state,action) => {
            state.userCurrentLogged = action.payload;
        },
        clearUserLoggedIn: (state) => {
            state.userCurrentLogged = null;
        }
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
                    console.error('Invalid payload received in getUserById.fulfilled');
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

        // updateUser
        builder
            .addCase(userThunk.updateUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(userThunk.updateUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                const index = state.listUser.findIndex(user => user.id === action.payload.id);
                if (index !== -1) {
                    state.listUser[index] = action.payload;
                }
            })
            .addCase(userThunk.updateUser.rejected, (state) => {
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
                state.listUser = state.listUser.filter(user => user.id !== action.payload);
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

export const { clearSelectedUserId , selectedUserId , setUserLoggedIn , clearUserLoggedIn } = userSlice.actions;
export default userSlice.reducer;