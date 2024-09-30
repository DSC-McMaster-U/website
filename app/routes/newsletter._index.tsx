import { MetaFunction, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { client } from "~/lib/sanity";
import { Newsletter } from "~/types/types";

export async function loader() {
    const newsletters = await client.fetch(
        `*[_type == 'newsletter']{
            title,
            subtitle,
            slug,
            body,
            _updatedAt
        }`
    );

    return json({ newsletters });
} 

export const meta: MetaFunction = () => {
    return [
        { title: "Newsletters | GDSC McMaster U" },
        { name: "description", content: "Newsletters from GDSC McMaster U" },
    ];
};  

const NewsletterPage = () => {
    const { newsletters } = useLoaderData<typeof loader>();
    return (
        <div>
            <h1>Newsletters</h1>
            {/* Grid container for newsletters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {newsletters.map((newsletter: Newsletter) => (
                    <div 
                        key={newsletter.slug.current} 
                        className="border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
                    >
                        <Link to={`${newsletter.slug.current}`}>
                            <h2 className="text-lg font-bold">{newsletter.title}</h2>
                            <p className="text-sm text-gray-600">{newsletter.subtitle}</p>
                            <p className="text-xs text-gray-400">{new Date(newsletter._updatedAt).toLocaleDateString()}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NewsletterPage;
