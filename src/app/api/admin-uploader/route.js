import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

const { video } = new Mux(
  process.env.MUX_TOKEN_ID,
  process.env.MUX_TOKEN_SECRET
);

export async function GET() {
  try {
    const directUpload = await video.uploads.create({
      cors_origin: "*",
      new_asset_settings: {
        playback_policy: "public",
        encoding_tier: "baseline",
      },
    });

    const privateUpload = await video.uploads.create({
      cors_origin: "*",
      new_asset_settings: {
        playback_policy: "signed",
        encoding_tier: "baseline",
      },
    });

    return NextResponse.json({
      result: { directUpload: directUpload, privateUpload: privateUpload },
      ok: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "something went wrong", ok: false },
      { status: 500 }
    );
  }
}
