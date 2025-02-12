import { useState } from "react";
import "./ProductCard.css";

export default function ProductCard({ product, onAddToCart }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="product-card">
      <div className="product-thumbnail">
        {isLoading && <div className="skeleton"></div>}
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        />
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
      </div>

      <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}
