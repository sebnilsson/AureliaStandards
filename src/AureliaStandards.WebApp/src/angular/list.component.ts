﻿import { Component } from "@angular/core";

import { TasksApiService } from './tasks-api.service';
import { TasksData } from './tasks-data';
import { ITaskItem } from '../shared/task-item';

@Component({
    selector: 'list',
    templateUrl: './dist/templates/list.component.html'
    // TestABC
})
export class ListComponent {
    private _addTaskDetails: string;
    private _addTaskTitle: string = '';
    private _tasksData: TasksData;

    constructor(tasksData: TasksData,
        private api: TasksApiService) {
        this._tasksData = tasksData;

        if (!this._tasksData.items.length) {
            this.getAllTasks();
        }
    }

    public get addTaskDetails(): string {
        return this._addTaskDetails;
    }

    public set addTaskDetails(value: string) {
        this._addTaskDetails = value;
    }
    
    public get addTaskTitle(): string {
        return this._addTaskTitle;
    }

    public set addTaskTitle(value: string) {
        this._addTaskTitle = value;
    }
    
    public get activeTasksCount(): number {
        return this.activeTasksItems.length;
    }

    public get activeTasksItems(): ITaskItem[] {
        return this._tasksData.items.filter(x => !x.isDone);
    }
    
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
                this._tasksData.items.push(data);

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
                data.forEach(x => this._tasksData.items.push(x));

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
                let existingTask = this._tasksData.items.find(x => x.id === data.id);
                if (existingTask) {
                    let index = this._tasksData.items.indexOf(existingTask);

                    if (index >= 0) {
                        this._tasksData.items.splice(index, 1, data);
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