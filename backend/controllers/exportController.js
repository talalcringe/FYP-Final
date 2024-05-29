// const pandoc = require("node-pandoc");
const pdf = require("html-pdf");
const epub = require("epub-gen");
const fs = require("fs");
const path = require("path");

// Ensure the temporary directory exists
const tempDir = path.join(__dirname, "..", "temp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// exports.exportToPdf = async (req, res, next) => {
//   const htmlContent = req.body;
//   const tempHtmlPath = path.join(tempDir, "temp.html");
//   const outputPdfPath = path.join(tempDir, "output.pdf");

//   try {
//     // Write the HTML content to a temporary file
//     fs.writeFileSync(tempHtmlPath, htmlContent);

//     // Set options for pandoc
//     const args = `-f html -t pdf -o ${outputPdfPath}`;
//     const src = tempHtmlPath;

//     console.log("Pandoc arguments:", args);
//     console.log("Source HTML file:", src);

//     // Convert HTML to PDF
//     pandoc(src, args, (err, result) => {
//       // Clean up the temporary HTML file
//       if (fs.existsSync(tempHtmlPath)) {
//         fs.unlinkSync(tempHtmlPath);
//       }

//       if (err) {
//         console.error("Pandoc error:", err);
//         return res
//           .status(500)
//           .send("An error occurred while generating the PDF");
//       } else {
//         console.log("PDF created successfully");
//         // Send the PDF file as a response
//         res.sendFile(outputPdfPath, (err) => {
//           if (err) {
//             console.error("Error sending PDF:", err);
//             return res
//               .status(500)
//               .send("An error occurred while sending the PDF");
//           } else {
//             console.log("PDF sent successfully");
//             // Clean up the generated PDF file
//             // if (fs.existsSync(outputPdfPath)) {
//             //   fs.unlinkSync(outputPdfPath);
//             // }
//           }
//         });
//       }
//     });
//   } catch (error) {
//     // Clean up files in case of an unexpected error
//     if (fs.existsSync(tempHtmlPath)) {
//       fs.unlinkSync(tempHtmlPath);
//     }
//     if (fs.existsSync(outputPdfPath)) {
//       fs.unlinkSync(outputPdfPath);
//     }
//     next(error);
//   }
// };

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

// exports.exportToEpub = async (req, res, next) => {
//   const htmlContent = req.body;
//   const tempHtmlPath = path.join(tempDir, "temp.html");
//   const outputEpubPath = path.join(tempDir, "output.epub");

//   try {
//     // Write the HTML content to a temporary file
//     fs.writeFileSync(tempHtmlPath, htmlContent);

//     // Set options for pandoc
//     const args = `-f html -t epub -o ${outputEpubPath}`;
//     const src = tempHtmlPath;

//     console.log("Pandoc arguments:", args);
//     console.log("Source HTML file:", src);

//     // Convert HTML to PDF
//     pandoc(src, args, (err, result) => {
//       // Clean up the temporary HTML file
//       if (fs.existsSync(tempHtmlPath)) {
//         fs.unlinkSync(tempHtmlPath);
//       }

//       if (err) {
//         console.error("Pandoc error:", err);
//         return res
//           .status(500)
//           .send("An error occurred while generating the epub");
//       } else {
//         console.log("epub created successfully");
//         // Send the PDF file as a response
//         res.sendFile(outputEpubPath, (err) => {
//           if (err) {
//             console.error("Error sending epub:", err);
//             return res
//               .status(500)
//               .send("An error occurred while sending the epub");
//           } else {
//             console.log("epub sent successfully");
//             // Clean up the generated PDF file
//             // if (fs.existsSync(outputEpubPath)) {
//             //   fs.unlinkSync(outputEpubPath);
//             // }
//           }
//         });
//       }
//     });
//   } catch (error) {
//     // Clean up files in case of an unexpected error
//     if (fs.existsSync(tempHtmlPath)) {
//       fs.unlinkSync(tempHtmlPath);
//     }
//     if (fs.existsSync(outputEpubPath)) {
//       fs.unlinkSync(outputEpubPath);
//     }
//     next(error);
//   }
// };

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
