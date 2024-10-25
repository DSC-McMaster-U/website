import { client } from "@/sanity/lib/client";
import { Newsletter } from "@/types/sanity";
import { Metadata } from "next";
import Link from "next/link";
import { ChevronArrowSpan } from "../components/ChevronArrow";
import Tag from "../components/Tag";

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
    <main>
      <section id="newsletters" className="flex flex-col gap-y-4">
        <h2>Newsletters</h2>
        <p>Through GDSC McMaster University&apos;s monthly newsletter, stay updated on the latest tech news, events, and innovations. Featuring industry trends, club highlights, and upcoming activities, the newsletter connects members to valuable insights and opportunities in the tech world.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-10">
          {newsletters.map((newsletter) => (
            <Link 
              href={`/newsletters/${newsletter.slug.current}`} 
              key={newsletter.slug.current}
              className="button-arrow group relative group w-full bg-white dark:bg-google-grey p-1 dark:bg-opacity-10 rounded-md overflow-hidden shadow-lg border dark:border-google-black border-b-google-lightGrey transition-all duration-200 hover:shadow-2xl"
            >
                <div className="bg-google-black p-4">
                  <h5>{newsletter.title}</h5>
                </div>
                <div className="p-4 gap-y-4 flex flex-col">
                  <p>{newsletter.description}</p>
                  <ChevronArrowSpan>Read now</ChevronArrowSpan>
                </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default NewslettersPage;