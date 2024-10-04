import { client } from '@/sanity/lib/client';
import { Newsletter } from '@/types/sanity';

export async function generateMetadata({ params }: { params: { slug: string } }) {
    return {
        title: `${params.slug} | GDSC McMaster U`,
        description: `Newsletter | ${params.slug}`,
    };
}

const fetchNewsletter = async (slug: string) => {
    const newsletter = await client.fetch(
        `*[_type == 'newsletter' && slug.current == $slug][0]{
        title,
        description,
        slug,
        body,
        _updatedAt
        }`,
        { slug }
    );

    return newsletter;
};

const NewsletterDetailPage = async ({ params }: { params: { slug: string } }) => {
    const { slug } = params;
    const newsletter: Newsletter = await fetchNewsletter(slug);

    if (!newsletter) {
        throw new Response("Not Found", { status: 404 });
    }

    return (
        <div>
        <h1 className="text-2xl font-bold">{newsletter.title}</h1>
        <h2 className="text-lg text-gray-600">{newsletter.description}</h2>
        <p className="text-xs text-gray-400">
            {new Date(newsletter._updatedAt).toLocaleDateString()}
        </p>
        {/* Render the body of the newsletter */}
        </div>
    );
};

export default NewsletterDetailPage;
