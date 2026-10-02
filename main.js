// main.js
loadBrands().then(brands => {
  createScatter(SAMPLE_TV, "#chart-scatter");
  createLine(SAMPLE_PRICE, "#chart-line");
  createBar(SAMPLE_TV, "#chart-bar");
  createDonut(brands, "#chart-donut");
});
