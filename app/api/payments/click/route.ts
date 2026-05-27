import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { plan, price } = body;

    if (!plan || !price) {
      return NextResponse.json({ error: "Missing plan or price" }, { status: 400 });
    }

    console.log(`[PAYMENTS] Initializing Click payment for plan: ${plan}, price: ${price}`);

    // Click integration URL building
    const merchantId = process.env.CLICK_MERCHANT_ID || "12345";
    const serviceId = process.env.CLICK_SERVICE_ID || "67890";
    const amount = parseFloat(price.replace(/,/g, ""));
    const transactionId = `txn_${Date.now()}`;

    // Standard Click checkout URL format:
    // https://my.click.uz/services/pay?service_id={service_id}&merchant_id={merchant_id}&amount={amount}&transaction_param={transaction_id}
    const realClickUrl = `https://my.click.uz/services/pay?service_id=${serviceId}&merchant_id=${merchantId}&amount=${amount}&transaction_param=${transactionId}`;

    // Sandbox redirect (simulated success flow)
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const sandboxSuccessUrl = `${appUrl}/premium?payment=success&plan=${encodeURIComponent(plan)}&price=${encodeURIComponent(price)}&txn=${transactionId}`;

    // Return the redirection URL (using sandbox success for preview testing)
    const isSandbox = !process.env.CLICK_MERCHANT_ID;
    const redirectUrl = isSandbox ? sandboxSuccessUrl : realClickUrl;

    return NextResponse.json({
      success: true,
      url: redirectUrl,
      isSandbox,
      transactionId,
    });
  } catch (error) {
    console.error("[PAYMENTS] Click initialization error:", error);
    return NextResponse.json({ error: "Failed to initialize payment" }, { status: 500 });
  }
}

// Click Merchant Webhook callback handler
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const clickTransId = searchParams.get("click_trans_id");
  const serviceId = searchParams.get("service_id");
  const clickPaydocId = searchParams.get("click_paydoc_id");
  const merchantTransId = searchParams.get("merchant_trans_id");
  const amount = searchParams.get("amount");
  const action = searchParams.get("action");
  const error = searchParams.get("error");
  const signTime = searchParams.get("sign_time");
  const signString = searchParams.get("sign_string");

  console.log("[PAYMENTS] Click Webhook received:", {
    clickTransId,
    merchantTransId,
    amount,
    action,
    error,
  });

  // Standard response to Click server
  return NextResponse.json({
    error: 0,
    error_note: "Success",
    click_trans_id: clickTransId,
    merchant_trans_id: merchantTransId,
    merchant_prepare_id: Date.now(),
  });
}
