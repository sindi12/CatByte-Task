import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import * as usersApi from '../../api/users';
import {HomeState} from '../../types';
import {RootState} from '../store';

export const fetchUsers = createAsyncThunk(
  'users/get',
  async (_, thunkApi) => {
    try {
      const response = await usersApi.fetchUsers();
      const data = await response.json();

      if (response.ok) {
        return data.users.map((user: any) => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          age: user.age,
          image: user.image,
          company: user.company.address,
        }));
      }

      return thunkApi.rejectWithValue(data);
    } catch (err: any) {
      return thunkApi.rejectWithValue({name: err.name, message: err.message});
    }
  },
  {
    condition: (_, {getState}: {getState: any}) => {
      const {loading} = getState().home;

      if (loading === 'pending') {
        return false;
      }
    },
  },
);

export const initialState: HomeState = {
  loading: false,
  error: null,
  users: [],
  lastId: 0,
};

const slice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    clear() {
      return initialState;
    },
    removeUser(state, action) {
      let index = state.users.findIndex(({id}) => id === action.payload);
      const newUsers = state.users;
      newUsers.splice(index, 1);

      state.users = newUsers;
    },
    createUser(state, action) {
      state.lastId = state.lastId + 1;
      const newUsers = state.users;
      newUsers.unshift({...action.payload, id: state.lastId});
      state.users = newUsers;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.fulfilled, (state: HomeState, action) => {
        if (state.loading) {
          const users = action.payload;

          state.users = users;
          state.lastId = users[users.length - 1].id;
          state.loading = false;
        }
      })
      .addCase(fetchUsers.pending, state => {
        if (!state.loading) {
          state.loading = true;
        }
      })
      .addCase(fetchUsers.rejected, (state, action: PayloadAction<any>) => {
        if (state.loading) {
          state.loading = false;
          state.error = action.payload.message;
        }
      });
  },
});

export const selectLoading = (state: RootState) => state.home.loading;
export const selectHome = (state: RootState) => state.home;
export const selectUsers = (state: RootState) => state.home.users;

export const {actions, reducer} = slice;
