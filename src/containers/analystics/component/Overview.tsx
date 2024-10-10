"use client";

import { memo, useMemo } from "react";
import { useDataBalanceTotalUser } from "../../../app/(landing-page)/analytics/data";
import Box from "./Box";

type Props = {
  data:
    | {
        dataAnalytics: any;
      }
    | undefined;
  isLoading: boolean;
};

function ChartBox({ data }: { data: any }) {
  const dataMap = data
    .slice(-7, data.length)
    .map(
      (item: any) =>
        Number(item?.count_wallet?.replace(/,/g, "")) ||
        Number(item?.count_user?.replace(/,/g, ""))
    );

  const maxNumber = Math.max(...dataMap);

  return (
    <ul className="flex items-end gap-x-1 translate-y-[5%] md:translate-y-[10%]">
      {dataMap.map((item: number, index: number) => {
        const percent = (item / maxNumber) * 40;
        return (
          <li
            key={index}
            className={` ${
              index === dataMap.length - 1 ? "bg-black" : "bg-[#A7AEAD]"
            } hover:bg-black w-[3px]`}
            style={{ height: percent + "px" }}
          />
        );
      })}
    </ul>
  );
}

const CHAINS = [
  {
    name: "zkSync",
    key: "zkSync",
    value: "30%",
    color: "#000",
  },
  {
    name: "Ethereum",
    key: "eth",
    value: "20%",
    color: "#8785FF",
  },
];

const SvgIconETH = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={224} height={224} fill="none">
    <path
      fill="#627EEA"
      d="M112 224c61.856 0 112-50.144 112-112S173.856 0 112 0 0 50.144 0 112s50.144 112 112 112Z"
    />
    <g fill="#fff">
      <path
        fillOpacity={0.602}
        d="M115.486 28v62.09l52.479 23.45L115.486 28Z"
      />
      <path d="M115.486 28 63 113.54l52.486-23.45V28Z" />
      <path
        fillOpacity={0.602}
        d="M115.486 153.776v42.189L168 123.312l-52.514 30.464Z"
      />
      <path d="M115.486 195.965v-42.196L63 123.312l52.486 72.653Z" />
      <path
        fillOpacity={0.2}
        d="m115.486 144.011 52.479-30.471-52.479-23.436v53.907Z"
      />
      <path
        fillOpacity={0.602}
        d="m63 113.54 52.486 30.471V90.104L63 113.54Z"
      />
    </g>
  </svg>
);

const SvgIconETHMobile = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={57} height={57} fill="none">
    <g clipPath="url(#a)">
      <path
        fill="#627EEA"
        d="M28.204 56.63c15.577 0 28.205-12.616 28.205-28.18C56.409 12.889 43.78.273 28.204.273 12.627.272 0 12.888 0 28.45c0 15.563 12.627 28.18 28.204 28.18Z"
      />
      <path
        fill="#fff"
        fillOpacity={0.602}
        d="M29.082 7.316v15.622l13.216 5.9L29.082 7.316Z"
      />
      <path fill="#fff" d="M29.082 7.316 15.865 28.838l13.217-5.9V7.316Z" />
      <path
        fill="#fff"
        fillOpacity={0.602}
        d="M29.082 38.962v10.614l13.224-18.279-13.224 7.665Z"
      />
      <path fill="#fff" d="M29.082 49.577V38.96l-13.217-7.663 13.217 18.28Z" />
      <path
        fill="#fff"
        fillOpacity={0.2}
        d="m29.082 36.505 13.216-7.667-13.216-5.896v13.563Z"
      />
      <path
        fill="#fff"
        fillOpacity={0.602}
        d="m15.865 28.838 13.217 7.667V22.942l-13.217 5.896Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 .272h56.409V56.63H0z" />
      </clipPath>
    </defs>
  </svg>
);

function TotalBalanceView() {
  const { data } = useDataBalanceTotalUser();
  const total = Number(data?.zkSync ?? 0) + Number(data?.eth ?? 0);

  const dataList = useMemo(() => {
    return CHAINS.map((item) => ({
      ...item,
      value: (data?.[item.key] / total) * 100 + "%",
    }));
  }, [data, total]);

  return (
    <>
      <div className="mx-4 md:mx-10">
        <h2 className="mb-4 md:mb-9 text-2xl font-medium">
          Total Users Balance
        </h2>

        <div className="flex items-center justify-center gap-x-2 md:gap-x-8 mb-[64px]">
          <div className="hidden md:block">
            <SvgIconETH />
          </div>
          <div className="block md:hidden">
            <SvgIconETHMobile />
          </div>

          <p className="text-balance truncate text-[70px] md:text-[100px] lg:text-[140px] xl:text-[200px] 2xl:text-[254px] leading-[1]">
            {total.toFixed(2)} ETH
          </p>
        </div>
      </div>

      <div className="flex  md:justify-end mx-4 md:mx-[60px]">
        <div className="flex flex-col md:flex-row items-center gap-x-[87px] w-full md:w-[70%]">
          <ul className="grid grid-rows-1 grid-flow-col gap-4 gap-x-10 w-full md:w-auto">
            {dataList.map((item, index) => (
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
              {dataList.map((item, index) => (
                <li
                  key={index}
                  className="h-8 md:h-[64px]"
                  style={{ backgroundColor: item.color, width: item.value }}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

const TotalBalance = memo(TotalBalanceView);

export default function Overview({ data, isLoading }: Props) {
  return (
    <div className="mt-4 md:mt-6 mb-[62px] pb-[64px] bg-white">
      <div className="flex flex-col  md:flex-row justify-between border border-solid border-transparent border-y-[#E1E2E2]  mb-8 md:mb-[60px]">
        <div className="flex-1 flex items-center md:gap-x-4 ml-4 md:pl-10">
          <Box
            isLoading={isLoading}
            title="Wallets Created"
            number={Number(
              Number(
                data?.dataAnalytics?.data?.dataDailyCreatedWallets
                  ?.at(-1)
                  ?.count_wallet?.replace(/,/g, "")
              ) ?? 0
            )}
          >
            <ChartBox
              data={data?.dataAnalytics?.data?.dataDailyCreatedWallets ?? []}
            />
          </Box>
        </div>
        <div className="flex-1 flex justify-start pl-4 md:pl-0 md:justify-center border border-solid  border-y-[#E1E2E2] md:border-transparent  md:border-x-[#E1E2E2]">
          <Box
            isLoading={isLoading}
            title="Wallets with Balance"
            number={Number(
              data?.dataAnalytics.data.dataWalletWithBalance
                ?.at(-1)
                ?.count_wallet?.replace(/,/g, "") ?? 0
            )}
          >
            <ChartBox
              data={data?.dataAnalytics.data.dataWalletWithBalance ?? []}
            />
          </Box>
        </div>
        <div className="flex-1 flex items-center gap-x-3 justify-start md:justify-end pl-4 md:pr-10 md:mr-4 ">
          <Box
            isLoading={isLoading}
            title="Users"
            number={Number(
              data?.dataAnalytics.data.dataDailyNewUsers
                ?.at(-1)
                ?.count_user?.replace(/,/g, "") ?? 0
            )}
          >
            <ChartBox data={data?.dataAnalytics.data.dataDailyNewUsers ?? []} />
          </Box>
        </div>
      </div>
      <TotalBalance />
    </div>
  );
}
