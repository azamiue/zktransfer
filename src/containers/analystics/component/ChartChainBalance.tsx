type Props = {};

const CHAINS = [
  {
    name: "zkSync",
    value: "30%",
    color: "#000",
  },
  {
    name: "Ethereum ",
    value: "20%",
    color: "#8785FF",
  },
];

export function ChartChainBalance({}: Props) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-x-[87px] w-full md:w-[70%]">
      <ul className="grid grid-rows-2 grid-flow-col gap-4 gap-x-10 w-full md:w-auto">
        {CHAINS.map((item, index) => (
          <li key={index} className="flex gap-x-2 md:justify-between ">
            <div
              className="w-5 h-5 rounded-s-md rounded-t-md border border-solid border-black"
              style={{ backgroundColor: item.color }}
            />
            <p>{item.name}</p>
          </li>
        ))}
      </ul>
      <div className="flex-1 w-full mt-10 md:mt-auto">
        <ul className="flex basis-1/3 w-full border border-solid border-black">
          {CHAINS.map((item, index) => (
            <li
              key={index}
              className="h-8 md:h-[64px]"
              style={{ backgroundColor: item.color, width: item.value }}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
