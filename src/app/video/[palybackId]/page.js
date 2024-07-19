"use client";

import React, { useState, useEffect } from "react";
import MuxPlayer from "@mux/mux-player-react/lazy";
import Link from "next/link";
import withAuth from "@/lib/withAuth";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";

function Palyback({ params: { palybackId } }) {
  const [token, setToken] = useState();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetch("api/token", {
      method: "post",
      body: JSON.stringify({ palybackId: palybackId }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setIsLoading(false);
        setToken(res.token);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, [palybackId]);

  return (
    <div className="h-screen w-full  items-center">
      <div className=" max-w-2xl ">
        <div>
          <Link href="/">
            <div className="flex text-xl ">
              <span>
                <ArrowLeftIcon className="size-6 text-green-500" />{" "}
              </span>
              <span>Retour </span>
            </div>
          </Link>
        </div>
        <p className="text-2xl mt-6">
          Vous pouvez consulter votre video privé ici ...
        </p>
        {isLoading === true ? (
          "vido is loading"
        ) : (
          <MuxPlayer
            className="mt-6"
            streamType="on-demand"
            playbackId={palybackId}
            tokens={{ playback: token }}
          />
        )}
      </div>
    </div>
  );
}

export default withAuth(Palyback);
