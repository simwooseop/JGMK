"use client";
import { supabase } from "@/supabase/client";
import { useAuthStore } from "@/zustand/auth.store";
import { useModalStore } from "@/zustand/modal.store";
import Link from "next/link";
import LogInModal from "./LogInModal";

function Header() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const authInitialized = useAuthStore((state) => state.authInitialized);
  const setModal = useModalStore((state) => state.setModal);

  const handleClickLogIn = () => {
    setModal(<LogInModal />);
  };

  const handleClickLogOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="border-b-2 border-black/25 mb-20">
      <div className="font-bold mx-96 h-20 flex items-center">
        <div className="text-black/60 flex gap-x-4 items-center">
          <Link href="/" className="text-black text-2xl mr-16">
            중고마켓
          </Link>
          <Link href="/deals/create">판매하기</Link>
          <Link href="/my/deals">내 판매글</Link>
        </div>
        {authInitialized ? (
          isLoggedIn ? (
            <button onClick={handleClickLogOut} className="ml-auto">
              로그아웃
            </button>
          ) : (
            <div className="ml-auto flex gap-x-4">
              <button onClick={handleClickLogIn}>로그인</button>
              <Link href="/auth/sign-up">회원가입</Link>
            </div>
          )
        ) : null}
      </div>
    </header>
  );
}

export default Header;
