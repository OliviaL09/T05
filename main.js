// js/main.js
loadData()
  .then(({ tv, price }) => {
    console.log("tv rows:", tv.length, "price rows:", price.length);
    createScatter(tv, "#chart-scatter");
    createLine(price, "#chart-line");
    createBar(tv, "#chart-bar");
    createDonut(tv, "#chart-donut");
  })
  .catch(err => {
    console.error("Could not load data:", err);
    d3.selectAll(".responsive-svg-container")
      .append("p")
      .text("Could not load the data. Check the file names in js/data.js.");
  });
