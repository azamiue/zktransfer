import { groupTime } from "@/util/groudTime";

type Props = {
  data: any[];
};

export default function XAxisChart({ data }: Props) {
  return (
    <ul className="flex justify-between w-[80%] mx-auto">
      {groupTime(data).map((item, index) => (
        <li key={index} className="text-[#666] text-xs">
          {item}
        </li>
      ))}
    </ul>
  );
}
