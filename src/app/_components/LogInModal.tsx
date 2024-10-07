"use client";

import { supabase } from "@/supabase/client";
import { useModalStore } from "@/zustand/modal.store";
import { useRouter } from "next/navigation";
import { ComponentProps, useRef } from "react";

function LogInModal() {
  const router = useRouter();

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const setModal = useModalStore((state) => state.setModal);

  const handleSubmitLogIn: ComponentProps<"form">["onSubmit"] = async (e) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email) return alert("이메일을 입력해주세요");
    if (!password) return alert("비밀번호를 입력해주세요");

    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (response.error) return alert("로그인 실패");
    alert("로그인 성공!");
    setModal(null);
    router.replace("/");
  };
  return (
    <div className="w-[100%] h-[100%] flex flex-col items-center">
      <strong className="font-black my-10 text-2xl">로그인하기</strong>
      <form
        onSubmit={handleSubmitLogIn}
        className="grid grid-cols-5 gap-x-5 gap-y-4 items-center"
      >
        <label htmlFor="email">이메일</label>
        <input
          ref={emailRef}
          id="email"
          type="email"
          className="h-12 border-2 col-span-4 border-black/25 rounded-md"
        />
        <label htmlFor="password">비밀번호</label>
        <input
          ref={passwordRef}
          id="password"
          type="password"
          className="h-12 border-2 col-span-4 border-black/25 rounded-md"
        />
        <button
          type="submit"
          className="mt-5 font-bold col-span-5 h-10 rounded-md bg-blue-400 text-white"
        >
          로그인하기
        </button>
      </form>
    </div>
  );
}

export default LogInModal;
