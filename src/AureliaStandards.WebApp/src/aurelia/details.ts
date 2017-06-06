import { autoinject } from 'aurelia-framework';

import { TasksApi } from './tasks-api';
import { ITaskItem } from '../shared/task-item';

@autoinject
export class Details {
    private api: TasksApi;

    constructor(api: TasksApi) {
        this.api = api;
    }

    public isDataLoading: boolean = false;
    public task: ITaskItem;

    activate(params: any, routeConfig) {
        this.isDataLoading = true;

        let paramsId = params ? params.id : undefined;
        if (paramsId) {
            this.api.getItem(paramsId)
                .then(data => {
                    let task = (data.content as ITaskItem);
                    this.task = task;
                })
                .then(() => {
                    this.isDataLoading = false;
                });
        }
    }
}