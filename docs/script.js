let space = document.querySelector('#space');
let button = document.querySelector('#btn');
let inputs = document.querySelector('#input');

button.addEventListener('click',(e)=>{
    e.preventDefault();
    let inputTxt = String(inputs.value).trim();
    if (inputTxt){
        saveTask(inputTxt);
        location.reload();
    }
    inputs.value = '';  
})

function saveTask (inputTxt){
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let currentDate = new Date().toLocaleString()
    let taskobj = {
        task : inputTxt,
        date : currentDate,
    }
    tasks.push(taskobj);
    localStorage.setItem('tasks' , JSON.stringify(tasks));
}

window.addEventListener('load',(e)=>{
    e.preventDefault();
    showTaskonreload();
})


function showTaskonreload (){
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach( (elements) => {
        let list = document.createElement('li');
        list.innerHTML = `
             <li class="border border-black p-2 rounded-lg my-2">
                    <div class="list flex items-start  gap-4">
                       <span class="flex items-center flex-shrink-0">
                         <img src="img/unchecked.svg" class="w-6 h-6 unchecked">
                       </span>
 
                       <span class="text-sm md:text-lg lg:text-lg break-words flex-grow">
                        ${elements.task}
                       </span>
                   
                       <span class="flex flex-col sm:flex-row sm:space-x-2 whitespace-nowrap flex-shrink-0">
                         <button class="edit m-1 bg-blue-500 text-white px-2 py-1 rounded">edit</button>
                         <button class="remove m-1 bg-red-500 text-white px-2 py-1 rounded">remove</button>
                       </span>
                     </div>
                     <div class="text-xs text-slate-700">
                        Created at : ${elements.date} 
                     </div>
                 </li>            
        `;
        space.prepend(list);
    })
}

space.addEventListener('click' , (e)=>{
    e.preventDefault();
    let li =  e.target.closest('li');
    let span = li.firstElementChild.children[1];
    let spanTxt = span.textContent.trim();
    if (e.target.classList.contains('edit')){
        let userInput = prompt("Edit the task : ");
        if (userInput){
            editLocal(spanTxt,userInput);
            span.textContent = userInput;
        }
    }

    else if (e.target.classList.contains('remove')){
        
        li.remove();
        removeLocal(spanTxt);
        console.log(span)
    } 
    else if (e.target.classList.contains('unchecked')){
        console.log(e.target);
        checked(e);
    }
    else if (e.target.classList.contains('checked')){
        console.log('idk')
        unchecked(e);
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

function checked (e){
    let img = e.target;
    img.src = 'img/checked.svg';
    let spanTxt = e.target.closest('li').firstElementChild.children[1];
    spanTxt.style.textDecoration = 'line-through';
    spanTxt.style.color = 'grey';
    img.classList.remove('unchecked');
    img.classList.add('checked');
}

function unchecked(e){
    let img = e.target;
    img.src = 'img/unchecked.svg';
    let spanTxt = e.target.closest('li').firstElementChild.children[1];
    spanTxt.style.textDecoration = 'none';
    spanTxt.style.color = 'black';
    img.classList.remove('checked');
    img.classList.add('unchecked');
}