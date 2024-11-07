"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Balance } from "./balance";
import { PrivateKey } from "./pk";
import { transferSchema, TransferSchema } from "./type";

export default function Home() {
  const methods = useForm<TransferSchema>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      pk: "",
      wallet: "",
      tx: "",
      loading: false,
      success: false,
      fail: false,
      txFail: false,
      txSuccess: false,
    },
  });

  const { control, setValue } = methods;

  const success = useWatch({ control, name: "success" });
  const fail = useWatch({ control, name: "fail" });
  const txFail = useWatch({ control, name: "txFail" });
  const txSuccess = useWatch({ control, name: "txSuccess" });
  const wallet = useWatch({ control, name: "wallet" });
  const tx = useWatch({ control, name: "tx" });

  console.log("tx", tx);

  useEffect(() => {
    if (success) {
      toast.success(`Connected successfully`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      toast.success(`${wallet}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }

    if (fail) {
      toast.error("Invalid private key", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      setValue("fail", false);
    }

    if (txFail) {
      toast.error("Error in sending transaction", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      setValue("txFail", false);
    }

    if (txSuccess) {
      toast.success(`Transfer Successfully`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      toast.success(`${tx}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      setValue("loading", false);
    }
  }, [fail, setValue, success, tx, txFail, txSuccess, wallet]);

  return (
    <div>
      <ToastContainer />
      <div className="w-screen h-screen bg-gradient-to-r from-green-400 to-blue-500">
        <div className="w-full h-full flex justify-center items-center">
          <div className="p-16 relative rounded-lg overflow-hidden">
            <div className="absolute inset-0 border-2 border-transparent rounded-lg bg-white/30 backdrop-blur-2xl pointer-events-none"></div>
            <div className="relative z-10">
              {!success && (
                <FormProvider {...methods}>
                  <PrivateKey />
                </FormProvider>
              )}
              {success && (
                <FormProvider {...methods}>
                  <Balance />
                  <h1>{tx}</h1>
                </FormProvider>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
