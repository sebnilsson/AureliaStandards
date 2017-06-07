import * as fetch from 'isomorphic-fetch';

import { ITaskItem } from '../shared/task-item';

const baseUrl = '/api/tasks';

export class TasksApi {
    public add(title: string, details: string = undefined): Promise<ITaskItem> {
        let content = { titleText: title, detailsText: details } as ITaskItem;

        let addPromise = fetch(`${baseUrl}/`,
                {
                    method: 'POST',
                    body: JSON.stringify(content),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            .then(response => response.json() as ITaskItem);
        return addPromise;
    }

    public getItem(id: string): Promise<ITaskItem> {
        let getPromise = fetch(`${baseUrl}/${id}`)
            .then(response => response.json() as ITaskItem);
        return getPromise;
    }

    public getAll(): Promise<ITaskItem[]> {
        let getAllPromise = fetch(`${baseUrl}/`)
            .then(response => response.json() as ITaskItem[]);
        return getAllPromise;
    }

    public update(task: ITaskItem): Promise<ITaskItem> {
        let updatePromise = fetch(`${baseUrl}/`,
                {
                    method: 'POST',
                    body: JSON.stringify(task),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            .then(response => response.json() as ITaskItem);
        return updatePromise;
    }
}