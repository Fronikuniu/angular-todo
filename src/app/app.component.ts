import { Component } from '@angular/core';
import { Task } from 'src/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  config: Record<string, string> | null = null;
  tasks: Task[] = [
    { id: 1, name: 'Task 1', deadline: '2022-05-01', done: false },
    { id: 2, name: 'Task 2', deadline: '2022-05-18', done: false },
    { id: 3, name: 'Task 3', deadline: '2022-05-19', done: true },
    { id: 4, name: 'Task 4', deadline: '2022-05-05', done: false },
  ];

  constructor() {
    this.config = {
      title: 'TODO LIST',
      copyright: `${new Date().getFullYear()} © TODO List build with Angular.`,
    };
  }

  addTask(name: string, deadline: string) {
    const lastTask = this.tasks[this.tasks.length - 1];
    if (name && deadline) {
      this.tasks.push({
        id: lastTask.id + 1,
        name,
        deadline,
        done: false,
      });
    }
  }

  removeTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  clearTasks() {
    this.tasks = [];
  }
}
