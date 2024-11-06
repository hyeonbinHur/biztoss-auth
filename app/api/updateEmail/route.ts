import { authOptions } from "@/lib/authOptions";
import { createConnection } from "@/lib/mysqlClient";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { ResultSetHeader } from "mysql2"; // ResultSetHeader를 임포트합니다.

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ success: "Not authorized" }, { status: 400 });
    }
    const db = await createConnection();
    const { email, newEmail } = await request.json();
    const sql = "UPDATE user SET email = ? WHERE email = ?";
    const [result] = await db.query<ResultSetHeader>(sql, [newEmail, email]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "No user found with the specified email" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Email updated successfully", result },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" });
    }
  }
}
