"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
const Page = () => {
  const navigate = useRouter();
  const baseUrl = typeof window !== "undefined" ? window.location.href : "";
  const data = useQuery(api.urls.getOrgUrl, { url: baseUrl });

  useEffect(() => {
    if (data) navigate.push(data);
  }, [data, navigate]);
  return (
    <div className="flex justify-center items-center mt-[40vh]">
      Redirecting to your destination
    </div>
  );
};

export default Page;
