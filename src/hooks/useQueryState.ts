import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type QueryState<T> = {
  state: Record<string, string> | T;
  setQueryState: (query: Record<string, string> | T) => void;
};

export function useQueryState<T>(
  initState: Record<string, string>
): QueryState<T> {
  const [state, setState] = useState<Record<string, string> | T>(initState);

  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const setQueryState: QueryState<T>["setQueryState"] = (query) => {
    const queryString = new URLSearchParams(
      query as Record<string, string>
    ).toString();

    const newPathName = `${pathname}?${queryString}`;

    router.push(newPathName);
  };

  useEffect(() => {
    if (!searchParams.toString()) return setQueryState(initState);

    const queryString = searchParams.toString();

    const queryObject: Record<string, string> = {};

    queryString.split("&").forEach((pair) => {
      const [key, value] = pair.split("=");
      queryObject[key] = value;
    });

    setState((prev) => ({
      ...prev,
      ...queryObject,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  return { state, setQueryState };
}
