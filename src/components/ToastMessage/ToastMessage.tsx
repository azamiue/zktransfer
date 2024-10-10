import Image from "next/image";
import { ToastOptions, toast } from "react-toastify";

function MessageBlock(props: {
  isError?: boolean;
  title: string;
  description: string;
}) {
  const { isError, title, description, ...rest } = props;

  return (
    <div className="flex items-center justify-between gap-[16px]">
      <Image
        src={isError ? "/staking/info-warning.svg" : "/staking/success.svg"}
        width={32}
        height={32}
        alt="Status"
      />
      <div className="flex-1">
        <p className="text-[16px] leading-[24px] -tracking-[0.32px] text-[#121212]">
          {title}
        </p>
        <p className="text-[14px] leading-[20px] -tracking-[0.28px] text-[#525252]">
          {description}
        </p>
      </div>

      <button onClick={() => (rest as any).closeToast()}>
        <Image src={"/icon/close.svg"} width={24} height={24} alt="close" />
      </button>
    </div>
  );
}

interface ToastMessageProps {
  title: string;
  description: string;
  opts?: ToastOptions;
}

export const ToastMessage = {
  success: (props: ToastMessageProps) => {
    const { title, description, opts } = props;

    return toast.success(
      <MessageBlock title={title} description={description} />,
      {
        className: "!mb-[0px] !rounded-full !px-[24px] !py-[12px]",
        ...opts,
      }
    );
  },

  error: (props: ToastMessageProps) => {
    const { title, description, opts } = props;

    return toast.success(
      <MessageBlock isError title={title} description={description} />,
      {
        className: "!mb-[0px] !rounded-full !px-[24px] !py-[12px]",
        ...opts,
      }
    );
  },
};
