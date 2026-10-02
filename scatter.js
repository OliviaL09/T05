// scatter.js
const createScatter = (data, selector) => {
  const c = makeSvg(selector);
  const x = d3.scaleLinear().domain(d3.extent(data, d => d.size)).nice().range([0, c.w]);
  const y = d3.scaleLinear().domain([0, d3.max(data, d => d.energy)]).nice().range([c.h, 0]);
  addAxes(c, x, y, "Screen size (inches)", "Energy use (kWh/year)");
  c.g.selectAll("circle").data(data).join("circle")
    .attr("cx", d => x(d.size)).attr("cy", d => y(d.energy))
    .attr("r", 3.5).attr("fill", COLORS[2]).attr("fill-opacity", 0.55);
};
