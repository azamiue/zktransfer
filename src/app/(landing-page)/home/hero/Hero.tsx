import classNames from "classnames";
import VideoComponent from "../Video";
import { Button } from "./button";

export function Hero() {
  return (
    <section
      className={classNames(
        "hero-section overflow-hidden relative px-[16px] lg:px-[40px] min-h-[100vh] bg-cover bg-bottom bg-no-repeat pt-[56px] pb-[24px] flex flex-col justify-between"
      )}
    >
      <div className="relative z-10 flex-1 flex flex-col justify-center md:justify-start gap-[40px] md:gap-[80px] 2xl:gap-[100px] items-center mt-[40px] md:mt-[80px] 2xl:mt-[100px]">
        <div className="hidden max-w-[563px] md:flex flex-col items-center gap-[4px] p-4"></div>

        <Button />
      </div>

      <VideoComponent />
    </section>
  );
}
