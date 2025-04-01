// src/store/useMenuStore.js
import { create } from 'zustand';

const useMenuStore = create((set) => ({
  selectedMenu: '전자결재',
  setSelectedMenu: (menu) => set({ selectedMenu: menu }),
}));

export default useMenuStore;
