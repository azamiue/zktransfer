import { term_data } from "./data";

export default function TermService() {
  return (
    <section className="pt-[56px] mx-[16px] md:mx-auto max-w-[672px]">
      <h2 className="mt-[24px] lg:mt-[64px] text-[48px] lg:text-[80px] leading-[56px] lg:leading-[80px] font-medium text-black mb-[24px] lg:mb-[40px]">
        Terms of Service
      </h2>

      <p className="text-[24px] leading-[32px] text-[#686A6C]">
        Welcome to AutoAir AI! These Terms of Service (&ldquo;Terms&rdquo;)
        govern your access to and use of the AutoAir AI website, telegram bot,
        and related services (collectively, the `&ldquo;Service&rdquo;). Please
        read these Terms carefully before using the Service.
      </p>

      <div className="w-full my-[32px] h-[1px] bg-[#686A6C]" />

      <ul className="flex flex-col gap-[32px]">
        {term_data.map((item, idx) => {
          return (
            <li key={idx} className="flex flex-col gap-[8px]">
              <p className="text-[20px] leading-[28px] font-medium text-black">
                {item.title}
              </p>
              <p className="text-[18px] leading-[26px] font-medium tracking-[-0.32px] text-[#686A6C]">
                {item.des}
              </p>
            </li>
          );
        })}
      </ul>

      <div className="w-full my-[32px] h-[1px] bg-[#686A6C]" />

      <p className="text-[24px] leading-[32px] text-black mb-[64px]">
        By using AutoAir AI, you acknowledge that you have read, understood, and
        agree to be bound by these Terms.
      </p>
    </section>
  );
}
