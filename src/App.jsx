import { useState } from "react";
import Jogo from "./components/Jogo";

export default function App() {
    const [player, setPlayer] = useState("X");
    const [winner, setWinner] = useState(null);

    const [boxes, setBox] = useState([
        { id: 1, content: "" },
        { id: 2, content: "" },
        { id: 3, content: "" },
        { id: 4, content: "" },
        { id: 5, content: "" },
        { id: 6, content: "" },
        { id: 7, content: "" },
        { id: 8, content: "" },
        { id: 9, content: "" },
    ]);

    const winPatterns = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7],
    ];

    function onBoxClick(boxId) {
        if (winner) return;

        const newBoxes = boxes.map((box) => {
            if (box.id === boxId) {
                // Verifica se a caixa está vazia e pode er preenchida
                if (box.content === "") {
                    setPlayer(player === "X" ? "O" : "X");
                    return { ...box, content: player };
                }
            }
            return box;
        });
        setBox(newBoxes);
        verifyResult(newBoxes);
    }

    function verifyResult(currentBoxes) {
        winPatterns.map((pattern) => {
            const [a, b, c] = pattern;
            const boxA = currentBoxes.find((box) => box.id === a).content;
            const boxB = currentBoxes.find((box) => box.id === b).content;
            const boxC = currentBoxes.find((box) => box.id === c).content;

            if (boxA && boxA === boxB && boxA === boxC) {
                setWinner(boxA);
                return;
            }

            if (currentBoxes.every((box) => box.content !== "")) {
                setWinner("Empate");
            }
        });
    }

    return (
        <div className="w-screen h-screen flex flex-col text-center bg-gray-400">
            <div className="mt-8 mb-2">
                <h1 className="text-3xl font-bold text-amber-100">
                    Jogo da Velha
                </h1>
                <p className="text-xl font-bold text-black">
                    Vez do jogador: {player}
                </p>
            </div>
            <Jogo boxes={boxes} onBoxClick={onBoxClick} />
            <p className="mt-2 text-3xl font-bold">
                {winner
                    ? `Fim de jogo: ${winner} ${
                          winner != "Empate" ? "venceu" : ""
                      }`
                    : null}
            </p>
        </div>
    );
}
