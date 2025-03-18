import React from "react";
import ColumnCard from "./ColumnCardComponent";

const ColumnCardCollection = ({ fields, userGroup }) => {
    console.log("inside fields component",fields);
  if (!fields || !fields.columnsOrCards || fields.columnsOrCards.length === 0) {
    return <p>No content available</p>;
  }

  return (
    <div className="column-card-collection">
      <h2>{fields.title}</h2> {/* Display collection title */}
      <div className="column-card-wrapper">
        {fields.columnsOrCards.map((item) => (
          <ColumnCard key={item.sys.id} id={item.sys.id} fields={item.fields} userGroup={userGroup} />
        ))}
      </div>
    </div>
  );
};

export default ColumnCardCollection;
