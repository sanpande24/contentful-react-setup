import React from "react";
import _ from "lodash";
import Holiday from "../public/resources/heroBanner.jpg"; // Default fallback image

const HeroBanner = ({ fields, client }) => {
  console.log("HeroBanner fields", fields);

  // Data extraction with lodash
  const title = _.get(
    fields,
    "title",
    "Stocking-ready mini-sized best sellers!"
  );
  const descriptionContent = _.get(fields, "description.content", []);
  const ctaContent = _.get(fields, "cta.content", []);
  const imageUrl = _.get(fields, "image[0].src", Holiday.src);
  console.log("hero banner image", imageUrl);

  const renderDescription = (content) => {
    return content.map((block, index) => {
      if (block.nodeType === "paragraph") {
        return (
          <p key={index} className="text-gray-600 text-sm md:text-base">
            {block.content.map((textNode, i) => textNode.value).join(" ")}
          </p>
        );
      }
      return null;
    });
  };

  // Helper function to render CTA buttons
  const renderCTA = (ctaArray) => {
    if (!ctaArray.length) return null;
    const linkObj = _.find(ctaArray, { nodeType: "hyperlink" });
    const link = _.get(linkObj, "data.uri", "#");
    const buttonText = "SHOP NOW";

    return (
      <a
        href={link}
        className="inline-block bg-white text-black border border-black font-semibold py-3 px-20 rounded-md hover:bg-gray-100 hover:text-gray-800 transition duration-300"
      >
        {buttonText}
      </a>
    );
  };

  return (
    <div className="relative bg-white rounded-lg shadow-lg overflow-hidden h-[550px]">
      {/* Background Ribbon */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-200"
        style={{
          backgroundImage: `url('${imageUrl}')`,
        }}
      ></div>

      {/* Content Section */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between mx-auto px-6 py-12 md:py-16">
        {/* Text Section */}
        <div className="space-y-6 max-w-lg pl-10">
          <h1 className="text-3xl md:text-4xl text-gray-800 w-[300px] font-[rf_font] font-normal not-italic">
            {title}
          </h1>

          {renderDescription(descriptionContent)}
          {renderCTA(ctaContent)}
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
