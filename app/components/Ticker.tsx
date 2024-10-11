
interface TickerProps {
  children: React.ReactNode;
}

const Ticker = ({ children }: TickerProps) => {
  return (
    <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 animate-infinite-scroll">
        {children}
      </ul>
      {/* Duplicate the same list for the infinite scroll effect */}
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 animate-infinite-scroll" aria-hidden="true">
        {children}
      </ul>
    </div>
  );
};

export default Ticker;
