import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import richtextRenderOptions from "../lib/richtextRenderOptions";
import Link from "next/link";

const CardComponent = ({ product, colors }) => {
  const { title, description, bynderImage, image, link, slug } = product;
  const imageUrl = bynderImage?.[0]?.src || image || "";

  return (
    <div
      className="w-full sm:w-1/2 lg:w-1/3 p-4 flex flex-col items-center"
      style={{
        backgroundColor: "none",
        color: colors?.textColor || "black",
      }}
    >
      <div className="w-full h-48 rounded-md overflow-hidden shadow-lg">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="mt-4 text-xl font-bold">{title}</h3>
      <div className="mt-2 text-sm text-center">
        {documentToReactComponents(description, richtextRenderOptions)}
      </div>
      <div className="mt-2 flex-1"></div>{" "}
      {link && (
        <div className="mt-2 text-sm">
          {documentToReactComponents(link, {
            ...richtextRenderOptions,
            renderNode: {
              ...richtextRenderOptions.renderNode,
              hyperlink: (node, children) => (
                <a
                  href={node.data.uri}
                  className="text-blue-500 underline hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
            },
          })}
        </div>
      )}
    </div>
  );
};

export default CardComponent;
