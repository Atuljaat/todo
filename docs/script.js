let space = document.querySelector('#space');
let button = document.querySelector('#btn');
let inputs = document.querySelector('#input');
// let displayLists = document.querySelector('#lists');

button.addEventListener('click',(e)=>{
    e.preventDefault();
    let inputTxt = String(inputs.value).trim();
    if (inputTxt){
        saveTask(inputTxt);
        location.reload();
        // showTask(inputTxt);
    }
    inputs.value = '';  
})

function saveTask (inputTxt){
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(inputTxt);
    localStorage.setItem('tasks' , JSON.stringify(tasks));
}

window.addEventListener('load',(e)=>{
    e.preventDefault();
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(element => {
        console.log(element);
    });
    showTaskonreload();
})

// function showTask (inputTxt){
//     let list = document.createElement('li');
//         list.innerHTML = `
//         <li>
//         <div class="list">
//         ${inputTxt}
//         <span>
//             <button class="edit"> edit </button>
//             <button class="remove "> remove</button>
//         </span>
//         </div>
//         </li>
//         `;
//         space.appendChild(list);
// }

function showTaskonreload (){
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach( (elements) => {
        let list = document.createElement('li');
        list.innerHTML = `
            <li>
            <div class="list">
            <span>
            ${elements}
            </span>

            <span>
                <button class="edit"> edit </button>
                <button class="remove "> remove</button>
            </span>
            </div>
            </li>
        `;
        space.prepend(list);
    })
}

space.addEventListener('click' , (e)=>{
    e.preventDefault();
    let li =  e.target.closest('li');
    let span = li.firstElementChild.firstElementChild;
    let spanTxt = li.firstElementChild.firstElementChild.textContent.trim();
    if (e.target.classList.contains('edit')){
        let userInput = prompt("Edit the task : ")
        editLocal(spanTxt,userInput);
        span.textContent = userInput;
    }

    else if (e.target.classList.contains('remove')){
        li.remove();
        removeLocal(spanTxt);
    }
})

function editLocal (txt,input){
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let num = tasks.indexOf(txt);
    tasks.splice(num,1,input);
    localStorage.setItem('tasks' , JSON.stringify(tasks));
}

function removeLocal (txt){
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let num = tasks.indexOf(txt);
    tasks.splice(num,1);
    localStorage.setItem('tasks' , JSON.stringify(tasks));
}