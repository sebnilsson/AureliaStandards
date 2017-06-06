import { Component } from "@angular/core";
import { ActivatedRoute } from '@angular/router';

import { TasksApiService } from './tasks-api.service';
import { ITaskItem } from '../shared/task-item';

@Component({
    selector: 'task-details',
    templateUrl: './dist/templates/details.component.html'
    //template: '<div>TEMPLATE DETAILS</div>'
})
export class DetailsComponent {
    private api: TasksApiService;
    private sub: any;

    constructor(api: TasksApiService, private route: ActivatedRoute) {
        this.api = api;
    }

    public isDataLoading: boolean = false;
    public task: ITaskItem;

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let paramsId = params['id'];
            if (paramsId) {
                this.getTask(paramsId);
            }
        });

    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    private getTask(paramsId: any) {
        this.isDataLoading = true;

        this.api.getItem(paramsId)
            .then(data => {
                this.task = data;
            })
            .then(() => {
                this.isDataLoading = false;
            });
    }
}