import Pill from "./Pill";

interface EventsSectionCardProps {
    title?: string;
    description?: string;
    id: string;
    children?: React.ReactNode;
}

const EventsSectionCard = ({ title, description, id, children }: EventsSectionCardProps ) => {
    return (
        <section id={id} className="h-fit w-full bg-white-01 dark:bg-black-01 rounded-xl shadow-md">
            <div id={`${id}-section-card-content`} className="mx-auto px-2 py-8 sm:py-12 lg:py-16 flex flex-col text-center items-center gap-y-12 md:gap-y-16">
                { (title || description) && (
                    <div className="flex flex-col items-center justify-center gap-y-4 max-w-2xl">
                        <Pill>{title}</Pill>
                        <h2>{description}</h2>
                    </div>
                )}
                <div className="text-start w-[98%] items-center flex flex-col gap-y-8">
                    {children}
                </div>
            </div>
        </section>
    )
};

export default EventsSectionCard;