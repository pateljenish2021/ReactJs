import React, { useState, useEffect, useRef } from "react";
import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row } from "reactstrap";
import "../styles/shop.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";
import ProductsList from "../components/UI/ProductsList";
import { motion } from "framer-motion";

const Shop = () => {
  const [productsData, setProductsData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(24);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const readCountRef = useRef(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      readCountRef.current += 1;
      console.log("Number of Firestore reads:", readCountRef.current);

      const querySnapshot = await getDocs(collection(db, "recipes"));
      const products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductsData(products);
      setFilteredProducts(products);
      console.log("Products:", products);
      setSearchTerm("");
      setIsLoading(false);

      setTimeout(() => {
        setIsLoading(true);
      }, 1000);
    } catch (error) {
      console.log("Error fetching products: ", error);
    }
  };
  const handleSearch = (e) => {
    console.log("Search term:", e.target.value);
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    applyFilters(selectedCategory, selectedSubCategory, selectedSort, searchTerm);
  };
  
  
  
  
  const applyFilters = (category, subCategory, sort, term) => {
    console.log("Applying filters...");
    let filteredProducts = productsData;
  

    if (category !== "") {
      console.log("Filtering by category:", category);
      filteredProducts = filteredProducts.filter((item) => item.category === category);
    }
  

    if (subCategory !== "") {
      console.log("Filtering by subcategory:", subCategory);
      filteredProducts = filteredProducts.filter((item) => item.subCategory === subCategory);
    }
  

    if (sort === "price-low-high") {
      console.log("Sorting by price (low to high)");
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high-low") {
      console.log("Sorting by price (high to low)");
      filteredProducts.sort((a, b) => b.price - a.price);
    }
  
    if (term !== "") {
      console.log("Filtering by search term:", term);
      const searchTermLower = term.toLowerCase();
      filteredProducts = filteredProducts.filter((item) => {
        const titleLower = item.title.toLowerCase();
        const categoriesLower = item.categories.map(category => category.toLowerCase());
        const ingredLower = item.ingredients.map(ingredient => ingredient.toLowerCase());
    
        return (
          titleLower.includes(searchTermLower) ||
          categoriesLower.some(category => category.includes(searchTermLower)) ||
          ingredLower.some(ingredient => ingredient.includes(searchTermLower))
        );
      });
    }
    
    
  
    console.log("Filtered products:", filteredProducts);
    setFilteredProducts(filteredProducts);
  };
  
  

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Helmet title="Shop">
      <CommonSection title="Recipes" hideOnMobile={true}/>

      <section className="stick-section">
        <Container>
          <Row>
            <div className="search_box_cont" >
              <div className="search__box">
                <input
                  type="text"
                  placeholder="Search Product ..."
                  onChange={handleSearch}
                  value={searchTerm}
                />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </div>
          </Row>
        </Container>
      
        <Container>
          <Row className="dffdd">
            {currentProducts.length === 0 ? (
              <div className="fullload">
                <div class="loader"></div> 
              </div>
            ) : (
              <>
                <ProductsList data={currentProducts} />
                <Pagination
                  productsPerPage={productsPerPage}
                  totalProducts={filteredProducts.length}
                  currentPage={currentPage}
                  paginate={paginate}
                />
              </>
            )}
          </Row>
        </Container>
      </section>

    </Helmet>
  );
};

const Pagination = ({ productsPerPage, totalProducts, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      {pageNumbers.map((number) => (
        <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
          <button className="page-link" onClick={() => paginate(number)}>
            {number}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Shop;
