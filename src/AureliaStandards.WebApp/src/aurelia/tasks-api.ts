import { autoinject } from 'aurelia-framework';
import { HttpClient, HttpResponseMessage } from 'aurelia-http-client';

import { ITaskItem } from '../shared/task-item';

@autoinject
export class TasksApi {
    private client: HttpClient;

    constructor() {
        this.client = new HttpClient()
            .configure(x => {
                x.withBaseUrl('/api/tasks');
            });
    }

    public add(title: string, details: string = undefined): Promise<HttpResponseMessage> {
        let content = { titleText: title, detailsText: details } as ITaskItem;

        let addPromise = this.client.post('/', content);
        return addPromise;
    }

    public getItem(id: string): Promise<HttpResponseMessage> {
        let getPromise = this.client.get(`/${id}/`);
        return getPromise;
    }

    public getAll(): Promise<HttpResponseMessage> {
        let getAllPromise = this.client.get('/');
        return getAllPromise;
    }

    public update(task: ITaskItem): Promise<HttpResponseMessage> {
        let updatePromise = this.client.post('/', task);
        return updatePromise;
    }
}