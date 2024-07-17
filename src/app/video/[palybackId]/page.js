import React from "react";
import jwt from "jsonwebtoken";
import MuxPlayer from "@mux/mux-player-react/lazy";

function page({ video }) {
  const decodedSecret = Buffer.from(
    process.env.MUX_SIGNIN_SECRET,
    "base64"
  ).toString("ascii");
  const token = jwt.sign(
    {
      sub: "qqq",
      aud: "v",
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      kid: process.env.MUX_SIGNIN_KEY,
    },
    decodedSecret,
    {
      algorithm: "RS256",
    }
  );

  return (
    <div className="h-screen">
      <MuxPlayer
        streamType="on-demand"
        playbackId={video}
        tokens={{ playback: token }}
      />
    </div>
  );
}

export default page;
