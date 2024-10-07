import Image from 'next/image';

interface TickerProps {
  items: { id: string; src: string; alt: string }[];
}

const Ticker: React.FC<TickerProps> = ({ items }) => {
  return (
    <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
        {items.map((item) => (
          <li key={item.id}>
            <Image src={item.src} alt={item.alt} height={100} width={100} />
          </li>
        ))}
      </ul>
      {/* Duplicate the same list for the infinite scroll effect */}
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
        {items.map((item) => (
          <li key={`${item.id}-duplicate`}>
            <Image src={item.src} alt={item.alt} height={100} width={100} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ticker;
