import { ITaskItem } from '../shared/task-item';

export class TasksData {
    private _items: Array<ITaskItem> = [];

    public get items(): Array<ITaskItem> {
        return this._items;
    };
}