import { client } from "@/sanity/lib/client";
import { Member, Team, TeamItem } from "@/types/sanity";
import { Metadata } from "next";
import Header from "../components/Header";
import Pill from "../components/Pill";
import SectionCard from "../components/SectionCard";
import { urlFor } from "@/sanity/lib/image";
import MemberCard from "../components/MemberCard";
import Image from 'next/image';
import AnimatedHero from "../components/AnimatedHero";

export const metadata: Metadata = {
  title: "Team | Google Developer Group on Campus | McMaster U",
  description: "Our team Google Developer Group on Campus | McMaster University",
};

const fetchTeam = async () => {
  const team = await client.fetch(
    `*[_type == 'team'][0]`
  );

  return team;
};

const HeroSection = () => {
  return (
    <AnimatedHero id="hero" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 xl:py-28 mt-8 flex md:flex-row flex-col gap-y-8 md:gap-y-0 items-center">
      <div className="w-full flex flex-col items-center">
        <div className="flex flex-col items-center justify-center gap-y-4 max-w-2xl text-center">
            <Pill>Our Team</Pill>
            <h2>Meet our team that keeps everything running behind the scenes</h2>
        </div>
      </div>
    </AnimatedHero>
  )
}

const TeamsSections = async () => {
  const team: Team = await fetchTeam();

  return (
    <>
      {team?.teams?.map((teamItem: TeamItem) => (
        <SectionCard 
          key={teamItem._key} 
          id={teamItem.name}
          description={teamItem.description}
          title={teamItem.name}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {teamItem?.members?.map((member: Member) => (
              <MemberCard 
                key={member._key}
                Image={
                  <Image
                    src={urlFor(member.picture.asset).url()}
                    alt={member.name}
                    width={200}
                    height={200}
                  />
                }
                Content={
                  <>
                    <span className="text-lg font-semibold">{member.name}</span>
                    <span className="text-base">{member.position}</span>
                  </>
                }
              />
            ))}
          </div>
        </SectionCard>
      ))}
    </>
  );
};


const TeamPage = () => {  
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <TeamsSections />
      </main>
    </>
  )
}

export default TeamPage;
