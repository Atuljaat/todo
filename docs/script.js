let space = document.querySelector('#space');
let button = document.querySelector('#btn');
let inputs = document.querySelector('#input');
let themes = document.querySelector('#theme');
let choice = localStorage.getItem('theme') || 'light';
localStorage.setItem('theme' , choice);

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
    checkTheme();
})


function showTaskonreload (){
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach( (elements) => {
        let list = document.createElement('li');
        list.innerHTML = `
                <li class="border border-black bg-cyan-300 dark:border-orange-600 dark:bg-slate-950 p-2 rounded-lg my-2">
                    <div class="list flex items-start  gap-4">
                       <span class="flex items-center flex-shrink-0">
                         <img src="img/unchecked.svg" class="w-6 h-6 unchecked dark:bg-orange-600 rounded-full">
                       </span>
 
                       <span class="text-sm md:text-lg lg:text-lg break-words flex-grow">
                        ${elements.task}
                       </span>
                   
                       <span class="flex flex-col sm:flex-row sm:space-x-2 whitespace-nowrap flex-shrink-0">
                         <button class="edit m-1  px-2 py-1 rounded ">edit</button>
                         <button class="remove m-1 px-2 py-1 rounded">remove</button>
                       </span>
                     </div>
                     <div class="text-xs text-slate-700 dark:text-slate-400">
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
    spanTxt.style.color = '#f0581e'
    img.classList.remove('checked');
    img.classList.add('unchecked');
}

themes.addEventListener('click',(e)=>{
  changeTheme();
})

function changeTheme (){
    let theme = localStorage.getItem('theme');
    document.documentElement.classList.toggle('dark');
    if (theme == 'light'){
        localStorage.setItem('theme' , 'dark');
        themes.setAttribute('src', 'img/dark.svg') ;
    } else if (theme == 'dark'){
        localStorage.setItem('theme' , 'light');
        themes.setAttribute('src' ,'img/light.svg' );
    }
    checkTheme();
}
 

function checkTheme (){
    let theme = localStorage.getItem('theme');
    document.documentElement.classList.toggle('dark');
    if (theme == 'light'){
        localStorage.setItem('theme' , 'light');
        themes.setAttribute('src' ,'img/dark.svg' );
        document.documentElement.classList.remove('dark');
    } else if (theme == 'dark'){
        localStorage.setItem('theme' , 'dark');
        themes.setAttribute('src', 'img/light.svg');
        document.documentElement.classList.add('dark');
    }
}