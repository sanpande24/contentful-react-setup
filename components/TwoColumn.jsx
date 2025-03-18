import React from "react";
import Link from "next/link";
import Image from "next/image";
import _ from "lodash";
import Logo from "../public/resources/lam_logo.png";  // Default logo

const TwoColumn = ({ fields }) => {
    const title = _.get(fields, "title", "Default Title");
    const description = _.get(fields, "description.content[0].content[0].value", "Default description");
    const hyperlink = fields.cta.content[0].content.find(item => item.nodeType === "hyperlink");
const ctaUri = hyperlink?.data?.uri;
const ctaValue = hyperlink?.content[0]?.value;
const imageSrc = fields.image[0]?.src;
console.log("Image Source:", imageSrc);

  return (
    <section class="content-section">
        <div class="text-container">
            <h1>{title}</h1>
            <p>
            {description}
            </p>
            <a href={ctaUri} target='_blank' class="button">{ctaValue}</a>
        </div>
        <div class="image-container">
        <Image 
        src={imageSrc} // Use the dynamic logo source
        width={200} // Adjust the width as needed
        height={200} // Adjust the height as needed
        alt="Logo"
      />
        </div>
    </section>
  );
};

export default TwoColumn;
