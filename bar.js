// bar.js
const createBar = (data, selector) => {
  const c = makeSvg(selector);
  const means = Array.from(d3.rollup(data, v => d3.mean(v, d => d.energy), d => d.tech),
    ([tech, mean]) => ({ tech, mean })).sort((a, b) => d3.descending(a.mean, b.mean));
  const x = d3.scaleBand().domain(means.map(d => d.tech)).range([0, c.w]).padding(0.3);
  const y = d3.scaleLinear().domain([0, d3.max(means, d => d.mean)]).nice().range([c.h, 0]);
  addAxes(c, x, y, "Screen technology", "Mean energy use (kWh/year)");
  c.g.selectAll("rect").data(means).join("rect")
    .attr("class", d => `bar bar-${d.tech}`)
    .attr("x", d => x(d.tech)).attr("y", d => y(d.mean))
    .attr("width", x.bandwidth()).attr("height", d => c.h - y(d.mean))
    .attr("fill", COLORS[0]);
};
