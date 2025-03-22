export default function Jogo(props) {
    return (
        <div className="grid grid-cols-3 grid-rows-3 gap-3 p-3 rounded-2xl self-center w-[400px] h-[400px] bg-black">
            {props.boxes.map((box) => (
                <button
                    key={box.id}
                    onClick={() => props.onBoxClick(box.id)}
                    className="justify-center rounded-2xl text-4xl font-extrabold bg-amber-100"
                >
                    {box.content}
                </button>
            ))}
        </div>
    );
}
