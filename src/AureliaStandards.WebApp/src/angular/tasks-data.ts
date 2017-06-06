import { Injectable } from '@angular/core';

import { ITaskItem } from '../shared/task-item';

@Injectable()
export class TasksData {
    private _items: Array<ITaskItem> = [];

    public get items(): Array<ITaskItem> {
        return this._items;
    };
}