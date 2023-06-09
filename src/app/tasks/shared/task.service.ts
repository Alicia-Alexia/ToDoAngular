import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: Task[] = []
  constructor() { }

  getAll(){
    const list = window.localStorage.getItem('list-task')
    if(list){
      this.tasks = JSON.parse(list)
    }
    return  this.tasks;
  }

  getById(id:number){
    const tasks = this.tasks.find((value) => value.id == id);
    return tasks;
  }

  save(task: Task){
    if(task.id ){
      let taskArr = this.getById(task.id);

      if (taskArr !== undefined) {
        taskArr.description = task.description;
        taskArr.completed = task.completed;
  }
    }else {
      let lastId = 0
      if(this.tasks.length> 0 ){
        lastId = this.tasks[this.tasks.length-1].id;
      }

      task.id = lastId + 1;
      task.completed = false;
      this.tasks.push(task);
  }
  window.localStorage.setItem('list-task', JSON.stringify(this.tasks))
}
  delete(id: number){
    const taskIndex = this.tasks.findIndex((value) => value.id == id);
    this.tasks.splice(taskIndex, 1);
    window.localStorage.setItem('list-task', JSON.stringify(this.tasks))
  }
}
