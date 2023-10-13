import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task.model';
import { TasksService } from '../tasks.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  taskForm = new FormGroup({
    taskName: new FormControl('', Validators.required),
  });

  editTaskForm = new FormGroup({
    taskName: new FormControl('', Validators.required),
  });

  editingTaskId: string | null = null;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasksService.getAllTasks().subscribe((response) => {
      this.tasks = response.data;
      console.log(this.tasks);
    });
  }

  createTask(): void {
    if (this.taskForm.valid) {
      const newTask = { task: this.taskForm.get('taskName')?.value };
      this.tasksService.createTask(newTask).subscribe(() => {
        this.taskForm.reset();
        this.loadTasks();
      });
    }
  }

  startEditTaskName(task: Task): void {
    this.editingTaskId = task._id;
    this.editTaskForm.setValue({ taskName: task.task });
  }

  saveEditTaskName(): void {
    if (this.editingTaskId && this.editTaskForm.valid) {
      const updatedTask = { task: this.editTaskForm.get('taskName')?.value };
      this.tasksService
        .updateTask(this.editingTaskId, updatedTask)
        .subscribe(() => {
          this.editingTaskId = null;
          this.editTaskForm.reset();
          this.loadTasks();
        });
    }
  }

  cancelEditTaskName(): void {
    this.editingTaskId = null;
    this.editTaskForm.reset();
  }

  markAsComplete(taskId: string): void {
    this.tasksService.markTaskAsComplete(taskId).subscribe(() => {
      this.loadTasks();
    });
  }

  markAsIncomplete(taskId: string): void {
    this.tasksService.markTaskAsIncomplete(taskId).subscribe(() => {
      this.loadTasks();
    });
  }

  deleteTask(taskId: string): void {
    this.tasksService.deleteTask(taskId).subscribe(() => {
      this.loadTasks();
    });
  }

  deleteAllTasks(): void {
    this.tasksService.deleteAllTasks().subscribe(() => {
      this.loadTasks();
    });
  }
}
