"use client";
import React, { useEffect } from 'react'
import Header from "@/app/components/Header";


const eventsPage = () => {
    const scrapeEvents = async () => {
        try {
            const res = await fetch('/api/scrapeEvents', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log("Success:", res);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() =>{
        scrapeEvents();
    }, []);
  return (
    <>
        <Header />
        <main className="mt-20">
            <h1>Events Page</h1>
        </main>
      
    </>
  )
}

export default eventsPage
