import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const htmlToPDF = async (htmlId, title = "报表", bgColor = "#fff") => {
  let pdfDom = document.getElementById(htmlId);
  pdfDom.style.padding = '0 10px !important';
  const A4_WIDTH = 595.28;
  const A4_HEIGHT = 841.89;

  let pageHeight = (pdfDom.scrollWidth / A4_WIDTH) * A4_HEIGHT;
  let lableListID = pdfDom.querySelectorAll(".quesWholeDiv");

  for (let i = 0; i < lableListID.length; i++) {
    let multiple = Math.ceil((lableListID[i].offsetTop + lableListID[i].offsetHeight) / pageHeight);
    if (isSplit(lableListID, i, multiple * pageHeight)) {
      let divParent = lableListID[i].parentNode;
      let newNode = document.createElement("div");
      newNode.className = "emptyDiv";
      newNode.style.background = "#ffffff";
      let _H = multiple * pageHeight - (lableListID[i].offsetTop + lableListID[i].offsetHeight);
      newNode.style.height = _H + 30 + "px";
      newNode.style.width = "100%";
      let next = lableListID[i].nextSibling;
      if (next) {
        divParent.insertBefore(newNode, next);
      } else {
        divParent.appendChild(newNode);
      }
    }
  }

  let canvasList = [];

  await Promise.all(
    Array.from(pdfDom.children).map(async (child) => {
      let canvas = await html2canvas(child, {
        scale: 2,
        useCORS: true,
        backgroundColor: bgColor,
      });
      canvasList.push(canvas);
    })
  );

  let PDF = new jsPDF("p", "pt", "a4");

  canvasList.forEach((canvas, index) => {
    if (index > 0) {
      PDF.addPage();
    }
    let pageData = canvas.toDataURL("image/jpeg", 1.0);
    let imgHeight = (A4_WIDTH / canvas.width) * canvas.height;
    PDF.addImage(pageData, "JPEG", 0, 0, A4_WIDTH, imgHeight);
  });

  PDF.save(title + ".pdf");

};

function isSplit(nodes, index, pageHeight) {
  // 计算当前这块 dom 是否跨越了 A4 大小，以此分割
  if (
    nodes[index].offsetTop + nodes[index].offsetHeight < pageHeight &&
    nodes[index + 1] &&
    nodes[index + 1].offsetTop + nodes[index + 1].offsetHeight > pageHeight
  ) {
    return true;
  }
  return false;
}