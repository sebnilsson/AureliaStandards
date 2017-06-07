import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ITaskItem } from '../shared/task-item';

const baseUrl = '/api/tasks';

@Injectable()
export class TasksApiService {
    constructor(private http: Http) {
    }

    public add(title: string, details: string = undefined): Promise<ITaskItem> {
        let content = { titleText: title, detailsText: details } as ITaskItem;

        let addPromise = this.http.post(`${baseUrl}/`, content)
            .toPromise()
            .then(response => response.json() as ITaskItem);
        return addPromise;
    }

    public deleteItem(id: string): Promise<any> {
        let deletePromise = this.http.delete(`${baseUrl}/${id}`)
            .toPromise();
        return deletePromise;
    }

    public getItem(id: string): Promise<ITaskItem> {
        let getPromise = this.http.get(`${baseUrl}/${id}`)
            .toPromise()
            .then(response => response.json() as ITaskItem);
        return getPromise;
    }

    public getAll(): Promise<ITaskItem[]> {
        let getAllPromise = this.http.get(`${baseUrl}/`)
            .toPromise()
            .then(response => response.json() as ITaskItem[]);
        return getAllPromise;
    }

    public update(task: ITaskItem): Promise<ITaskItem> {
        let updatePromise = this.http.post(`${baseUrl}/`, task)
            .toPromise()
            .then(response => response.json() as ITaskItem);
        return updatePromise;
    }
}