"use client";

import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import MuxPlayer from "@mux/mux-player-react/lazy";
import Link from "next/link";
import withAuth from "@/lib/withAuth";

function page({ params: { palybackId } }) {

  const [token, setToken] = useState();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetch("http://localhost:3000/api/token", {
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
  }, []);

  return (
    <div className="h-screen w-full flex  items-center">
      <div>
        <Link href="/">Retour</Link>
      </div>
      <div className=" max-w-2xl m-auto">
        <p className="text-2xl">
          Vous pouvez consulter votre video privé ici ...
        </p>
        <MuxPlayer
          className="mt-6"
          streamType="on-demand"
          playbackId={palybackId}
          tokens={{ playback: token }}
        />
      </div>
    </div>
  );
}

export default withAuth(page);
