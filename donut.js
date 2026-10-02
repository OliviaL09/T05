// js/donut.js
const createDonut = (data, selector) => {
  const size = 360;
  const svg = d3.select(selector)
    .append("svg")
    .attr("viewBox", `0 0 ${size} ${size}`);
  const g = svg.append("g").attr("transform", `translate(${size / 2},${size / 2})`);

  // Count of models per screen technology
  const counts = Array.from(
    d3.rollup(data, v => v.length, d => d.tech),
    ([tech, count]) => ({ tech, count })
  );

  const radius = size / 2 - 10;
  const pie = d3.pie().value(d => d.count).sort(null);
  const arc = d3.arc().innerRadius(radius * 0.55).outerRadius(radius);
  const color = d3.scaleOrdinal().domain(counts.map(d => d.tech)).range(COLORS);
  const total = d3.sum(counts, d => d.count);

  const slices = g.selectAll("g.slice")
    .data(pie(counts))
    .join("g")
    .attr("class", "slice");

  slices.append("path")
    .attr("d", arc)
    .attr("fill", d => color(d.data.tech));

  slices.append("text")
    .attr("class", "slice-label")
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .text(d => `${d.data.tech} ${Math.round(d.data.count / total * 100)}%`);
};
