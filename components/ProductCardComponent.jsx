import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useRouter } from "next/router";

const ProductCardComponent = ({ products }) => {
  const router = useRouter();

  // Validate if products exist and is an array
  if (!products || !Array.isArray(products) || products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {products.map((product, index) => {
        // Destructure the product fields
        const { fields } = product;
        if (!fields) return null;

        const title = fields.title || "Untitled Product";
        const description = fields.description || {
          nodeType: "text",
          value: "",
        };
        const price = fields.price || "0.00";
        const slug = fields.slug || "#";
        const bynderImage = fields.bynderImage?.[0]?.src;
        const image = fields.image || null;
        const firstGalleryImage = fields.gallery?.[0]?.fields?.image || null;
        const imageUrl = firstGalleryImage || image || bynderImage || "";

        return (
          <div
            key={index}
            className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md"
          >
            {/* Product Image */}
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-40 object-cover rounded-md"
              />
            ) : (
              <div className="w-full h-40 bg-gray-200 rounded-md flex items-center justify-center">
                <span>No Image</span>
              </div>
            )}

            {/* Product Title */}
            <h2 className="text-xl font-bold mt-4">{title}</h2>

            {/* Product Description */}
            <p className="text-sm text-gray-600 mt-2">
              {documentToReactComponents(description)}
            </p>

            {/* Product Price */}
            <p className="text-lg font-semibold mt-2">${price}</p>

            {/* Product Button */}
            <button
              onClick={() => router.push(`/products/${slug}`)}
              className="bg-black text-white px-4 py-2 mt-4 rounded shadow-md hover:bg-gray-800"
            >
              BUY
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ProductCardComponent;
