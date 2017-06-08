import * as React from "react";

export class NavBar extends React.Component<any, undefined> {
    public render() {
        return <ul className="nav nav-tabs">
                   <li className="disabled" role="presentation">
                       <a href="#">List</a>
                   </li>
                   <li className="disabled" role="presentation">
                       <a href="#">About</a>
                   </li>
               </ul>;
    }
}