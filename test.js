const myapi = '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'
const mybtn = document.querySelector('#submitbtn')
const myinput = document.querySelector('.maininputs')
const historyel  = document.querySelector('.chat-history')
const send  = document.querySelector('.send')
const titles  = document.querySelector('.greets')
const containersa  = document.querySelector('.input-container')
const containers =  document.querySelector('.text-container')
const maincontent = document.querySelector('.main')
//let speech = new SpeechSynthesisUtterance()

const mute = document.querySelector('.mute');
const muteText = document.querySelector('.mute-text');
const muteIcon = document.querySelector('.mutes');
let muteClick = 0;
let isMuted = false; 

var usernames = localStorage.getItem('userval'); 
var names = document.querySelector('.names');

mute.addEventListener('click', () => {
  muteClick++;

  if (muteClick % 2 === 1) {
    isMuted = true;
    window.speechSynthesis.cancel(); 
    console.log(muteClick);
    muteText.innerHTML = 'Muted';
    muteIcon.style.color = 'red';
  } else {
    isMuted = false;
    window.speechSynthesis.speak(speech);
    console.log(muteClick);
    muteText.innerHTML = 'Mute';
    muteIcon.style.color = 'white';
  }
});

/*let selectVoice = document.querySelector('select');
selectVoice.addEventListener('change', () => {
  let voices = window.speechSynthesis.getVoices();
  speech.voice = voices[selectVoice.value];
  utterance.voice = voices[selectVoice.value];
});
const speechs = new SpeechSynthesisUtterance();

if (usernames) {
  names.innerHTML = usernames;
  window.speechSynthesis.addEventListener('voiceschanged', () => {
    let voices = window.speechSynthesis.getVoices();
    speechs.voice = voices[1];
  });
  setTimeout(() => {
    if (window.speechSynthesis.getVoices().length !== 0) {
      window.speechSynthesis.dispatchEvent(new Event('voiceschanged'));
      speechs.text = `Hello there, ${usernames}`;
      window.speechSynthesis.speak(speechs);
    }
  }, 3200);
} else {
  names.innerHTML = "No username found";
}*/

async function mymessages() {


    var outputel = document.createElement('p')
    outputel.classList.add('utputs')
    const theval = myinput.value
    var myquestion = document.createElement('p')
    myquestion.classList.add('mychat')
    myquestion.innerText = myinput.value
    send.classList.add('colorchange')
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
    const loading = document.createElement('p')
    loading.classList.add('load')
    containers.appendChild(loading)
    loading.classList.add('loads')
    loading.innerHTML = "..."
    maincontent.scrollTop = maincontent.scrollHeight;
    const insidecontent = document.querySelector('.insides')
    insidecontent.classList.add('removecon')
    
    gsap.to(".mychat", .5, {
        opacity: 1,
        x: 0
      })
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
            max_tokens: 500
    
        })
    }
    try {
       const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data =  await response.json()
        console.log(data)
        outputel.textContent = data.choices[0].message.content
    
        if(data.choices[0].message.content) {
          outputel.classList.add("blacks");
          titles.classList.add("godown");
          
          const previousOutput = document.querySelector('.utputs');
          if (previousOutput) {
            window.speechSynthesis.cancel();
          } 
        
        
          containers.appendChild(outputel);
        
          send.classList.remove("colorchange");
          containers.classList.remove('none');
          myinput.value = '';
          mybtn.setAttribute("href", "#output");
        
          if (!isMuted) {

            //speech.text = outputel.innerText;
            //const utterance = new SpeechSynthesisUtterance(speech.text);
            //let addvoice = window.speechSynthesis.getVoices();
            //utterance.voice = addvoice[1]
           // window.speechSynthesis.speak(utterance);
          }
          if  (!theval) {
            myinput.placeholder = "please type something"
            window.speechSynthesis.cancel(  );
           // speech.text = `please type something ${usernames}`
           // window.speechSynthesis.speak(speech);
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
        console.error(error)
    }

    yesbtn.addEventListener('click', () => {
        mymen.classList.remove('clicked')
        history.classList.remove('remove')
        popup.classList.remove('toggles')
        containers.removeChild(myquestion)
        containers.removeChild(outputel)
        historyp.removeChild(myquestions)  
        historyel.removeChild(historyp)
        username.innerHTML = ""
  })
}
var clicks = 0
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
containersa.addEventListener('submit', (e) =>{
    e.preventDefault()
    mymessages()
    countquestions()
})
function displaytime() {
    var datetime = new Date()
    var hours = datetime.getHours()
    var minutes = datetime.getMinutes()
    var seconds = datetime.getSeconds()
    var session = document.getElementById("session")

    if (datetime >= 12) {
        session.innerHTML = "PM"
    } else {
        session.innerHTML = "AM"
    }
    if (hours >= 12) {
        hours = hours - 12
    }
    document.getElementById("hours").innerHTML = hours
    document.getElementById("minutes").innerHTML = minutes
    document.getElementById("seconds").innerHTML = seconds

}
setInterval(displaytime, 100)
/*setTimeout(() => {
    alert("gago")
}, 10000);
*/
const mymain = document.getElementById("first")
window.onscroll = function() {myFunction()};
const mymen = document.querySelector('.menu')
const history = document.querySelector('.sidebar')

//const newVoice = new SpeechSynthesisUtterance()
let clickss = 0
mymen.addEventListener('click', () => {
  //let addvoice = window.speechSynthesis.getVoices();
  //newVoice.voice = addvoice[1]
  clickss++
  //console.log(clickss)
    mymen.classList.toggle('clicked')
    mymen.classList.toggle('rotate')
    history.classList.toggle('remove')
    if(clickss === 1) {
      newVoice.rate = 0.6
     // newVoice.text = `Greetings, ${usernames}! this is your main-menu, you can access this anytime `
      //window.speechSynthesis.speak(newVoice);
//newVoice.addEventListener('end', () => {
 // console.log("Speech synthesis completed.");
    //window.speechSynthesis.cancel(newVoice);
//});
} 
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
gsap.to(".insides", 3, {
    opacity: 1,
    stagger: 1,
    delay: 3
  });
  gsap.to(".header-text", 2, {
    opacity: 1,
    delay: .5
  });
  gsap.to(".clock", 2, {
    opacity: 1,
    delay: .5
  });
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
    const customsave = document.querySelector('.save');
    const maincons = document.querySelector('.main');
    const inputcol = document.querySelector('.colors');
    function changebg() {
      const colorValue = inputcol.value;
      maincons.style.backgroundColor = colorValue;
      localStorage.setItem('backgroundColor', colorValue);
    }
    customsave.addEventListener('click', () => {
      changebg();
      custom.classList.remove('customshow');
      customize.style.backgroundColor = "#1e2124"
    });
    document.addEventListener('DOMContentLoaded', () => {
      const savedColor = localStorage.getItem('backgroundColor');
      if (savedColor) {
        inputcol.value = savedColor;
        changebg();
      }
    });
  });
  if(window.performance) {
          window.speechSynthesis.cancel(speech)
  }
  const voicelists = document.querySelector('.voices-list')
const voiceBtn = document.querySelector('.voice')
const closes  = document.querySelector('.closes')

document.querySelector('.voice').addEventListener("click", ()=> {
  voiceBtn.style.backgroundColor = "#7289da"
  closes.addEventListener("click", () => {
    voiceBtn.style.backgroundColor = "red"
    gsap.to(".voices-list", {
      visibility: "hidden"
    })
  
  })
  document.querySelector('.voices-list').style.visibility = "visible"
  maincontent.addEventListener("click", () => {
    document.querySelector('.voices-list').style.visibility = "hidden"
    gsap.to(".voices-list", 1, {
      top: "50%"
    })
  })
  
})
window.speechSynthesis.onvoiceschanged = () => {
  let voices = window.speechSynthesis.getVoices();
  speech.voice = voices[1];
  let selectVoice = document.querySelector('select');
  selectVoice.innerHTML = '';
  voices.forEach((voice, i) => {
    selectVoice.options[i] = new Option(voice.name, i);
    gsap.to(".voices-list", 1, {
      top: "50%"
    })
  });
};

document.querySelector('.titless').innerHTML = `${usernames}`
const firstletter = usernames.charAt (0)
document.querySelector('.user').innerHTML = firstletter
var notif = document.querySelector(".tooltip")
var tl = gsap.timeline({ repeat: -.5 });
var times = gsap.timeline()
const gohome = document.querySelector('.goback')
const bell = document.querySelector('.tooltip-1')
gsap.to('.notif', .5, {
  delay: 3,
  opacity: 1
})
setTimeout(()=> {
  times.to(notif, .5, {
    opacity: 1,
    delay: 3.5
  }).to(notif, .5, {
    opacity: 0,
    delay: 2
  })
},5000)
tl.to('.notif', .5, {
  transform: 'rotate(-20deg)',
}).to('.notif', .5, {
  transform: 'rotate(20deg)'
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
    gsap.to(notif, .5, {
      opacity: 0
    })
  })
})


const header = document.querySelector('header')
const newtime = gsap.timeline()
newtime.to(header, .0,{
  height: "100vh"
}).to(header, 1, {
  height: "50px",
  delay: 2
})
gohome.addEventListener('click', navigate)

function navigate() {
  gsap.to(notif, .0, {
    opacity: 0
  })
  window.speechSynthesis.cancel()
  document.querySelector('.input-container').style.display = "none"
  document.querySelector('.lower-content').style.display = "none"
  document.querySelector('.notif').style.display = "none"
  document.querySelector('.header-text').style.display = "none"
  document.querySelector('.clock').style.display = "none"
  document.querySelector('.menu ').style.display = "none"
  history.classList.remove('remove');
gsap.to('.bottom-sec', 1, {
  height: "50vh"
})
gsap.to(header, 1, {
  height: "50vh"
  
})

setTimeout(()=> {
  location.href = "index.html"
}, 2000)
}

console.log(header)