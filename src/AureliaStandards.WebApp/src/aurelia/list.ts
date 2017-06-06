import { autoinject, computedFrom } from 'aurelia-framework';

import { TasksApi } from './tasks-api';
import { TasksData } from '../shared/tasks-data';
import { ITaskItem } from '../shared/task-item';

@autoinject
export class List {
    private _addTaskDetails: string;
    private _addTaskTitle: string;
    private _tasksData: TasksData;

    constructor(tasksData: TasksData,
        private api: TasksApi) {
        this._tasksData = tasksData;

        if (!this._tasksData.items.length) {
            this.getAllTasks();
        }
    }

    @computedFrom('_addTaskDetails')
    public get addTaskDetails(): string {
        return this._addTaskDetails;
    }

    public set addTaskDetails(value: string) {
        this._addTaskDetails = value;
    }

    @computedFrom('_addTaskTitle')
    public get addTaskTitle(): string {
        return this._addTaskTitle;
    }

    public set addTaskTitle(value: string) {
        this._addTaskTitle = value;
    }

    @computedFrom('activeTasksItems')
    public get activeTasksCount(): number {
        return this.activeTasksItems.length;
    }

    public get activeTasksItems(): ITaskItem[] {
        return this._tasksData.items.filter(x => !x.isDone);
    }

    @computedFrom('doneTaskItems')
    public get doneTasksCount(): number {
        return this.doneTaskItems.length;
    }

    public get doneTaskItems(): ITaskItem[] {
        return this._tasksData.items.filter(x => x.isDone);
    }

    public isDataLoading: boolean = false;

    public addTask(): void {
        this.isDataLoading = true;

        this.api.add(this.addTaskTitle, this.addTaskDetails)
            .then(data => {
                let task = (data.content as ITaskItem);

                this._tasksData.items.push(task);

                this.sortItems();

                this.addTaskTitle = '';
                this.addTaskDetails = '';
            })
            .then(() => {
                this.isDataLoading = false;
            });
    }

    public getAllTasks(): void {
        this.isDataLoading = true;

        this._tasksData.items.length = 0;
        this._tasksData.items.splice(0, this._tasksData.items.length);

        this.api.getAll()
            .then(data => {

                let items = (data.content as ITaskItem[]);

                items.forEach(x => this._tasksData.items.push(x));

                this.sortItems();
            })
            .then(() => {
                this.isDataLoading = false;
            });
    }

    public updateTask(task: ITaskItem): void {
        console.log('List.updateTask -- task: ', task);

        this.isDataLoading = true;

        this.api.update(task)
            .then(data => {
                console.log('List.updateTask this.api.update callback');

                let task = (data.content as ITaskItem);

                let existingTask = this._tasksData.items.find(x => x.id === task.id);
                if (existingTask) {
                    let index = this._tasksData.items.indexOf(existingTask);

                    if (index >= 0) {
                        this._tasksData.items.splice(index, 1, task);
                        
                        //this._tasksData.items[index] = task;
                    }
                }

                this.sortItems();
            })
            .then(() => {
                this.isDataLoading = false;
            });
    }

    private sortItems(): void {
        this._tasksData.items.sort((a, b) => {
            let aTitle = (a.titleText || '').toLowerCase();
            let bTitle = (b.titleText || '').toLowerCase();

            if (aTitle < bTitle) {
                return -1;
            }
            if (aTitle > bTitle) {
                return 1;
            }
            return 0;
        });
    }
}