"use client";

import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";

export default function LoginNewTransfer() {
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const handleConfirm = () => {
    if (password !== rePassword) {
      alert("Passwords do not match");
      return;
    } else {
      router.push("/new-transfer/sign-in");
    }
  };

  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col justify-center items-center gap-y-3 w-full h-full">
        <div className="text-[20px]">Wallet Management With Sign Up</div>
        <div className="flex items-center justify-center gap-x-3">
          <div className="flex flex-col gap-y-3">
            <Input
              type="string"
              label="Username or Email"
              className="w-[500px]"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <Input
              type={isVisible ? "text" : "password"}
              label="Password"
              className="w-[500px]"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label="toggle password visibility"
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              type={isVisible ? "text" : "password"}
              label="Re-enter password"
              className="w-[500px]"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label="toggle password visibility"
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
            />
            <div className="mx-auto">
              <Button
                color="primary"
                className="h-[56px]"
                onClick={handleConfirm}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
