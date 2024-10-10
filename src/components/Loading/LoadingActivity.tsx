import { Spinner } from "@nextui-org/react";

export function LoadingActivity() {
  return <Spinner color="white" size="md" />;
}

export function LoadingActivityBlack() {
  return (
    <Spinner
      classNames={{
        circle1: "border-b-[black]",
        circle2: "border-b-[black]",
      }}
      size="sm"
    />
  );
}
