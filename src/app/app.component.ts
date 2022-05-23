import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
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
  openTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  doneTasks: Task[] = [];

  constructor() {
    this.config = {
      title: 'Task details',
      copyright: `${this.today.getFullYear()} © TODO List build with Angular.`,
    };
    this.updateTasks();
  }

  private updateTasks(): void {
    this.openTasks = this.getOpenTasks();
    this.inProgressTasks = this.getInProgressTasks();
    this.doneTasks = this.getDoneTasks();
  }

  private getOpenTasks(): Task[] {
    return this.tasks.filter((task) => !task.done && !task.inProgress);
  }

  private getInProgressTasks(): Task[] {
    return this.tasks.filter((task) => task.inProgress);
  }

  private getDoneTasks(): Task[] {
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
    this.updateTasks();
  }

  removeTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.updateTasks();
  }

  clearTasks(): void {
    this.tasks = [];
    this.updateTasks();
  }

  pluralOrNot(): string {
    return this.tasks.length === 1 ? 'Task' : 'Tasks';
  }

  percentOfDoneTasks(): number {
    const doneTasks = this.doneTasks.length;
    const allTasks = this.tasks.length;
    return (doneTasks / allTasks) * 100;
  }

  private transferData(event: CdkDragDrop<Task[]>): void {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  private updateTasksData(): void {
    this.tasks = [
      ...this.openTasks,
      ...this.inProgressTasks,
      ...this.doneTasks,
    ];
  }

  droppedToOpen(event: CdkDragDrop<Task[]>): void {
    this.transferData(event);
    this.openTasks = this.openTasks.map((task) => ({
      ...task,
      inProgress: false,
      done: false,
    }));
    this.updateTasksData();
  }

  droppedToInProgress(event: CdkDragDrop<Task[]>): void {
    this.transferData(event);
    this.inProgressTasks = this.inProgressTasks.map((task) => ({
      ...task,
      inProgress: true,
      done: false,
    }));
    this.updateTasksData();
  }

  droppedToClosed(event: CdkDragDrop<Task[]>): void {
    this.transferData(event);
    this.doneTasks = this.doneTasks.map((task) => ({
      ...task,
      inProgress: false,
      done: true,
    }));
    this.updateTasksData();
  }
}
