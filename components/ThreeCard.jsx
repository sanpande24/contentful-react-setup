import React from "react";
import _ from "lodash";
import ThreeCardComponentProduct from "./ThreeCardComponentProduct";

const ThreeCard = (props) => {
  const fields = _.get(props, "fields", {});
  const title = _.get(fields, "title", "");
  const products = _.get(fields, "products", []);
  const backgroundColor = _.get(fields, "backgroundColor", "#FFFFFF");
  const textColor = _.get(fields, "textColor", "#000000");

  if (!fields || !products.length) {
    return null;
  }

  return (
    <div className="three-card-container" style={{ backgroundColor }}>
      <div className="three-card-wrapper">
        {products.map((product, index) => {
          const productFields = _.get(product, "fields", {});
          return (
            <ThreeCardComponentProduct
              key={product.sys.id}
              product={productFields}
              colors={{ backgroundColor, textColor }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ThreeCard;
