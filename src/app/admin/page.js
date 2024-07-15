import Mux from "@mux/mux-node";
import dynamic from "next/dynamic";

const MuxUploader = dynamic(() => import("@/component/MuxUploader"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const { video } = new Mux(
  process.env.MUX_TOKEN_ID,
  process.env.MUX_TOKEN_SECRET
);

const redirectToAsset = async (uploadId) => {
  console.log("redirectToAsset");
  let attempts = 0;
  while (attempts <= 10) {
    const upload = await video.uploads.retrieve(uploadId);
    if (upload.asset_id) {
      console.log(`/asset/${upload.asset_id}`);
    } else {
      // while onSuccess is a strong indicator that Mux has received the file
      // and created the asset, this isn't a guarantee.
      // In production, you might listen for the video.upload.asset_created webhook
      // https://docs.mux.com/guides/listen-for-webhooks
      // To keep things simple here,
      // we'll just poll the API at an interval for a few seconds.
      await waitForThreeSeconds();
      attempts++;
    }
  }
  throw new alert("No asset_id found for upload");
};

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
        <div className>
          <p className="text-xl text-center ">Upload public video</p>
          <MuxUploader
            endpoint={directUpload.url}
            onSuccess={async () => {
              "use server";
              console.log("success");
            }}
          />
        </div>

        <div className="w-1 bg-red-500" ></div>

        <div>
          <p className="text-xl text-center">Upload Private Video</p>
          <MuxUploader
            endpoint={privateUpload.url}
            onSuccess={async () => {
              "use server";
              console.log("sccuess");
            }}
          />
        </div>
      </div>

      <div>
        <h2> Liste des videos : </h2>
      </div>
    </div>
  );
}

export default Page;
