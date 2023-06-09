import { TaskService } from './../shared/task.service';
import { Component, OnInit } from '@angular/core';
import { Task } from '../shared/task';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-list-form',
  templateUrl: './task-list-form.component.html',
  styleUrls: ['./task-list-form.component.css']
})
export class TaskListFormComponent implements OnInit {
  task: Task = new Task();
  title: string = 'Nova Tarefa';

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private taskService:TaskService
  ){

  }
  ngOnInit(){
    const id = this.activateRoute.snapshot.paramMap.get('id');
    if(id ){

      const task = this.taskService.getById(parseInt(id));
      this.title = 'Alterando Tarefa'
      if (task !== undefined) {
        this.task = task;
    }
    }
  }
  onSumit(){
    this.taskService.save(this.task);
    this.router.navigate(['']);
  }
}
