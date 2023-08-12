
let letter = 12
window.addEventListener('DOMContentLoaded',()=> {
  window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
      window.location.reload();
    }
  });
  const timeline = gsap.timeline()
timeline.to(".brand", 1, {opacity: 1, delay: 1,})
.to(".brand", 1, {opacity: 0,})
timeline.to(".loadcon", 1, { opacity: 1, delay: .5,})
.to(".loadcon", 1, {opacity: 0, delay: .3})
gsap.to(".loadone", 1.5, { y: "-100%", position: "absolute",  top: 0, delay: 6.5,})
const gaga = gsap.timeline()
gaga.to(".loadtwo", 1.5, { y: "100%", position: "absolute", bottom: 0, delay: 6.5,})
.to(".loadtwo", .3, { display: "none"})
gsap.to(".content", 3, { opacity: 1, delay: 7})
gsap.to(".bottom", 3, { opacity: 1, delay: 7})
var nameforms = document.querySelectorAll('.nameform');
var nameinputs = document.querySelectorAll('.typename');
const warning = document.querySelector('h1')

const restrict = ["kantot", "sex", "seggs", "jakol", "jabol", "pekpek","gago", "tanginamo", "pepe", "tite", "ulol", "pota", "tubol", "potaka", "burat", "puke", "tae", "borat", "tanginamoka"]

nameforms.forEach(function(nameform, index) {
  nameform.addEventListener('submit', (e) => {
    var userval = nameinputs[index].value; 
    e.preventDefault();
    function mytimeout() {
      document.location.href = "chatbot.html";
      localStorage.setItem('userval', userval);
    }
    if(restrict.includes(userval)) {
      warning.innerHTML = "we will not proceed with that username."
      warning.style.color = "red"
      nameinputs.classlist.add('typenames')
    } else {
      warning.innerHTML = ""
      warning.style.color = "white"
    }
    var letter = 12; // Specify the value of 'letter'
    if (nameinputs[index].value === '') {
      warning.innerHTML = "please type something"
      warning.style.color = "red"
    } else if (nameinputs[index].value.length >= letter) { // Check if the value has reached 12 characters
      warning.innerHTML = "make sure that the username is below 12 characters"
      warning.style.color = "red"
      nameinputs.classlist.add('typenames')
    } else {
      gsap.to(".content", 1, {  opacity: 0, })
      gsap.to(".bottom", 1, { opacity: 0,})
      gsap.to(".loadthird", 1, {y: "-150%", position: "absolute",})
      gsap.to(".loadfourth", 2, {  y: "-100%", position: "absolute",})
      setTimeout(mytimeout, 2000)
    }
  });
});
gsap.to('.text', 2,{ delay: 7, opacity: 1,})
const mytext = new SplitType('.title')
gsap.to('.char', { x: 0, y: 0, rotate: "0deg", stagger: 0.03, delay: 7, opacity: 1})
document.querySelectorAll('.char').forEach (btns => {
  btns.onmouseover= () => {
    gsap.to(btns,{color: "#7289da", scale: "1.4", rotate: "10deg"})
    btns.onmouseleave= () => {
      gsap.to(btns,{color: "white", scale: "1", rotate: "0deg"})
    }
  }
})
var characters = document.querySelectorAll('.char');
var randomIndexes = [];
while (randomIndexes.length < 3) {
  var randomIndex = Math.floor(Math.random() * characters.length);
  if (!randomIndexes.includes(randomIndex)) {
    randomIndexes.push(randomIndex);
  }
}
randomIndexes.forEach(function(index) {
  var char = characters[index];
  var flickeringInterval = setInterval(function() {
    char.classList.toggle('random');
  }, 1000);
});
document.querySelector('.right').addEventListener("click",()=> {
  gsap.to(".loadfourth", 0, {backgroundColor: "white" });
  gsap.to(".loadthird", 1, { y: "-150%", position: "absolute",})
gsap.to(".loadfourth", 2, {y: "-100%",position: "absolute",})
setInterval(()=> {
  location.href = "https://marcusxro.github.io/"
}, 2000)
})
})

const firstPage = document.getElementById('firsts')
const secondPage = document.getElementById('seconds')
const thirdPage = document.getElementById('third')
const scrollHorizontal = document.querySelector('.scroll')
const buttonAll = document.querySelectorAll('.button')
const bodyElement = document.body

// Store the timeout identifier in a variable
var timeoutId;
let isSecondPageClicked = false;
const newTimeline = gsap.timeline()

const newTimes = gsap.timeline()
const myTimeline = gsap.timeline();
/////animation function for secondFunction
function goSecond() {
  if (isSecondPageClicked) {
    return; // Exit the function if the secondPage is already clicked
  }
  isSecondPageClicked = true; // Set the flag to indicate that the secondPage has been clicked
  newTimes.to(firstPage, 0.5, { backgroundColor: "white" });
  gsap.to(".scroll", 0.3, { x: "-100vw", zIndex: 99999 });
  newTimes.to(".title-text", 0.5, { opacity: 1, x: 0 });
  if(firstPage.click) {
    clearTimeout(timeoutId)
}
};
////end of animation function

////animation function for third Btn
function goThird() {
  gsap.to(".scroll", 0.3, { x: "-200vw", zIndex: 99999 });
}
////end of animation for third

////third btn
thirdPage.onclick = () => {
  Gobackwards()
  isSecondPageClicked = false
  goThird()
  gsap.to(firstPage, {backgroundColor: "white"})
  document.querySelector('.grid').style.visibility = "visible"
}
////end of third btn

////text animation to go negative X
function animateText() {
  gsap.to(".title-text", 1, { opacity: 0, x: "1920px",delay: 3 });
  myTimeline.to('.people-container', {x: "-100%", opacity: 0}).to('.people-container', {x: 0, opacity: 1, delay: 3});
}
//// end of text anim

////killing all gsap animation for newTimes timeline
function Gobackwards() {
  newTimes.kill()
}
///// end of kill

///first btn animation, resetting anmation for second
firstPage.onclick = () => {
  Gobackwards()
  isSecondPageClicked = false
  clearTimeout(timeoutId);
    gsap.to(".scroll", .3 ,{x: 0})
    gsap.to(".second", 1 ,{width: "100vw"})
    gsap.to('.people-container', {opacity: 0, duration: 0.3, x: 0})
    clearTimeout(animateText)
    document.querySelector('.grid').style.visibility = "hidden"
}
////end of first btn

////second Btn activating animation function
secondPage.onclick = () => {
  goSecond()
  setTimeout(animateText)
  document.querySelector('.grid').style.visibility = "hidden"
};
///end of second btn

//////btn forEach animation to activate bg
let currentButton = null;
let addNum = 0
buttonAll.forEach(button => {
  button.addEventListener("click", (e) => {
    const target = e.currentTarget;
    if (currentButton !== null) {
      currentButton.style.backgroundColor = "white";
    }
    newTimeline.to(target, .5, {y: "-10px", backgroundColor: "#7289da"}).to(target, {y: 0}) 
    currentButton = target;
  });
});
/////end of btn forEach
gsap.to(firstPage, .5, {backgroundColor: "#7289da"})
//////////test it now btn
document.querySelector('.button-text').onclick = () => {
  gsap.to('.scroll', {x: 0})
  gsap.to(thirdPage, {backgroundColor: "white"})
  gsap.to(firstPage, {backgroundColor: "#7289da"})
  newTimeline.to(target, .5, {y: "-10px", backgroundColor: "#7289da"}).to(target, {y: 0}) 
}
//// end of test
const buttons = document.querySelectorAll('.button')
buttons.forEach(goBtn => {
  goBtn.onmouseover = () => {
      gsap.to(goBtn, {scale: "1.5"})
        goBtn.onmouseleave = () =>{
          gsap.to(goBtn, {scale: "1"})
        }
  }
})
const menu = document.querySelector('.right-2')
let add = 0
function navigates() {
  menu.classList.toggle('toggleMenu')
  document.querySelector('.scroll').onclick = () => {
    gsap.to(".menu", {visibility: "hidden"})
    gsap.to('.first-con', {visibility: "visible"})
    menu.classList.remove('toggleMenu')
  }
  if(menu) {
    gsap.to(".menu", {visibility: "visible"})
    gsap.to('.menu-text', {x: 0, stagger: 0.3, opacity: 1})
    add++
    Trigger()
    if(add == 2) {
      gsap.to(".menu", {visibility: "hidden"})
      add = 0
      gsap.to('.menu-text',  {x: "200px", stagger: 0.3, opacity: 0})
      gsap.to('.first-con', {visibility: "visible"})
    }
    //////////////////////////////#
  }



  document.querySelector('.text-one').onclick = () => {
    Gobackwards()
    isSecondPageClicked = false
    clearTimeout(timeoutId);
      gsap.to(".scroll", .3 ,{x: 0})
      gsap.to(".second", 1 ,{width: "100vw"})
      gsap.to('.people-container', {opacity: 0, duration: 0.3, x: 0})
      clearTimeout(animateText)
      gsap.to(firstPage, {backgroundColor: "#7289da"})
      gsap.to(secondPage, {backgroundColor: "white"})
      gsap.to(thirdPage, {backgroundColor: "white"})
  }
  document.querySelector('.text-two').onclick = () => {
    goSecond()
    setTimeout(animateText)
    gsap.to(firstPage, {backgroundColor: "white"})
    gsap.to(secondPage, {backgroundColor: "#7289da"})
    gsap.to(thirdPage, {backgroundColor: "white"})
  }
  document.querySelector('.text-three').onclick = () => {
    Gobackwards()
    isSecondPageClicked = false
    goThird()
    gsap.to(firstPage, {backgroundColor: "white"})
    gsap.to(secondPage, {backgroundColor: "white"})
    gsap.to(thirdPage, {backgroundColor: "#7289da"})
  }
}
menu.onclick = () => {navigates()}
const Allbtn = document.querySelectorAll(".menu-text")
let empty = null
function handleButtonClick(button) {
  if (empty !== null) {
    empty.style.color = 'white';
  }
    gsap.to(button, {opacity: 1, color: "#7289da"})
    empty = button;
}
Allbtn.forEach(btnInside => {
  btnInside.addEventListener('click', () => {
    handleButtonClick(btnInside);
  });
})
const ScreenWidth = window.matchMedia('(max-width: 630px)')
function removeHeader(e) {
if(e.matches) {
  gsap.to('.first-con', {visibility: "hidden"})
} else {
  gsap.to('.first-con', {visibility: "visible"})
}
}
const Trigger = function trigger() {
  ScreenWidth.addEventListener('change', removeHeader)
  removeHeader(ScreenWidth)
}
let ButtonAdd = document.querySelectorAll('.menu-text')
ButtonAdd.forEach(button => {
  button.addEventListener("mouseover", (e) => {
    const targetInside = e.currentTarget
      gsap.to(targetInside, {cursor: "pointer"})
  })
})




