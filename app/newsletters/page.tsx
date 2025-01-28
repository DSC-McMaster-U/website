import { client } from "@/sanity/lib/client";
import { Newsletter } from "@/types/sanity";
import { Metadata } from "next";
import Header from "@/app/components/Header";
import SectionCard from "../components/SectionCard";
import Link from "next/link";
import Card from "../components/Card";
import * as Icons from "react-icons/md";
import Pill from "../components/Pill";
import AnimatedHero from "../components/AnimatedHero";

export const metadata: Metadata = {
    title: "Newsletters | Google Developer Group on Campus | McMaster University",
    description: "Newsletters from Google Developer Group on Campus | McMaster University",
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

const HeroSection = () => {

  return (
    <AnimatedHero id="hero" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 xl:py-28 mt-8 flex md:flex-row flex-col gap-y-8 md:gap-y-0 items-center">
      <div className="w-full flex flex-col items-center">
        <div className="flex flex-col items-center justify-center gap-y-4 max-w-2xl text-center">
            <Pill>Our Newsletter</Pill>
            <h2>Keeping you up-to-date with the latest and greatest for everything tech</h2>
        </div>
      </div>
    </AnimatedHero>
  )
}

const NewslettersGridSection = async () => {
  const newsletters: Newsletter[] = await fetchNewsletters();
  return (
    <SectionCard id={"newsletters-grid"}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        { newsletters && newsletters.map((newsletter: Newsletter) => (
          <Link href={`/newsletters/${newsletter.slug.current}`} key={newsletter._id}>
            <Card
              title={newsletter.title}
              description={newsletter.description}
              icon={<Icons.MdArticle className="w-full h-fit"/>}
            />
          </Link>
        ))}
      </div>
    </SectionCard>
  )
}

const NewslettersPage = async () => {

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <NewslettersGridSection />
      </main>
    </>
  );
};

export default NewslettersPage;