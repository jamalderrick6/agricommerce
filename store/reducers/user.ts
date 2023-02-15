import { remove } from 'lodash';

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ProductType = {
  id: string;
  name: string;
  thumb: string;
  price: string;
  count: number;
  color: string;
  size: string;
}

type UserType = {
  name: String;
  token: String;
  email:String;
  phone: String;
}

type ToggleFavType = {
  id: string;
}

interface UserSliceTypes {
  user: any;
  favProducts: any;
}

const initialState = {
  user: {
    name: '',
    token: '',
    email: '',
    phone: '',
  },
  favProducts: [],
} as UserSliceTypes

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleFavProduct(state, action: PayloadAction<ToggleFavType>) {
      const index = state.favProducts.includes(action.payload.id);

      if(!index) {
        state.favProducts.push(action.payload.id);

        return;
      }

      remove(state.favProducts, id => id === action.payload.id);
    },
    setUserLogged(state, action: PayloadAction<UserType>) {
      state.user['name'] = action.payload.name;
      state.user['token'] = action.payload.token;
      state.user['email'] = action.payload.email;
      state.user['phone'] = action.payload.phone;

      return;
    },
  },
})

export const { toggleFavProduct, setUserLogged } = userSlice.actions
export default userSlice.reducer