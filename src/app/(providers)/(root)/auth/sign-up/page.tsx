"use client";

import { supabase } from "@/supabase/client";
import { useRouter } from "next/navigation";
import { ComponentProps, useRef } from "react";

function SignUpPage() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  const handleSubmitSignUp: ComponentProps<"form">["onSubmit"] = async (e) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const passwordConfirm = passwordConfirmRef.current?.value;
    if (!email) return alert("이메일을 입력해주세요");
    if (!password) return alert("비밀번호를 입력해주세요");
    if (password !== passwordConfirm)
      return alert("비밀번호가 일치하지 않습니다");

    const response = await supabase.auth.signUp({ email, password });
    if (response.error) return alert("회원가입 실패");
    alert("회원가입 성공");
    router.replace("/");
  };
  return (
    <main className="mx-[500px]">
      <h1 className="font-black text-3xl mb-16">회원으로 가입하기</h1>

      <form
        onSubmit={handleSubmitSignUp}
        className="items-center gap-y-10 font-bold grid grid-cols-4 w-[600px]"
      >
        <label htmlFor="email">이메일</label>
        <input
          ref={emailRef}
          id="email"
          type="email"
          className="h-12 col-span-3 border-2 border-black/25 rounded-md"
        />
        <label htmlFor="password">비밀번호</label>
        <input
          ref={passwordRef}
          id="password"
          type="password"
          className="h-12 col-span-3 border-2 border-black/25 rounded-md"
        />
        <label htmlFor="password_confirm">비밀번호확인</label>
        <input
          ref={passwordConfirmRef}
          id="password_confirm"
          type="password"
          className="h-12 col-span-3 border-2 border-black/25 rounded-md"
        />

        <button
          type="submit"
          className="font-bold col-span-4 h-10 rounded-md bg-blue-400 text-white"
        >
          가입하기
        </button>
      </form>
    </main>
  );
}

export default SignUpPage;
