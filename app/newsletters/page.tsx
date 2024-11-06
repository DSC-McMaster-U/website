import { client } from "@/sanity/lib/client";
import { Newsletter } from "@/types/sanity";
import { Metadata } from "next";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import LinkTitleCard from "@/app/components/LinkTitleCard";

export const metadata: Metadata = {
    title: "Newsletters | GDSC McMaster U",
    description: "Newsletters from GDSC McMaster U",
};

const fetchNewsletters = async () => {
  const newsletters = await client.fetch(
    `*[_type == 'newsletter']{
            title,
            description,
            slug,
            body,
            _updatedAt
        }`
  );
  return newsletters;
};

const NewslettersPage = async () => {
  const newsletters: Newsletter[] = await fetchNewsletters();

  return (
    <>
      <Header />
        <main>
          <section id="newsletters" className="flex flex-col gap-y-4">
            <h2>Newsletters</h2>
            <p>Through GDSC McMaster University&apos;s monthly newsletter, stay updated on the latest tech news, events, and innovations. Featuring industry trends, club highlights, and upcoming activities, the newsletter connects members to valuable insights and opportunities in the tech world.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-10">
              {newsletters.map((newsletter) => (
                <LinkTitleCard
                  key={newsletter.slug.current}
                  title={newsletter.title}
                  link={`/newsletters/${newsletter.slug.current}`}
                >
                  <p>{newsletter.description}</p>
                </LinkTitleCard>
              ))}
            </div>
          </section>
        </main>
      <Footer />
    </>
  );
};

export default NewslettersPage;