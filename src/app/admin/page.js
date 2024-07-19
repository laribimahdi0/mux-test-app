import Mux from "@mux/mux-node";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
const MuxUploader = dynamic(() => import("@/components/MuxUploader"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const { video } = new Mux(
  process.env.MUX_TOKEN_ID,
  process.env.MUX_TOKEN_SECRET
);

async function Page() {
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

  return (
    <div className="h-screen ">
      <h3 className="text-2xl">Téléverser une video</h3>

      <div className="flex space-x-4 max-w-2xl m-auto mt-6">
        <div>
          <p className="text-xl text-center ">Upload public video</p>
          <MuxUploader
            endpoint={directUpload.url}
            onSuccess={async () => {
              "use server";
              const upload = await video.uploads.retrieve(directUpload.id);
              const assetId = upload.asset_id;
              redirect(`/asset/${assetId}`);
            }}
          />
        </div>

        <div className="w-1 bg-red-500"></div>

        <div>
          <p className="text-xl text-center">Upload Private Video</p>
          <MuxUploader
            endpoint={privateUpload.url}
            onSuccess={async (e) => {
              "use server";
              const upload = await video.uploads.retrieve(privateUpload.id);
              const assetId = upload.asset_id;
              redirect(`/asset/${assetId}?private=true`);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
