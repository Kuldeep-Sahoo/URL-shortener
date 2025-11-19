"use client";
import React, { useState } from "react";
import { api } from "../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { nanoid } from "nanoid";
import TogleTheme from "./_components/TogleTheme";
import { Copy } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page = () => {
  const mut = useMutation(api.urls.createUrl);
  const data = useQuery(api.urls.getAllUrls);

  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [newURL, setNewURL] = useState("");

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
const router=useRouter()
  function isValidUrl(str) {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  }

  const submitURL = async () => {
    setLoading(true);

    if (!url) {
      alert("Please enter a URL");
      setLoading(false);
      return;
    }

    if (!isValidUrl(url)) {
      alert("Enter a valid URL!");
      setLoading(false);
      return;
    }

    const shortId = nanoid(8);
    const shortUrl = `${baseUrl}/${shortId}`;
    await mut({ originalUrl: url, url: shortUrl });

    setNewURL(shortUrl);
    setLoading(false);
  };

  return (
    <>
      {/* Theme Button */}
      <div className="absolute right-4 top-4">
        <TogleTheme />
      </div>

      <div className="mt-2 min-h-screen flex flex-col justify-center items-center bg-blue-950 dark:bg-black px-4">

        {/* Card */}
        <div className="bg-white dark:bg-zinc-900 shadow-lg p-6 rounded-2xl w-full max-w-xl">
          <h1 className="text-2xl font-bold text-center text-blue-700 dark:text-cyan-400">
            URL Shortener
          </h1>

          {/* Input + Button */}
          <div className="flex gap-3 mt-6">
            <input
              type="text"
              placeholder="Enter URL to shorten..."
              className="flex-1 px-4 py-2 rounded-xl bg-gray-200 dark:bg-zinc-800 text-black dark:text-white outline-none"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />

            <button
              onClick={submitURL}
              disabled={loading}
              className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl disabled:opacity-50"
            >
              {loading ? "..." : "Shorten"}
            </button>
          </div>

          {/* Generated Short URL */}
          {newURL && (
            <div className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg text-center break-all">

            <Link href={newURL} target="_blank" >
              {newURL}
            </Link>
            </div>
          )}
        </div>

        {/* URLs Table */}
        <div className="w-full max-w-3xl mt-8">
          <h2 className="text-white text-lg mb-2">All URLs</h2>

          <div className="overflow-x-auto rounded-xl border border-gray-600">
            <table className="w-full border-collapse text-sm dark:text-white">
              <thead className="bg-gray-200 dark:bg-zinc-800">
                <tr>
                  <th className="p-3 border">#</th>
                  <th className="p-3 border w-1/2">Original URL</th>
                  <th className="p-3 border w-1/2">Short URL</th>
                </tr>
              </thead>

              <tbody>
                {data &&
                  data.map((item, idx) => (
                    <tr
                      key={item._id}
                      className="odd:bg-white even:bg-gray-100 dark:odd:bg-zinc-900 dark:even:bg-zinc-800"
                    >
                      <td className="p-3 border text-center">{idx + 1}</td>

                      <td className="p-3 border break-all   gap-2">
                        <div className="flex justify-between">

                          <Link href={item.originalUrl} target="_blank">
                            {item.originalUrl.length > 35
                              ? item.originalUrl.slice(0, 35) + "..."
                              : item.originalUrl}
                          </Link>

                          <button
                            onClick={() => navigator.clipboard.writeText(item.originalUrl)}
                            className="p-1 hover:bg-gray-300 dark:hover:bg-zinc-700 rounded"
                          >
                            <Copy size={16} className="cursor-pointer" />
                          </button>
                        </div>
                      </td>

                      <td className="p-3 border break-all  gap-2 ">
                        <div className="flex justify-between">
                          <Link href={item.url} target="_blank">
                            {item.url.length > 25
                              ? item.url.slice(0, 25) + "..."
                              : item.url}
                          </Link>

                          <button
                            onClick={() => navigator.clipboard.writeText(item.url)}
                            className="p-1 hover:bg-gray-300 dark:hover:bg-zinc-700 rounded"
                          >
                            <Copy size={16} className="cursor-pointer"/>
                          </button>
                        </div>
                      </td>



                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div >
    </>
  );
};

export default Page;
