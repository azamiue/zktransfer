import { ModalCenter } from "@/components/ModalCenter/ModalCenter";
import { sendGAEvent } from "@next/third-parties/google";
import { Tab, Tabs } from "@nextui-org/react";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { useCallback, useState } from "react";
import { Stake } from "./stake/stake";
import { UnStake } from "./unstake";

export function ButtonActionStake() {
  const { open } = useWeb3Modal();

  const { address } = useWeb3ModalAccount();

  const [modalInfo, setModalInfo] = useState({
    isVisible: false,
    keyInit: "",
  });

  const handleAction = (key: string) => {
    sendGAEvent({
      event: key,
      value: key,
    });

    if (!address) {
      return open();
    }
    setModalInfo({
      isVisible: true,
      keyInit: key,
    });
  };

  const handleCloseModal = useCallback(() => {
    setModalInfo({
      isVisible: false,
      keyInit: "",
    });
  }, []);

  return (
    <>
      <button
        onClick={() => handleAction("unstake")}
        className="flex-1 md:flex-0 px-[24px] py-[12px] rounded-full bg-[#202025] text-[16px] leading-[24px] text-[#FFF]"
      >
        Unstake
      </button>
      <button
        onClick={() => handleAction("stake")}
        className="flex-1 md:flex-0 px-[24px] py-[12px] rounded-full bg-white text-[16px] leading-[24px] text-black"
      >
        Stake
      </button>

      {modalInfo.isVisible && (
        <ModalCenter
          isVisible={modalInfo.isVisible}
          isHeader
          setIsVisible={() =>
            setModalInfo((prev) => ({ ...prev, isVisible: !prev.isVisible }))
          }
          title={"Staking"}
          className="bg-white !max-w-[440px] w-full p-[24px] mb-[24px]"
        >
          <Tabs
            defaultSelectedKey={modalInfo.keyInit}
            aria-label="Tabs stake"
            classNames={{
              base: "flex items-center justify-center",
            }}
          >
            <Tab key="stake" title="Stake">
              <Stake onActionSuccess={handleCloseModal} />
            </Tab>

            <Tab key="unstake" title="Unstake">
              <UnStake onActionSuccess={handleCloseModal} />
            </Tab>
          </Tabs>
        </ModalCenter>
      )}
    </>
  );
}
