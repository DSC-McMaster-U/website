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
}

const teams : Team[] = [
  {
    name: "Marketing & Branding Team",
    sectionId: "marketing-branding",
    members: [
      {
        image: '',
        name: "Harrison Johns",
        position: "Development Subteam",
      },
      {
        image: '',
        name: "Aidan Froggatt",
        position: "Marketing & Branding Lead",
      },
      {
        image: '',
        name: "Ryan Gosling",
        position: "Celebrity",
      },
      {
        image: '',
        name: "Harrison Johns",
        position: "Development Subteam",
      },
      {
        image: '',
        name: "Aidan Froggatt",
        position: "Marketing & Branding Lead",
      },
      {
        image: '',
        name: "Ryan Gosling",
        position: "Celebrity",
      },
    ]
  },
  {
    name: "Test Team",
    sectionId: "test",
    members: [
      {
        image: '',
        name: "Harrison Johns",
        position: "Development Subteam",
      },
      {
        image: '',
        name: "Aidan Froggatt",
        position: "Marketing & Branding Lead",
      },
      {
        image: '',
        name: "Ryan Gosling",
        position: "Celebrity",
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
      <main className="pt-28 ">
        <h2 className="text-center mb-8">Our Team @ GDSC McMaster U</h2>

        {teams.map((team, idx) => (
          <section id={team.sectionId} key={idx} className="w-full">
            <h5 className="mb-6">{team.name}</h5>

            {/* put into flex grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                      <Link
                          href='#'  
                          className='text-google-lightBlue hover:text-google-black dark:hover:text-white text-lg flex items-center transition-colors duration-200 w-fit'
                      >
                          <ChevronArrowSpan>
                              Read more
                          </ChevronArrowSpan>
                      </Link>
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