import { create } from "zustand";

type useModalState = {
  modal: React.JSX.Element | null;
  setModal: (modal: React.JSX.Element | null) => void;
};

export const useModalStore = create<useModalState>((set) => ({
  modal: null,
  setModal: (modal) => set({ modal }),
}));
