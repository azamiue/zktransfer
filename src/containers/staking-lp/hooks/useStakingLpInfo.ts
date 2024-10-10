import useSWR from "swr";

const BASE_URL = "https://services.autoair.xyz/staking";

const url = `${BASE_URL}/api/staking-lp/user-staking-info`;

export async function fetcher() {
  const res = await fetch(`${BASE_URL}/api/staking-lp/stake-info`);

  if (!res.ok) {
    throw new Error("Error get staking lp info");
  }

  const data = await res.json();
  return data;
}

export function useStakingLpInfo() {
  const { data, isLoading } = useSWR({ key: `getStakingInfoLp` }, fetcher, {
    dedupingInterval: 60000,
  });

  return {
    data,
    isLoading,
  };
}

export interface StakeInfoProps {
  aaiPrice: string;
  apyAai: string;
  apyEth: string;
  apyHold: string;
  totalApy: string;
}

function fetcherUserStakeUserLpInfo() {
  return fetch(url).then((res) => res.json());
}

export function useGetUserStakeUserLpInfo() {
  const { data, isLoading } = useSWR<StakeInfoProps>(
    url,
    fetcherUserStakeUserLpInfo,
    {
      dedupingInterval: 60000,
    }
  );

  return { data, isLoading };
}
