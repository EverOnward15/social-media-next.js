"use client";
import Card from "@/components/Card"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';


export default function AboutPage() {
//   const router = useRouter();
//   useEffect(() => {
//     // Check if the page is being refreshed
//     const isRefreshed = performance.getEntriesByType("navigation")[0].type === "reload";
//     // If the page is being refreshed, redirect to the homepage
//     if (isRefreshed) {
//       router.push('/');
//     }
//   }, []);

    return(
        <Card>
            <div className="flex content-center">
                <h2 className="text-2xl mb-2 mr-2">About me</h2>
                <button>Edit</button>
            </div>
            <p className="mb-2 text-sm">Laboris eu mollit dolore eu. Quis voluptate Lorem est fugiat non irure sit nulla officia. Ipsum id in esse exercitation minim reprehenderit cupidatat nostrud laboris nisi sunt sit. Non duis do sit officia aliqua. Dolore do qui deserunt reprehenderit ea dolor eu voluptate duis. Aliquip non amet elit qui consequat consequat.
            </p>
            <p className="mb-2 text-sm">Laboris eu mollit dolore eu. Quis voluptate Lorem est fugiat non irure sit nulla officia. Ipsum id in esse exercitation minim reprehenderit cupidatat nostrud laboris nisi sunt sit. Non duis do sit officia aliqua. Dolore do qui deserunt reprehenderit ea dolor eu voluptate duis. Aliquip non amet elit qui consequat consequat.
            </p>
        </Card>
    )
}