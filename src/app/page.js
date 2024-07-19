"use client";

import Button from "@/components/Button";
import CustomPlayer from "@/components/CustomPlayer";
import { getAllMedia } from "@/lib/indexDB";
import useAuth from "@/lib/useAuth";
import Link from "next/link";
import { useState, useEffect } from "react";
import getStripe from "./utils/get-stripe";
import { useRouter } from "next/navigation";
import { UserIcon, CreditCardIcon } from "@heroicons/react/16/solid";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

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
      console.log(error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <div className=" flex space-x-4">
        {isAuthenticated ? (
          <div className=" flex space-x-6">
            <Button type={"secondary"} onClick={handelLogout}>
              Se déconnecter
            </Button>

            <Link href="/admin">
              <Button className=" bg-green-500" type="primary">
                <span className="flex items-center space-x-3  ">
                  <span>Espace Admin</span> <UserIcon className="size-6" />
                </span>
              </Button>
            </Link>
          </div>
        ) : (
          <div className=" text-2xl space-x-6">
            <Link href={"/register"}> crée un compte </Link>
            <Link href={"/login"}> Login </Link>
          </div>
        )}
      </div>

      <div
        className=" w-full max-w-lg  py-6 bg-green-500 px-6 text-center  rounded-lg text-white my-6 flex justify-center space-x-3 cursor-pointer shadow-lg "
        onClick={handlePayment}
      >
       <span> Purchase</span>
        <span>
          <CreditCardIcon className="size-6" />
        </span>
      </div>

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
                title={el?.title}
                description={el?.description}
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
