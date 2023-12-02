
export const handleMouseActions = (imageURL) => { 
    let isMouseDown = false;
    let lastX = 1;
    let lastY = 1;
    let lastTime = new Date().getTime();

    window.addEventListener('mousedown', (event) => {
        isMouseDown = true;
        updateMousePosition(event);
    });

    window.addEventListener('mouseup', () => {
        isMouseDown = false;
    });

    window.addEventListener('mousemove', (event) => {
        if (isMouseDown) {
            updateMousePosition(event);
        }
    });

    function updateMousePosition(event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const hasMovedFarEnough = calcDistance(mouseX, mouseY, lastX, lastY);
        const hasBeenLongEnough = calcElapsedTime();
        if(hasMovedFarEnough || hasBeenLongEnough) {
            createElement(mouseX, mouseY);
            lastX = mouseX;
            lastY = mouseY;
        }
    }

    function createElement(x, y) {
        
        const box = document.createElement('div');
        const dimension = randomIntFromInterval(5, 30);
        box.className = "dot";
        box.style.left = `${x}px`;
        box.style.top = `${y}px`;
        box.style.height = `${dimension}px`;
        box.style.width = `${dimension}px`;
        box.style.transform = `translateX(${randomIntFromInterval(-20, 20)}px)`;

        const img = document.createElement('img');
        img.src = imageURL;
        img.alt = '';
        box.appendChild(img);
        document.body.appendChild(box);

        setTimeout(() => {
            box.remove();
        }, 500);
    }
    function calcDistance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))>=100?true:false;
    }
    function calcElapsedTime() {
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - lastTime;
        lastTime = currentTime;
        return elapsedTime>=100?true:false;
    }
    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}