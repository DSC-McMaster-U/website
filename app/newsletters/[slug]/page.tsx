import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import { Newsletter } from "@/types/sanity";
import Image from "next/image";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const newsletter = await fetchNewsletter(params.slug);
    
    if (!newsletter) {
        return {
            title: "Newsletter | GDSC McMaster U",
            description: "Newsletter content not found",
        };
    }

    return {
        title: `${newsletter.title} | GDSC McMaster U`,
        description: `Newsletter | ${newsletter.title}`,
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

const serializers = {
    types: {
        image: ({ value }: { value: any }) => (
            <div className="my-4">
                <Image
                    src={value.asset.url}
                    alt={value.alt || "Image"}
                    width={600}
                    height={400}
                    className="rounded-lg"
                />
            </div>
        ),
    },
    marks: {
        link: ({ children, value }: { children: React.ReactNode; value: any }) => (
            <a href={value.href} target="_blank" rel="noopener noreferrer" className="newsletter-a">
                {children}
            </a>
        ),
        strong: ({ children }: { children: React.ReactNode }) => (
            <strong className="font-bold">{children}</strong>
        ),
        em: ({ children }: { children: React.ReactNode }) => (
            <em className="italic">{children}</em>
        ),
    },
    block: {
        h1: ({ children }: { children: React.ReactNode }) => <h1 className="newsletter-h1">{children}</h1>,
        h2: ({ children }: { children: React.ReactNode }) => <h2 className="newsletter-h2">{children}</h2>,
        h3: ({ children }: { children: React.ReactNode }) => <h3 className="newsletter-h3">{children}</h3>,
        normal: ({ children }: { children: React.ReactNode }) => <p className="newsletter-p">{children}</p>,
        ul: ({ children }: { children: React.ReactNode }) => (
            <ul className="newsletter-ul">{children}</ul>
        ),
        li: ({ children }: { children: React.ReactNode }) => (
            <li className="newsletter-li">{children}</li>
        ),
    },
    listItem: {
        bullet: ({ children }: { children: React.ReactNode }) => <li className="newsletter-bullet">{children}</li>,
        number: ({ children }: { children: React.ReactNode }) => (
            <li className="newsletter-number">{children}</li>
        ),
    }
};

const NewsletterDetailPage = async ({ params }: { params: { slug: string } }) => {
    const { slug } = params;
    const newsletter: Newsletter = await fetchNewsletter(slug);

    if (!newsletter) {
        throw new Response("Not Found", { status: 404 });
    }

    // Format the date as "Monday, September 16, 2024"
    const formattedDate = new Date(newsletter._updatedAt).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <>
            <Header />
            <main>
                <section id="newsletter" className="flex flex-col gap-y-4">
                    <div className="flex flex-col gap-y-4 pb-12 mb-12 border-b-2 border-google-darkGrey dark:border-google-lightGrey">
                        <h2>{newsletter.title}</h2>
                        <h5>{newsletter.description}</h5>
                        <p>{formattedDate}</p>
                    </div>
                    {/* Render the newsletter body using PortableText */}
                    <PortableText value={newsletter.body} components={serializers} />
                </section>
            </main>
            <Footer />
        </>
    );
};

export default NewsletterDetailPage;
