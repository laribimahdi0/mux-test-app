"use client";

import Button from "@/components/Button";
import CustomPlayer from "@/components/CustomPlayer";
import { getAllMedia } from "@/lib/indexDB";
import useAuth from "@/lib/useAuth";
import Link from "next/link";
import { useState, useEffect } from "react";
import getStripe from "./utils/get-stripe";
import { useRouter } from "next/navigation";



export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter()

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

  const handlePayment = async () => {
    try {


      const response = await fetch("api/purchase/", {
        method: "post",
       // body: JSON.stringify({ itineraryId: itinerary.id }),
      });
      
      const json = await response.json();
      if (!json.ok) {
        throw new Error("Something went wrong");
      }

      const stripe = await getStripe();
      if (!stripe) {
        throw new Error("Something went wrong");
      }

      await stripe.redirectToCheckout({ sessionId: json.result.id });
    } catch (error) {
      console.log(error)
    }
  };

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

      <Button onClick={handlePayment}>Purchase</Button>

      <div>
        <h3 className="text-2xl">List des Media</h3>

        <div className="flex flex-col mt-12">
          {isLoading ? (
            <p>Loading video</p>
          ) : medias?.length > 0 ? (
            medias?.map((el) => (
              <CustomPlayer
                isPrivate={el?.private}
                playbackId={el?.playbackId}
                href={`/video/${el.playbackId}`}
              />
            ))
          ) : (
            "il n'ya pas des videos "
          )}
        </div>
      </div>
    </main>
  );
}
