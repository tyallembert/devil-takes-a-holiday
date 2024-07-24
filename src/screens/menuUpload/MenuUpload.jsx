// import React, { useEffect, useState } from 'react';
// import "../../styles/MenuUpload.scss";
// // import Tesseract from 'tesseract.js';
// // import pdfToText from "react-pdftotext";
// // import { PDFDocument } from 'pdf-lib';
// import * as pdfjsLib from 'pdfjs-dist/webpack';

// const MenuUpload = () => {
//     const [textChunks, setTextChunks] = useState([]);

//     const handleFileUpload = async (event) => {
//         const file = event.target.files[0];
//         if (file && file.type === 'application/pdf') {
//         const fileReader = new FileReader();
//         fileReader.onload = async () => {
//             const pdfData = new Uint8Array(fileReader.result);
//             const pdfDoc = await pdfjsLib.getDocument({ data: pdfData }).promise;
//             const textContentArray = [];

//             for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
//                 const page = await pdfDoc.getPage(pageNum);
//                 const textContent = await page.getTextContent();
//                 const textItems = textContent.items.map(item => item.str);
//                 textContentArray.push(...textItems);
//             }

//             // Join all text items and split them by lines
//             const joinedText = textContentArray.join(' ');
//             const lines = joinedText.split(/\r?\n/);
//             console.log(lines);
//             setTextChunks(lines);
//         };
//         fileReader.readAsArrayBuffer(file);
//         } else {
//         alert('Please upload a valid PDF file.');
//         }
//     };
//     return (
//       <div className='menuUploadContainer'>
//         {/* <input type="file" accept="image/*" onChange={handleImageUpload} /> */}
//         <input type="file" accept="application/pdf" onChange={handleFileUpload} />

//         {textChunks.map((item, index) => (
//             <div key={index} style={{ fontSize: `${item.fontSize}px` }}>
//             {item.text}
//             </div>
//         ))}
//       </div>
//     );
// }

// export default MenuUpload;