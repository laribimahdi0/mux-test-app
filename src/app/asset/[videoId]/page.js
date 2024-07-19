import React from "react";
import MuxPlayer from "@mux/mux-player-react";
import Mux from "@mux/mux-node";
import VideoDetailForm from "@/components/VideoDetailForm";

async function video({ params: { videoId } , searchParams } ) {

    const { video } = new Mux(
    process.env.MUX_TOKEN_ID,
    process.env.MUX_TOKEN_SECRET
  );
  const upload = await video.uploads.retrieve(videoId);
  const assetId = upload.asset_id;

  const asset = await video.assets.retrieve(assetId);

  const playbackIds = asset.playback_ids;
  const playbackId = playbackIds.find((id) =>  id.policy === "public" || id.policy === "signed");


  return (
    <div className="h-screen p-6">
      <h3 className="text-2xl mb-6">Video Detail</h3>
      <div className="w-96">
        <div className="bg-black aspect-video mb-8 -mx-4 flex shadow-xl">
          <MuxPlayer
            className="w-full"
            playbackId={playbackId?.id}
            accentColor="rgb(220 38 38)"
            streamType="on-demand"
          />
        </div>

        <VideoDetailForm privateVideo={searchParams.private} playbackId={playbackId?.id} />

      </div>
    </div>
  );
}

export default video;
