import dynamic from "next/dynamic";

const Chart = dynamic(() => import("./Chart"), { ssr: false });

type Props = {
  data: any[];
  isLoading: boolean;
  activeTab: string;
};

export default function Analytics({ data, isLoading, activeTab }: Props) {
  return (
    <div className="bg-white">
      <div className="px-[16px] md:px-[40px] py-[40px] flex flex-col gap-[16px]">
        <h2 className="text-[32px] font-medium leading-[40px]">Analytics</h2>
      </div>

      <div className="h-auto">
        <Chart data={data} loading={isLoading} activeTab={activeTab} />
      </div>
    </div>
  );
}
