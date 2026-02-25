import React from "react";
import classnames from "classnames";
import Layout from "../components/Layout";

type Category = "Paddles" | "Shoes" | "Nets" | "Balls";

interface Product {
  name: string;
  category: Category;
  brand: string;
  color: string;
  description: string;
  price: string;
  url: string;
  image: string;
}

const PRODUCTS: Product[] = [
  // Paddles
  {
    name: "JOOLA Ben Johns Hyperion CFS 16",
    category: "Paddles",
    brand: "JOOLA",
    color: "Blue",
    description:
      "Carbon fiber surface with a reactive honeycomb polymer core. Used by pro player Ben Johns.",
    price: "$199.99",
    url: "https://www.amazon.com/JOOLA-Ben-Johns-Hyperion-Pickleball/dp/B09XDNK7QN",
    image: "https://m.media-amazon.com/images/I/61mITPKCYhL._AC_SL1500_.jpg",
  },
  {
    name: "Selkirk SLK Halo Power XL",
    category: "Paddles",
    brand: "Selkirk",
    color: "Red",
    description:
      "Extended length paddle with a T700 raw carbon fiber face. Great for power and spin.",
    price: "$149.99",
    url: "https://www.amazon.com/Selkirk-SLK-Halo-Pickleball-Paddle/dp/B0CPWVBFYQ",
    image: "https://m.media-amazon.com/images/I/51Kq5BkfhKL._AC_SL1500_.jpg",
  },
  {
    name: "HEAD Radical Elite",
    category: "Paddles",
    brand: "HEAD",
    color: "Orange",
    description:
      "Lightweight and maneuverable paddle with an optimized sweet spot. Ideal for beginners and intermediate players.",
    price: "$79.99",
    url: "https://www.amazon.com/HEAD-Radical-Elite-Pickleball-Paddle/dp/B0B1HXKDQR",
    image: "https://m.media-amazon.com/images/I/61xq-yS3VkL._AC_SL1500_.jpg",
  },
  {
    name: "Engage Pursuit Pro MX 6.0",
    category: "Paddles",
    brand: "Engage",
    color: "Black",
    description:
      "Wide-body paddle with a large sweet spot and excellent control for all skill levels.",
    price: "$169.99",
    url: "https://www.amazon.com/Engage-Pickleball-Pursuit-MX-6-0/dp/B0BXNM8VGC",
    image: "https://m.media-amazon.com/images/I/61z-FLqJURL._AC_SL1500_.jpg",
  },
  // Shoes
  {
    name: "ASICS Gel-Renma",
    category: "Shoes",
    brand: "ASICS",
    color: "White",
    description:
      "Lightweight court shoe with GEL cushioning and a durable outsole designed for lateral movement.",
    price: "$79.95",
    url: "https://www.amazon.com/ASICS-Gel-Renma-Pickleball-Shoes/dp/B0BX4V2RJH",
    image: "https://m.media-amazon.com/images/I/71Kt1U2pDOL._AC_SL1500_.jpg",
  },
  {
    name: "Nike Court Vapor Lite 2",
    category: "Shoes",
    brand: "Nike",
    color: "Black",
    description:
      "Fast and breathable court shoe with excellent traction for quick pivots on the court.",
    price: "$84.99",
    url: "https://www.amazon.com/Nike-Court-Vapor-Lite-Pickleball/dp/B0CSKHP4MH",
    image: "https://m.media-amazon.com/images/I/71RBvMSQqvL._AC_SL1500_.jpg",
  },
  {
    name: "K-Swiss Express Light Pickleball",
    category: "Shoes",
    brand: "K-Swiss",
    color: "White",
    description:
      "Purpose-built pickleball shoe with Surge 7.0 cushioning and Durawrap toe protection.",
    price: "$89.95",
    url: "https://www.amazon.com/K-Swiss-Express-Light-Pickleball/dp/B0BVKWZ7JG",
    image: "https://m.media-amazon.com/images/I/71Y9sKdjmjL._AC_SL1500_.jpg",
  },
  // Nets
  {
    name: "Franklin Sports Portable Pickleball Net",
    category: "Nets",
    brand: "Franklin",
    color: "Black",
    description:
      "Official size net with a sturdy steel frame. Sets up in minutes with no tools required.",
    price: "$119.99",
    url: "https://www.amazon.com/Franklin-Sports-Pickleball-Net-Portable/dp/B019RDHWKE",
    image: "https://m.media-amazon.com/images/I/71dFP4tZEDL._AC_SL1500_.jpg",
  },
  {
    name: "JOOLA Portable Pickleball Net System",
    category: "Nets",
    brand: "JOOLA",
    color: "Black",
    description:
      "Tournament-grade portable net with weather-resistant materials and a carrying bag.",
    price: "$149.99",
    url: "https://www.amazon.com/JOOLA-Portable-Pickleball-Net-System/dp/B0C1JGN8NZ",
    image: "https://m.media-amazon.com/images/I/61yJGDY+VKL._AC_SL1200_.jpg",
  },
  {
    name: "A11N Portable Pickleball Net",
    category: "Nets",
    brand: "A11N",
    color: "Green",
    description:
      "Regulation size net with a powder-coated steel frame and easy snap-on assembly.",
    price: "$99.99",
    url: "https://www.amazon.com/A11N-Portable-Pickleball-Net-System/dp/B07Z6RMFK3",
    image: "https://m.media-amazon.com/images/I/71N3RSHSYFL._AC_SL1500_.jpg",
  },
  // Balls
  {
    name: "Franklin X-40 Outdoor Pickleballs (12-Pack)",
    category: "Balls",
    brand: "Franklin",
    color: "Yellow",
    description:
      "Official ball of USA Pickleball. Durable outdoor ball with consistent bounce and flight.",
    price: "$29.99",
    url: "https://www.amazon.com/Franklin-Sports-X-40-Pickleball-Pack/dp/B01M8G1XK5",
    image: "https://m.media-amazon.com/images/I/81WfNTa1jPL._AC_SL1500_.jpg",
  },
  {
    name: "Onix Pure 2 Outdoor Balls (6-Pack)",
    category: "Balls",
    brand: "Onix",
    color: "Yellow",
    description:
      "True flight technology with balanced weight distribution for consistent play.",
    price: "$19.99",
    url: "https://www.amazon.com/Onix-Pure-Outdoor-Pickleball-Balls/dp/B07Q3RDD5M",
    image: "https://m.media-amazon.com/images/I/71dWLjYw9LL._AC_SL1500_.jpg",
  },
  {
    name: "JOOLA Indoor Pickleballs (12-Pack)",
    category: "Balls",
    brand: "JOOLA",
    color: "Orange",
    description:
      "Softer ball designed for indoor play with larger holes for slower, controlled games.",
    price: "$24.99",
    url: "https://www.amazon.com/JOOLA-Indoor-Pickleball-Balls-Pack/dp/B0CXNKZ23R",
    image: "https://m.media-amazon.com/images/I/71tZ8aiO5SL._AC_SL1500_.jpg",
  },
];

const CATEGORIES: Category[] = ["Paddles", "Shoes", "Nets", "Balls"];

const ShopPage = () => {
  const [activeCategory, setActiveCategory] =
    React.useState<Category>("Paddles");
  const [selectedBrand, setSelectedBrand] = React.useState<string>("");
  const [selectedColor, setSelectedColor] = React.useState<string>("");

  const categoryProducts = PRODUCTS.filter(
    (p) => p.category === activeCategory
  );

  const brands = [...new Set(categoryProducts.map((p) => p.brand))].sort();
  const colors = [...new Set(categoryProducts.map((p) => p.color))].sort();

  const filteredProducts = categoryProducts.filter(
    (p) =>
      (!selectedBrand || p.brand === selectedBrand) &&
      (!selectedColor || p.color === selectedColor)
  );

  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category);
    setSelectedBrand("");
    setSelectedColor("");
  };

  return (
    <Layout
      title="Shop Pickleball Gear"
      description="Pickleball paddles, shoes, nets, and balls"
      selectedMenuItem="shop"
      canonicalUrl="https://www.zitnr.com/shop"
    >
      <div className="ui container">
        <h5
          className="ui small header"
          style={{ marginTop: ".5rem", marginBottom: ".5rem" }}
        >
          <i className="shop icon"></i>
          <div className="content">
            Shop
            <div className="sub header">
              Pickleball paddles, shoes, nets &amp; balls
            </div>
          </div>
        </h5>

        <p style={{ color: "gray", fontSize: "0.9em", marginBottom: "1rem" }}>
          Links go to Amazon product pages. As an Amazon Associate, we may earn
          from qualifying purchases.
        </p>

        <div className="ui top attached tabular menu">
          {CATEGORIES.map((category) => (
            <a
              key={category}
              className={classnames("item", {
                active: activeCategory === category,
              })}
              onClick={() => handleCategoryChange(category)}
              style={{ cursor: "pointer" }}
            >
              {category}
            </a>
          ))}
        </div>
        <div
          className="ui bottom attached segment"
          style={{ border: "none", boxShadow: "none", padding: "1rem 0" }}
        >
          <div className="ui form" style={{ marginBottom: "1rem" }}>
            <div className="two fields">
              <div className="field">
                <label>Brand</label>
                <select
                  className="ui dropdown"
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                >
                  <option value="">All Brands</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label>Color</label>
                <select
                  className="ui dropdown"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                >
                  <option value="">All Colors</option>
                  {colors.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="ui message">
              <p>No products match the selected filters.</p>
            </div>
          ) : (
            <div className="ui three stackable cards">
              {filteredProducts.map((product) => (
                <a
                  key={product.name}
                  className="ui card"
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <div className="image">
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        objectFit: "contain",
                        height: "220px",
                        width: "100%",
                        padding: "1rem",
                        backgroundColor: "#fff",
                      }}
                    />
                  </div>
                  <div className="content">
                    <div className="header" style={{ fontSize: "1em" }}>
                      {product.name}
                    </div>
                    <div className="meta">{product.color}</div>
                    <div className="description" style={{ color: "#555" }}>
                      {product.description}
                    </div>
                  </div>
                  <div className="extra content">
                    <span style={{ fontWeight: "bold", color: "#1b1c1d" }}>
                      {product.price}
                    </span>
                    <span className="right floated">
                      View on Amazon{" "}
                      <i className="external alternate icon"></i>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ShopPage;
