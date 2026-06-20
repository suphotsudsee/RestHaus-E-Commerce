import { NextResponse } from "next/server";
import { findOrder } from "@/lib/orders";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ orderNo: string }> },
) {
  const { orderNo } = await params;
  const order = findOrder(orderNo);

  if (!order) {
    return NextResponse.json({ message: "Order not found." }, { status: 404 });
  }

  return NextResponse.json({ order });
}
