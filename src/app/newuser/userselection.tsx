"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const UserTypeSelector = () => {
  const router = useRouter();

  const handleUserTypeSelection = (isNewUser: any) => {
    if (isNewUser) {
      router.push("/new-transfer/sign-in");
    } else {
      router.push("/transfer");
    }
  };

  return (
    <div>
      <div className="flex gap-x-3">
        <Button
          color="primary"
          size="lg"
          className="w-[200px]"
          onClick={() => handleUserTypeSelection(false)}
        >
          Existing User
        </Button>
        <Button
          color="secondary"
          size="lg"
          className="w-[200px]"
          onClick={() => handleUserTypeSelection(true)}
        >
          New User
        </Button>
      </div>
    </div>
  );
};

export default UserTypeSelector;
