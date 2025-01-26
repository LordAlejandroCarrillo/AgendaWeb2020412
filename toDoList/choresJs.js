const container = document.getElementById('container')
let chores = new Array()

function loadData(){
    
    chores = JSON.parse(localStorage.getItem('chores'))

    chores.sort((x,y)=>{
        const priorities = ['Alta', 'Media', 'Baja']
        return priorities.indexOf(x.priority) - priorities.indexOf(y.priority)
    })

    localStorage.setItem('chores', JSON.stringify(chores))
    
    chores = JSON.parse(localStorage.getItem('chores'))

    container.innerHTML = ``
    chores.forEach((task, index) => {
        container.innerHTML += `
            <li class="list-group-item d-flex">
              <table class="table table-borderless" style="margin-top: 1.5%;"> 
                <tbody>
                  <tr>
                    <div>
                      <td style="width: 75%;">
                        <ul class="">
                          <small class="">${task.date}</small>
                          <p style="font-size: 1.2rem;">${task.task}</p>
                      </td>
                    </div>
                    <td> | </td>
                    <td style="font-size: 1.2rem;">${task.priority}</td>
                  </tr>
                </tbody>
              </table>
              <button class="btn btn-danger" role="button" style="font-size: 100%; width: 10%;" onclick="deleteTask(${index})">Hecho</button>
            </li>
        `
    });
}

function executeSinceStart(){
    if(localStorage.getItem('chores')){
        chores = JSON.parse(localStorage.getItem('chores'))
    }
    
    loadData()
}

document.addEventListener("DOMContentLoaded", executeSinceStart)


function addTask(){
    let newTask = document.getElementById('newTask').value
    let priorityInput = document.getElementById('priorityInput').value

    if(newTask === ""){
        alert('Por favor, ingresar una tarea pendiente.')
        return
    } else if(priorityInput == 'Priorities'){
        alert('Por favor, ingresar prioridad.')
        return
    } else{
        let now = new Date()
        let date = `${now.getDate().toString().padStart(2,'0')}-${(now.getMonth()+1).toString().padStart(2,'0')}-${now.getFullYear()}`
        let time = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`
        console.log(date, time)
        chores.push({task: newTask, priority: priorityInput, date: `${date} ${time}`})
    }

    localStorage.setItem('chores', JSON.stringify(chores))
    chores = JSON.parse(localStorage.getItem('chores'))
    
    loadData()
}

function deleteTask(index){
    console.log(chores)
    chores.splice(index, 1)

    localStorage.setItem('chores', JSON.stringify(chores))

    chores = JSON.parse(localStorage.getItem('chores'))

    loadData()
}