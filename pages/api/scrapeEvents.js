import * as cheerio from 'cheerio';

// Api route to scrape event data from the GDG event page to display on our site.
export default async function handler (req, res) {
    const url = "https://gdg.community.dev/gdg-on-campus-mcmaster-university-hamilton-canada/";
    // Ensure the request method is GET
    if (req.method === "GET") {
        try {
            // Fetch the html from the event page
            const response = await fetch(url);
            // Convert response to a string
            const data = await response.text();

            // Arrays to store event data
            const upcomingEvents = []
            const pastEvents = []

            // Load the html into cheerio
            const $ = cheerio.load(data);

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



            const pastEventsInfo = $("[data-testid='data-block-for-pastEvents-mu9W6Ekd-k3'] > a > div:last" );

            pastEventsInfo.each((index, element) => {
                console.log("Element:", $(element).html());
                console.log('\n\n\n');
            })
            // pastEventsInfo
            // $("[data-testid='data-block-for-pastEvents-mu9W6Ekd-k3'] > a[data-testid='container-block-24RneQKmFRW']").each((index, element) => {
            //     console.log("Element:", $(element).html());
            //     const link = $(element).attr("href");
            //     console.log("Link:", link);

            //     // Extract event title
            //     const title = $(element).find("a.link-styles__link_1ec3q span").last().text().trim();
            //     console.log("Title:", title);

            //     // Extract date
            //     const dateText = $(element).find("span.plainText-styles__plainText_8ys50").first().text().trim();
            //     const formattedDate = dateText.replace(/[^\w\s,]/g, ''); // Remove special characters
            //     console.log("Date:", formattedDate);

            //     // Extract event type
            //     const eventType = $(element).find("span.plainText-styles__plainText_8ys50").eq(1).text().trim();
            //     console.log("Event Type:", eventType);

            //     if (title && link) {
            //         pastEvents.push({ title, link, formattedDate, eventType });
            //     }
            // });











            res.status(200).json({ $ });


        } catch (error) {
            res.status(500).json({ message: "Error Scraping Event Data." });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}