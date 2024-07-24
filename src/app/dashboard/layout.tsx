import type { Metadata } from "next";
import { Header, SideNav } from "@/components";

export const metadata: Metadata = {
    title: "Dashboard || Internet Banking Services",
    description: "Online Transaction Services ",
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <Header />
            <div className="flex gap-0">
                <div className="w-fit h-full fixed bg-primary/50 lg:bg-primary/5 z-20">
                <SideNav/>
                </div>
                <div className="w-full p-5  relative ml-10 lg:ml-80">{children}</div>
            </div>
        </main>
    );
}
