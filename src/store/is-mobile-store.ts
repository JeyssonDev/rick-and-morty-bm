import { create } from 'zustand';

type IsMobileState = {
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
};

export const useIsMobileStore = create<IsMobileState>((set) => ({
  isMobile: false,
  setIsMobile: (isMobile) => set({ isMobile }),
}));
