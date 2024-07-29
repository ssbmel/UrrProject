// app/api/confirm/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Buffer } from "buffer";
import got from "got";

export async function POST(req: NextRequest) {
  try {
    const { paymentKey, orderId, amount } = await req.json();

    const widgetSecretKey = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";
    const encryptedSecretKey = "Basic " + Buffer.from(widgetSecretKey + ":").toString("base64");

    const response = await got.post("https://api.tosspayments.com/v1/payments/confirm", {
      headers: {
        Authorization: encryptedSecretKey,
        "Content-Type": "application/json"
      },
      json: {
        orderId: orderId,
        amount: amount,
        paymentKey: paymentKey
      },
      responseType: "json"
    });

    return NextResponse.json(response.body, { status: response.statusCode });
  } catch (error: any) {
    return NextResponse.json(error.response.body, { status: error.response.statusCode });
  }
}
