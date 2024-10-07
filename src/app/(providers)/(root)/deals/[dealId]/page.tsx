import { supabase } from "@/supabase/client";
import dayjs from "dayjs";
import { Database } from "../../../../../../database.types";

const baseURL =
  "https://cbaprfoxvsjsruqbwxbz.supabase.co/storage/v1/object/public/";

interface DealDetailPageProps {
  params: {
    dealId: string;
  };
}

async function DealDetailPage({ params }: DealDetailPageProps) {
  const { data } = await supabase
    .from("deals")
    .select("*")
    .eq("id", params.dealId);
  const deal = (await data![0]) as Database["public"]["Tables"]["deals"]["Row"];

  const yearDiff = dayjs().diff(dayjs(deal.createdAt), "year");
  const monthDiff = dayjs().diff(dayjs(deal.createdAt), "month");
  const dayDiff = dayjs().diff(dayjs(deal.createdAt), "day");
  const hourDiff = dayjs().diff(dayjs(deal.createdAt), "hour");
  ``;

  if (yearDiff) {
    deal.createdAt = `${yearDiff}년`;
  } else if (monthDiff) {
    deal.createdAt = `${monthDiff}개월`;
  } else if (dayDiff) {
    deal.createdAt = `${dayDiff}일`;
  } else if (hourDiff) {
    deal.createdAt = `${hourDiff}시간`;
  }

  return (
    <main className="flex flex-col justify-center items-center">
      <img
        className="w-[40%] object-cover h-[600px]"
        src={baseURL + deal.imageURL}
      />
      <p className="w-[650px] py-3 text-center border-b border-black/50">
        {deal.location}
      </p>
      <h1>{deal.title}</h1>
      <p>{deal.content}</p>
      <p className="text-sm text-gray-400">{`${deal.createdAt} 전`}</p>
      <p>{Number(deal.price).toLocaleString() + "원"}</p>
    </main>
  );
}

export default DealDetailPage;
