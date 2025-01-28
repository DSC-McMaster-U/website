
interface CTACardProps {
    Image?: React.ReactNode;
    Content: React.ReactNode;
    CTA: React.ReactNode;
}

const CTACard = ({ Image, Content, CTA }: CTACardProps) => {
    return (
      <div
        className={`relative group ${
          Image ? "h-96 md:h-[32rem]" : "h-72"
        } bg-white-02 dark:bg-black-03 rounded-md overflow-hidden shadow-lg p-1 w-1/3`}
      >
        {/* Image Section */}
        {Image && (
          <div className="relative h-72 overflow-hidden rounded-md transition-all duration-200 ease-in-out bg-white-01 dark:bg-black-01">
            {Image}
          </div>
        )}
  
        {/* Content Section */}
        <div className="p-4 flex flex-col gap-y-2">{Content}</div>
  
        {/* CTA Section */}
        <div
          className="absolute bottom-0 left-0 p-4 transition-transform duration-300 ease-in-out transform translate-y-full group-hover:translate-y-0"
        >
          {CTA}
        </div>
      </div>
    );
  };
  

export default CTACard;
