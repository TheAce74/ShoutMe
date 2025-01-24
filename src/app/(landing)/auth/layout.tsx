import LandingSection from "@/components/layout/LandingSection";
import Image from "next/image";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LandingSection
      id="auth"
      className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-16"
    >
      {children}
      <div className="hidden lg:block">
        <Image
          src="/images/auth.jpeg"
          width={626}
          height={626}
          alt="Lady in distress"
          className="mx-auto h-auto w-[300px]"
        />
        <h2 className="mb-4 text-center text-5xl font-bold uppercase leading-[3.5rem]">
          Stay Informed <br />{" "}
          <span className="text-primary-400">Stay Safe</span>
        </h2>
        <p className="text-justify text-lg">
          Our emergency alert system ensures that you receive real-time updates
          and critical information during emergencies, helping you make informed
          decisions to protect yourself and your loved ones.
        </p>
      </div>
    </LandingSection>
  );
}
