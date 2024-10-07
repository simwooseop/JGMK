import { supabase } from "@/supabase/client";
import Link from "next/link";
const baseURL =
  "https://cbaprfoxvsjsruqbwxbz.supabase.co/storage/v1/object/public/";

async function HomePage() {
  const response = await supabase.from("deals").select("*");
  const deals = response.data;
  return (
    <main className="mx-96">
      <h1 className="font-extrabold text-3xl mb-16">전체 판매글</h1>
      <ul className="grid grid-cols-3 gap-10">
        {deals?.map((deal) => (
          <Link
            href={`deals/${deal.id}`}
            key={deal.id}
            className="flex flex-col gap-y-1"
          >
            <img className="w-[100%] h-[70%]" src={baseURL + deal.imageURL} />
            <h2>{deal.title}</h2>
            <p className="font-bold">
              {Number(deal.price).toLocaleString() + "원"}
            </p>
            <p>{deal.location}</p>
          </Link>
        ))}
      </ul>
    </main>
  );
}

export default HomePage;
