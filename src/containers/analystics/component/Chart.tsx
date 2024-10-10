import Spin from "@/components/Loading/Spin";
import { SuspenseView } from "@/components/SuspenseView";
import dayjs from "dayjs";
import { useState } from "react";
import {
  Bar,
  BarChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  // TODO API GET AGAIN
  data: any;
  loading: boolean;
  activeTab?: string;
};

export function ChartDaily({ data = [], loading }: Props) {
  const [isMobile] = useState(() => window.screen.width < 768);

  if (loading) {
    return (
      <div className="flex justify-center h-full items-center">
        <Spin />
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={400}
        height={500}
        data={data ?? []}
        margin={{
          top: 5,
          right: isMobile ? 10 : 30,
          left: isMobile ? 0 : 20,
          bottom: 5,
        }}
      >
        <XAxis
          orientation="bottom"
          dataKey="start_date"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: isMobile ? 12 : 14 }}
          tickFormatter={(item, index) => {
            const lengthDisplayDate = isMobile ? 8 : 5;
            return index % lengthDisplayDate !== 0 && data.length > 6
              ? ""
              : dayjs(item).format("MMM DD");
          }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12 }}
          dataKey="Count"
        />
        <Tooltip
          cursor={{ strokeWidth: 0, fill: "#F2F2F2" }}
          itemStyle={{ color: "#000" }}
        />
        <Bar
          width={50}
          barSize={isMobile ? 28 : 40}
          dataKey="Count"
          fill="#E1E2E2"
          activeBar={<Rectangle fill="#000" stroke="#000" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default function Chart({ data, loading, activeTab }: Props) {
  const dataChartNewUser = data?.dataDailyNewUsers?.map((item: any) => ({
    start_date:
      item?.start_date ?? item?.week_start_date ?? item?.month_start_date,
    Count: Number(item.count_user.replace(/,/g, "") ?? 0),
  }));

  const dataChartCreateWallet = data?.dataDailyCreatedWallets?.map(
    (item: any) => ({
      start_date:
        item?.start_date ?? item?.week_start_date ?? item?.month_start_date,
      Count: Number(item.count_wallet.replace(/,/g, "") ?? 0),
    })
  );

  return (
    <div className="px-[16px] md:px-[40px] flex flex-col gap-[16px] md:flex-row items-center justify-between">
      <div className="w-full h-[320px] md:h-full border border-solid border-[#E1E2E2] rounded-lg mb-10 ">
        <h2 className="text-2xl font-medium p-4 md:p-8">
          {activeTab === "Today" && "Daily "}
          {activeTab === "Week" && "Weekly "}
          {activeTab === "Month" && "Monthly "}
          Created Wallets
        </h2>
        <SuspenseView className="pb-5">
          <ChartDaily data={dataChartCreateWallet} loading={loading} />
        </SuspenseView>
      </div>

      <div className="w-full h-[320px] md:h-full border border-solid border-[#E1E2E2] rounded-lg mb-10">
        <h2 className="text-2xl font-medium p-4 md:p-8">
          {activeTab === "Today" && "Daily "}
          {activeTab === "Week" && "Weekly "}
          {activeTab === "Month" && "Monthly "} New Users
        </h2>

        <SuspenseView className="pb-5">
          <ChartDaily data={dataChartNewUser} loading={loading} />
        </SuspenseView>
      </div>
    </div>
  );
}
