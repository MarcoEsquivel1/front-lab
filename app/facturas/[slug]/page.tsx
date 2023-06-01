"use client"
import { Factura } from "@/interfaces";
import React from "react";
import { useRouter } from "next/navigation";


export default function DetailsPage({params}) {
    const router = useRouter();
    
    return (
        <main className="flex flex-col min-h-full items-center justify-center p-24">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
            <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                <p className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0">
                    <span className="flex text-xl font-bold text-gray-900 dark:text-gray-100 lg:text-3xl">
                        Detalles de factura: {params.slug}
                    </span>
                </p>
            </div>
        </div>
    </main>   
    )
}