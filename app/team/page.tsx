import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import MemberCard from "../components/MemberCard";
import { ChevronArrowSpan } from "../components/ChevronArrow";

export const metadata: Metadata = {
  title: "Team | GDSC McMaster U",
  description: "Our team @ GDSC McMaster U",
};

interface Team {
  name: string;
  sectionId: string;
  members: Member[];
}

interface Member {
  image: string;
  name: string;
  position: string;
  hoverContent: string;
}

const teams : Team[] = [
  {
    name: "Marketing & Branding Team",
    sectionId: "marketing-branding",
    members: [
      {
        image: '',
        name: "Test Name",
        position: "Development Subteam",
        hoverContent: "Additional information goes here. test test test test test test test test test \n test test test test test test?"
      },
      {
        image: '',
        name: "Test Name",
        position: "Development Subteam",
        hoverContent: "Additional information here"
      },
      {
        image: '',
        name: "Test Name",
        position: "Development Subteam",
        hoverContent: "Additional information here"
      },
      {
        image: '',
        name: "Test Name",
        position: "Development Subteam",
        hoverContent: "Additional information here"
      },
      {
        image: '',
        name: "Test Name",
        position: "Development Subteam",
        hoverContent: "Additional information here"
      },
      {
        image: '',
        name: "Test Name",
        position: "Development Subteam",
        hoverContent: "Additional information here"
      },
    ]
  },
  {
    name: "Test Team",
    sectionId: "test",
    members: [
      {
        image: '',
        name: "Test Name",
        position: "Development Subteam",
        hoverContent: "Additional information here"
      },
      {
        image: '',
        name: "Test Name",
        position: "Development Subteam",
        hoverContent: "Additional information here"
      },
      {
        image: '',
        name: "Test Name",
        position: "Development Subteam",
        hoverContent: "Additional information here"
      },
    ]
  },
];

// will be async once fetching data
const TeamPage = () => {
  // await fetch team data
  // temp using consts for team data

  return (
    <>
      <Header />
      <main className="pt-32">
        <h3 className="text-center mb-8">Our Team @ GDSC McMaster U</h3>

        {teams.map((team, idx) => (
          <section id={team.sectionId} key={idx} className="px-8 sm:px-0 w-full">
            <h5 className="mb-6">{team.name}</h5>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {team.members.map((member, _idx) => (
                <div>
                  <MemberCard
                    key={_idx}
                    Image={
                      <Image
                          src={member.image}
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
                </div>
              ))}
            </div>
            
            </section>
        ))}

        
        
      </main>
    </>
  )
}

export default TeamPage