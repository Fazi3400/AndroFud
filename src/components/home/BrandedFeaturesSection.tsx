"use client";

import { Icons } from "@/components/layouts/icons";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface BrandContent {
  featureBar: string[];
  heading: string;
  features: Feature[];
  rats: string[];
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  gradient: string;
  textColor: string;
  bgFrom: string;
  bgTo: string;
}

export function FeaturesBar({ content }: { content: BrandContent }) {
  return (
    <section className={`bg-gradient-to-r ${content.gradient} py-6`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-8 md:gap-16 justify-center items-center">
          {content.featureBar.map((item, idx) => (
            <span key={idx} className="text-white font-semibold text-lg">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PowerfulFeaturesSection({
  content,
}: {
  content: BrandContent;
}) {
  return (
    <section
      className={`py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b ${content.bgFrom} ${content.bgTo}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-300">
            Advanced protection that no other tool can match
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.features.map((feature, idx) => {
            const IconComponent = Icons[
              feature.icon as keyof typeof Icons
            ] as any;
            return (
              <div
                key={idx}
                className={`group relative bg-gradient-to-br ${content.gradient} rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}
                style={{
                  boxShadow: "0 0 20px rgba(0,0,0,0.2)",
                }}
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <IconComponent
                    className={`w-10 h-10 ${content.textColor} mb-4`}
                  />
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-100">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function CompatibleRATsSection({ content }: { content: BrandContent }) {
  return (
    <section
      className={`py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b ${content.bgTo} from-[#091413]`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Compatible With All Major
            <span
              className={`block bg-gradient-to-r from-[${content.primaryColor}] to-[${content.secondaryColor}] bg-clip-text text-transparent`}
            >
              RATs
            </span>
          </h2>
          <p className="text-lg text-gray-300">
            Seamlessly integrate with the most popular Remote Access Tools
          </p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center items-center">
          {content.rats.map((rat) => (
            <button
              key={rat}
              className={`group relative px-10 py-2 bg-gradient-to-r ${content.gradient} rounded-full border-2 transition-all duration-300 transform hover:scale-110 font-bold text-white hover:text-white shadow-lg`}
              style={{
                borderColor: content.primaryColor,
              }}
            >
              {rat}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
