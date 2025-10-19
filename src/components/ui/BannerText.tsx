"use client";

interface BannerTextProps {
  title: string;
  description?: string | React.ReactNode;
}

const BannerText = ({ title, description }: BannerTextProps) => {
  return (
    <div className="lg:flex lg:flex-col lg:justify-center">
      <h3 className="text-bes-amber text-xl font-bold lg:text-2xl">{title}</h3>
      {description &&
        (typeof description === "string" ? (
          <p className="text mt-1 text-white lg:text-[1.2rem]">{description}</p>
        ) : (
          <div className="text mt-1 text-white lg:text-base">{description}</div>
        ))}
    </div>
  );
};

export default BannerText;
