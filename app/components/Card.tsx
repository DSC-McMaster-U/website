import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import CardGradientBackground from './svgs/CardGradientBackground';

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
    imageWidth?: number;
    imageHeight?: number;
};

const Card = ({title, description, icon, image, children, CTA, className, imageHeight, imageWidth}: CardProps) => {

    return (
        <div className={`${CTA && "pb-12"} relative p-4 card-group overflow-hidden flex flex-col items-center justify-start w-full h-full bg-white-02 dark:bg-black-02 rounded-lg shadow-lg ${className}`}>
            {image && (
                <div className='relative flex items-center justify-center w-full h-full'>
                    <CardGradientBackground className="relativew-full h-fit z-0" />
                    <Image 
                        src={urlFor(image.src).url()} 
                        alt={image.alt} 
                        width={imageWidth ? imageWidth: 200}
                        height={imageHeight ? imageHeight : 100}
                        className='absolute z-10'
                    />
                </div>
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
                <div className="absolute bottom-0 left-0 w-fit p-4 transition-transform duration-300 ease-in-out transform translate-y-full card-group-hover:translate-y-0 hover-none:translate-y-0">
                    {CTA}
                </div>
            )}
        </div>
    )
}

export default Card;
