// import React, { useEffect, useRef,  useState } from 'react'
import "../../styles/ToArtistLink.scss"
import { DevilDrawing } from "../../components/SVGs"
import { GiPaintBrush } from "react-icons/gi";

const ToArtistLink = () => {
  return (
    <div className='artistLinkContainer'>
        {/* <ArtCanvas /> */}
        <h1 className='header'>Featured Artists!</h1>
        <p>Want to get in contact with some of the current artists?</p>
        <a href="/artists" className="artistLink">Learn More!</a>
        <div className='backgroundImageContainer'>
          <DevilDrawing />
          <GiPaintBrush className='paintBrushIcon'/>
        </div>
    </div>
  )
}

export default ToArtistLink;

// const ArtCanvas = () => {

//   const canvasRef = useRef(null);
//   const [mousePositions, setMousePositions] = useState([]);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     canvas.width = canvas.clientWidth;
//     canvas.height = canvas.clientHeight;
//     const context = canvas.getContext('2d');

//     const draw = (x, y, alpha, size) => {
//       context.fillStyle = `rgba(255, 255, 255, ${alpha})`; // Full opacity for testing
//       context.beginPath();
//       context.arc(x, y, size, 0, 2 * Math.PI);
//       context.fill();
//     };

//     const handleMouseMove = (event) => {
//       const rect = canvas.getBoundingClientRect();
//       const x = event.clientX - rect.left;
//       const y = event.clientY - rect.top;
//       const size = 10;
//       const alpha = 1;

//       setMousePositions((prevPositions) => {
//         return [...prevPositions, { x, y, size, alpha }];
//       });
//     };

//     const animationFrame = () => {
//       context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
//       requestAnimationFrame(animationFrame);

//       setMousePositions((prevPositions) => {
//         return prevPositions.map((particle, index) => {
//           // Reduce alpha by a small amount based on index (older particles fade faster)
//           const newAlpha = Math.max(0, particle.alpha - (1 - index * 0.01));
//           return { ...particle, alpha: newAlpha };
//         }).filter((particle) => particle.alpha > 0); // Remove particles with 0 alpha
//       });
    
//       // Draw the updated positions with adjusted alpha
//       mousePositions.forEach((particle) => {
//         draw(particle.x, particle.y, particle.alpha, 10);
//       });
//     };

//     canvas.addEventListener('mousemove', handleMouseMove);
//     animationFrame();

//     return () => {
//       canvas.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);

//   return (
//     <canvas ref={canvasRef} style={{width: '100%', height: '100%'}}/>
//   )
// }