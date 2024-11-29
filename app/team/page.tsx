import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { Team } from "@/types/sanity";
import { Metadata } from "next";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MemberCard from "../components/MemberCard";
import { urlFor } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "Team | GDSC McMaster U",
  description: "Our team @ GDSC McMaster U",
};

type Member = {
  __id: string;
  _type: string;
  name: string;
  position: string;
  hoverContent?: string;
  picture?: {
    _type: string;
    asset: {
      url: string;
    };
  };
};

const fetchTeams = async () => {
  const teams = await client.fetch(
    `*[_type == 'team']{
      _id,
      name,
      sectionId,
      members
    }`
  );

  return teams;
};

const TeamPage = async () => {
  const teams: Team[] = await fetchTeams();
  console.log("Fetched teams:", teams);
  
  return (
    <>
      <Header />
      <main className="pt-32">
        <h3 className="text-center mb-8">Our Team @ GDSC McMaster U</h3>

        {teams.map((team, idx) => (
          <section id={team.sectionId} key={idx} className="px-8 sm:px-0 w-full">
            <h5 className="mb-6">{team.name}</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {team.members.map((member,_idx) => (
                  <MemberCard
                    key={idx * 1000 + _idx}
                    Image={
                      <Image
                          src={urlFor(member.picture.asset).url()}
                          alt={member.name || "not available"}
                          fill
                          className="object-cover transition-opacity rounded-md duration-300"
                      />
                    }
                    Content={
                      <>
                        <div className="transition-transform duration-300 ease-in-out">
                          <h6>{member.name}</h6>
                          <p className="text-google-grey dark:text-google-lightGrey">{member.position}</p>
                        </div>
                      </>
                    }
                    CTA={
                      <div className="transition-transform duration-300 ease-in-out">
                        <p className="px-1 text-google-grey dark:text-google-lightGrey hover:text-google-black dark:hover:text-white text-sm">{member.hoverContent}</p>
                      </div>
                    }
                  />
              ))}
            </div> 
            
            </section>
        ))}

        <Footer />
        
      </main>
    </>
  )
}

export default TeamPage