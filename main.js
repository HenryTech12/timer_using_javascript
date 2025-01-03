let display = document.querySelector('.showTimer');
let dropdownhrs = document.querySelector('.dropdown-hrs');
let dropdownmins = document.querySelector('.dropdown-mins');
let dropdownsec = document.querySelector('.dropdown-sec');

let option1 = null;
for(let i = 0; i <= 23; i++) {
option1 = document.createElement('option');
option1.innerText = i;
option1.value = i;


dropdownhrs.append(option1);

}
for (let i = 0; i <= 59; i++) {
  const option = document.createElement('option');
  option.innerText = i;
  dropdownmins.append(option);
}
for (let i = 0; i <= 59; i++) {
  const option = document.createElement('option');
  option.innerText = i;
  dropdownsec.append(option);
}

/*POPUP FUNCTIONS */

let popup1 = document.getElementById('timerPopup');
let popup2 = document.getElementById('timerPopup2');
let btn_det = document.getElementById('btn-det');
let btn_creation_limit = 0;
function createNewButton(event) {
 if(btn_creation_limit != 5) {
  let exec = document.querySelector('.exec');
  const button = document.createElement('button');
  button.innerText = '+';
  button.id = 'btn-det';
  exec.append(button);
  button.onclick = createNewButton;
  popup1.style.display='flex';
  exec.style.display = 'none';
  btn_creation_limit++;
  
 }
}

function showField() {
  popup2.style.display= "block";
  popup1.style.display = "none";
}
let insertName = document.querySelectorAll('.insertNameField');
function finishField() {
  const name = document.getElementById('nameField');
  popup1.style.display="flex";
  popup2.style.display = "none";
  insertName.forEach((value) => {
    value.innerText = name.value;
    btn_det.innerText = name.value;
    btn_det.style.fontSize = "0.9rem";
  });
}
/* DATE FUNCTIONS*/
let currentDate = document.getElementById('currentDate');
const newDate = new Date();
currentDate.innerText = newDate;
function closePopup() {
  popup1.style.display = "none";
  exec.style.display = "grid";
}

/* TIMER FUNCTION*/

         
let disp = document.getElementById("display");
let timerId = 0;
let audio = document.getElementById('audio1');
let tick = document.getElementById('tick');
let resetBtn = document.getElementById('resetTimerBtn');
let timerInfo = document.querySelector('.timerInfo');
let startBtn = document.getElementById('startTimer');
function startTimer() {
  
  let hrs = document.getElementById('hrs');
  let mins = document.getElementById('mins');
  let sec = document.getElementById('sec');
 
 
    let second = sec.value;
    let minutes = mins.value;
    console.log(minutes);
    let hours = hrs.value;
    
   if(second >= 5 || (second >= 0 && minutes > 0 && hours >= 0) || (second >= 0 && minutes >= 0 && hours > 0)) {
     timerId = setInterval(counter,1000);
     tick.play();
     audio.play();
     audio.muted = true;
     startBtn.disabled = true;
    function counter() {
    
      if(second >= 0) {
        second--;
      }
      if(second <= 0) {
        if(minutes > 0 && second < 0) {
          minutes--;
          second = 59;
        }
      }
      if(minutes == 0) {
        if(hours > 0 && second < 0) {
          hours--;
          minutes = 59;
          second = 59;
        }
      }
   
    if(minutes == 0  && hours == 0 && second == 0) {
        startBtn.disabled = false;
        tick.pause();
        clearInterval(timerId);
        if (tick.paused) {
          audio.muted = false;
        }
       setTimeout(() => {
            audio.pause();
            console.log('Timeout reached');
        }, 10000);
        
        let du = Math.ceil(audio.duration);
        document.getElementById('infos').innerText = `Default timer song  playing will last for ${du} seconds`;
        
        
      }
     console.log(timerFormat(hours,minutes,second));
     disp.innerText = timerFormat(hours,minutes,second);
    }
  }
  if(second < 5 && minutes == 0 && hours == 0) {
    timerInfo.innerText = "Timer can't be set less than 5s.";
    
  }
  setTimeout(() => {
    timerInfo.style.opacity = "0";
  },1500);
}

function timerFormat(a,b,c) {
  if(a < 10 && b < 10 && c < 10) {
    return "0"+a+":0"+b+":0"+c;
  }
 
  if(a < 10 && b < 10 && c >= 10) {
    return "0"+a+":0"+b+":"+c;
  }
  
  if(a >= 10 && b >= 10 && c < 10) {
    return a+":"+b+":0"+c;
  }
  
  if(a >= 10 && b < 10 && c < 10) {
    return a+":0"+b+":0"+c;
  }
  
  if(a < 100 && b > 10 && c > 10) {
    return "0"+a+":"+b+":"+c;
  }
  
  if(a < 10 && b >= 10 && c < 10) {
    return "0"+a+":"+b+":0"+c;
  }
  else {
    return a+":0"+b+":"+c;
  }
}

function resetTimer() {
  let hrs = document.getElementById('hrs');
  let mins = document.getElementById('mins');
  let sec = document.getElementById('sec');
  hrs.value = "0";
  mins.value = "0";
  sec.value = "0";
  audio.pause();
  tick.pause();
  startBtn.disabled = false;
  disp.innerText = "00:00:00";
  clearInterval(timerId);
}