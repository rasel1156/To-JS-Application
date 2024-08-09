
let taskInputValue, taskComplete, getLiNumber;
let taskCOntainer = document.querySelector('.tasks-list-area');
const taskSubmit = document.getElementById('submit');
const taskInput = document.getElementById('input');
let taskPending = document.getElementById('pending');
let taskCompleted = document.getElementById('completed');
let pending = document.getElementById('pending');
let congratulations = document.querySelector('.congratulation');

// function for valid data check and insert to the pending task list
function taskInsert(){
    taskInputValue = taskInput.value;
        if(!taskInputValue){
            alert('Please enter a task');
        } else{
            taskPending.insertAdjacentHTML("beforeend", `<li class="list item">  <div class="list-content">${taskInputValue}<span onclick="tasksCompleted(this)" class="box checkbox"></span></div></li>`);
            taskInput.value = "";
            saveDataPending();
        }
}

// insert data by clicking submit button
taskSubmit.addEventListener('click', () =>{
    taskInsert(); 
});

// insert data on press enter key
taskInput.addEventListener('keypress', () =>{
    if (event.key === "Enter") {
        taskInsert();
      }
});

// onlick event function for complete data chekmarks
function tasksCompleted(el){
        let getLi = el.closest('.list');
        taskComplete = getLi.textContent;
        getLi.remove();
        taskCompleted.insertAdjacentHTML("afterbegin", `<li class="list">  <div class="list-content">${taskComplete}<span onclick="tasksReverse(this)" class="box checkbox"></span><span onclick="deletePermanently(this)" class="box delete-permanently"></span></div></li>` );
        saveDataPending();
        saveDataCompleted();
        getLiNumber = document.getElementById('pending').querySelectorAll('.list');
        if(getLiNumber.length == 0){
            congratulations.classList.add('show');
            setTimeout(function(){
                congratulations.classList.remove('show');
            }, 2000);
        }
    
}

function tasksReverse(el){
    let getLi = el.closest('.list');
    taskComplete = getLi.textContent;
    getLi.remove();
    pending.insertAdjacentHTML("beforeend", `<li class="list">  <div class="list-content">${taskComplete}<span onclick="tasksCompleted(this)" class="box checkbox"></span></div></li>` );
    saveDataPending();
    saveDataCompleted();
}

function deletePermanently(el){
    let getLi = el.closest('.list');
    getLi.remove();
    saveDataCompleted();
}

// locaal storage data save to browser history
function saveDataPending(){
    localStorage.setItem("dataPending", taskPending.innerHTML);
}
function saveDataCompleted(){
    localStorage.setItem("dataCompleted", taskCompleted.innerHTML);
}

function showData(){
    taskPending.innerHTML = localStorage.getItem("dataPending");
    taskCompleted.innerHTML = localStorage.getItem("dataCompleted");
}
showData();




