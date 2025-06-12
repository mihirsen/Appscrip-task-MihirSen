"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { Product } from "../types/product";

interface ProductCatalogProps {
  initialProducts: Product[];
  categories: string[];
}

// Locally extend Product type to include outOfStock for demo
interface ProductWithStock extends Product {
  outOfStock?: boolean;
}

export default function ProductCatalog({
  initialProducts,
  categories,
}: ProductCatalogProps) {
  const [products] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState("RECOMMENDED");
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [filterOptions, setFilterOptions] = useState({
    "IDEAL FOR": [],
    OCCASION: [],
    WORK: [],
    FABRIC: [],
    SEGMENT: [],
    "SUITABLE FOR": [],
    "RAW MATERIALS": [],
    PATTERN: [],
  });
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  // Wishlist state for each product
  const [wishlist, setWishlist] = useState<{ [id: number]: boolean }>({});
  // Sidebar visibility state
  const [filtersVisible, setFiltersVisible] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth > 900;
    }
    return true;
  });
  // Hide filters by default on tablet/mobile, show on desktop
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 900) {
        setFiltersVisible(false);
      } else {
        setFiltersVisible(true);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Randomly mark some products as out of stock for demo
  const productsWithStock = useMemo(() => {
    return products.map((p, i) => ({
      ...p,
      outOfStock: i % 4 === 0, // 1 in 4 products is out of stock
    })) as ProductWithStock[];
  }, [products]);

  // Close sort dropdown on outside click
  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortDropdownOpen(false);
      }
    }
    if (sortDropdownOpen) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [sortDropdownOpen]);

  const filterGroupOptions = {
    "IDEAL FOR": ["Men", "Women", "Baby & Kids"],
    OCCASION: ["Party", "Casual", "Formal"],
    WORK: ["Office", "Remote", "Field"],
    FABRIC: ["Cotton", "Wool", "Silk"],
    SEGMENT: ["Premium", "Budget"],
    "SUITABLE FOR": ["Summer", "Winter"],
    "RAW MATERIALS": ["Organic", "Synthetic"],
    PATTERN: ["Solid", "Striped", "Checked"],
  };

  const sortOptions = [
    "RECOMMENDED",
    "NEWEST FIRST",
    "POPULAR",
    "PRICE : HIGH TO LOW",
    "PRICE : LOW TO HIGH",
  ];

  function handleFilterCheck(group: string, option: string, checked: boolean) {
    setFilterOptions((prev) => {
      const arr = prev[group] || [];
      return {
        ...prev,
        [group]: checked ? [...arr, option] : arr.filter((i) => i !== option),
      };
    });
  }
  function handleUnselectAll(group: string) {
    setFilterOptions((prev) => ({ ...prev, [group]: [] }));
  }

  // Add a function to handle 'All' selection for a filter group
  function handleSelectAll(group: string) {
    setFilterOptions((prev) => ({
      ...prev,
      [group]: [...filterGroupOptions[group]],
    }));
  }

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      // Filter by each group
      const matchesFilters = Object.entries(filterOptions).every(
        ([group, selected]) => {
          if (!(selected as string[]).length) return true;
          // For demo, match if product.title or product.description includes the selected value
          return (selected as string[]).some(
            (val) =>
              product.title.toLowerCase().includes(val.toLowerCase()) ||
              product.description.toLowerCase().includes(val.toLowerCase())
          );
        }
      );
      return matchesSearch && matchesCategory && matchesPrice && matchesFilters;
    });

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case "name":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return filtered;
  }, [
    products,
    searchTerm,
    selectedCategories,
    priceRange,
    sortBy,
    filterOptions,
  ]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const renderStars = (rating: number) => {
    const stars: string[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push("★");
    }
    if (hasHalfStar) {
      stars.push("☆");
    }
    while (stars.length < 5) {
      stars.push("☆");
    }

    return stars.join("");
  };

  // Calculate in-stock products for the count
  const inStockProducts: ProductWithStock[] = (
    filteredAndSortedProducts.map((product) => {
      return productsWithStock.find((p) => p.id === product.id) || product;
    }) as ProductWithStock[]
  ).filter((product) => !product.outOfStock);

  return (
    <>
      <div className="products-header">
        <div className="products-header-left">
          <span className="products-count-bold hide-on-mobile">3012 ITEMS</span>
          <div className="products-header-row">
            <div className="products-filter-toggle">
              <span className="filter-arrow">&#60;</span>
              <span
                className="filter-toggle-link"
                onClick={() => setFiltersVisible((v) => !v)}
              >
                {filtersVisible ? "HIDE FILTER" : "SHOW FILTER"}
              </span>
            </div>
          </div>
        </div>
        <div className="products-sort" ref={sortRef}>
          <span
            className="sort-label"
            tabIndex={0}
            onClick={() => setSortDropdownOpen((v) => !v)}
            style={{
              cursor: "pointer",
              textTransform: "uppercase",
              fontWeight: sortDropdownOpen ? 700 : 700,
            }}
          >
            {sortBy}
          </span>
          <span
            className="sort-arrow"
            onClick={() => setSortDropdownOpen((v) => !v)}
            style={{
              cursor: "pointer",
              display: "inline-block",
              marginLeft: "0.2rem",
              transition: "transform 0.2s",
              transform: sortDropdownOpen ? "rotate(180deg)" : "none",
            }}
          >
            &#9660;
          </span>
          {sortDropdownOpen && (
            <div className="sort-dropdown">
              {sortOptions.map((opt) => (
                <div
                  key={opt}
                  className={`sort-dropdown-option${
                    sortBy === opt ? " selected" : ""
                  }`}
                  onClick={() => {
                    setSortBy(opt);
                    setSortDropdownOpen(false);
                  }}
                  style={{ textTransform: "uppercase" }}
                >
                  {sortBy === opt && <span className="sort-check">✔</span>}
                  {opt}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <section className="products-section">
        {filtersVisible && (
          <aside
            className="sidebar"
            role="complementary"
            aria-label="Product filters"
          >
            <div className="filter-group">
              <label className="filter-checkbox">
                <input type="checkbox" />
                <span className="filter-checkbox-custom" />
                CUSTOMIZABLE
              </label>
            </div>
            {Object.keys(filterGroupOptions).map((group) => (
              <div className="filter-group" key={group}>
                <div
                  className="filter-group-title-row"
                  onClick={() =>
                    setOpenFilter(openFilter === group ? null : group)
                  }
                  style={{ cursor: "pointer" }}
                >
                  <span className="filter-title">{group}</span>
                  <span
                    className={`filter-group-arrow${
                      openFilter === group ? " open" : ""
                    }`}
                  >
                    ▼
                  </span>
                </div>
                <div className="filter-group-dropdown">
                  <span
                    className="filter-group-all"
                    onClick={() => handleSelectAll(group)}
                    style={{ cursor: "pointer" }}
                  >
                    All
                  </span>
                </div>
                {openFilter === group && (
                  <div className="filter-options">
                    <a
                      href="#"
                      className="filter-unselect-all"
                      onClick={(e) => {
                        e.preventDefault();
                        handleUnselectAll(group);
                      }}
                    >
                      Unselect all
                    </a>
                    {filterGroupOptions[group].map((option) => (
                      <label className="filter-option" key={option}>
                        <input
                          type="checkbox"
                          checked={filterOptions[group].includes(option)}
                          onChange={(e) =>
                            handleFilterCheck(group, option, e.target.checked)
                          }
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                )}
                <div className="filter-divider" />
              </div>
            ))}
          </aside>
        )}
        <div
          className={`products-container${
            !filtersVisible ? " products-container-full" : ""
          }`}
        >
          {filteredAndSortedProducts.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                color: "#888",
                fontSize: "1.2rem",
                padding: "3rem 0",
              }}
            >
              No items found
            </div>
          ) : (
            <div className="products-grid" role="grid" aria-label="Products">
              {filteredAndSortedProducts.map((product) => {
                const realProduct: ProductWithStock =
                  productsWithStock.find((p) => p.id === product.id) || product;
                return (
                  <article
                    key={realProduct.id}
                    className="product-card"
                    role="gridcell"
                  >
                    <div className="product-image-container">
                      {realProduct.outOfStock && (
                        <div className="product-outofstock-overlay">
                          OUT OF STOCK
                        </div>
                      )}
                      <img
                        src={realProduct.image}
                        alt={`${realProduct.title} - High quality product image`}
                        className="product-image"
                        loading="lazy"
                        width="180"
                        height="180"
                      />
                    </div>
                    <div className="product-info">
                      <h3
                        className="product-title"
                        title={realProduct.title}
                        style={{ marginBottom: "0.2rem" }}
                      >
                        {realProduct.title}
                      </h3>
                      <div className="product-price">
                        ${realProduct.price.toFixed(2)}
                      </div>
                      <div className="product-pricing-msg">
                        <a
                          href="#"
                          style={{
                            color: "#007bff",
                            textDecoration: "underline",
                          }}
                        >
                          Sign in
                        </a>{" "}
                        or Create an account to see pricing
                      </div>
                    </div>
                    <button
                      className={`product-wishlist${
                        wishlist[realProduct.id] ? " active" : ""
                      }`}
                      aria-label="Add to wishlist"
                      onClick={() =>
                        setWishlist((prev) => ({
                          ...prev,
                          [realProduct.id]: !prev[realProduct.id],
                        }))
                      }
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill={wishlist[realProduct.id] ? "#e74c3c" : "none"}
                        stroke="#e74c3c"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 21C12 21 4 13.5 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.5 16 21 16 21H12Z" />
                      </svg>
                    </button>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
