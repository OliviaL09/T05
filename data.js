// js/data.js
// If your real CSV uses different column names, change them here only.
const CONFIG = {
  tvFile: "data/tv.csv",
  priceFile: "data/price.csv",
  tv: { tech: "screenTech", size: "screenSize", energy: "energy" },
  price: { year: "year", price: "price" }
};

// Load both CSVs, convert types, and drop rows that did not parse.
const loadData = async () => {
  const [tv, price] = await Promise.all([
    d3.csv(CONFIG.tvFile, d => ({
      tech: d[CONFIG.tv.tech],
      size: +d[CONFIG.tv.size],
      energy: +d[CONFIG.tv.energy]
    })),
    d3.csv(CONFIG.priceFile, d => ({
      year: +d[CONFIG.price.year],
      price: +d[CONFIG.price.price]
    }))
  ]);
  return {
    tv: tv.filter(d => d.tech && isFinite(d.size) && isFinite(d.energy)),
    price: price.filter(d => isFinite(d.year) && isFinite(d.price))
  };
};

// Shared helper: create a responsive SVG and a margin-aware group.
const makeSvg = (selector, width = 600, height = 360) => {
  const margin = { top: 15, right: 20, bottom: 50, left: 60 };
  const svg = d3.select(selector)
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);
  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
  return {
    svg, g, margin,
    w: width - margin.left - margin.right,
    h: height - margin.top - margin.bottom
  };
};

// Shared helper: add x and y axes with titles.
const addAxes = ({ g, w, h }, x, y, xTitle, yTitle) => {
  g.append("g").attr("class", "axis")
    .attr("transform", `translate(0,${h})`).call(d3.axisBottom(x));
  g.append("g").attr("class", "axis").call(d3.axisLeft(y));
  g.append("text").attr("class", "axis-title")
    .attr("x", w / 2).attr("y", h + 40).attr("text-anchor", "middle").text(xTitle);
  g.append("text").attr("class", "axis-title")
    .attr("transform", "rotate(-90)")
    .attr("x", -h / 2).attr("y", -45).attr("text-anchor", "middle").text(yTitle);
};

const COLORS = ["#2a9d8f", "#e9a23b", "#3b7dd8", "#c8553d", "#7b6cc4"];
