import { Skeleton, SkeletonProps } from "@nextui-org/react";
import { ReactNode } from "react";

interface Props extends SkeletonProps {
  isLoading: boolean;
  children: ReactNode;
}

export default function SkeletonView(props: Props) {
  const { children, isLoading, className, ...prop } = props;
  return (
    <>
      {isLoading ? (
        <Skeleton
          className={`flex rounded-xl w-full h-10 my-auto ${className}`}
          {...prop}
        />
      ) : (
        children
      )}
    </>
  );
}
