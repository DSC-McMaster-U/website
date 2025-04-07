"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Icons from "react-icons/md";
import { Project } from "@/types/sanity";
import { urlFor } from "@/sanity/lib/image";

interface InfiniteCarouselProps {
  projects: Project[];
}

const InfiniteCarousel: React.FC<InfiniteCarouselProps> = ({ projects }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollWidth = el.scrollWidth / 2;
    const speed = 0.5;
    let frameId: number;

    const scroll = () => {
      if (!el) return;
      el.scrollLeft += speed;

      if (el.scrollLeft >= scrollWidth) {
        el.scrollLeft = 0;
      }

      frameId = requestAnimationFrame(scroll);
    };

    frameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="relative overflow-x-auto scrollbar-hide" ref={scrollRef}>
      <div className="flex w-max">
        {[...projects, ...projects].map(({ _key, name, image, link }, idx) => (
          <div className="flex flex-col gap-y-2 mr-4" key={`${_key}-${idx}`}>
            <Link href={link} target="_blank" rel="noreferrer">
              <div className="h-40 w-40 md:w-64 rounded-xl bg-white-03 dark:bg-black-03 flex items-center justify-center">
                {image ? (
                  <Image
                    src={urlFor(image.asset).url()}
                    alt={name}
                    width={150}
                    height={150}
                  />
                ) : (
                  <Icons.MdCode size={200} className="text-2xl" />
                )}
              </div>
            </Link>
            <div className="flex flex-col items-center w-40 md:w-64">
              <span className="break-words text-center max-w-full">{name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteCarousel;
