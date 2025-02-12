import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ProductCard from "./ProductCard"; 
import "./Shop.css"; 

const products = [
  { id: 1, name: "Speaker Pro", category: "Audio", price: 199, image: "speaker.jpg" },
  { id: 2, name: "Disco Light", category: "Lighting", price: 49, image: "disco-light.jpg" },
  { id: 3, name: "BoomBox X", category: "Audio", price: 299, image: "boombox.jpg" },
  { id: 4, name: "LED Neon Sign", category: "Lighting", price: 79, image: "led-sign.jpg" },
];

const productsPerPage = 2;

function ProductListing() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  const categories = ["All", ...new Set(products.map(product => product.category))];
  
  useEffect(() => {
    const updatedProducts = selectedCategory === "All" ? products : products.filter(product => product.category === selectedCategory);
    setFilteredProducts(updatedProducts);
    setCurrentPage(1); 
  }, [selectedCategory]);
  
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const savedPage = parseInt(params.get("page")) || 1;
    setCurrentPage(savedPage);
  }, [location]);

  const handlePageClick = ({ selected }) => {
    const newPage = selected + 1;
    setCurrentPage(newPage);
    navigate(`?page=${newPage}`);
  };

  return (
    <div>
      <div className="product-container">
        <h1 className="product-title">Our Top Products</h1>
        <select className="product-filter" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <div className="product-grid">
          {currentProducts.length > 0 ? currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          )) : <p className="no-results">No products found in this category.</p>}
        </div>
      </div>
      <ReactPaginate
        previousLabel={<FontAwesomeIcon icon={faArrowLeft} />}
        nextLabel={<FontAwesomeIcon icon={faArrowRight} />}
        breakLabel={"..."}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        forcePage={currentPage - 1}
        containerClassName={"pagination"}
        activeClassName={"active"}
        previousClassName={"prev"}
        nextClassName={"next"}
        disabledClassName={"disabled"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
      />
    </div>
  );
};

export default ProductListing;
