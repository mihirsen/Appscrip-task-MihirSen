import React from "react";
import Header from "../components/Header";
import ProductCatalog from "../components/ProductCatalog";
import FooterClient from "../components/FooterClient";
import { Product } from "../types/product";

// Server-side data fetching
async function getProducts(): Promise<Product[]> {
  try {
    // Fetch 20 products and duplicate to simulate 3000+ items
    const response = await fetch("https://fakestoreapi.com/products", {
      cache: "no-store", // Ensure fresh data on each request
    });
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const products = await response.json();
    // Duplicate the products to reach 3000+ items
    let bigList: Product[] = [];
    for (let i = 0; i < 151; i++) {
      // 20 * 151 = 3020
      bigList = bigList.concat(
        products.map((p, idx) => ({ ...p, id: i * products.length + idx + 1 }))
      );
    }
    return bigList;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

async function getCategories(): Promise<string[]> {
  try {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories",
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function Home() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);
  const productsToShow = products.slice(0, 20);

  return (
    <>
      <Header />
      <main className="main-content">
        <div className="container">
          <header className="page-header">
            <h1 className="page-title">DISCOVER OUR PRODUCTS</h1>
            <p className="page-subtitle">
              Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus
              scelerisque. Dolor integer scelerisque nibh amet mi ut elementum
              dolor.
            </p>
          </header>
          <ProductCatalog
            initialProducts={productsToShow}
            categories={categories}
          />
        </div>
      </main>
      <FooterClient />
    </>
  );
}
