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

    let countId=0
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
              <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal${countId}" role="button" style="font-size: 100%; width: 10%; margin-right:1%;">Editar</button>
              <button class="btn btn-danger" role="button" style="font-size: 100%; width: 10%;" onclick="deleteTask(${index})">Hecho</button>
              <div class="modal fade" id="modal${countId}" tabindex="-1" aria-labelledby="exampleModalLabel${countId}" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel${countId}">Editar Pendiente</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <input placeholder="${task.task}" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" id="edit">
                      <select class="form-select" aria-label="Default select example" style="margin-top: 5%;" id="priorityEdit">
                        <option selected>${task.priority}</option>
                        <option value="Alta">Alta</option>
                        <option value="Media">Media</option>
                        <option value="Baja">Baja</option>
                      </select>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                      <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="editTask(${index})">Guardar cambios</button>
                    </div>
                  
                  </div>
                </div>
              </div>

            </li>
        `
        countId++
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

function editTask(index){
  let editedTask = document.getElementById('edit').value
  let newPriority = document.getElementById('priorityEdit').value 

  let oldTask = chores[index]
  console.log(oldTask.task)
  let now = new Date()
  let date = `${now.getDate().toString().padStart(2,'0')}-${(now.getMonth()+1).toString().padStart(2,'0')}-${now.getFullYear()}`
  let time = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`

  if(editedTask === ""){
    chores[index] = {task: oldTask.task, priority: newPriority, date: `${date} ${time}`}  
    localStorage.setItem('chores', JSON.stringify(chores))
    loadData()
    return
  } else{
    chores[index] = {task: editedTask, priority: newPriority, date: `${date} ${time}`}  
    localStorage.setItem('chores', JSON.stringify(chores))
    loadData()
    return
  }

}