export default function Item(props: any){
    return(
        <div className="font-mono border-2 bg-white drop-shadow border-black min-h-24 items-center w-[80%] flex flex-row">
            <div className="flex flex-col grow-[4] w-full">
                <span className="w-full px-4 py-1 text-xl font-bold">{props.title}</span>
                <span className="w-[60%] sm:w-[85%] px-4 py-1 break-words whitespace-normal">{props.desc}</span>
            </div>
            <div className="grow h-full flex right-4 items-center fixed">
            </div>
        </div>
    )
}