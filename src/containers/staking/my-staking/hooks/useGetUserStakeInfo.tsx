import useSWR from "swr";

const url =
  "https://services.autoair.xyz/staking/api/aai-staking/user-staking-info";

interface StakeInfoProps {
  aaiPrice: string;
  apyAai: string;
  apyEth: string;
  apyHold: string;
  totalApy: string;
}

function fetcher() {
  return fetch(url).then((res) => res.json());
}

export function useGetUserStakeInfo() {
  const { data, isLoading } = useSWR<StakeInfoProps>(url, fetcher, {
    dedupingInterval: 60000,
  });

  return { data, isLoading };
}
