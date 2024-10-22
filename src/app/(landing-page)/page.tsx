import { AutoAirFeature } from "./home/AutoAirFeature";
import { AutoAirService } from "./home/AutoAirService";
import { Automated } from "./home/Automated";
import { Faq } from "./home/Faq";
import { Hero } from "./home/hero/Hero";
import { Introduce } from "./home/Introduce";
import { AutoAirPrice } from "./home/PricePremium";
import { TechnicalRoad } from "./home/TechnicalRoad";

export default function MainPage() {
  return (
    <div>
      <Hero />

      <Introduce />

      <Automated />

      <AutoAirFeature />

      <AutoAirService />

      <AutoAirPrice />

      <TechnicalRoad />

      <Faq />
    </div>
  );
}
