
const Tag = ({ children, className }: { children: React.ReactNode, className: string }) => (
    <div className={`${className} flex-row rounded-md p-2 w-fit h-fit flex items-center gap-x-1.5`}>
        {children}
    </div>
);

export default Tag;
