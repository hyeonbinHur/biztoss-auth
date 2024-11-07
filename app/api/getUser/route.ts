import { NextResponse } from "next/server";
import { createConnection } from "@/lib/mysqlClient";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const db = await createConnection();
    const sql = "SELECT * FROM user WHERE email = ?";
    const [result]: any = await db.query(sql, [email]);

    // `result`가 배열인지 확인 후 접근
    if (!Array.isArray(result) || result.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(result[0]); // 특정 유저 정보 반환
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
