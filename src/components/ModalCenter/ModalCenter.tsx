import { motion } from "framer-motion";
import Image from "next/image";
import { Dispatch, ReactElement, SetStateAction, useRef } from "react";

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function ModalCenter(props: {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  children: ReactElement;
  isHeader?: boolean;
  title: string;
  className?: string;
  clickOutside?: () => void;
  headerClassname?: string;
}) {
  const {
    isVisible,
    setIsVisible,
    children,
    isHeader = false,
    title,
    className,
    clickOutside,
    headerClassname,
  } = props;
  const modalRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {isVisible && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={fadeVariants}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-10 flex items-center justify-center mx-4 mb:mx-0"
        >
          <div
            className="fixed bg-rgba080 inset-0 z-1 "
            onClick={() => {
              if (clickOutside) {
                clickOutside();
              }
              setIsVisible((v) => !v);
            }}
          />

          <div
            ref={modalRef}
            className={`z-50 rounded-2xl w-full max-w-[640px] transition-all ${className}`}
          >
            {isHeader && (
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8" />

                <h2
                  className={`text-[24px] leading-8 font-medium ${headerClassname}`}
                >
                  {title}
                </h2>

                <button
                  className="w-8 h-8 flex justify-center items-center opacity-80 hover:opacity-100 transition-all"
                  onClick={() => setIsVisible((v) => !v)}
                >
                  <Image
                    src={"/staking/close.svg"}
                    width={24}
                    height={24}
                    alt="close"
                  />
                </button>
              </div>
            )}

            {children}
          </div>
        </motion.div>
      )}
    </>
  );
}
