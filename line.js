// line.js
const createLine = (data, selector) => {
  const c = makeSvg(selector);
  data = [...data].sort((a, b) => a.year - b.year);
  const x = d3.scaleLinear().domain(d3.extent(data, d => d.year)).range([0, c.w]);
  const y = d3.scaleLinear().domain([0, d3.max(data, d => d.price)]).nice().range([c.h, 0]);
  addAxes(c, x, y, "Year", "Price ($ per MWh)");
  c.g.select(".axis").call(d3.axisBottom(x).tickFormat(d3.format("d")));
  c.g.append("path").datum(data).attr("fill", "none").attr("stroke", COLORS[3])
    .attr("stroke-width", 2)
    .attr("d", d3.line().x(d => x(d.year)).y(d => y(d.price)));
};
