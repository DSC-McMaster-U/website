import { LoaderFunctionArgs, MetaFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { client } from '~/lib/sanity';
import { Newsletter } from '~/types/types';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { slug } = params; // Extract the slug from the params
  console.log(slug);

  const newsletter = await client.fetch(
    `*[_type == 'newsletter' && slug.current == $slug][0]{
            title,
            subtitle,
            slug,
            body,
            _updatedAt,
            contactEmail,
            image {
                asset {
                    _id,
                    url
                }
            },
            registrationLink
        }`,
    { slug }
  );

  if (!newsletter) {
    throw new Response('Not Found', { status: 404 });
  }

  return json(newsletter);
};

export const meta: MetaFunction = ({ data }) => {
  const newsletter = data as Newsletter;
  return [
    { title: `${newsletter.title} | GDSC McMaster U` },
    { name: 'description', content: newsletter.description || 'Newsletter' },
  ];
};

const NewsletterDetailPage = () => {
  const newsletter = useLoaderData<Newsletter>(); // Get the newsletter data

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
