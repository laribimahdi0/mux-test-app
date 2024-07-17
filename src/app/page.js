"use client";

import { getAllMedia, getMedia } from "@/lib/indexDB";
import useAuth from "@/lib/useAuth";
import MuxPlayer from "@mux/mux-player-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const { isAuthenticated } = useAuth();

  const [medias, setMedia] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handelLogout = () => {
    localStorage.removeItem("user");
  };

  useEffect(() => {
    setIsLoading(true);
    getAllMedia().then((res) => {
      setMedia(res);
      setIsLoading(false);
    });
  }, []);

  console.log(medias);

  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <div className=" flex space-x-4">
        {isAuthenticated ? (
          <div>
            <button onClick={handelLogout}>Se déconnecter</button>

            <Link href="admin"> Espace Admin </Link>
          </div>
        ) : (
          <div className=" text-2xl space-x-6">
            <Link href={"/register"}> crée un compte </Link>
            <Link href={"/login"}> Login </Link>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-2xl">List des Media</h3>

        <div className="flex flex-col mt-12">
          {isLoading ? (
            <p>Loading video</p>
          ) : (
            medias?.length> 0 ?
            medias?.map((el) => (
              <div
                key={el.id}
                className="bg-black aspect-video mb-8 -mx-4 flex shadow-xl"
              >
                <MuxPlayer
                  className="w-full"
                  playbackId={el.playbackId}
                  accentColor="rgb(220 38 38)"
                  streamType="on-demand"
                />
              </div>
            )):"il n'ya pas des videos "
          )}
        </div>
      </div>
    </main>
  );
}
