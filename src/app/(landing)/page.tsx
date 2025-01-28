import LandingSection from "@/components/layout/LandingSection";
import Buttons from "@/components/ui/landing/Buttons";
import Image from "next/image";

export default function Home() {
  return (
    <LandingSection
      id="home"
      className="grid gap-8 lg:h-[calc(100dvh_-_75px)] lg:grid-cols-2 lg:place-items-center lg:gap-32"
    >
      <Image
        src="/images/hero.jpeg"
        width={599}
        height={444}
        alt="An ambulance"
        className="mx-auto h-auto w-[230px] lg:order-1 lg:w-[710px]"
      />
      <div>
        <h2 className="mb-3 text-3xl font-bold uppercase leading-10 lg:mb-4 lg:text-5xl lg:leading-[3.5rem]">
          Revolutionize{" "}
          <span className="text-primary-400">Emergency Alert</span> Management
          in Your Community
        </h2>
        <p className="mb-6 text-base lg:mb-8 lg:text-lg">
          Our cutting-edge emergency alert system ensures rapid and precise
          notifications for both authorities and residents. Experience how our
          technology can enhance your emergency response capabilities and keep
          your community safe.
        </p>
        <Buttons />
      </div>
    </LandingSection>
  );
}
