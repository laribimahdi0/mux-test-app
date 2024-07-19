"use client";
//import Mux from "@mux/mux-node";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { LockClosedIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import withAuth from "@/lib/withAuth";

const MuxUploader = dynamic(() => import("@/components/MuxUploader"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});


// const { video } = new Mux(
//   process.env.MUX_TOKEN_ID,
//   process.env.MUX_TOKEN_SECRET
// );

function Page() {
  const [directUpload, setDirectUpload] = useState(false);
  const [privateUpload, setPrivateUpload] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()


  // const privateUpload = await video.uploads.create({
  //   cors_origin: "*",
  //   new_asset_settings: {
  //     playback_policy: "signed",
  //     encoding_tier: "baseline",
  //   },
  // });
  useEffect(() => {
    getUplaodDirector();
  }, []);

  const getUplaodDirector = async () => {
    try {
      const res = await fetch("/api/admin-uploader");
      const json = await res.json();
      console.log(json)

      if (json.ok) {
        setPrivateUpload(json.result.privateUpload);
        setDirectUpload(json.result.directUpload);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err)
      setIsLoading(false);
      alert("something went worng");
    }
  };


  return (
    <div className="h-screen px-12 py-6">
      <h3 className="text-2xl text-gray-500">Téléverser une video</h3>

      <div className=" grid   grid-cols-1  md:grid-cols-2 md:gap-4 mt-6 ">
        {isLoading === false? (
          <>
            <div>
              <p className="text-xl mb-6 ">Upload public video</p>
              <MuxUploader
                endpoint={directUpload.url}
                onSuccess={async () => {
    
                  router.push(`/asset/${directUpload.id}`);
                }}
              />
            </div>
            <div className="mt-6 lg:mt-0">
              <p className="text-xl mb-6 flex  w-full">
                Upload Private Video
                <span>
                  <LockClosedIcon className="size-6" />
                </span>
              </p>
              <MuxUploader
                endpoint={privateUpload.url}
                onSuccess={async (e) => {
                  // const upload = await video.uploads.retrieve(privateUpload.id);
                  // const assetId = upload.asset_id;
                  router.push(`/asset/${privateUpload.id}?private=true`);
                }}
              />
            </div>
          </>
        ) : (
          "Loading ..."
        )}
      </div>
    </div>
  );
}

export default withAuth( Page);
