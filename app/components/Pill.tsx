
interface PillProps {
    children: React.ReactNode
}

const Pill = ({children}: PillProps) => {

    return (
        <div className="px-4 py-2 w-fit h-fit rounded-full border-black-00 dark:border-white-00 border">
            {children}
        </div>
    )
}

export default Pill;
