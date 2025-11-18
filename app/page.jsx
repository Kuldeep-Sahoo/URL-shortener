"use client"
import React, { useState } from "react";
import { api } from "../convex/_generated/api";
import { useMutation } from "convex/react";
import { nanoid } from "nanoid";
const Page = () => {
  const mut = useMutation(api.urls.createUrl)

  const [loading, setLoading] = useState("")
  const [url, setUrl] = useState("")
  const [newURL, setNewURL] = useState("");

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (e) {
      console.log({ e });
      return false;
    }
  }
  const submitURL = async () => {
    setLoading(true)
    if (url) {
      if (!isValidUrl(url)) {
        alert("input a url")
        setLoading(false)
        return;
      }
      const shortId = nanoid(8); // 🔥 Beautiful short id like: bD3XxP12
      const shortUrl = `${baseUrl}/${shortId.toString()}`;
      await mut({ originalUrl: url, url: shortUrl })
      setNewURL(shortUrl);
    }
    setLoading(false)
  }
  return (
    <div className="flex justify-center items-center mt-[40vh]">
      <div className="flex flex-col justify-center items-center">

        <div>
          <input
            type="text"
            placeholder="Enter URL"
            className="bg-blue-500 m-3 p-2 rounded-2xl text-black"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          ></input>
          <button
            className={`bg-red-400 p-2 m-3 rounded-xl `}
            disabled={loading}
            onClick={submitURL}
          >Generate</button>
        </div>
        <div className=" mx-4 mt-4">  {newURL}
        </div>
      </div>
    </div>
  );
};

export default Page;
