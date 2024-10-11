
interface ImageCTACardProps {
    Image: React.ReactNode;
    Content: React.ReactNode;
    CTA: React.ReactNode;
}

const ImageCTACard = ({ Image, Content, CTA }: ImageCTACardProps) => {
    return (
        <div className="relative group w-full h-[32rem] bg-white dark:bg-google-grey dark:bg-opacity-10 rounded-md overflow-hidden shadow-lg p-1">
            <div className="relative h-72 overflow-hidden rounded-md transition-all duration-200 ease-in-out hover-none:h-64 group-hover:h-64 bg-google-lightGrey dark:bg-google-black">
                {Image}
            </div>
            <div className="p-4 flex flex-col gap-y-2">
                {Content}
            </div>
            <div className="absolute bottom-0 left-0 w-full p-4 transition-transform duration-300 ease-in-out transform translate-y-full group-hover:translate-y-0 hover-none:translate-y-0">
                {CTA}
            </div>
        </div>
    );
}

export default ImageCTACard;
