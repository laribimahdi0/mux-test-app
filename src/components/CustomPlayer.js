import MuxPlayer from "@mux/mux-player-react";
import Link from "next/link";
import React from "react";

function CustomPlayer({ playbackId, isPrivate, href }) {
  return !isPrivate ? (
    <div className="bg-black aspect-video mb-8 -mx-4 flex shadow-xl">
      <MuxPlayer
        className="w-full"
        playbackId={playbackId}
        accentColor="rgb(220 38 38)"
        streamType="on-demand"
      />
    </div>
  ) : (
    <Link href={href}>
      <div className="bg-black aspect-video mb-8 -mx-4 flex shadow-xl">
        <MuxPlayer
          className="w-full"
          playbackId={playbackId}
          accentColor="rgb(220 38 38)"
          streamType="on-demand"
        />
      </div>
    </Link>
  );
}

export default CustomPlayer;
