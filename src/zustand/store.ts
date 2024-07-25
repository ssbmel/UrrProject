// import { create } from 'zustand';
// import { User } from '../../types/common';
// import { persist } from 'zustand/middleware';

// interface userState {
//   userInfo: User | null;
//   setUserInfo: (info: User | null) => void;
//   influencerLink: string;
//   setInfluencerLink: (link: string) => void;
// }

// export const userDataStore = create(
//   persist<userState>(
//     (set) => ({
//       userInfo: null,
//       influencerLink: '',
//       setUserInfo: (info) => set({ userInfo: info }),
//       setInfluencerLink: (link) => set({ influencerLink: link })
//     }),
//     {
//       name: 'userStorage'
//     }
//   )
// );
