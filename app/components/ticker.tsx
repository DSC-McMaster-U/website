import Image from 'next/image';

interface TickerProps {
  items: { id: string; src: string; alt: string }[];
}

const Ticker: React.FC<TickerProps> = ({ items }) => {
  return (
    <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 animate-infinite-scroll">
        {items.map((item) => (
          <li key={item.id}>
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32">
              <Image src={item.src} alt={item.alt} layout="fill" objectFit="contain" />
            </div>
          </li>
        ))}
      </ul>
      {/* Duplicate the same list for the infinite scroll effect */}
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 animate-infinite-scroll" aria-hidden="true">
        {items.map((item) => (
          <li key={`${item.id}-duplicate`}>
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32">
              <Image src={item.src} alt={item.alt} layout="fill" objectFit="contain" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ticker;
