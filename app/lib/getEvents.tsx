async function getEvents () {
    const pastEventsUrl = "https://gdg.community.dev/api/event_slim/for_chapter/2428/?status=Completed&fields=title,start_date,event_type_title,cropped_picture_url,cropped_banner_url,url,cohost_registration_url,description,description_short";
    const upcomingEventsUrl = "https://gdg.community.dev/api/event_slim/for_chapter/2428/?status=Live&fields=title,start_date,event_type_title,cropped_picture_url,cropped_banner_url,url,cohost_registration_url,description,description_short";
    try {
        // Fetch the past events data from the GDG event page in parallel with the upcoming events data
        const [pastResponse, upcomingResponse] = await Promise.all([
            fetch(pastEventsUrl),
            fetch(upcomingEventsUrl),
        ]);

        if (!pastResponse.ok || !upcomingResponse.ok) {
            throw new Error("Failed to fetch event data");
        }

        const pastData = await pastResponse.json();
        const upcomingData = await upcomingResponse.json();

        const pastEvents = pastData.results;
        const upcomingEvents = upcomingData.results;


        // Return the past and upcoming events data
        return { "past_events": pastEvents, "upcoming_events": upcomingEvents};


    } catch (error) {
        console.error(error);
        return { "past_events": [], "upcoming_events": []};
    }
}

export default getEvents;