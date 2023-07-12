let viz;

// 1. Create a variable to store the vizContainer
const vizContainer = document.getElementById("vizContainer");

// 2. Create a variable to store the dashboard options
const options = {
  device: "desktop",
  height: "800px",
  width: "1100px",
};

// 3. Create a variable to store the URL
const url =
  "https://public.tableau.com/views/EmbeddingWorkbookProfitsAcrossME-Asia/OfficeSupplyProfitsacrossMEandAsia";

// 4. Define function to load the dashboard
function initViz() {
  viz = new tableau.Viz(vizContainer, url, options);
}

// 5. Execute function to actually load the dashboard (wait for the document to load first)
document.addEventListener("DOMContentLoaded", initViz);

// 6. Create a variable to store the export PDF button

const exportPdfButton = document.getElementById("exportPDF");

// 7. Add event listener for when the button is clicked
exportPdfButton.addEventListener("click", exportPdfFunction);

// 8. define a function to trigger on button click
function exportPdfFunction() {
  viz.showExportPDFDialog();
}

// 9. export to PPT button

document
  .getElementById("exportPPT")
  .addEventListener("click", exportPptFunction);

function exportPptFunction() {
  viz.showExportPowerPointDialog();
}

// 10. set up filter interactions
function getRangeValues() {
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);
  const workbook = viz.getWorkbook();
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorksheets();
  //inspect the sheets you need to filter
  console.log(sheets);
  const sheetToFilter = sheets[0];
  // do the actual filtering
  sheetToFilter
    .applyRangeFilterAsync("SUM(Sales)", { min: minValue, max: maxValue })
    .then(alert("Viz filtered! 🐵"));
}

// 11. trigger function on filter button click
const filterButton = document.getElementById("filterButton");

filterButton.addEventListener("click", getRangeValues);
