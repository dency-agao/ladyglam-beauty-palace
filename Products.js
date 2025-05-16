import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import styles from "./../styles/products.css";
import TopNavbar from "./Navbar";

// Sample product data (Replace with your actual data)
const productCategories = [
  {
    category: "Nail Products",
    products: [
      { name: "Nail Polish", price: "Ksh 500", image: "nail-polish.jpg" },
      { name: "Nail Gel", price: "Ksh 700", image: "nail-gel.jpg" },
      { name: "Nail Art Kit", price: "Ksh 1200", image: "nail-art.jpg" },
    ],
  },
  {
    category: "Makeup Products",
    products: [
      { name: "Foundation", price: "Ksh 2500", image: "foundation.jpg" },
      { name: "Concealer", price: "Ksh 1800", image: "concealer.jpg" },
      { name: "Blush", price: "Ksh 1300", image: "blush.jpg" },
    ],
  },
  {
    category: "Hair Products",
    products: [
      { name: "Hair Wash", price: "Ksh 1500", image: "hair-wash.jpg" },
      { name: "Hair Oil & Serum", price: "Ksh 2000", image: "hair-oil.jpg" },
      { name: "Hair Accessories", price: "Ksh 800", image: "hair-accessories.jpg" },
    ],
  },
];

const Products = () => {
  return (
    <div>
    <TopNavbar /> {/* ✅ Added Navbar */}
    <div className="container my-5">
      <h2 className="text-center mb-4">Our Beauty Products</h2>

      {productCategories.map((category, index) => (
        <div key={index} className="mb-5">
          <h3 className="category-title">{category.category}</h3>
          <div className="row">
            {category.products.map((product, idx) => (
              <div key={idx} className="col-md-4">
                <div className="product-card">
                  <img
                    src={`/images/${product.image}`}
                    alt={product.name}
                    className="product-img"
                  />
                  <h5>{product.name}</h5>
                  <p className="price">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Products;


