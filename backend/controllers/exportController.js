const pandoc = require("node-pandoc");
const fs = require("fs");
const path = require("path");

exports.exportToPdf = async (req, res, next) => {
  const htmlContent = req.body;
  const tempHtmlPath = path.join(__dirname, "temp.html");
  const outputPdfPath = path.join(__dirname, "output.pdf");

  // Write the HTML content to a temporary file
  fs.writeFileSync(tempHtmlPath, htmlContent);

  // Set options for pandoc
  const args = `-f html -t pdf -o ${outputPdfPath}`;
  const src = tempHtmlPath;

  // Convert HTML to PDF
  pandoc(src, args, (err, result) => {
    // Clean up the temporary HTML file
    fs.unlinkSync(tempHtmlPath);

    if (err) {
      console.error("Error:", err);
      res.status(500).send("An error occurred while generating the PDF");
    } else {
      // Send the PDF file as a response
      res.sendFile(outputPdfPath, (err) => {
        if (err) {
          console.error("Error:", err);
          res.status(500).send("An error occurred while sending the PDF");
        } else {
          // Clean up the generated PDF file
          fs.unlinkSync(outputPdfPath);
        }
      });
    }
  });
};

exports.exportToEpub = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
