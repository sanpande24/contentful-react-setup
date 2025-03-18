import React from "react";
import _ from "lodash";
import CardComponent from "./CardComponent";

const ProductSection = (props) => {
  const fields = _.get(props, "fields");
  const title = _.get(fields, "title");
  const products = _.get(fields, "products");
  const backgroundColor = _.get(fields, "backgroundColor");
  const textColor = _.get(fields, "textColor");

  if (!fields) {
    return null;
  }

  return (
    <div className="p-8 bg-[#FEF9F2]">
      <div className="flex flex-wrap -mx-4">
        {Array.isArray(products) &&
          products.map((product, index) => {
            const productFields = _.get(product, "fields");
            return (
              <CardComponent
                key={product.sys.id}
                product={{
                  ...productFields,
                }}
                colors={{ backgroundColor, textColor }}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ProductSection;
