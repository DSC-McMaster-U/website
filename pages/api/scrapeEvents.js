// Api route to scrape event data from the GDG event page to display on our site.
export default async function handler (req, res) {
    const pastEventsUrl = "https://gdg.community.dev/api/event_slim/for_chapter/2428/?status=Completed";
    const upcomingEventsUrl = "https://gdg.community.dev/api/event_slim/for_chapter/2428/?status=Live";
    // Ensure the request method is GET
    if (req.method === "GET") {
        try {
            // Fetch the past events data from the GDG event page
            const response1 = await fetch(pastEventsUrl).then((res) => res.json());
            const pastEvents = response1.results;
            console.log("Past Events Results:", pastEvents);

            // Fetch the upcoming events data from the GDG event page
            const response2 = await fetch(upcomingEventsUrl).then((res) => res.json());
            const upcomingEvents = response2.results;
            console.log("Upcoming Events Results:", upcomingEvents);


            // Return the past and upcoming events data
            res.status(200).json({ "past_events": pastEvents, "upcoming_events": upcomingEvents });


        } catch (error) {
            res.status(500).json({ message: "Error Scraping Event Data." });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}