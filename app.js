let canvas = document.querySelector("#canvas");
const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
// c.fillStyle = 'black';
// c.fillRect(0, 0, innerWidth, innerHeight);

//object for mouse position
let mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

// c.beginPath();
// c.arc(10, 10, 7, 0, 2 * Math.PI, false);
// c.fillStyle = 'aqua';
// c.stroke();
// c.fill();
// c.closePath();

//actions
addEventListener('resize', ()=>{
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    // console.log(innerHeight);
});

addEventListener('click', (event)=>{
    mouse.x = event.x;
    mouse.y = event.y;
    createParticles();
});

//particles part
class Particles{
    constructor(x, y, dx, dy, radius, color){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
        this.alpha = 1;
    }

    draw = ()=>{
        c.save();
        c.globalAlpha = this.alpha;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        c.fillStyle = this.color;
        // c.stroke();
        c.fill();
        c.closePath();
        c.restore();
    }

    update = ()=>{
        this.draw();
        this.dx *= friction;
        this.dy *= friction;
        this.dy += gravity;
        this.x += this.dx;
        this.y += this.dy;
        if(this.alpha > 0){
            this.alpha -= 0.01;
        }
        console.log(gravity);
    }
}


//creating and manupulating objects
let particles = [];
const particleCount = 157;
let angle = (2 * Math.PI) / particleCount;
const radius = 3;
const power = 27;
const gravity = 0.057;
const friction = 0.93;
let createParticles = ()=>{

    for(let i = 0; i < particleCount; i++){
        particles.push(new Particles(mouse.x, mouse.y, Math.cos(angle * i) * Math.random() * power, Math.sin(angle * i) * power, radius, `hsl(${Math.random() * 360}, 50%, 50%)`));
    }
    
}


//creating animation

let animate = ()=>{
    requestAnimationFrame(animate);
    c.fillStyle = "rgba(0, 0, 0, 0.057)";
    c.fillRect(0, 0, innerWidth, innerHeight);

    particles.forEach( (p, i) =>{
        p.update();
        if(p.x > innerWidth || p.y > innerHeight || p.x < 0 || p.alpha <= 0){
            particles.splice(i, 1);
        }
    })
    console.log(particles.length)
    
}

animate();
