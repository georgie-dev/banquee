'use client'
import React, { useEffect } from "react";
import { useAuth } from "@/lib/authProvider";
import { Nav, Banner } from "@/components";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, loading } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);


  if (loading) return null;

  return (
    <>
      <section>{!user && (
        <main className="flex min-h-screen flex-col">
          <Nav />
          <div className="w-full min-h-min flex items-center justify-center">
            <Banner />
          </div>
        </main>
      )}</section>
    </>
  );
}

