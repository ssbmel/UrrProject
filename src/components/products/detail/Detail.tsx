import { notFound } from "next/navigation";
import { createClient } from "../../../../supabase/client";

interface detailProps {
  params: { id: string };
}
export default async function Detail({ params }: detailProps) {
  const { data, error } = await createClient().from("products").select("*").eq("id", params.id).limit(1).single();
  if (!data || error) {
    notFound();
  }
  return (
    <>
      <div>
        <div>상품 이미지</div>
        <p>{data.title}</p>
        <p>가격</p>
      </div>
    </>
  );
}
