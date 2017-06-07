import { autoinject, computedFrom } from 'aurelia-framework';

import { TasksApi } from './tasks-api';
import { TasksData } from '../shared/tasks-data';
import { ITaskItem } from '../shared/task-item';

@autoinject
export class List {
    private _formTaskDetails: string;
    private _formTaskTitle: string;
    private _tasksData: TasksData;

    constructor(tasksData: TasksData,
        private api: TasksApi) {
        this._tasksData = tasksData;

        if (!this._tasksData.items.length) {
            this.getAllTasks();
        }
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

    @computedFrom('_formTaskDetails')
    public get formTaskDetails(): string {
        return this._formTaskDetails;
    }

    public set formTaskDetails(value: string) {
        this._formTaskDetails = value;
    }

    @computedFrom('_formTaskTitle')
    public get formTaskTitle(): string {
        return this._formTaskTitle;
    }

    public set formTaskTitle(value: string) {
        this._formTaskTitle = value;
    }

    public isDataLoading: boolean = false;

    public addTask(): void {
        this.isDataLoading = true;

        this.api.add(this.formTaskTitle, this.formTaskDetails)
            .then(data => {
                let task = (data.content as ITaskItem);

                this._tasksData.items.push(task);

                this.sortItems();

                this.formTaskTitle = '';
                this.formTaskDetails = '';
            })
            .then(() => {
                this.isDataLoading = false;
            });
    }

    public deleteTask(task: ITaskItem): void {
        let isConfirmed = confirm('Are you sure you want to delete this item?');
        if (!isConfirmed) {
            return;
        }

        this.isDataLoading = true;

        this.api.deleteItem(task.id)
            .then(() => {
                let index = this._tasksData.items.indexOf(task);

                if (index >= 0) {
                    this._tasksData.items.splice(index, 1);
                }

                this.sortItems();
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
        this.isDataLoading = true;

        this.api.update(task)
            .then(data => {
                let updatedTask = (data.content as ITaskItem);

                let existingTask = this._tasksData.items.find(x => x.id === updatedTask.id);
                if (existingTask) {
                    let index = this._tasksData.items.indexOf(existingTask);

                    if (index >= 0) {
                        this._tasksData.items.splice(index, 1, updatedTask);
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