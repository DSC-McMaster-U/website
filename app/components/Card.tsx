import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';

interface CardProps {
    title?: string;
    description?: string;
    icon?: React.ReactNode;
    image?: {
        src: string;
        alt: string
    };
    children?: React.ReactNode;
    CTA?: React.ReactNode;
    className?: string;
};

const Card = ({title, description, icon, image, children, CTA, className}: CardProps) => {

    return (
        <div className={`${CTA && "pb-12"} relative p-4 group overflow-hidden flex flex-col items-center justify-start w-full h-full bg-white-02 dark:bg-black-02 rounded-lg shadow-lg ${className}`}>
            {image && (
                <Image 
                    src={urlFor(image.src).url()} 
                    alt={image.alt} 
                    width={200} // Set appropriate dimensions
                    height={100}
                    className='object-cover w-full max-h-60'
                />
            )}
            {(icon || title || description) && (
                <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_auto] w-full h-fit p-4 gap-x-2 gap-y-1 text-start">
                    {icon && (
                        <div className="w-8 col-start-1 row-start-1 items-center">
                            {icon}
                        </div>  
                    )}
                    {title && (
                        <span className="text-lg font-semibold col-start-2 row-start-1">
                            {title}
                        </span>
                    )}
                    {description && (
                        <span className="text-white-03 col-start-2 row-start-2">
                        {description}
                        </span>
                    )}
                </div>
            )}
            {children}
            { CTA && (
                <div className="absolute bottom-0 left-0 w-fit p-4 transition-transform duration-300 ease-in-out transform translate-y-full group-hover:translate-y-0 hover-none:translate-y-0">
                    {CTA}
                </div>
            )}
        </div>
    )
}

export default Card;
