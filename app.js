// Make variables for buttons
const playBtn = document.querySelector('#play-btn'),
pauseBtn = document.querySelector('#pause-btn'),
resetBtn = document.querySelector('#reset-btn'),
countBtn = document.querySelector('#count-btn');
// make variable for stop-watch and count box
let stopWatchBox = document.querySelector('.stop-watch'),
min = stopWatchBox.querySelector('#min'),
sec = stopWatchBox.querySelector('#sec'),
centisec = stopWatchBox.querySelector('#centisec'),
countBox = document.querySelector('.count-box');
// Make variables for watch Element, timer, and count
let [m, s, cs] = [0, 0, 0],
timer = null,
count = 0;


// To click on play-btn to start the stopWatch
playBtn.addEventListener('click', () => {
    startWatch();
})

// To click on pause-btn to pause the stopWatch
pauseBtn.addEventListener('click', () => {
    puaseWatch();
})

// To click on reset-btn to reset the stopWatch
resetBtn.addEventListener('click', () => {
    resetWatch();
    clearData();
})


// To click on count-btn to add count box
countBtn.addEventListener('click', () => {
    addCount();
})


// function to save the count history in the localStorage
function saveData(){
    localStorage.setItem('data', countBox.innerHTML);
}

// function to get the data history from localStorage
function showData(){
    countBox.innerHTML = localStorage.getItem('data');
    if(countBox.innerHTML != ''){
        resetBtn.classList.remove('pointer-none');
        resetBtn.classList.add('active');
    }else{
        resetBtn.classList.add('pointer-none');
        resetBtn.classList.remove('active');
    }
}
showData();


// function to clearData the localStorage
function clearData(){
    countBox.innerHTML = '';
    saveData();
}

// function to add count in the countBox container 
function addCount(){
    let div = document.createElement('div');
    div.className = 'count';
    div.innerHTML = `<p><span id="count-id">Count ${++count}</span><br><span id="duration">${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}.${cs < 10 ? `0${cs}` : cs}</span></p>
    <p id="stop-time">${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}.${cs < 10 ? `0${cs}` : cs}</p>`;
    countBox.prepend(div);
    saveData();
}

// function to print the value of m, s, cs 
function printValue(m, s, cs){
    min.innerText = m < 10 ? `0${m}` : m;
    sec.innerText = s < 10 ? `0${s}` : s;
    centisec.innerText = cs < 10 ? `0${cs}` : cs;
}

// function to reset the stop watch
function resetWatch(){
    clearInterval(timer);
    timer = null;
    printValue(0, 0, 0);
    [m, s, cs] = [0, 0, 0];
    playBtn.classList.remove('hide');
    pauseBtn.classList.add('hide');
    resetBtn.classList.remove('active');
    resetBtn.classList.add('pointer-none');
    countBtn.classList.remove('active');
    countBtn.classList.add('pointer-none');
}

// function to pause the stop watch 
function puaseWatch(){
    clearInterval(timer);
    playBtn.classList.remove('hide');
    pauseBtn.classList.add('hide');
}

// function to start the stop watch 
function startWatch(){
    playBtn.classList.add('hide');
    pauseBtn.classList.remove('hide');
    pauseBtn.classList.add('active');
    countBtn.classList.add('active');
    countBtn.classList.remove('pointer-none');
    resetBtn.classList.add('active');
    resetBtn.classList.remove('pointer-none')
    timer = setInterval(()=>{
        cs++;
        if(cs > 99){
            s++;
            cs = 0;
        }
        if(s > 59){
            m++;
            s = 0;
        }
        printValue(m, s, cs);
    }, 10);
}



