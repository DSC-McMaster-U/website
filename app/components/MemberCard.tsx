
interface MemberCardProps {
    Image: React.ReactNode;
    Content: React.ReactNode;
    CTA?: React.ReactNode;
}

const MemberCard = ({ Image, Content, CTA }: MemberCardProps) => {
    return (
        <div className="relative group w-full h-[22rem] bg-white-02 dark:bg-black-02 rounded-md overflow-hidden shadow-sm p-1">
            <div className={`${CTA && "hover-none:h-54 group-hover:h-54"} relative h-64 overflow-hidden rounded-md transition-all duration-200 ease-in-out bg-white-01 dark:bg-black-01 items-center flex justify-center`}>
                {Image}
            </div>
            <div className="p-4 flex flex-col gap-y-2 min-w-64">
                {Content}
            </div>
            {CTA &&
                <div className="absolute bottom-0 left-0 w-full p-4 transition-transform duration-300 ease-in-out transform translate-y-full group-hover:translate-y-0 hover-none:translate-y-0">
                    {CTA}
                </div>
            }
        </div>
    );
}

export default MemberCard;
