// data.js
// Built-in sample data so the charts always show (replace with your own CSV later).
const rng = (() => { let s = 4; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();

const SAMPLE_TV = (() => {
  const techs = ["LED", "LED", "LED", "LCD", "LCD", "OLED"];
  const mult = { LED: 1, LCD: 0.9, OLED: 1.3 };
  const sizes = [32, 40, 43, 50, 55, 58, 65, 75, 85];
  return d3.range(150).map(() => {
    const tech = techs[Math.floor(rng() * techs.length)];
    const size = sizes[Math.floor(rng() * sizes.length)];
    return { tech, size, energy: Math.round((size * 1.7 + 20 + (rng() - 0.5) * 40) * mult[tech]) };
  });
})();

const SAMPLE_PRICE = d3.range(2010, 2026).map((year, i) =>
  ({ year, price: Math.round((60 + i * 4 + (rng() - 0.4) * 20) * 10) / 10 }));

// Same numbers as your tvBrandCount.csv, used if the file cannot be loaded.
const FALLBACK_BRANDS = [
  { brand: "SAMSUNG ELECTRONICS", count: 859 }, { brand: "KOGAN", count: 702 },
  { brand: "LG", count: 682 }, { brand: "SAMSUNG", count: 269 },
  { brand: "HISENSE", count: 260 }, { brand: "PHILIPS", count: 130 },
  { brand: "JVC", count: 124 }, { brand: "SONY", count: 97 },
  { brand: "EKO", count: 97 }, { brand: "TCL", count: 93 }
];

// Try the CSV beside index.html, then data/, then fall back to built-in numbers.
const loadBrands = async () => {
  for (const path of ["tvBrandCount.csv", "data/tvBrandCount.csv"]) {
    try {
      const rows = await d3.csv(path, d => ({ brand: d.brand, count: +d.count }));
      const clean = rows.filter(d => d.brand && isFinite(d.count));
      if (clean.length) { console.log("Loaded", path, clean.length, "rows"); return clean; }
    } catch (e) { console.warn("Could not load", path); }
  }
  console.warn("Using built-in brand numbers");
  return FALLBACK_BRANDS;
};

const makeSvg = (selector, width = 600, height = 360) => {
  const margin = { top: 15, right: 20, bottom: 50, left: 60 };
  const svg = d3.select(selector).append("svg").attr("viewBox", `0 0 ${width} ${height}`);
  const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
  return { svg, g, w: width - margin.left - margin.right, h: height - margin.top - margin.bottom };
};

const addAxes = ({ g, w, h }, x, y, xTitle, yTitle) => {
  g.append("g").attr("class", "axis").attr("transform", `translate(0,${h})`).call(d3.axisBottom(x));
  g.append("g").attr("class", "axis").call(d3.axisLeft(y));
  g.append("text").attr("class", "axis-title").attr("x", w / 2).attr("y", h + 40)
    .attr("text-anchor", "middle").text(xTitle);
  g.append("text").attr("class", "axis-title").attr("transform", "rotate(-90)")
    .attr("x", -h / 2).attr("y", -45).attr("text-anchor", "middle").text(yTitle);
};

const COLORS = ["#2a9d8f", "#e9a23b", "#3b7dd8", "#c8553d", "#7b6cc4"];
