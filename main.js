let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];
let tabs = document.querySelectorAll(".task-tabs div");
let mode ="all";
let filterList=[];
let underBar = document.getElementById("under-line");

addButton.addEventListener("mousedown", addTask);

for(let i=1;i<tabs.length;i++){
    tabs[i].addEventListener("click",function (event){
        filter(event);
    });
}

function addTask() {
    let task = {
        id:randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }
    taskList.push(task);
    taskInput.value="";
    render();
}

function render() {
    let list =[];
    if(mode == "all"){
        list = taskList;
    } else if(mode =="ongoing"||mode=="done"){
        list = filterList
    } 
    let resultHTML = "";
    for (let i = 0; i < list.length; i++) {
        if(list[i].isComplete == true){
        resultHTML += ` <div class="task task-done">
            <span class="task-done">${list[i].taskContent}
            </span>
            <div class="button-box">
                <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-arrow-rotate-left"></i></button>
                <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can" id="delete-button"></i></button>
             </div>
        </div>`;
        }else {
        resultHTML += ` <div class="task">
            <span>${list[i].taskContent}
            </span>
            <div class="button-box">
                <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check" id="check-button"></i></button>
                <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can" id="delete-button"></i></button>
           </div>
        </div>`;            
        }
    }


    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete= !taskList[i].isComplete;            
            break;
        }
    }
    filter();
    


}

function deleteTask(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1);
            break;
        }
    }
    filter();
    
}


function filter(e){
    if(e){
    mode=e.target.id;
    underBar.style.left = e.currentTarget.offsetLeft + "px";
    underBar.style.width = e.currentTarget.offsetWidth + "px";
    underBar.style.top = 
    e.currentTarget.offsetTop + (e.currentTarget.offsetHeight -4 ) + "px";
}
    filterList=[]
    if(mode =="all"){
        render();
    } else if(mode =="ongoing"){
        for(let i=0; i<taskList.length;i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i]);
            }
        }
    render()
    }else if(mode =="done"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete == true){
            filterList.push(taskList[i])
        }
    }
    render();
    
}
}



function randomIDGenerate(){
    return '_' + Math. random(). toString(36). substr(2, 9);
}
