import { client } from "@/sanity/lib/client";
import { Newsletter } from "@/types/sanity";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Newsletters | GDSC McMaster U",
    description: "Newsletters from GDSC McMaster U",
  };

const fetchNewsletters = async () => {
  const newsletters = await client.fetch(
    `*[_type == 'newsletter']{
            title,
            subtitle,
            slug,
            body,
            _updatedAt
        }`
  );
  return newsletters;
};

const NewsletterPage = async () => {
  const newsletters: Newsletter[] = await fetchNewsletters();

  return (
    <div>
      <h1>Newsletters</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {newsletters.map((newsletter) => (
          <div
            key={newsletter.slug.current}
            className="border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
          >
            <Link href={`/newsletters/${newsletter.slug.current}`}>
              <h2 className="text-lg font-bold">{newsletter.title}</h2>
              <p className="text-sm text-gray-600">{newsletter.description}</p>
              <p className="text-xs text-gray-400">
                {new Date(newsletter._updatedAt).toLocaleDateString()}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsletterPage;
