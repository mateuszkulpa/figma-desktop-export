(async () => {
  const selectedNodes = figma.currentPage.selection;

  if (selectedNodes.length > 0 && selectedNodes[0].type === "FRAME") {
    const node = selectedNodes[0];
    const data = await node.exportAsync({ format: "PDF" });
    const arrayData = Array.from(new Uint8Array(data));

    try {
      await fetch("http://localhost:3000/export", {
        method: "POST",
        body: JSON.stringify({ pdfData: arrayData }),
      });

      figma.closePlugin("PDF exported and sent successfully.");
    } catch (error) {
      figma.closePlugin(`Failed to export and send PDF: ${error}`);
    }
  } else {
    figma.ui.postMessage({
      type: "error",
      message: "Please select a frame to export.",
    });
    figma.closePlugin();
  }
})();