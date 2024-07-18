import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request, response) {
  const data = await request.json();

  console.log(data);

  try {
    const decodedSecret = Buffer.from(
      process.env.MUX_SIGNIN_SECRET,
      "base64"
    ).toString("ascii");
    const token = jwt.sign(
      {
        sub: data.palybackId,
        aud: "v",
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        kid: process.env.MUX_SIGNIN_KEY,
      },
      decodedSecret,
      {
        algorithm: "RS256",
      }
    );

    return NextResponse.json({ token });
  } catch (err) {
    return NextResponse.error({ message: "Internal server error" });
  }
}
