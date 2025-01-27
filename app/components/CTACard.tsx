
interface CTACardProps {
    Image?: React.ReactNode;
    Content: React.ReactNode;
    CTA: React.ReactNode;
}

const CTACard = ({ Image, Content, CTA }: CTACardProps) => {
    return (
        <div className={`relative group w-full ${Image ? "h-96 md:h-[32rem]" : "h-72"} bg-white-02 dark:bg-black-02 rounded-md overflow-hidden shadow-lg p-1`}>
            {Image && (
                <div className="relative h-72 overflow-hidden rounded-md transition-all duration-200 ease-in-out hover-none:h-44 group-hover:h-64 bg-white-01 dark:bg-black-01">
                    {Image}
                </div>
            )}
            <div className="p-4 flex flex-col gap-y-2">
                {Content}
            </div>
            <div className="absolute bottom-0 left-0 w-full p-4 transition-transform duration-300 ease-in-out transform translate-y-full group-hover:translate-y-0 hover-none:translate-y-0">
                {CTA}
            </div>
        </div>
    );
}

export default CTACard;
