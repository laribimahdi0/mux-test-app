import MuxPlayer from "@mux/mux-player-react";
import Link from "next/link";
import React from "react";

const InfoPlayer = ({ title, description, isPrivate }) => (
  <div className="py-6 px-2">
    {isPrivate && (
      <div className="bg-red-500  w-32 text-center rounded-xl mb-6 text-white">
        video Privé
      </div>
    )}
    <p className="text-xl"> {title}</p>
    <p className="text-sm text-gray-600"> {description}</p>
  </div>
);

function CustomPlayer({ playbackId, isPrivate, href, title, description }) {
  return !isPrivate ? (
    <div className="bg-white aspect-video mb-8 -mx-4 flex shadow-xl flex-col rounded-md p-2">
      <MuxPlayer
        className="w-full"
        playbackId={playbackId}
        accentColor="rgb(220 38 38)"
        streamType="on-demand"
      />
      <InfoPlayer title={title} description={description} isPrivate={isPrivate} />
    </div>
  ) : (
    <Link href={href}>
      <div className="bg-white aspect-video mb-8 -mx-4 flex shadow-xl flex-col rounded-md p-2">
        <MuxPlayer
          className="w-full"
          playbackId={playbackId}
          accentColor="rgb(220 38 38)"
          streamType="on-demand"
        />
       <InfoPlayer title={title} description={description} isPrivate={isPrivate} />

      </div>
    </Link>
  );
}

export default CustomPlayer;
