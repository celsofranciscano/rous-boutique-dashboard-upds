import React, { useRef, useState } from "react";
import JsBarcode from "jsbarcode";

const GenerateBarcode = ({ barcode }) => {
  const [barcodeValue, setBarcodeValue] = useState(barcode);
  const [error, setError] = useState("");
  const barcodeRef = useRef(null);
  const componentRef = useRef(null);
  const [isGenerated, setIsGenerated] = useState(false); // Track whether barcode is generated

  // Function to generate the barcode
  const handleGenerateBarcode = () => {
    if (/^\d{12}$/.test(barcodeValue)) {
      setError("");
      if (barcodeRef.current) {
        try {
          JsBarcode(barcodeRef.current, barcodeValue, {
            format: "EAN13",
            lineColor: "#000",
            width: 2,
            height: 80,
            displayValue: true,
          });
          setIsGenerated(true); // Set barcode as generated
        } catch (err) {
          setError("Error generating barcode: " + err.message);
        }
      }
    } else {
      setError("The barcode must have exactly 12 numeric digits.");
    }
  };

  // Function to download the barcode as a PNG image
  const handleDownload = () => {
    if (!componentRef.current) {
      setError("Nothing to download");
      return;
    }

    const svg = componentRef.current.querySelector("svg");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set canvas size
    canvas.width = svg.clientWidth;
    canvas.height = svg.clientHeight;

    // Create a data URL from the SVG
    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    img.onload = function () {
      // Draw SVG on canvas
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      // Convert canvas to PNG and download
      canvas.toBlob(function (blob) {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `${barcodeValue}.png`; // Name of the file to download
        a.click();
      }, "image/png");
    };

    img.src = url; // Set source to the blob URL
  };

  return (
    <div className=" flex flex-col items-center justify-between gap-4">
      {/* Printable container for the barcode */}
      <div ref={componentRef} className="p-2  rounded">
        <svg ref={barcodeRef}></svg>
      </div>
      {/* Render Generate button if not generated, otherwise render Download button */}
      {!isGenerated ? (
        <button
          onClick={handleGenerateBarcode}
          className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Generar Barcode
        </button>
      ) : (
        <button
          onClick={handleDownload}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Download PNG
        </button>
      )}

      {error && <p className="text-red-500 mb-2">{error}</p>}
    </div>
  );
};

export default GenerateBarcode;
