import React from "react";
import classnames from "classnames";
import Layout from "../components/Layout";
import catalog from "../utils/catalog.json";

type Variant = (typeof catalog)[number];

interface ProductGroup {
  name: string;
  brand: string;
  cost: string;
  category: string;
  sales: number;
  variants: Variant[];
  colorways: string[];
  sizes: string[];
}

const COST_LABELS: Record<string, string> = {
  "$": "$ - Great Value",
  "$$": "$$ - Mid-range",
  "$$$": "$$$ - Premium",
};

const COLOR_HEX: Record<string, string> = {
  black: "#222",
  blue: "#4285f4",
  "light blue": "#87CEEB",
  "light pink": "#FFB6C1",
  teal: "#008080",
  green: "#34a853",
  orange: "#f5a623",
  pink: "#e91e8a",
  purple: "#8e44ad",
  red: "#db4437",
  white: "#e8e8e8",
  yellow: "#f4b400",
};

function groupProducts(products: Variant[]): ProductGroup[] {
  const map = new Map<string, Variant[]>();
  for (const p of products) {
    const existing = map.get(p.name) || [];
    existing.push(p);
    map.set(p.name, existing);
  }
  const groups: ProductGroup[] = [];
  for (const [name, variants] of Array.from(map)) {
    groups.push({
      name,
      brand: variants[0].brand,
      cost: variants[0].cost,
      category: variants[0].category,
      sales: Math.max(...variants.map((v) => v.sales)),
      variants,
      colorways: Array.from(new Set(variants.map((v) => v.colorway))),
      sizes: Array.from(new Set(variants.map((v) => v.size).filter(Boolean))),
    });
  }
  const currentYear = new Date().getFullYear();
  groups.sort((a, b) => {
    const aIsNew = a.variants.some((v) => (v as any).year === currentYear);
    const bIsNew = b.variants.some((v) => (v as any).year === currentYear);
    if (aIsNew !== bIsNew) return aIsNew ? -1 : 1;
    return b.sales - a.sales;
  });
  return groups;
}

function getDefaultVariant(group: ProductGroup): Variant {
  return group.variants.find((v) => v.default) || group.variants[0];
}

const ProductCard = ({ group }: { group: ProductGroup }) => {
  const defaultVariant = getDefaultVariant(group);
  const [selectedColorway, setSelectedColorway] = React.useState(
    defaultVariant.colorway
  );
  const [selectedSize, setSelectedSize] = React.useState(
    defaultVariant.size
  );

  const activeVariant =
    group.variants.find(
      (v) =>
        v.colorway === selectedColorway &&
        (group.sizes.length <= 1 || v.size === selectedSize)
    ) ||
    group.variants.find((v) => v.colorway === selectedColorway) ||
    defaultVariant;

  const sizesForColorway = Array.from(
    new Set(
      group.variants
        .filter((v) => v.colorway === selectedColorway)
        .map((v) => v.size)
        .filter(Boolean)
    )
  );

  const isNew = (activeVariant as any).year === new Date().getFullYear();

  return (
    <div className="ui card" style={{ textDecoration: "none" }}>
      <a
        href={activeVariant.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="image" style={{ position: "relative" }}>
          {isNew && (
            <span
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                backgroundColor: "#db2828",
                color: "white",
                fontSize: "0.7em",
                fontWeight: "bold",
                padding: "2px 6px",
                borderRadius: "3px",
                zIndex: 1,
              }}
            >
              NEW
            </span>
          )}
          <img
            src={activeVariant.image}
            alt={`${group.name} - ${activeVariant.colorway}`}
            style={{
              objectFit: "contain",
              height: "280px",
              width: "100%",
              padding: "1rem",
              backgroundColor: "#fff",
            }}
          />
        </div>
      </a>
      <div className="content">
        <a
          className="header"
          href={activeVariant.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: "1em" }}
        >
          {group.name}
        </a>
        <div className="meta" style={{ marginTop: "0.25rem" }}>
          {activeVariant.colorway}{activeVariant.size ? ` - ${activeVariant.size}` : ""}
        </div>
        {group.colorways.length > 0 && group.category === "paddle" && (
          <div style={{ marginTop: "0.5rem", display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
            {group.colorways.map((cw) => {
              const variant = group.variants.find((v) => v.colorway === cw);
              const hex = COLOR_HEX[variant?.color || ""] || "#ccc";
              const isSelected = cw === selectedColorway;
              return (
                <button
                  key={cw}
                  title={cw}
                  onClick={() => {
                    setSelectedColorway(cw);
                    const firstWithColorway = group.variants.find(
                      (v) => v.colorway === cw
                    );
                    if (firstWithColorway) setSelectedSize(firstWithColorway.size);
                  }}
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    backgroundColor: hex,
                    border: isSelected ? "2px solid #333" : "2px solid #ddd",
                    outline: isSelected ? "2px solid #333" : "none",
                    outlineOffset: "1px",
                    cursor: "pointer",
                    padding: 0,
                  }}
                />
              );
            })}
          </div>
        )}
        {sizesForColorway.length > 0 && (
          <div style={{ marginTop: "0.5rem" }}>
            {sizesForColorway.map((sz) => (
              <button
                key={sz}
                className={classnames("ui mini basic button", {
                  active: sz === selectedSize,
                })}
                style={{
                  marginBottom: "0.25rem",
                  fontWeight: sz === selectedSize ? "bold" : "normal",
                }}
                onClick={() => setSelectedSize(sz)}
              >
                {sz}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="extra content">
        <span style={{ fontWeight: "bold", color: "#1b1c1d" }}>
          {COST_LABELS[activeVariant.cost] || activeVariant.cost}
        </span>
        <span className="right floated">{group.brand}</span>
      </div>
      <a
        className="ui bottom attached button"
        href={activeVariant.link}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none" }}
      >
        {activeVariant.link.includes("https://11six24.com") ? "View on 11six24" : activeVariant.link.includes("https://joola.com") ? "View on JOOLA" : activeVariant.link.includes("sixzeropickleball.com") ? "View on SIX ZERO" : "View on Amazon"}<i className="external alternate icon" style={{ marginLeft: "0.5em" }}></i>
      </a>
    </div>
  );
};

const CATEGORY_LABELS: Record<string, string> = {
  paddle: "Paddles",
  ball: "Balls",
  net: "Nets",
};

const ShopPage = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedBrand, setSelectedBrand] = React.useState("");
  const [selectedCost, setSelectedCost] = React.useState("");
  const [selectedSize, setSelectedSize] = React.useState("");

  const groups = groupProducts(catalog);

  const categories = Array.from(new Set(groups.map((g) => g.category))).sort();
  const brands = Array.from(new Set(
    groups
      .filter((g) => !selectedCategory || g.category === selectedCategory)
      .map((g) => g.brand)
  )).sort();
  const costs = Array.from(new Set(
    groups
      .filter((g) => !selectedCategory || g.category === selectedCategory)
      .map((g) => g.cost)
  )).sort((a, b) => a.length - b.length);

  const sizes = Array.from(new Set(
    groups
      .filter((g) => !selectedCategory || g.category === selectedCategory)
      .flatMap((g) => g.sizes)
  )).sort();

  const query = searchQuery.toLowerCase().trim();
  const filteredGroups = groups.filter(
    (g) =>
      (!query ||
        g.name.toLowerCase().includes(query) ||
        g.brand.toLowerCase().includes(query) ||
        g.variants.some((v) => v.colorway.toLowerCase().includes(query))) &&
      (!selectedCategory || g.category === selectedCategory) &&
      (!selectedBrand || g.brand === selectedBrand) &&
      (!selectedCost || g.cost === selectedCost) &&
      (!selectedSize || g.sizes.includes(selectedSize))
  );

  return (
    <Layout
      title="Shop Pickleball Gear"
      description="Pickleball paddles, balls, and nets"
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
              Pickleball paddles, balls &amp; nets
            </div>
          </div>
        </h5>

        <p style={{ color: "gray", fontSize: "0.9em", marginBottom: "1rem" }}>
          Some links are affiliate links. We may earn a commission from qualifying purchases.
        </p>

        <div className="ui form" style={{ marginBottom: "1rem" }}>
          <div className="field" style={{ marginBottom: "0.75rem" }}>
            <div className="ui icon input fluid">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <i className="search icon"></i>
            </div>
          </div>
          <div className="equal width fields">
            <div className="field">
              <label>Category</label>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="">All</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{CATEGORY_LABELS[cat] || cat}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Brand</label>
              <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
                <option value="">All</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
            {sizes.length > 0 && (
              <div className="field">
                <label>Size</label>
                <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                  <option value="">All</option>
                  {sizes.map((size) => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            )}
            <div className="field">
              <label>Price</label>
              <select value={selectedCost} onChange={(e) => setSelectedCost(e.target.value)}>
                <option value="">All</option>
                {costs.map((cost) => (
                  <option key={cost} value={cost}>{COST_LABELS[cost] || cost}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {filteredGroups.length === 0 ? (
          <div className="ui message">
            <p>No products match the selected filters.</p>
          </div>
        ) : (
          <div className="ui three stackable cards">
            {filteredGroups.map((group) => (
              <ProductCard key={group.name} group={group} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ShopPage;
