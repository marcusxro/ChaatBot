const myapi = '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'
const mybtn = document.querySelector('#submitbtn')
const myinput = document.querySelector('.maininputs')
const historyel  = document.querySelector('.chat-history')

const titles  = document.querySelector('.greets')
const containersa  = document.querySelector('.input-container')
const containers =  document.querySelector('.text-container')
const maincontent = document.querySelector('.main')
const mute = document.querySelector('.mute');
const muteText = document.querySelector('.mute-text');
const muteIcon = document.querySelector('.mutes');
let muteClick = 0;
let isMuted = false;
var usernames = localStorage.getItem('userval');
var names = document.querySelector('.names');
var capitalizedUsernames = usernames.charAt(0).toUpperCase() + usernames.slice(1);

let zero = 0
/////////clock
function displaytime() {
  var datetime = new Date();
  var hours = datetime.getHours();
  var minutes = datetime.getMinutes();
  var seconds = datetime.getSeconds();
  var session = document.getElementById("session");

  const Goodmorning = `Good morning, ${capitalizedUsernames}`;
  const Goodafternoon = `Good afternoon, ${capitalizedUsernames}`;
  const Goodevening = `Good evening, ${capitalizedUsernames}`;

  if (hours >= 5 && hours < 12) {
    document.querySelector('.names').innerText = `${Goodmorning} ☀️`;
    session.innerHTML = "AM";
  } else if (hours >= 12 && hours < 18) {
    document.querySelector('.names').innerText = `${Goodafternoon} 🌤️`;
    session.innerHTML = "PM";
  } else {
    document.querySelector('.names').innerText = `${Goodevening} 🌃`;
    session.innerHTML = "PM";
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (hours >= 12) {
    hours = hours - 12;
  }
  if(hours === 0) {
    hours = 12
  }
  if (hours >= 12) {
    if (hours > 12) {
      hours = hours - 12;
    }
  } else {
    if (hours === 0) {
      hours = 12;
    }
  }

  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;
}

function changeTime() {
  var datetime = new Date()
  var hours = datetime.getHours()
  var minutes = datetime.getMinutes()
  var session = document.getElementById("session")
  zero++
////////////setting the time info when mychat is appended
if (hours >= 0 && hours < 12) {
  session.value = "AM";
} else if (hours >= 12 && hours < 24) {
  session.value = "PM";
} else {
  session.value = "Invalid time"; // Handle the case when hours are not in the range 0-23
}

if (hours >= 12) {
  hours = hours - 12;
}
if(zero >= 2) {
  return changeTime
}
  
  if (hours > 12) {
    hours = hours - 12;
  }
if (hours === 0) {
  hours = 12;
}

  if(minutes < 10) {
minutes = "0" + minutes
  }
 
  document.querySelector('.ask').innerHTML = `you started at: ${hours}:${minutes}:${session.value}`
}
setInterval(displaytime, 1000);


const loadingText = document.querySelectorAll('.load')

async function mymessages() {

    var outputel = document.createElement('p')
    outputel.classList.add('utputs')
    const theval = myinput.value
    var myquestion = document.createElement('p')
    myquestion.classList.add('mychat')
    myquestion.innerText = myinput.value
    
    var myquestions = document.createElement('p')
    myquestions.classList.add('mychat')
    myquestions.innerText = myinput.value
    var historyp = document.createElement('p')
    historyp.classList.add('historyp')
    historyel.appendChild(historyp)
    historyp.appendChild(myquestions)  
    historyp.classList.add("white")
    myquestions.classList.add("white")
    myquestion.classList.add("whites")
    containers.appendChild(myquestion)
////////////loading
const containerLoad = document.createElement('div')
    containerLoad.classList.add('load-con')
    const blobs = document.createElement('div')
    blobs.classList.add("blobs")
    const blobss = document.createElement('div')
    blobss.classList.add("blobss")
    const loading = document.createElement('p');
    loading.classList.add('load');
    containers.appendChild(loading);
    loading.classList.add('loads');
    const blob = document.createElement('div')
    blob.classList.add("blob")

    const jump = gsap.timeline({ repeat: -1})
//ball animation
    jump.to(blobs, { y: "-10px", scale: 1.3,   rotateY: "360deg", opacity: 0.7 })
    .to(blobs, { y: 0, scale: 1, opacity: 1 })
       .to(blob, {y: "-10px",  scale: 1.3, rotateY: "360deg", opacity: 0.7})
          .to(blob, { y: 0, scale: 1, outline: "none", rotation: 0, opacity: 1 })
             .to(blobss, { y: "-10px", rotateY: "360deg", scale: 1.3, opacity: 0.7})
        .to(blobss, { y: 0,  scale: 1, outline: "none",rotation: 0, opacity: 1 })
    .to(containerLoad, { rotateY: "360deg", });
/// end of ball animation
    blob.classList.add("showBlob")
    blobs.classList.add("showBlob")
    blobss.classList.add("showBlob")
//append loaders
    loading.appendChild(containerLoad)
    containerLoad.appendChild(blobs)
    containerLoad.appendChild(blob)
    containerLoad.appendChild(blobss)
///////////end of loading
    maincontent.scrollTop = maincontent.scrollHeight;
    const insidecontent = document.querySelector('.insides')
    insidecontent.classList.add('removecon')
    gsap.to(".mychat", .5, { opacity: 1,  x: 0 })
    myquestions.addEventListener('click', () => {
        historyel.removeChild(historyp)
       historyp.removeChild(myquestions)
     myinput.appendChild(myquestions)  
    })
    if (!theval) {
        containers.removeChild(myquestion)
        historyel.removeChild(historyp)
    }
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${myapi}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "system", content: "You are a helpful assistant."}, {role: "user", content: myinput.value}],
            max_tokens: 1000
        })
    }
    try {
       const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data =  await response.json()
        outputel.textContent = data.choices[0].message.content;
        const cursor = document.getElementById('custom-cursor');
        let hoverCount = 0;
        function CopyAndHover() {
          outputel.addEventListener("click", () => {
            const textToCopy = outputel.innerText;
            const tempTextArea = document.createElement("textarea");
            tempTextArea.value = textToCopy;
            document.body.appendChild(tempTextArea);
            tempTextArea.select();
            document.execCommand("copy");
            document.body.removeChild(tempTextArea);
            console.log("Text copied to clipboard");
            cursor.innerText = "copied"
            cursor.style.backgroundColor = "green"
            gsap.to(cursor, 1, {
              opacity: 1
            })
              hoverCount++;
              if (hoverCount > 1) {
                gsap.to(cursor, 1, {
                })
                cursor.innerHTML = "click to copy again?"
                setTimeout(() => {
                  gsap.to(cursor, 1, {
                    opacity: 0
                  })
                }, 2000)
              }
              setTimeout(() => {
                cursor.style.color = "#343434"
              }, 3000);

          });
          function changebg() {
            const cursor = document.getElementById('custom-cursor');
            cursor.innerText = "click to copy";
            cursor.style.color = "#343434";
            cursor.style.display = 'block';
            cursor.style.opacity = 1;
            cursor.backgroundColor = "#7289da"
          }        
          outputel.addEventListener('mouseover', () => {
            setTimeout(() => {
              gsap.to(cursor, 1, {
                opacity: 0
              })
            }, 3000)
            changebg()
          });        
          outputel.addEventListener('mouseleave', () => {
           gsap.to(cursor, .5, {
            opacity: 0
           })
          });
          document.addEventListener('mousemove', (event) => {
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            gsap.to(cursor, { duration: .5, x: mouseX, y: mouseY, delay: .1 });
          });
        }
      CopyAndHover()
 if(data.choices[0].message.content) {
          outputel.classList.add("blacks");
          var names = document.querySelector('.names')
          names.style.opacity = 0
          changeTime() 
          myinput.value = '';
            containers.appendChild(outputel);
            containers.classList.remove('none');
            mybtn.setAttribute("href", "#output");
            
            if  (!theval) {
              myinput.placeholder = "please type something"
              myquestion.classList.add('none')
              outputel.classList.add('none')
              titles.classList.remove("godown")
          }
            containers.removeChild(loading)
            maincontent.scrollTop = maincontent.scrollHeight;
            gsap.to(".utputs", .5, {
              opacity: 1,
              x: 0
         })
     }  
 }
    catch (error){
      if(error === 429) {
        alert("gago")
      }
        console.error(error)
       loading.innerText = "if this takes too long, please reload the page."
}
///////////////yes condition to newchat
    yesbtn.addEventListener('click', () => {
        mymen.classList.remove('clicked')
        history.classList.remove('remove')
        popup.classList.remove('toggles')
        containers.removeChild(myquestion)
        containers.removeChild(outputel)
        historyp.removeChild(myquestions)  
        historyel.removeChild(historyp)
        titles.classList.remove("godown");
        document.querySelector('.names').innerHTML = "let me hear your message again!"
  })
//////////////////////// end of yes
}
///////////////////////ask
  const asks = ["history", "Geography", "Science", "Math", "Anything!"];
   let index = 0; // Counter variable to keep track of the current array index
   const updateElement = function() {
    if (index < asks.length) {
      const currentAsk = asks[index];
      const element = document.querySelector('.ask-array');
      // Animate the currentAsk element using GSAP
      const timess = gsap.timeline();
      timess.fromTo(
        element,
        { rotateX: "-90deg", y: "100%", opacity: 0, duration: 1},
        { rotateX: "0deg", y: "0%", opacity: 1, duration: 1.5, ease: "power2.out", duration: 1, color: "#7289da"}
      ).fromTo(
        element,
        { rotateX: "0deg", y: "0%", opacity: 1, duration: 2},
        { rotateX: "90deg", y: "-100%", opacity: 0, duration: .5, ease: "power2.out" },
        "-=1.5"
      ) 
      // Update the innerHTML of the element
      element.innerHTML = `${currentAsk}`;
      index = (index + 1) % asks.length;
    } else {
      clearInterval(intervalId);
    }
  };
      const intervalId = setInterval(updateElement, 3000);
//////////////////////////enf of ask


function stopSend(e) {
    e.preventDefault()
    mymessages()

}

let prevask = null
let increment = 0
let prevAsk = null;
let countdown = 0; // Initialize the countdown to 0

let clicks = 0
    const username = document.querySelector('.questions')
   function countquestions() {
    clicks = clicks + 1
var values = myinput.value
    username.innerHTML = "you asked " + clicks + " question"
    if(clicks > 1) {
        username.innerHTML = "you asked " + clicks + " questions"
    }   else if (!values) {
        var clickss = 0
        username.innerHTML = "you asked " + clickss + " questions"
    }
   }

//////////////adding  mymessage func and adding delay functions
containersa.addEventListener('submit', (e) => {
  const myAsk = myinput.value;
  e.preventDefault();

  // If the countdown is still active, prevent sending a new message
  if (countdown > 0) {
    return;
  }
  // Set the countdown to 4 seconds
  countdown = 4;
  // Function to update the countdown display
  function decrement() {
    myinput.placeholder = `You can send a message in ${countdown}`;
    countdown--;
    if (countdown <= 0) {
      clearInterval(goDown);
      myinput.placeholder = "Send me a message";
    }
  }
  const goDown = setInterval(decrement, 1000);
  // Call mymessages only if the input value has changed
  if (mymessages && myAsk != prevAsk) {
    mymessages();
    countquestions()
  }else if (myAsk === prevAsk) {
    mymessages()
       countquestions()
  }
  if(myinput.value === '') {
    return
  } 
  prevAsk = myAsk;
});
////////////////////clock
const mymain = document.getElementById("first")
window.onscroll = function() {myFunction()};
const mymen = document.querySelector('.menu')
const history = document.querySelector('.sidebar')
let clickss = 0
mymen.addEventListener('click', () => {
  clickss++
    mymen.classList.toggle('clicked')
    mymen.classList.toggle('rotate')
    history.classList.toggle('remove')
})
      const newchat = document.querySelector('.newchat')
      const popup = document.querySelector('.popup')
      newchat.addEventListener('click', () => {
        popup.classList.toggle('toggles')
      })
      const yesbtn = document.querySelector('.yes')
      const nobtn = document.querySelector('.no')
  nobtn.addEventListener('click', () => {
    popup.classList.remove('toggles')
  })
  maincontent.addEventListener("click", () => {
    history.classList.remove('remove');
    mymen.classList.remove('clicked')
    popup.classList.remove('toggles')
});
const examplecon = document.querySelectorAll('#insidescon')
examplecon.forEach(function(trigger) {
    trigger.addEventListener('click', () => {
       console.log(examplecon.value)
       trigger.classList.add('active')
       myinput.value =  trigger.textContent
    })
})
gsap.to(".insides", 1, {opacity: 1, delay: 3, y: 0,  rotateX: 0});
  const greetsCon = document.querySelector('.greets')
gsap.to(greetsCon, 1, {delay: 3, y: 0, rotateX: 0, scale: 1,})
  gsap.to(".header-text", 2, {opacity: 1, delay: .5 });
  gsap.to(".clock", 2, { opacity: 1, delay: .5});

  const customize = document.querySelector('.customize');
  const custom = document.querySelector('.custom');
  customize.addEventListener('click', () => {
    customize.style.backgroundColor = "#7289da"
    custom.classList.add('customshow');
    const customclose = document.querySelector('.close');
    customclose.addEventListener('click', () => {
      custom.classList.remove('customshow');
      customize.style.backgroundColor = "#1e2124"
    });
/////////////customize section
    const range = document.querySelector('.range');
    function update() {
      const pixels = range.value;
      gsap.to('.mychat', { fontSize: `${pixels}px` });
      gsap.to('.utputs', { fontSize: `${pixels}px` });
    }
    function updates() {
      const pixels = range.value;
      document.querySelector('.fontLabel').innerHTML = `${pixels}px`;
      if(Fontsize.checked) {
        gsap.to('.toggleCus', {display: "none"})
        gsap.to('.mychat', { fontSize: "16px" });
        gsap.to('.utputs', { fontSize: "16px" });
        return update
    }
    if(!Fontsize.checked) {
      gsap.to('.toggleCus', {display: "block"})
      update()
    }
    }
    range.addEventListener('input', update);
    setInterval(updates, 1000);
 const Fontsize = document.querySelector(".checks")
 
const customsave = document.querySelector('.save');
const maincons = document.querySelector('.main');
const inputcol = document.querySelector('.colors');

function changebg() {
  const colorValue = inputcol.value;
  maincons.style.backgroundColor = colorValue;
  localStorage.setItem('backgroundColor', colorValue);
}

customsave.addEventListener('click', () => {
  custom.classList.remove('customshow');
  customize.style.backgroundColor = "#1e2124";
console.log(inputcol.value)
  changebg(); // Move the changebg() function call here
  if (maincons.style.backgroundColor.toLowerCase() !== "rgb(40, 43, 48)") {
    defaultBg.checked = false 
  } else {
    defaultBg.checked = true
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const savedColor = localStorage.getItem('backgroundColor');
  if (savedColor) {
    inputcol.value = savedColor;
    // Do NOT call changebg() here
  }
});
////////////defult settings

const defaultBg = document.querySelector('.check')
defaultBg.addEventListener('change', () => {
  if(defaultBg.checked) {
    maincons.style.backgroundColor = "#282b30"
    inputcol.value = "#282b30"
  } else {
    changebg()
  }
})});

const customsave = document.querySelector('.save');
const maincons = document.querySelector('.main');
const inputcol = document.querySelector('.colors');
function changebg() {
  const colorValue = inputcol.value;
  maincons.style.backgroundColor = colorValue;
  localStorage.setItem('backgroundColor', colorValue);
}

customsave.addEventListener('click', () => {
  custom.classList.remove('customshow');
  customize.style.backgroundColor = "#1e2124";
  update();
});

document.addEventListener('DOMContentLoaded', () => {
  const savedColor = localStorage.getItem('backgroundColor');
  if (savedColor) {
    inputcol.value = savedColor;
    changebg();
  }
const defaultSize = document.querySelector('.checks')
document.addEventListener('change', () => {
  if(!defaultSize.checked) {
    gsap.to('.mychat',{fontSize: `${pixels}px`})
gsap.to('.utputs',{fontSize: `${pixels}px`})
  } else {
    return
  }
})


});

//////////text end

document.querySelector('.titless').innerHTML = `${capitalizedUsernames}`
const firstletter = usernames.charAt (0)
document.querySelector('.user').innerHTML = firstletter
var notif = document.querySelector(".tooltip")
var tl = gsap.timeline({ repeat: -.5 });
var times = gsap.timeline()
const gohome = document.querySelector('.goback')
const bell = document.querySelector('.tooltip-1')
gsap.to('.notif', .5, { delay: 3,  opacity: 1})
setTimeout(()=> {
  times.to(notif, .5, { opacity: 1, delay: 3.5}).to(notif, .5, {opacity: 0, delay: 2 })
},5000)
tl.to('.notif', .5, { transform: 'rotate(-20deg)',})
.to('.notif', .5, {transform: 'rotate(20deg)'
})
document.querySelector('.notif').addEventListener('click', () => {
  bell.classList.toggle("bell")
})
 maincontent.addEventListener('click', () => {
      bell.classList.remove("bell")
    })
document.querySelector('.notif').addEventListener('mouseover', ()=> {
  gsap.to(notif, .5, {
    opacity: 1
  })
  document.querySelector('.notif').addEventListener('mouseleave', ()=> {
    gsap.to(notif, .5, {  opacity: 0 })
  })
})
const header = document.querySelector('header')
const newtime = gsap.timeline()
newtime.to(header, .0,{ height: "100vh"}).to(header, 1, {height: "50px", delay: 2})

gohome.addEventListener('click', navigate)

function navigate() {
  gsap.to(notif, .0, { opacity: 0 })
  document.querySelector('.lower-content').style.display = "none"
  document.querySelector('.notif').style.display = "none"
  document.querySelector('.menu ').style.display = "none"
  history.classList.remove('remove');
gsap.to('.input-container', 0.5, { opacity: 0})
gsap.to('.clock', 0.5, { opacity: 0})
gsap.to('.header-text', 0.5, {opacity: 0})
  setTimeout(() => {
    gsap.to('.bottom-sec', 1, {  height: "50vh" })
    gsap.to(header, 1, {  height: "50vh" })
  }, 1000)
setTimeout(()=> {
  location.href = "index.html"
}, 2000)
}

////////////////////////////////////// getting recent news using API
const apiKey = 'c3526011307290482fa488200f7f80ca'; 
const apiUrl = 'https://gnews.io/api/v4/top-headlines';
const country = 'ph'; 


fetch(`${apiUrl}?country=${country}&token=${apiKey}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const articles = data.articles;
    const randomNewsIndex = Math.floor(Math.random() * articles.length);
    const randomNews = articles[randomNewsIndex];

    const displayNews = () => {
      //////getting infos
      const author = randomNews.source.name;
      const date = randomNews.publishedAt;
      const content = randomNews.title;
      const contentUrl = randomNews.url;
          ////putting variables inside an element
          document.querySelector('.author').textContent = author;
          document.querySelector('.date').textContent = date;
          document.querySelector('.content-news').textContent = content;
          document.querySelector('.visit-link').onclick = () => {
            window.location  = contentUrl
          }
        }

    displayNews();
  })
  .catch(error => {
    console.log(error)
    document.querySelector('.authors').innerHTML = "we are having a hard time collecting information at the moment"
  });

///////////international
const newApi = 'c7ffb90b0a639885daf59639a2a3b219'
const apiUrls = 'https://gnews.io/api/v4/top-headlines';
const random = ["aus", "can", "gb", "us", "nz"];
const randomizedPlaceIndex = Math.floor(Math.random() * random.length);
const randomizedPlace = random[randomizedPlaceIndex];
fetch(`${apiUrls}?country=${randomizedPlace}&token=${newApi}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    } return response.json();
  })
  .then(data => {
    const articles = data.articles;
    const randomNewsIndex = Math.floor(Math.random() * articles.length);
    const randomNews = articles[randomNewsIndex];
    const displayNews = () => {
      const author = randomNews.source.name;
      const date = randomNews.publishedAt;
      const content = randomNews.title;
      const contentUrl = randomNews.url;
      document.querySelector('.authors').textContent = author;
      document.querySelector('.dates').textContent = date;
      document.querySelector('.content-newss').textContent = content;
      document.querySelector('.visit-links').onclick = () => {
        window.location  = contentUrl
      }
    }
    displayNews();
  })
  .catch(error => {
    console.log(error)
    document.querySelector('.author').innerHTML = "we are having a hard time collecting information at the moment"
  });

//////floating mic
const wrapper = document.querySelector('.floating-mic');
const floatingEl = document.querySelector('.mic');
function dragMe({ movementX, movementY }) {
  let styleAxis = window.getComputedStyle(wrapper);
  let top = parseInt(styleAxis.top);
  let left = parseInt(styleAxis.left);

  // Update the position of the mic icon
  gsap.to(wrapper, 0,{left: `${left + movementX}px`})
  gsap.to(wrapper, 0,{top: `${top + movementY}px`})
}

wrapper.addEventListener("mousedown", () => {
  document.addEventListener("mousemove", dragMe);
});
document.addEventListener("mouseup", () => {
  document.removeEventListener("mousemove", dragMe);
});



window.onload = function() {
  const wrapper = document.querySelector('.floating-mic');

  wrapper.addEventListener("touchmove", function(ev) {
      var touchloc = ev.targetTouches[0]
      gsap.to(wrapper, 0,{left: `${touchloc.pageX}px`})
  gsap.to(wrapper, 0,{top: `${touchloc.pageY}px`})
    if(wrapper) {
      gsap.to()
    }
  })
  wrapper.addEventListener("touchend", function(ev) { 
    var Xaxis = (wrapper.style.left)
    var Yaxis = (wrapper.style.top)  

    if(Xaxis > 388 || Xaxis < 646) {
      wrapper.style.left = '50%'
      wrapper.style.top = '50%'
    } if(Yaxis > 100 || Yaxis < 356) {
      wrapper.style.left = '50%'
      wrapper.style.top = '50%'
    }
  })

}
gsap.to(".voice-effect", {display: "none"})

setTimeout(() => {
  gsap.to('.mics', {opacity: 0})
}, 8000)
const listen = document.querySelector('.microphone')
const SpeechRecog = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecog()
function sendValue() {
  
//// start of recog
  recognition.onstart =() => {
    gsap.to(wrapper, {backgroundColor: "black", color: "#7289da", scale: "1.3"})
  }
///grabbing the result and tehen transforming it into string
  recognition.addEventListener("result", (event) => {
    let transcript = "";
  for (let i = event.resultIndex; i < event.results.length; i++) {
    transcript += event.results[i][0].transcript;
  }
myinput.value = transcript

////end of it, activating gsap
  })
}
/////////// on end eListeners
recognition.addEventListener("audioend", () => {
  console.log("Audio capturing ended");
});
recognition.addEventListener("nomatch", () => {
  gsap.to(wrapper, {color: "black", scale: 1, backgroundColor: "#7289da"})
});
recognition.addEventListener("end", () => {
  gsap.to(wrapper, {color: "black", scale: 1, backgroundColor: "#7289da"})
  if(!myinput.value) {
    myinput.placeholder = "i didn't get what you said"

  }
})
const updateEverySec = setInterval(sendValue, 500)

/////sending the onclick func to generate text
wrapper.onclick = ( ) => {
  recognition.start()
  updateEverySec
}

