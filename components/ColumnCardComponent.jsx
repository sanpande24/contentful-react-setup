import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const ColumnCard = ({ id, fields, userGroup }) => {
  const [isUserAllowed, setIsUserAllowed] = useState(false);

  useEffect(() => {
    if (fields) {
      const allowedGroup = fields?.viewGroups?.fields?.name || "";
      setIsUserAllowed(userGroup === allowedGroup);
    }
  }, [userGroup, fields]); // Dependency array ensures this runs when userGroup or fields update

  if (!fields) return <p>No content available</p>;

  const { title, image, description, ctaTitle, ctaLink } = fields;
  const imageUrl = image?.fields?.file?.url
    ? `https:${image.fields.file.url}`
    : "/placeholder.jpg"; // Default placeholder if no image is found

  return (
    <div className="column-card" id={id}>
      <Image src={imageUrl} alt={title || "Image"} width={300} height={200} />
      <h3>{title}</h3>
      <p>{documentToReactComponents(description)}</p>
      {/* Show CTA only if user is allowed, otherwise show "Request Access" */}
      {isUserAllowed ? (
        <Link href={ctaLink} target="_blank" rel="noopener noreferrer">
          <button className="cta-button">{ctaTitle}</button>
        </Link>
      ) : (
        <button
          className="request-access-button"
          onClick={() => alert("Request sent for access!")}
        >
          Request Access
        </button>
      )}
    </div>
  );
};

export default ColumnCard;
