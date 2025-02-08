'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authProvider';
// import type { Metadata } from "next";
import { Header } from "@/components";


export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <main>
            <Header />
            <div className="w-full p-7 relative">{children}</div>
        </main>
    );
}
