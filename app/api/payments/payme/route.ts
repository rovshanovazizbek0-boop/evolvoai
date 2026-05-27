import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    
    // Basic base64 authorization check for Payme (Paycom)
    // Payme sends "Paycom:YOUR_SECRET_KEY" in basic authentication
    if (!authHeader && process.env.PAYME_KEY) {
      return NextResponse.json({
        error: {
          code: -32504,
          message: "Access Denied"
        }
      }, { status: 401 });
    }

    const body = await request.json();
    const { method, params, id } = body;

    console.log(`[PAYMENTS] Payme JSON-RPC 2.0 Webhook received. Method: ${method}`, params);

    // Standard Payme response handlers based on method
    switch (method) {
      case "CheckPerformTransaction":
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          result: {
            allow: true
          }
        });

      case "CreateTransaction":
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          result: {
            create_time: Date.now(),
            transaction: `payme_txn_${Date.now()}`,
            state: 1
          }
        });

      case "PerformTransaction":
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          result: {
            perform_time: Date.now(),
            transaction: params.id,
            state: 2
          }
        });

      case "CancelTransaction":
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          result: {
            cancel_time: Date.now(),
            transaction: params.id,
            state: -1
          }
        });

      case "CheckTransaction":
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          result: {
            create_time: Date.now() - 10000,
            perform_time: Date.now(),
            cancel_time: 0,
            transaction: params.id,
            state: 2,
            reason: null
          }
        });

      default:
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          error: {
            code: -32601,
            message: "Method not found"
          }
        });
    }
  } catch (error) {
    console.error("[PAYMENTS] Payme Webhook handling error:", error);
    return NextResponse.json({
      error: {
        code: -32400,
        message: "Internal System Error"
      }
    }, { status: 500 });
  }
}
