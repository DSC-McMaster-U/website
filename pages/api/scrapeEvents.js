import * as cheerio from 'cheerio';

// Api route to scrape event data from the GDG event page to display on our site.
export default async function handler (req, res) {
    const url = "https://gdg.community.dev/gdg-on-campus-mcmaster-university-hamilton-canada/";
    const url2 = "https://gdg.community.dev/api/event_slim/for_chapter/2428";
    // Ensure the request method is GET
    if (req.method === "GET") {
        try {
            // Fetch the html from the event page
            const response = await fetch(url2);
            // Convert response to a string
            //const data = await response.text();
            const data = await response.json();
            const results = data.results;
            console.log("Results:", results);

            // Arrays to store event data
            const upcomingEvents = []
            const pastEvents = []

            // Load the html into cheerio
            // const $ = cheerio.load(data);

            // USE THIS NOW, RETURNS A JSON
            // https://gdg.community.dev/api/event_slim/for_chapter/2428

            // ITERATES THROUGH EVERY <a> but doesnt get correct output
            // $("[data-testid='data-block-for-pastEvents-mu9W6Ekd-k3']>a").each((index, element) => { 
            //     //console.log(`Event HTML at index ${index}:`, $(element).html());
                
                
            //     const dateText = $(element).find('span.plainText-styles__plainText_8ys50').first().text().trim();
            //     const formattedDate = dateText.replace(/[^\w\s,]/g, '');
            //     console.log("Date:", formattedDate);

            //     const eventType = $(element).find('span.plainText-styles__plainText_8ys50').eq(1).text().trim();
            //     console.log("Event Type:", eventType);

            //     const title = $(element).find('span.plainText-styles__plainText_8ys50').eq(2).text().trim();
            //     console.log("Title:", title);
                
            //     const link = $(element).attr("href");
            //     console.log("Link:", link);
            //     console.log('iteration ', index);
            // })



            // GETS CORRECT OUTPUT BUT DOESNT ITERATE THROUGH EVERY <a>
            // $("[data-testid='data-block-for-pastEvents-mu9W6Ekd-k3']").each((index, element) => {
            //     const dateText = $(element).find('span .plainText-styles__plainText_8ys50').first().text().trim();
            //     const formattedDate = dateText.replace(/[^\w\s,]/g, '');
            //     console.log("Date:", formattedDate);

            //     const eventType = $(element).find('span .plainText-styles__plainText_8ys50').eq(1).text().trim();
            //     console.log("Event Type:", eventType);

            //     const title = $(element).find('span .plainText-styles__plainText_8ys50').eq(2).text().trim();
            //     console.log("Title:", title);
                
            //     const link = $(element).find("a").attr("href");
            //     console.log("Link:", link);
                
            //     console.log("index", index);
            // })



            res.status(200).json({ "Message" : "Data Scraped Successfully" });


        } catch (error) {
            res.status(500).json({ message: "Error Scraping Event Data." });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}