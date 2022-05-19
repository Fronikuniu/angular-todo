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
    {
      id: 1,
      name: 'Task 1',
      deadline: '2022-05-01',
      inProgress: false,
      done: true,
    },
    {
      id: 2,
      name: 'Task 2',
      deadline: '2022-05-18',
      inProgress: false,
      done: false,
    },
    {
      id: 3,
      name: 'Task 3',
      deadline: '2022-05-19',
      inProgress: false,
      done: true,
    },
    {
      id: 4,
      name: 'Task 4',
      deadline: '2022-05-19',
      inProgress: true,
      done: false,
    },
    {
      id: 5,
      name: 'Task 5',
      deadline: '2022-05-19',
      inProgress: false,
      done: false,
    },
    {
      id: 6,
      name: 'Task 6',
      deadline: '2022-05-19',
      inProgress: true,
      done: false,
    },
  ];
  taskName: string = '';
  taskDeadline: string = '';
  manageTask: boolean = false;
  today: Date = new Date();

  constructor() {
    this.config = {
      title: 'Task details',
      copyright: `${this.today.getFullYear()} © TODO List build with Angular.`,
    };
  }

  openTasks(): Task[] {
    return this.tasks.filter((task) => !task.done && !task.inProgress);
  }

  inProgressTasks(): Task[] {
    return this.tasks.filter((task) => task.inProgress);
  }

  doneTasks(): Task[] {
    return this.tasks.filter((task) => task.done);
  }

  addTask() {
    const lastTask = this.tasks[this.tasks.length - 1];
    const id = lastTask ? lastTask.id + 1 : 1;
    if (this.taskName && this.taskDeadline) {
      this.tasks.push({
        id,
        name: this.taskName,
        deadline: this.taskDeadline,
        inProgress: false,
        done: false,
      });
      this.taskName = '';
      this.taskDeadline = '';
    }
  }

  removeTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  doneTask(id: number) {
    this.tasks.filter((task) => task.id === id && (task.done = true));
  }

  clearTasks(): void {
    this.tasks = [];
  }

  todaysTasks(): Task[] {
    const year = this.today.getFullYear();
    const month = this.today.getMonth() + 1;
    const day = this.today.getDate();

    const prepareMonth = month <= 9 ? `0${month}` : month;
    const prepareDay = day <= 9 ? `0${day}` : day;

    return this.tasks.filter(
      (task) =>
        task.deadline === `${year}-${prepareMonth}-${prepareDay}` && !task.done
    );
  }

  switchManageTask(): void {
    this.manageTask = !this.manageTask;
  }

  pluralOrNot(): string {
    return this.tasks.length === 1 ? 'Task' : 'Tasks';
  }

  percentOfDoneTasks(): number {
    const doneTasks = this.doneTasks().length;
    const allTasks = this.tasks.length;
    return (doneTasks / allTasks) * 100;
  }
}
