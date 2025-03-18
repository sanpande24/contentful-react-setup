import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import richtextRenderOptions from "../lib/richtextRenderOptions";

const ThreeCardComponentProduct = ({ product, colors }) => {
  const { title, description, image, price } = product;
  const imageUrl = Array.isArray(image) && image.length > 0 ? image[0].src : "";

  return (
    <div
      className="three-card-product"
      style={{
        backgroundColor: colors.backgroundColor || "#FFFFFF",
        color: colors.textColor || "#000000",
      }}
    >
      <a href={product.link} className="three-card-link">
        <div className="three-card-image-container">
          <img src={imageUrl} alt={title} className="three-card-image" />
        </div>
        <div className="three-card-content">
          <h3 className="three-card-title">{title}</h3>
          <p className="three-card-description">
            {documentToReactComponents(description, richtextRenderOptions)}
          </p>
        </div>
      </a>
    </div>
  );
};

export default ThreeCardComponentProduct;
