// donut.js  (uses your real tvBrandCount.csv)
const createDonut = (data, selector) => {
  const W = 600, H = 360, radius = 160;
  const svg = d3.select(selector).append("svg").attr("viewBox", `0 0 ${W} ${H}`);
  const g = svg.append("g").attr("transform", `translate(${radius + 20},${H / 2})`);

  const pie = d3.pie().value(d => d.count).sort(null);
  const arc = d3.arc().innerRadius(radius * 0.55).outerRadius(radius);
  const color = d3.scaleOrdinal().domain(data.map(d => d.brand)).range(d3.schemeTableau10);
  const total = d3.sum(data, d => d.count);

  const slices = g.selectAll("g").data(pie(data)).join("g");
  slices.append("path").attr("d", arc).attr("fill", d => color(d.data.brand));
  slices.filter(d => d.data.count / total >= 0.06).append("text")
    .attr("class", "slice-label")
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .text(d => `${Math.round(d.data.count / total * 100)}%`);

  // Legend
  const legend = svg.append("g").attr("class", "legend").attr("transform", `translate(${radius * 2 + 50},40)`);
  data.forEach((d, i) => {
    const row = legend.append("g").attr("transform", `translate(0,${i * 26})`);
    row.append("rect").attr("width", 14).attr("height", 14).attr("fill", color(d.brand));
    row.append("text").attr("x", 22).attr("y", 12).text(`${d.brand} (${d.count})`);
  });
};
