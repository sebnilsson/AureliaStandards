import * as React from "react";

import { NavBar } from './nav-bar';
import { List } from './list';
import { TasksApi } from './tasks-api';
import { TasksData } from '../shared/tasks-data';

interface IState {
    tasksApi: TasksApi,
    tasksData: TasksData
}

export class App extends React.Component<any, IState> {
    constructor(prop) {
        super(prop);

        this.state = {
            tasksApi: new TasksApi(),
            tasksData: new TasksData()
        };
    }

    public render(): JSX.Element {
        return <div>
            <NavBar />
            <List tasksData={this.state.tasksData} tasksApi={this.state.tasksApi} />
        </div>;
    }
}