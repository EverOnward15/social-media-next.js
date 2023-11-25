"use client";
import workingOnIt from "@/app/helpers/UnderConstruction";
import Card from "@/components/Card"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';


export default function AboutPage() {

    return(
        <Card>
            <div className="flex items-center">
                <h2 className="text-2xl mb-2 mr-2">About me</h2>
                {/* <button className="flex items-center" onClick={workingOnIt}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    Edit
                </button> */}
            </div>
            <p className="mb-2 text-sm">Laboris eu mollit dolore eu. Quis voluptate Lorem est fugiat non irure sit nulla officia. Ipsum id in esse exercitation minim reprehenderit cupidatat nostrud laboris nisi sunt sit. Non duis do sit officia aliqua. Dolore do qui deserunt reprehenderit ea dolor eu voluptate duis. Aliquip non amet elit qui consequat consequat.
            </p>
            <p className="mb-2 text-sm">Laboris eu mollit dolore eu. Quis voluptate Lorem est fugiat non irure sit nulla officia. Ipsum id in esse exercitation minim reprehenderit cupidatat nostrud laboris nisi sunt sit. Non duis do sit officia aliqua. Dolore do qui deserunt reprehenderit ea dolor eu voluptate duis. Aliquip non amet elit qui consequat consequat.
            </p>
        </Card>
    )
}