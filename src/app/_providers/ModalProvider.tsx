"use client";
import { useModalStore } from "@/zustand/modal.store";
import { PropsWithChildren } from "react";
import Backdrop from "../_components/Backdrop";

function ModalProvider({ children }: PropsWithChildren) {
  const modal = useModalStore((state) => state.modal);
  return (
    <>
      {modal && <Backdrop>{modal}</Backdrop>}
      {children}
    </>
  );
}

export default ModalProvider;
