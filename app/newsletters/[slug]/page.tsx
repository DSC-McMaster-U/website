import { PortableText, PortableTextComponentProps, PortableTextReactComponents } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import { Newsletter } from "@/types/sanity";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/Header";
import Pill from "@/app/components/Pill";
import SectionCard from "@/app/components/SectionCard";
import { urlFor } from "@/sanity/lib/image";
import AnimatedHero from "@/app/components/AnimatedHero";

type Params = Promise<{ slug: string[] }>

export async function generateMetadata({ params }: { params: Params }) {
    const { slug } = await params;
    const slugString = slug.toString(); 
    const newsletter = await fetchNewsletter(slugString);
    
    if (!newsletter) {
        return {
            title: "Newsletter | Google Developer Group on Campus | McMaster University",
            description: "Newsletter content not found",
        };
    }

    return {
        title: `${newsletter.title} | Google Developer Group on Campus | McMaster University`,
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

const serializers: Partial<PortableTextReactComponents> = {
    types: {
        image: ({ value }) => (
            <div className="my-4 max-w-[70%] mx-auto overflow-hidden">
                <Image
                    src={urlFor(value.asset).url()}
                    alt={value.alt || "Image"}
                    width={600}
                    height={400}
                    className="rounded-lg w-full h-auto object-contain"
                />
            </div>
        ),
    },
    marks: {
        link: ({ children, value }: { children: React.ReactNode; value?: { href: string } }) => (
            <Link href={value?.href ?? "#"} target="_blank" rel="noopener noreferrer" className="newsletter-a">
                {children}
            </Link>
        ),
        strong: ({ children }: { children: React.ReactNode }) => (
            <strong className="font-bold">{children}</strong>
        ),
        em: ({ children }: { children: React.ReactNode }) => (
            <em className="italic">{children}</em>
        ),
    },
    block: {
        h1: ({ children }: PortableTextComponentProps<unknown>) => <h1 className="newsletter-h1">{children}</h1>,
        h2: ({ children }: PortableTextComponentProps<unknown>) => <h2 className="newsletter-h2">{children}</h2>,
        h3: ({ children }: PortableTextComponentProps<unknown>) => <h3 className="newsletter-h3">{children}</h3>,
        normal: ({ children }: PortableTextComponentProps<unknown>) => <p className="newsletter-p">{children}</p>,
        ul: ({ children }: PortableTextComponentProps<unknown>) => (
            <ul className="newsletter-ul">{children}</ul>
        ),
        li: ({ children }: PortableTextComponentProps<unknown>) => (
            <li className="newsletter-li">{children}</li>
        ),
    },
    listItem: {
        bullet: ({ children }: PortableTextComponentProps<unknown>) => <li className="newsletter-bullet">{children}</li>,
        number: ({ children }: PortableTextComponentProps<unknown>) => (
            <li className="newsletter-number">{children}</li>
        ),
    }
};

const NewsletterDetailPage = async ({ params }: { params: Params }) => {
    const { slug } = await params;
    const slugString = slug.toString();   
    const newsletter: Newsletter = await fetchNewsletter(slugString);
    if (!newsletter) return null;
    return (
        <>
            <Header />
            <main>
                <AnimatedHero id="hero" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 xl:py-28 mt-8 flex md:flex-row flex-col gap-y-8 md:gap-y-0 items-center">
                    <div className="w-full flex flex-col items-center">
                    <div className="flex flex-col items-center justify-center gap-y-4 max-w-2xl text-center">
                            <Pill>Our Newsletter</Pill>
                            <h2>{newsletter.title}</h2>
                            <h3 className="italic">{newsletter.description}</h3>
                    </div>
                    </div>
                </AnimatedHero>
                <SectionCard id="newsletter-content">
                    <div className="w-full max-w-full overflow-hidden">
                        <PortableText value={newsletter.body} components={serializers} />
                    </div>
                </SectionCard>
            </main>
        </>
    );
};

export default NewsletterDetailPage;