import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../supabase/client";

export const POST = async (request: NextRequest) => {
  const supabase = createClient();
  const req = await request.json();

  const { error } = await supabase.from("order").insert({
    userId: req.userId,
    price: req.price,
    orderName: req.orderName,
    orderCount: req.orderCount,
    name: req.name,
    address: req.address,
    phoneNumber: req.phoneNumber,
    paymentId: req.paymentId
  });

  if (error) {
    console.error(error);
    return NextResponse.json({ status: "500", message: error.message });
  }
  return NextResponse.json({ status: "200" });
};
