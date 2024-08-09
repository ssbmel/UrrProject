import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../supabase/server";

export const POST = async (request: NextRequest) => {
  const supabase = createClient();
  const req = await request.json();

  const { error } = await supabase.from("order").insert({
    userId: req.userId,
    price: req.price,
    name: req.name,
    address: req.address,
    phoneNumber: req.phoneNumber,
    paymentId: req.paymentId,
    product_list: req.productList,
    request: req.request
  });

  if (error) {
    console.error(error);
    return NextResponse.json({ status: "500", message: error.message });
  }
  return NextResponse.json({ status: "200" });
};
