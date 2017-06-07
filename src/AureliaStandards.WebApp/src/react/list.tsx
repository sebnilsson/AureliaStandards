import * as moment from 'moment';
import * as React from "react";

import { TasksApi } from './tasks-api';
import { TasksData } from '../shared/tasks-data';
import { ITaskItem } from '../shared/task-item';

interface IState {
    formTaskTitle: string,
    formTaskDetails: string,
    isDataLoading: boolean,
    tasksData: TasksData
}

interface IProps {
    tasksApi: TasksApi,
    tasksData: TasksData
}

export class List extends React.Component<IProps, IState> {
    private api: TasksApi;

    constructor(props) {
        super(props);

        this.state = {
            formTaskTitle: '',
            formTaskDetails: '',
            isDataLoading: false,
            tasksData: props.tasksData
        };

        this.api = this.props.tasksApi;

        this.addTask = this.addTask.bind(this);
        this.handleformTaskTitleChange = this.handleformTaskTitleChange.bind(this);
        this.handleformTaskDetailsChange = this.handleformTaskDetailsChange.bind(this);
        this.getAllTasks = this.getAllTasks.bind(this);
        this.updateTask = this.updateTask.bind(this);

        if (!this.state.tasksData.items.length) {
            this.getAllTasks();
        }
    }

    public get activeTasksCount(): number {
        return this.activeTasksItems.length;
    }

    public get activeTasksItems(): ITaskItem[] {
        return this.state.tasksData.items.filter(x => !x.isDone);
    }

    public get doneTasksCount(): number {
        return this.doneTasksItems.length;
    }

    public get doneTasksItems(): ITaskItem[] {
        return this.state.tasksData.items.filter(x => x.isDone);
    }

    public render(): JSX.Element {
        let isLoadingEl = this.state.isDataLoading ? <em className="small">(Loading...)</em> : undefined;

        let updateButtonEl = !this.state.isDataLoading
            ? <button onClick={this.getAllTasks} className="btn btn-default btn-sm">Update</button>
            : undefined;

        let activeTasksEl = this.getTasksEl(this.activeTasksItems, this.activeTasksCount, 'Active items');
        let doneTasksEl = this.getTasksEl(this.doneTasksItems, this.doneTasksCount, 'Done items', true /*isDoneItems*/);

        return <div>
            <h2>
                List {isLoadingEl} {updateButtonEl}
            </h2>
            <form onSubmit={this.addTask}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input value={this.state.formTaskTitle} onChange={this.handleformTaskTitleChange} disabled={this.state.isDataLoading}
                        type="text" id="title" placeholder="Title" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="details">Details</label>
                    <textarea value={this.state.formTaskDetails} onChange={this.handleformTaskDetailsChange} disabled={this.state.isDataLoading}
                        id="details" placeholder="Details" className="form-control"></textarea>
                </div>
                <button disabled={this.state.isDataLoading || !this.state.formTaskTitle || this.state.formTaskTitle.length < 3}
                    type="submit" className="btn btn-default">Add</button>
            </form>
            {activeTasksEl}
            {doneTasksEl}
        </div>;
    }

    public addTask(event): void {
        this.setState({ isDataLoading: true });

        this.api.add(this.state.formTaskTitle, this.state.formTaskDetails)
            .then(data => {
                this.state.tasksData.items.push(data);

                this.sortItems();

                this.setState({ formTaskDetails: '', formTaskTitle: '' });
            })
            .then(() => {
                this.setState({ isDataLoading: false });
            });

        event.preventDefault();
    }

    public getAllTasks(): void {
        this.setState({ isDataLoading: true });

        this.state.tasksData.items.length = 0;
        this.state.tasksData.items.splice(0, this.state.tasksData.items.length);

        this.api.getAll()
            .then(data => {
                data.forEach(x => this.state.tasksData.items.push(x));

                this.sortItems();

                this.setState({ tasksData: this.state.tasksData });
            })
            .then(() => {
                this.setState({ isDataLoading: false });
            });
    }

    public updateTask(task: ITaskItem): void {
        this.setState({ isDataLoading: true });

        task.isDone = !task.isDone;
        
        this.api.update(task)
            .then(data => {
                let existingTask = this.state.tasksData.items.find(x => x.id === data.id);
                if (existingTask) {
                    let index = this.state.tasksData.items.indexOf(existingTask);

                    if (index >= 0) {
                        this.state.tasksData.items.splice(index, 1, data);
                    }
                }

                this.sortItems();
            })
            .then(() => {
                this.setState({ isDataLoading: false });
            });
    }

    private getDateFormatRelative(value): string {
        return moment(value).fromNow();
    }

    private getDateFormat(value, format): string {
        return moment(value).format(format);
    }

    private getTasksEl(taskItems: ITaskItem[], tasksCount: number, titleText: string, isDoneItems: boolean = false): JSX.Element {
        let activeTasksCountEl = tasksCount ? <span className="badge">{tasksCount}</span> : undefined;

        let tasksItemsEls = taskItems.map(item => {
            let detailsTextEl = (!isDoneItems && item.detailsText)
                ? <p title="{item.detailsText}">
                    {item.detailsText}
                </p>
                : undefined;

            return <div className={item.isDone ? 'list-group-item list-group-item-success strike-through' : 'list-group-item'}>
                <h4>
                    <input checked={item.isDone} onChange={() => this.updateTask(item)}
                        type="checkbox" id="checkbox-{item.id}" />&nbsp;
                        <label htmlFor="checkbox-{item.id}">
                        {item.titleText}
                    </label>
                    &nbsp;
                    <a className="btn btn-default btn-xs disabled">
                        Show details &gt;
                </a>
                </h4>
                {detailsTextEl}
                <div>
                    <span title={'Updated at ' + this.getDateFormat(item.updatedAt, 'YYYY-MM-DD HH:mm:ss')} className="label label-info">
                        Updated: {this.getDateFormatRelative(item.updatedAt)}
                    </span>&nbsp;&nbsp;
                    <span className="label label-default">
                        Created: {this.getDateFormat(item.createdAt, 'YYYY-MM-DD')}
                    </span>
                </div>
            </div>
        });

        let tasksEl = taskItems.length
            ? <div className="list-group">
                <h3>
                    {titleText} {activeTasksCountEl}
                </h3>

                {tasksItemsEls}
            </div>
            : undefined;
        return tasksEl;
    }

    private handleformTaskTitleChange(event): void {
        this.setState({ formTaskTitle: event.target.value });
    }

    private handleformTaskDetailsChange(event): void {
        this.setState({ formTaskDetails: event.target.value });
    }

    private sortItems(): void {
        this.state.tasksData.items.sort((a, b) => {
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