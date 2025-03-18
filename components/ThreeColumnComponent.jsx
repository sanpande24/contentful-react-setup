import React from "react";
import Link from "next/link";
import Image from "next/image";

const ThreeColumnComponent = ({ fields }) => {
  if (!fields) return <p>No content available</p>;

  const { title, column1, column2, column3 } = fields;

  // Helper function to render each column
  const renderColumn = (column) => {
    if (!column) return null;

    const { title, icon, link } = column.fields;
    const imageUrl = icon?.fields?.file?.url ? `https:${icon.fields.file.url}` : "/placeholder.jpg";

    return (
      <div className="column-card">
        <Image src={imageUrl} alt={title} width={100} height={100} />
        <h3>{title}</h3>
        <Link href={link} target="_blank" rel="noopener noreferrer">
          <button className="cta-button">Learn More</button>
        </Link>
      </div>
    );
  };

  return (
    <div className="three-column-container">
      <h2>{title}</h2>
      <div className="column-wrapper">
        {renderColumn(column1)}
        {renderColumn(column2)}
        {renderColumn(column3)}
      </div>
    </div>
  );
};

export default ThreeColumnComponent;
