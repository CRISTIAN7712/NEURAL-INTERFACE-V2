import React, { useEffect, useRef, useState } from "react";
import anime from "animejs/lib/anime.es.js";
import Particles from "react-tsparticles";
import { Github, Linkedin, Terminal, User, Mail, Layers } from "lucide-react";

export default function CristianOS() {

const [booting,setBooting]=useState(true)
const [view,setView]=useState("home")
const [terminal,setTerminal]=useState([])
const [isHacker,setIsHacker]=useState(false)
const [name,setName]=useState("CRISTIAN_OS")
const cursorRef=useRef()

const animate = anime.default || anime

/* ----------------- BOOT SEQUENCE ------------------ */

useEffect(()=>{

const seq=[
"BOOTING CRISTIAN_OS...",
"Loading neural modules...",
"Injecting AI core...",
"Mounting interface...",
"System ready."
]

let i=0

const interval=setInterval(()=>{

setTerminal(t=>[...t,seq[i]])

i++

if(i>=seq.length){
clearInterval(interval)
setTimeout(()=>setBooting(false),800)
}

},700)

},[])

/* ----------------- MATRIX RAIN ------------------ */

useEffect(()=>{

const canvas=document.createElement("canvas")
canvas.className="matrix"
document.body.appendChild(canvas)

const ctx=canvas.getContext("2d")

canvas.width=window.innerWidth
canvas.height=window.innerHeight

const letters="01アイウエオカキクケコサシスセソ"
const fontSize=14
const columns=canvas.width/fontSize

const drops=Array(Math.floor(columns)).fill(1)

function draw(){

ctx.fillStyle="rgba(0,0,0,0.05)"
ctx.fillRect(0,0,canvas.width,canvas.height)

ctx.fillStyle="#00ff9c"
ctx.font=fontSize+"px monospace"

for(let i=0;i<drops.length;i++){

const text=letters[Math.floor(Math.random()*letters.length)]

ctx.fillText(text,i*fontSize,drops[i]*fontSize)

if(drops[i]*fontSize>canvas.height&&Math.random()>0.975)
drops[i]=0

drops[i]++

}

}

const interval=setInterval(draw,33)

return()=>{
clearInterval(interval)
canvas.remove()
}

},[])

/* ----------------- CUSTOM CURSOR ------------------ */

useEffect(()=>{

const move=(e)=>{

animate({
targets:cursorRef.current,
translateX:e.clientX-10,
translateY:e.clientY-10,
duration:200
})

}

window.addEventListener("mousemove",move)

return()=>window.removeEventListener("mousemove",move)

},[])

/* ----------------- GLITCH TEXT ------------------ */

function glitch(text){

const chars="!<>-_\\/[]{}—=+*^?#"

let iteration=0

const interval=setInterval(()=>{

setName(
text.split("")
.map((letter,index)=>{

if(index<iteration) return text[index]

return chars[Math.floor(Math.random()*chars.length)]

}).join("")
)

if(iteration>=text.length) clearInterval(interval)

iteration+=1/3

},30)

}

/* ----------------- TERMINAL COMMANDS ------------------ */

function runCommand(cmd){

if(cmd==="help")
setTerminal(t=>[...t,"commands: help about projects contact hack"])

if(cmd==="about")
setView("about")

if(cmd==="projects")
setView("projects")

if(cmd==="hack"){
setIsHacker(true)
setTerminal(t=>[...t,"HACKER MODE ENABLED"])
}

}

/* ----------------- KONAMI CODE ------------------ */

useEffect(()=>{

const seq=["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"]

let index=0

function handler(e){

if(e.key===seq[index]){

index++

if(index===seq.length){
setIsHacker(true)
setTerminal(t=>[...t,"ACCESS GRANTED"])
index=0
}

}else{
index=0
}

}

window.addEventListener("keydown",handler)

return()=>window.removeEventListener("keydown",handler)

},[])

/* ----------------- UI ------------------ */

if(booting)
return(

<div className="boot">

{terminal.map((l,i)=>(
<div key={i}>{l}</div>
))}

</div>

)

return(

<div className={`os ${isHacker?"hacker":""}`}>

<Particles
options={{
particles:{
number:{value:40},
links:{enable:true,distance:120},
move:{speed:1},
size:{value:2}
}
}}
/>

<div ref={cursorRef} className="cursor"/>

<header className="topbar">

<span
onMouseEnter={()=>glitch("CRISTIAN_OS")}
>
{name}
</span>

<div>

<button onClick={()=>setView("home")}>HOME</button>
<button onClick={()=>setView("projects")}>PROJECTS</button>
<button onClick={()=>setView("about")}>ABOUT</button>
<button onClick={()=>setView("contact")}>CONTACT</button>

</div>

</header>

{/* HOME */}

{view==="home"&&(

<div className="grid">

<div className="card">
<User/>
<h2>ABOUT</h2>
</div>

<div className="card big">
<Layers/>
<h1>PROJECTS</h1>
</div>

<div className="card">
<Mail/>
<h2>CONTACT</h2>
</div>

</div>

)}

{/* PROJECTS */}

{view==="projects"&&(

<div className="projects">

{[1,2,3].map(p=>(

<div key={p} className="project">

<h3>NEURAL_APP_{p}</h3>

<p>AI distributed platform.</p>

<Github/>

</div>

))}

</div>

)}

{/* ABOUT */}

{view==="about"&&(

<div className="about">

<h1>CODE. DESIGN. REPEAT.</h1>

<p>
Arquitecto de software obsesionado con crear sistemas
que parecen venir del futuro.
</p>

</div>

)}

{/* TERMINAL */}

<div className="terminal">

{terminal.map((l,i)=>(
<div key={i}>{l}</div>
))}

<input
placeholder="type command..."
onKeyDown={e=>{
if(e.key==="Enter"){
runCommand(e.target.value)
e.target.value=""
}
}}
/>

</div>

<footer>

<Github/>
<Linkedin/>

</footer>

<style jsx>{`

.os{
background:#020202;
color:white;
height:100vh;
font-family:monospace;
overflow:hidden;
}

.matrix{
position:fixed;
z-index:0;
opacity:.15;
}

.cursor{
width:20px;
height:20px;
border:1px solid #00ff9c;
border-radius:50%;
position:fixed;
pointer-events:none;
}

.topbar{
display:flex;
justify-content:space-between;
padding:20px;
border-bottom:1px solid #222;
}

.grid{
display:grid;
grid-template-columns:1fr 2fr 1fr;
gap:20px;
padding:40px;
}

.card{
border:1px solid #222;
padding:40px;
border-radius:20px;
transition:.3s;
}

.card:hover{
transform:perspective(800px) rotateX(10deg) rotateY(-10deg);
}

.big{
font-size:50px;
}

.projects{
padding:40px;
display:grid;
grid-template-columns:1fr 1fr;
gap:30px;
}

.project{
border:1px solid #222;
padding:30px;
border-radius:20px;
}

.terminal{
position:fixed;
bottom:0;
left:0;
right:0;
background:#000;
border-top:1px solid #0f0;
padding:10px;
font-size:12px;
}

input{
background:transparent;
border:none;
outline:none;
color:#0f0;
width:100%;
}

.boot{
background:black;
color:#0f0;
height:100vh;
padding:40px;
font-family:monospace;
}

`}

</style>

</div>

)

}