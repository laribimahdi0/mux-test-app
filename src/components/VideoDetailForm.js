"use client";
import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { addMedia } from "@/lib/indexDB";
import withAuth from "@/lib/withAuth";
import { useRouter } from 'next/navigation'

function VideoDetailForm({playbackId , privateVideo}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const  router =  useRouter()

  const handleSubmit = async() => {
    const media = { title, description  , playbackId , "private": privateVideo=="true" ?true: false};
   await addMedia(media);
   router.push("/")
  };

  return (
    <div className="flex flex-col space-y-6 w-full">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titre"
        required
      />
      <Input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2"
        type="textarea"
        placeholder="Description"
      />
      <Button onClick={handleSubmit} type={"primary"}>
        Enregister
      </Button>
    </div>
  );
}

export default withAuth(VideoDetailForm);
