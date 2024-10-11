
const GradientCard = ({ children }: { children: React.ReactNode}) => {
    return (
        <div className="flex flex-shrink-0 snap-center flex-col gap-y-6 w-full h-fit p-4">
            {children}
        </div>
    );
};

export default GradientCard;
