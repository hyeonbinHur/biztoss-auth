import { NextResponse } from "next/server";
import { createConnection } from "@/lib/mysqlClient";

export async function POST(request: Request) {
  try {
    const db = await createConnection();
    const { username, email, password } = await request.json();
    const bcrypt = require("bcrypt");
    const hasedPassword = await bcrypt.hash(password, 10);
    const val = [username, email, hasedPassword];
    console.log(hasedPassword);
    const sql = "INSERT INTO user (username, email, password) VALUES (?, ?, ?)";
    const [result] = await db.query(sql, val);

    //테스트용도 실제로는 보안위협으로 response에 유저 정보를 보내면 x
    return NextResponse.json(
      { message: "User successfully signed up", result },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Invalid request data" },
      { status: 400 }
    );
  }
}
