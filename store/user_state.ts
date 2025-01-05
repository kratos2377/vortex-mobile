import { create } from "zustand";
import { UserModel } from "./models";
import { subscribeWithSelector } from 'zustand/middleware';

type UserState  = {
    user_id: string,
    score: number,
    token: string,
    in_game: boolean,
    user_details: UserModel,
}

type UserAction = {
    updateUserId: (user_id: string) => void
    updateUserScore: (score: number) => void
    updateUserToken: (token: string) => void
    updateUserDetails: (user_mod: UserModel) => void
    updateUserVerifiedStatus: (user_status: boolean) => void
    changeUserUsername: (username: string) => void
    resetUserModelState: () => void
  }


  export const useUserStore = create<UserState & UserAction>()(subscribeWithSelector((set) => ({
    user_id: '',
    in_game: false,
    user_details: {
      username: '',
      email: '',
      first_name: '',
      last_name: '',
      id: '',
      score: 0,
      verified: false
    },
    score: 0,
    token: '',
    updateUserId: (user_id) => set((state) => ({...state , user_id: user_id})),
    updateUserScore: (score) => set((state) => ({...state, score: score})),
    updateUserToken: (token) => set((state) => ({...state, token: token})),
    updateUserDetails: (user_mod) => set((state) => ({...state , user_details: user_mod})),
    updateUserVerifiedStatus: (user_status) => set((state) => ({...state, user_details: { ...state.user_details , verified: user_status}})),
    changeUserUsername: (username) => set((state) => ({...state, user_details: {...state.user_details , username: username}})),
    resetUserModelState: () => set((state) => ({...state, user_details:  {
      username: '',
      email: '',
      first_name: '',
      last_name: '',
      id: '',
      score: 0,
      verified: false
    }}))
})))