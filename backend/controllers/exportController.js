const pdf = require("html-pdf");
const epub = require("epub-gen");
const fs = require("fs");
const path = require("path");

// Ensure the temporary directory exists
const tempDir = path.join(__dirname, "..", "temp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

exports.exportToPdf = async (req, res, next) => {
  const htmlContent = req.body;
  const outputPdfPath = path.join(tempDir, "output.pdf");

  try {
    // Ensure the temp directory exists
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    // Convert HTML to PDF
    pdf.create(htmlContent).toFile(outputPdfPath, (err, result) => {
      if (err) {
        console.error("PDF generation error:", err);
        return res
          .status(500)
          .send("An error occurred while generating the PDF");
      } else {
        console.log("PDF created successfully");
        // Send the PDF file as a response
        res.sendFile(outputPdfPath, (err) => {
          if (err) {
            console.error("Error sending PDF:", err);
            return res
              .status(500)
              .send("An error occurred while sending the PDF");
          } else {
            console.log("PDF sent successfully");
            // Clean up the generated PDF file
            // if (fs.existsSync(outputPdfPath)) {
            //   fs.unlinkSync(outputPdfPath);
            // }
          }
        });
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.exportToEpub = async (req, res, next) => {
  const htmlContent = req.body;
  const outputEpubPath = path.join(tempDir, "output.epub");

  try {
    // Ensure the temp directory exists
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    // Set options for epub-gen
    const options = {
      title: "Sample EPUB",
      author: "Author Name",
      output: outputEpubPath,
      content: [
        {
          title: "Chapter 1",
          data: htmlContent,
        },
      ],
    };

    console.log("EPUB options:", options);

    // Convert HTML to EPUB
    new epub(options).promise
      .then(() => {
        console.log("EPUB created successfully");
        // Send the EPUB file as a response
        res.sendFile(outputEpubPath, (err) => {
          if (err) {
            console.error("Error sending EPUB:", err);
            return res
              .status(500)
              .send("An error occurred while sending the EPUB");
          } else {
            console.log("EPUB sent successfully");
            // Clean up the generated EPUB file
            // if (fs.existsSync(outputEpubPath)) {
            //   fs.unlinkSync(outputEpubPath);
            // }
          }
        });
      })
      .catch((err) => {
        console.error("EPUB generation error:", err);
        return res
          .status(500)
          .send("An error occurred while generating the EPUB");
      });
  } catch (error) {
    // Clean up files in case of an unexpected error
    if (fs.existsSync(outputEpubPath)) {
      fs.unlinkSync(outputEpubPath);
    }
    next(error);
  }
};
