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
      alert("Sign up successfully");
      router.push("/new-transfer/sign-in");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="relative p-16 rounded-lg overflow-hidden w-[600px]">
        <div className="absolute inset-0 border-2 border-transparent border-opacity-50 rounded-lg bg-white/30 backdrop-blur-lg pointer-events-none"></div>
        <div className="relative z-10 flex flex-col items-center gap-y-4">
          <div className="text-[20px]">Wallet Management With Sign Up</div>
          <Input
            type="string"
            label="Username or Email"
            className="w-full"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            type={isVisible ? "text" : "password"}
            label="Password"
            className="w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          <Input
            type={isVisible ? "text" : "password"}
            label="Re-enter password"
            className="w-full"
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
          <Button
            color="primary"
            className="h-[56px] mt-4"
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
