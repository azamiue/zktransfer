"use client";

import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";

export default function LoginNewTransfer() {
  const router = useRouter();

  const handleRegister = () => {
    router.push("/new-transfer/sign-up");
  };

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    if (username === "thainguyen12.work@gmail.com" && password === "Thai2003") {
      alert("Login successfully");
      router.push("/new-transfer/sign-in/managements");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col justify-center items-center gap-y-3 w-full h-full">
        <div className="text-[20px]">Wallet Management With Login</div>
        <div className="flex items-center justify-center gap-x-3">
          <div className="flex flex-col gap-y-3">
            <Input
              type="string"
              label="Username or Email"
              className="w-[500px]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type={isVisible ? "text" : "password"}
              label="Password"
              className="w-[500px]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label="  toggle password visibility"
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
            />
            <div className="flex items-center justify-center gap-x-3">
              <div>
                <Button
                  color="primary"
                  className="h-[56px]"
                  onClick={handleClick}
                >
                  Confirm
                </Button>
              </div>
              <div>
                <Button
                  color="secondary"
                  className="h-[56px]"
                  onClick={handleRegister}
                >
                  Don&apos;t Have Account? Register now!
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
