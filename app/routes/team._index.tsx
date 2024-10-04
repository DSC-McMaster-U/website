import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Team | GDSC McMaster U" },
    { name: "description", content: "Our team here at GDSC McMaster U" },
  ];
};

const TeamPage = () => {
  return (
    <div>
      <h1>Team</h1>
    </div>
  );
};

export default TeamPage;
