import React from "react";
import Layout from "../components/Layout";

interface Product {
  name: string;
  category: "Paddles" | "Balls" | "Accessories";
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
    description:
      "Carbon fiber surface with a reactive honeycomb polymer core. Used by pro player Ben Johns.",
    price: "$199.99",
    url: "https://www.amazon.com/JOOLA-Ben-Johns-Hyperion-Pickleball/dp/B09XDNK7QN",
    image: "https://m.media-amazon.com/images/I/61mITPKCYhL._AC_SL1500_.jpg",
  },
  {
    name: "Selkirk SLK Halo Power XL",
    category: "Paddles",
    description:
      "Extended length paddle with a T700 raw carbon fiber face. Great for power and spin.",
    price: "$149.99",
    url: "https://www.amazon.com/Selkirk-SLK-Halo-Pickleball-Paddle/dp/B0CPWVBFYQ",
    image: "https://m.media-amazon.com/images/I/51Kq5BkfhKL._AC_SL1500_.jpg",
  },
  {
    name: "HEAD Radical Elite",
    category: "Paddles",
    description:
      "Lightweight and maneuverable paddle with an optimized sweet spot. Ideal for beginners and intermediate players.",
    price: "$79.99",
    url: "https://www.amazon.com/HEAD-Radical-Elite-Pickleball-Paddle/dp/B0B1HXKDQR",
    image: "https://m.media-amazon.com/images/I/61xq-yS3VkL._AC_SL1500_.jpg",
  },
  {
    name: "Engage Pursuit Pro MX 6.0",
    category: "Paddles",
    description:
      "Wide-body paddle with a large sweet spot and excellent control for all skill levels.",
    price: "$169.99",
    url: "https://www.amazon.com/Engage-Pickleball-Pursuit-MX-6-0/dp/B0BXNM8VGC",
    image: "https://m.media-amazon.com/images/I/61z-FLqJURL._AC_SL1500_.jpg",
  },
  // Balls
  {
    name: "Franklin X-40 Outdoor Pickleballs (12-Pack)",
    category: "Balls",
    description:
      "Official ball of USA Pickleball. Durable outdoor ball with consistent bounce and flight.",
    price: "$29.99",
    url: "https://www.amazon.com/Franklin-Sports-X-40-Pickleball-Pack/dp/B01M8G1XK5",
    image: "https://m.media-amazon.com/images/I/81WfNTa1jPL._AC_SL1500_.jpg",
  },
  {
    name: "Onix Pure 2 Outdoor Balls (6-Pack)",
    category: "Balls",
    description:
      "True flight technology with balanced weight distribution for consistent play.",
    price: "$19.99",
    url: "https://www.amazon.com/Onix-Pure-Outdoor-Pickleball-Balls/dp/B07Q3RDD5M",
    image: "https://m.media-amazon.com/images/I/71dWLjYw9LL._AC_SL1500_.jpg",
  },
  {
    name: "JOOLA Indoor Pickleballs (12-Pack)",
    category: "Balls",
    description:
      "Softer ball designed for indoor play with larger holes for slower, controlled games.",
    price: "$24.99",
    url: "https://www.amazon.com/JOOLA-Indoor-Pickleball-Balls-Pack/dp/B0CXNKZ23R",
    image: "https://m.media-amazon.com/images/I/71tZ8aiO5SL._AC_SL1500_.jpg",
  },
  // Accessories
  {
    name: "Franklin Pickleball-X Bag",
    category: "Accessories",
    description:
      "Spacious bag with paddle compartment, ball storage, and adjustable shoulder strap.",
    price: "$39.99",
    url: "https://www.amazon.com/Franklin-Sports-Pickleball-Bag-Sling/dp/B0BQMKF9VY",
    image: "https://m.media-amazon.com/images/I/71+YIEhbqSL._AC_SL1500_.jpg",
  },
  {
    name: "Tourna Grip Original Overgrip (10-Pack)",
    category: "Accessories",
    description:
      "Dry-feel overgrip that absorbs moisture. A favorite among pickleball and tennis players.",
    price: "$14.99",
    url: "https://www.amazon.com/Tourna-Grip-Original-Blue-Pack/dp/B000GFADQK",
    image: "https://m.media-amazon.com/images/I/71ZVR2aJxwL._AC_SL1500_.jpg",
  },
  {
    name: "Lead Tape for Pickleball Paddles",
    category: "Accessories",
    description:
      "Add weight and customize the balance of your paddle. Easy to apply and remove.",
    price: "$9.99",
    url: "https://www.amazon.com/Gamma-Supreme-Overgrip-Lead-Tape/dp/B000IG5JD0",
    image: "https://m.media-amazon.com/images/I/71RKSQ3k-JL._AC_SL1500_.jpg",
  },
  {
    name: "Pickleball Court Marker Kit",
    category: "Accessories",
    description:
      "Portable court line markers for setting up a pickleball court on any flat surface.",
    price: "$34.99",
    url: "https://www.amazon.com/3M-Pickleball-Court-Marker-Kit/dp/B0B5HK83M7",
    image: "https://m.media-amazon.com/images/I/71qmJSHSYnL._AC_SL1500_.jpg",
  },
];

const CATEGORIES = ["Paddles", "Balls", "Accessories"] as const;

const ShopPage = () => {
  return (
    <Layout
      title="Shop Pickleball Gear"
      description="Pickleball paddles, balls, and accessories"
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
              Pickleball paddles, balls &amp; accessories
            </div>
          </div>
        </h5>

        <p style={{ color: "gray", fontSize: "0.9em", marginBottom: "1.5rem" }}>
          Links go to Amazon product pages. As an Amazon Associate, we may earn
          from qualifying purchases.
        </p>

        {CATEGORIES.map((category) => (
          <div key={category} style={{ marginBottom: "2rem" }}>
            <h3 className="ui dividing header">{category}</h3>
            <div className="ui three stackable cards">
              {PRODUCTS.filter((p) => p.category === category).map(
                (product) => (
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
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ShopPage;
