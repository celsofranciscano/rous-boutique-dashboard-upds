"use client";

import React from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

const GeneratePdf = async (data) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    alert("No hay datos para generar el PDF.");
    return;
  }

  const columns = Object.keys(data[0]);

  try {
    // Cargar el PDF del membrete
    const response = await fetch("/rouseboutique.pdf");
    const existingPdfBytes = await response.arrayBuffer();
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Crear nueva página si se necesitan más hojas
    const addNewPageWithMembrete = () => {
      const newPage = pdfDoc.addPage([595, 842]);
      const pageHeight = newPage.getHeight();

      // Membrete
      const title = "Reporte de Inventario de Almacén";
      newPage.drawText(title, {
        x: 50,
        y: pageHeight - 150,
        size: 18,
        font: boldFont,
        color: rgb(0, 0, 0),
      });

      return newPage;
    };

    let page = pdfDoc.getPages()[0];
    const pageWidth = page.getWidth();
    const pageHeight = page.getHeight();
    let yPosition = pageHeight - 180;
    const margin = 50;
    const rowHeight = 25;
    const availableWidth = pageWidth - margin * 2;
    const maxRowsPerPage = Math.floor((pageHeight - 200) / rowHeight);

    const wrapText = (text, maxWidth, font, fontSize) => {
      if (typeof text !== "string") text = String(text);
      const words = text.split(" ");
      let lines = [];
      let currentLine = words[0];

      for (let i = 1; i < words.length; i++) {
        const width = font.widthOfTextAtSize(
          currentLine + " " + words[i],
          fontSize
        );
        if (width < maxWidth) {
          currentLine += " " + words[i];
        } else {
          lines.push(currentLine);
          currentLine = words[i];
        }
      }
      lines.push(currentLine);
      return lines;
    };

    const calculateMaxLineCountInRow = (
      columns,
      data,
      font,
      fontSize,
      columnWidths
    ) => {
      return data.map((row) => {
        return columns
          .map((col, index) => {
            const text = String(row[col] || "");
            const lines = wrapText(
              text,
              columnWidths[index] - 10,
              font,
              fontSize
            );
            return lines.length;
          })
          .reduce((max, lineCount) => Math.max(max, lineCount), 1);
      });
    };

    const calculateColumnWidths = () => {
      const columnWidthRatios = [2, 2, 3, 3, 2, 4];
      const totalRatio = columnWidthRatios.reduce((a, b) => a + b, 0);
      return columnWidthRatios.map(
        (ratio) => (availableWidth * ratio) / totalRatio
      );
    };

    const columnWidths = calculateColumnWidths();

    const drawTableHeader = (page) => {
      page.drawRectangle({
        x: margin - 5,
        y: yPosition,
        width: availableWidth + 10,
        height: rowHeight,
        color: rgb(0.2, 0.4, 0.8),
      });

      columns.forEach((header, index) => {
        page.drawText(header, {
          x:
            margin +
            columnWidths.slice(0, index).reduce((a, b) => a + b, 0) +
            5,
          y: yPosition + 7,
          size: 12,
          font: boldFont,
          color: rgb(1, 1, 1),
        });
      });

      yPosition -= rowHeight;
    };

    drawTableHeader(page);

    let rowCount = 0;

    for (let item of data) {
      if (rowCount >= maxRowsPerPage) {
        page = addNewPageWithMembrete();
        yPosition = page.getHeight() - 180;
        drawTableHeader(page);
        rowCount = 0;
      }

      let maxLineCountInRow = calculateMaxLineCountInRow(
        columns,
        [item],
        font,
        10,
        columnWidths
      );
      const adjustedRowHeight = maxLineCountInRow * 12 + 10;

      const isEvenRow = rowCount % 2 === 0;
      if (isEvenRow) {
        page.drawRectangle({
          x: margin - 5,
          y: yPosition - adjustedRowHeight,
          width: availableWidth + 10,
          height: adjustedRowHeight,
          color: rgb(0.95, 0.95, 0.95),
        });
      }

      columns.forEach((col, index) => {
        const text = String(item[col] || "");
        const lines = wrapText(text, columnWidths[index] - 10, font, 10);

        lines.forEach((line, lineIndex) => {
          const x =
            margin +
            columnWidths.slice(0, index).reduce((a, b) => a + b, 0) +
            5;
          const y = yPosition - 18 - lineIndex * 12;
          page.drawText(line.trim(), {
            x,
            y,
            size: 10,
            font: font,
            color: rgb(0, 0, 0),
          });
        });
      });

      columns.forEach((_, index) => {
        const x =
          margin + columnWidths.slice(0, index).reduce((a, b) => a + b, 0);
        page.drawLine({
          start: { x, y: yPosition },
          end: { x, y: yPosition - adjustedRowHeight },
          thickness: 0.5,
          color: rgb(0.7, 0.7, 0.7),
        });
      });

      page.drawLine({
        start: { x: margin - 5, y: yPosition - adjustedRowHeight },
        end: {
          x: margin + availableWidth + 5,
          y: yPosition - adjustedRowHeight,
        },
        thickness: 0.5,
        color: rgb(0.7, 0.7, 0.7),
      });

      yPosition -= adjustedRowHeight;
      rowCount++;
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.download = "rousboutique.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (error) {
    console.error("Error generando el PDF:", error);
    alert("Ocurrió un error al generar el PDF. Inténtalo de nuevo más tarde.");
  }
};

const GeneratePdfButton = ({ data }) => {
  const handleClick = () => {
    GeneratePdf(data);
  };

  return (
    <button
      onClick={handleClick}
      className="flex gap-1 border dark:border-zinc-800 bg-zinc-950 px-4 py-2 rounded-md text-zinc-500 dark:text-zinc-400 hover:bg-zinc-800"
    >
      <svg
        className="w-6 h-6"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01"
        />
      </svg>
      <span>PDF</span>
    </button>
  );
};

export default GeneratePdfButton;
