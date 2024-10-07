"use client";

import LogInModal from "@/app/_components/LogInModal";
import { supabase } from "@/supabase/client";
import { useAuthStore } from "@/zustand/auth.store";
import { useModalStore } from "@/zustand/modal.store";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { ComponentProps, useEffect, useRef, useState } from "react";

function DealCreatePage() {
  const [file, setFile] = useState<File | null>(null);

  const router = useRouter();
  const setModal = useModalStore((state) => state.setModal);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const titleRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const locationRef = useRef<HTMLInputElement | null>(null);
  const priceRef = useRef<HTMLInputElement | null>(null);

  const handleSubmitDeal: ComponentProps<"form">["onSubmit"] = async (e) => {
    e.preventDefault();

    const title = titleRef.current?.value;
    const content = contentRef.current?.value;
    const location = locationRef.current?.value;
    const price = priceRef.current?.value;

    if (!title) return alert("제목을 입력해주세요.");
    if (!content) return alert("내용을 입력해주세요.");
    if (!location) return alert("위치를 입력해주세요.");
    if (!price) return alert("가격을 입력해주세요.");
    if (!file) return alert("파일을 업로드해주세요.");

    const response = await supabase.auth.getUser();
    const userId = response.data.user?.id;
    const fileExtension = file.name.split(".").slice(-1)[0];
    const fileName = `${userId}_${dayjs()}.${fileExtension}`;

    const { data } = await supabase.storage
      .from("deals")
      .upload(fileName, file);

    const newDealData = {
      title,
      content,
      location,
      price,
      imageURL: data!.fullPath,
    };

    await supabase.from("deals").insert(newDealData);

    const deal = await supabase
      .from("deals")
      .select("id")
      .eq("imageURL", data!.fullPath)
      .single();
    const dealId = await deal.data!.id;

    await supabase.from("likes").insert({ dealId });
    router.replace("/");
  };

  const handleChangeImage: ComponentProps<"input">["onChange"] = async (e) => {
    const files = e.target.files;
    if (!files) return;
    if (!files.length) setFile(null);
    setFile(files[0]);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setModal(<LogInModal />);
      router.replace("/");
    }
  });

  return (
    <main className="mx-[500px]">
      <h1 className="font-bold text-3xl -mt-10 mb-10">판매글 작성하기</h1>

      <form
        onSubmit={handleSubmitDeal}
        className="grid grid-cols-4 items-start gap-x-5 gap-y-5"
      >
        <label htmlFor="title" className="font-bold">
          글 제목
        </label>
        <input
          ref={titleRef}
          id="title"
          type="text"
          className="col-span-3 h-12 border-2 border-black/15 rounded-md"
        />
        <label htmlFor="content" className="font-bold">
          글 내용
        </label>
        <textarea
          ref={contentRef}
          id="content"
          className="resize-none h-72 col-span-3 border-2 border-black/15 rounded-md"
        />
        <label htmlFor="location" className="font-bold">
          직거래 위치
        </label>
        <input
          ref={locationRef}
          id="location"
          type="text"
          className="col-span-3 h-12 border-2 border-black/15 rounded-md"
        />
        <label htmlFor="price" className="font-bold">
          판매 가격
        </label>
        <input
          ref={priceRef}
          id="price"
          type="text"
          className="col-span-3 h-12 border-2 border-black/15 rounded-md"
        />
        <label htmlFor="image" className="font-bold">
          사진
        </label>
        <input onChange={handleChangeImage} id="image" type="file" />

        <button
          type="submit"
          className="font-bold col-span-4 h-10 rounded-md bg-blue-400 text-white"
        >
          판매글 작성하기
        </button>
      </form>
    </main>
  );
}

export default DealCreatePage;
