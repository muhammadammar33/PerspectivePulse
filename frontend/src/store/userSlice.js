import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    _id: '',
    email: '',
    name: '',
    auth: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state._id = action.payload._id;
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.auth = action.payload.auth;
        },
        resetUser: (state, action) => {
            state._id = '';
            state.email = '';
            state.name = '';
            state.auth = false;
        }
    }
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;