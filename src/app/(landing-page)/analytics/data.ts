import useSWR from "swr";

export type DataOverview = {
  users: string;
  walletBalance: string;
  walletCreated: string;
};

export type DataBalanceTotalUser = {
  eth: string;
  zkSync: string;
};

async function getDataBalanceTotalUser() {
  try {
    const res = await fetch(
      "https://services.autoair.xyz/analytic/api/v1/statistic/balance"
    );
    if (!res.ok) {
      throw new Error("Error");
    }

    const data: Promise<DataBalanceTotalUser | any> = res.json();

    return data;
  } catch {}
}

async function getData(tab: { type: string }) {
  const [resDataAnalytics] = await Promise.all([
    fetch(`/api/analytics?${tab.type}`),
  ]);

  if (!resDataAnalytics.ok) {
    throw new Error("Error");
  }

  const dataAnalytics = await resDataAnalytics.json();

  return {
    dataAnalytics,
  };
}

export function useData(tab: { type: string }) {
  return useSWR(tab, getData);
}

export function useDataBalanceTotalUser() {
  return useSWR("getDataBalanceTotalUser", getDataBalanceTotalUser);
}
