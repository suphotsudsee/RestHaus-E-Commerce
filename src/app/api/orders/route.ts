import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { createOrder } from "@/lib/orders";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const order = createOrder(payload);
    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: "Invalid checkout data.", issues: error.issues },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unable to create order." },
      { status: 400 },
    );
  }
}
