"use client";

import { useModalStore } from "@/zustand/modal.store";
import { ComponentProps, PropsWithChildren, useRef } from "react";

function Backdrop({ children }: PropsWithChildren) {
  const setModal = useModalStore((state) => state.setModal);

  const BackdropRef = useRef<HTMLDivElement | null>(null);

  const handleClickBackdrop: ComponentProps<"div">["onClick"] = (e) => {
    const Backdrop = BackdropRef.current;
    if (Backdrop === e.target) setModal(null);
  };

  return (
    <div
      onClick={handleClickBackdrop}
      ref={BackdropRef}
      className="z-20 flex justify-center items-center fixed w-screen h-screen bg-black/75"
    >
      <div className="rounded-md flex flex-col items-center bg-white w-[500px] h-[350px]">
        {children}
      </div>
    </div>
  );
}

export default Backdrop;
