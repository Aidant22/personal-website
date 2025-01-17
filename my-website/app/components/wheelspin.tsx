"use client";
import { useEffect, useState, useRef } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Chart } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const prizes = [
  { value: "A new car", color: "#8f7f8f", label: "ai" },
  { value: "A mac book", color: "#f97066", label: "be" },
  { value: "An IPad", color: "#2e90fa", label: "ci" },
  { value: "Lump of Coal", color: "#fdb022", label: "de" },
  { value: "Designer Clothes", color: "#ee46bc", label: "ei" },
  { value: "Nothing, Nada, Zilch", color: "#854CFF", label: "fe" },
];

export default function WheelSpin() {
  const [countdown, setCountdown] = useState<number>(20);
  const [nextRoundCountdown, setNextRoundCountdown] = useState<number>(10);
  const [nextRoundOn, setNextRoundOn] = useState<boolean>(false);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);
  const [randomRotation, setRandomRotation] = useState<number>(0);
  const [prizeWon, setPrizeWon] = useState<string>("");
  const chartRef = useRef<ChartJS<
    "doughnut",
    (number | [number, number] | any | any | any)[],
    unknown
  > | null>(null);

  const data = {
    datasets: [
      {
        data: prizes.map((prize) => prize.value),
        backgroundColor: prizes.map((prize) => prize.color),
        borderColor: prizes.map((prize) => prize.color),
        cutout: "67%",
        rotation: randomRotation,
      },
    ],
    hoverOffset: 3,
  };

  function Rotation() {
    const chart = chartRef.current;
    if (chart) {
      const randomRotation = Math.random() * 3333;
      setRandomRotation(randomRotation);
      chart.update();
    }
  }

  //   useEffect(() => {
  //     let value = Math.random() * 20000;
  //     setPrizeWon(parseFloat(value.toFixed(2)))
  //   })

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setSpinning(true);
      Rotation();
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * prizes.length);
        setWinnerIndex(randomIndex);
        setNextRoundCountdown(10);
        setNextRoundOn(true);
      }, 2000);
    }
  }, [countdown]);

  useEffect(() => {
    if (nextRoundOn && nextRoundCountdown > 0) {
      const timer = setInterval(() => {
        setNextRoundCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (nextRoundOn && nextRoundCountdown === 0) {
      setNextRoundOn(false);
      setCountdown(10);
    }
  }, [nextRoundOn, nextRoundCountdown]);

  const circleSize = 200;
  const circleRadius = circleSize / 2;
  const circumference = 2 * Math.PI * circleRadius;
  const progress = ((10 - countdown) / 10) * circumference;

  return (
    <div className="relative w-[340px] h-[340px] md:w-[410px] md:h-[410px] flex items-center justify-center p-4">
      <div
        onClick={Rotation}
        className="absolute cursor-pointer top-1/2 left-1/2 transform -translate-x-1/2 text-2xl font-bold text-center z-10 text-white"
      >
        {countdown > 0 ? (
          <div className="flex -mt-12 flex-row justify-center text-2xl font-bold text-green-400">
          </div>
        ) : winnerIndex !== null && nextRoundOn ? (
          <div className="flex items-center flex-col">
            <div className="flex -mt-12 flex-row justify-center text-2xl font-bold text-green-400">
            </div>
            <div className="flex items-center flex-row justify-center uppercase font-bold text-gray-200">
              Winner: {prizes[winnerIndex].value}
            </div>
            {nextRoundOn && (
              <div className="flex items-center flex-row justify-center text-sm text-gray-500">
                Next Round: {nextRoundCountdown}
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center flex-row justify-center uppercase font-bold text-gray-200">
            Spinning...
          </div>
        )}
      </div>
      <div className="relative w-[300px] h-[300px] md:w-[368px] md:h-[368px] p-4">
        <Doughnut
          data={data}
          options={{ plugins: { legend: { display: false } }, rotation: -90 }}
          ref={chartRef}
        />
        <svg
          className="absolute top-0 left-0 w-[300px] h-[300px] md:w-[368px] md:h-[368px] pointer-events-none -rotate-90"
          viewBox={`0 0 ${circleSize + 11} ${circleSize + 11}`}
        >
          <circle
            className="fill-none stroke-gray-500"
            cx="50%"
            cy="50%"
            r={circleRadius}
            strokeWidth="2"
          />
          <circle
            className="fill-none stroke-white transition-all duration-1000"
            cx="50%"
            cy="50%"
            r={circleRadius}
            strokeWidth="2"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
          />
        </svg>
        <div
          id="arrow-icon"
          className="absolute top-1.5 md:top-[7px] left-1/2 transform -translate-x-1/2 text-white rotate-180"
        >
          <svg
            className="h-7 w-7 text-white z-20"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 22 22 2 22"></polygon>
          </svg>
        </div>
      </div>
    </div>
  );

}
