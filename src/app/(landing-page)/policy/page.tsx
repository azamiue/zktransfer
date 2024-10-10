import classNames from "classnames";
import { policy_data } from "./data";

export default function TermService() {
  return (
    <section className="pt-[56px] mx-[16px] md:mx-auto max-w-[672px] mb-[100px]">
      <h2 className="mt-[24px] lg:mt-[64px] text-[48px] lg:text-[80px] leading-[56px] lg:leading-[80px] font-medium text-black mb-[24px] lg:mb-[40px]">
        Privacy Policy
      </h2>

      <p className="text-[24px] leading-[32px] text-[#686A6C]">
        This Privacy Policy describes how AutoAir AI (&ldquo;we&rdquo;,
        &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects, uses, and shares your
        personal information when you use our website, telegram bot, and related
        services (collectively, the &ldquo;Service&rdquo;). By using the
        Service, you agree to the collection and use of information in
        accordance with this Privacy Policy.
      </p>

      <div className="w-full my-[32px] h-[1px] bg-[#686A6C]" />

      <ul className="flex flex-col gap-[32px]">
        {policy_data.map((item, idx) => {
          return (
            <li key={idx} className="flex flex-col gap-[8px]">
              {Object.keys(item).map((key, iid) => {
                return (
                  <p
                    key={`123-${iid}`}
                    className={classNames(
                      {
                        "text-[20px] leading-[28px] font-medium text-black":
                          iid === 0,
                      },
                      {
                        "text-[18px] leading-[26px] font-medium tracking-[-0.32px] text-[#686A6C]":
                          iid !== 0,
                      }
                    )}
                  >
                    {(item as any)[key]}
                  </p>
                );
              })}
            </li>
          );
        })}
      </ul>

      {/* <div className="w-full my-[32px] h-[1px] bg-[#686A6C]" />

      <p className="text-[24px] leading-[32px] text-black mb-[64px]">
        By using AutoAir AI, you acknowledge that you have read, understood, and
        agree to be bound by these Terms.
      </p> */}
    </section>
  );
}
