let c = document.getElementById('demo');
let cc = c.getContext("2d");

window.addEventListener("load", setDimensions);
window.addEventListener("resize", setDimensions);

function setDimensions() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;

    // configuracion de sombras para el renderizado
    cc.shadowBlur = 10;
    cc.shadowColor = "#c800ff";
}

let blobarray = [];
let colors = ["#AB96DA", "#FFBF00", "#FBD87F", "#E7DDD9"];
let colorShift = 0;

function animate() {
    draw();
    bwColor();
    // uso de la funcion requestanimationframe para crear un ciclo de animacion eficiente
    // sincronizado con los fps del navegador
    requestAnimationFrame(animate);
}

function draw() {
    // limpieza selectiva del canvas para el siguiente frame
    cc.fillStyle = "#312B3E";
    cc.fillRect(0, 0, c.width, c.height);

    // control de cantidad de blops para evitar vasura visual y consumo excesivo de ram
    // ai ai ai, las ias nos roban la ram
    if (blobarray.length < 300) {
        blobarray.push({
            x: c.width / 2,
            y: c.height / 2,
            bStroke: Math.random() < 0.5,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 50 + 80,
            xSpeed: (Math.random() - 0.5) * 12,
            ySpeed: (Math.random() - 0.5) * 12
        });
    }

    // iteracion inversa para eliminar elementos sin saltar indices del array
    // siento que me consume mucho recursos, pero es necesario para evitar errores de referencia
    // actualizacion y renderizado de cada bop
    for (let i = blobarray.length - 1; i >= 0; i--) {
        let blob = blobarray[i];

        // actualizacion constante de coordenadas segun la velocidad aleatoria
        blob.x += blob.xSpeed;
        blob.y += blob.ySpeed;

        // renderizado de figuras centradas
        if (blob.bStroke) {
            cc.strokeStyle = blob.color;
            cc.strokeRect(blob.x - blob.size / 2, blob.y - blob.size / 2, blob.size, blob.size);
        } else {
            cc.fillStyle = blob.color;
            cc.fillRect(blob.x - blob.size / 2, blob.y - blob.size / 2, blob.size, blob.size);
        }

        // reduccion potencial del tamano para crear efecto de desvanecimiento
        blob.size *= 0.97;

        // eliminacion de objetos pequeños para que el script no pete
        if (blob.size < 1) {
            blobarray.splice(i, 1);
        }
    }
}

function bwColor() {
    colorShift += 0.05;
    // cambio de color usando al mayor traidor de toda mi carrera, trigonometria
    // para suavidad visual
    let intensity = Math.sin(colorShift) * 10;
    let r = 49 + intensity;
    let g = 43 + intensity;
    let b = 62 + intensity;

    c.style.backgroundColor = `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
}

// ejecucion del ciclo principal
requestAnimationFrame(animate);

(function () {
    const btn = document.getElementById('zawarudo-button');
    if (!btn) return;

    function spawnPulse() {
        const rect = btn.getBoundingClientRect();
        const x = rect.left + rect.width / 2 + (Math.random() - 0.5) * 8;
        const y = rect.top  + rect.height / 2 + (Math.random() - 0.5) * 8;

        const dot = document.createElement('div');
        dot.className = 'zw-pulse';
        dot.style.left = x + 'px';
        dot.style.top  = y + 'px';
        document.body.appendChild(dot);

        let start = null;
        function animate(ts) {
            if (!start) start = ts;
            const p = (ts - start) / 900;   // duración: 900ms
            if (p >= 1) { dot.remove(); return; }
            const ease = p < 0.4 ? p / 0.4 : 1 - (p - 0.4) / 0.6;
            dot.style.opacity = ease * 0.8;
            dot.style.transform = `translate(-50%, -50%) scale(${1 + p * 4})`;
            requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
    }

    setInterval(spawnPulse, 1000);   // pulso cada 3 seg

    btn.addEventListener('click', () => {
        window.location.href = '/index-zawarudo';
    });
})();