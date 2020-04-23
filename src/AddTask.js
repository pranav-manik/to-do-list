/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import classNames from "classnames";
import * as React from "react";
import { Button, Classes, Code, H3, H5, Intent, Overlay, Switch, Icon, FormGroup, InputGroup, HTMLSelect } from "@blueprintjs/core";
import { handleBooleanChange, handleNumberChange, handleStringChange } from "@blueprintjs/docs-theme";
import { TimePicker, TimePrecision, DateInput } from "@blueprintjs/datetime";
import './blueprint-datetime.css'
import './_transitions.scss';

const OVERLAY_EXAMPLE_CLASS = "overlay-transition";


// export class TimePickBox extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             disabled: false,
//             precision: TimePrecision.MINUTE,
//             selectAllOnFocus: false,
//             showArrowButtons: false,
//             useAmPm: true,
//         }
//     }
//     return(<TimePicker />);
// }


// Date formatter

const jsDateFormatter = {
    // note that the native implementation of Date functions differs between browsers
    formatDate: date => date.toLocaleDateString(),
    parseDate: str => new Date(str),
    placeholder: "M/D/YYYY",
};



class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            taskName: "",
            taskTime: "12:00",
            taskDate: new Date(),
            taskDescription: "",
            isOpen: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.toggleChildOverlay = this.toggleChildOverlay.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
          [e.target.name]: e.target.value
        });

    }

    componentWillReceiveProps(props) {
        this.setState({ isOpen: props.isOpen })
    }

    

  toggleChildOverlay() {
    this.setState({
      isOpen: this.state.isOpen
    });
    this.props.parentCallback(this.state.isOpen);
    console.log(this.state.isOpen);
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.toggleChildOverlay()
    // this.props.parentCallback(this.state.isOpen);
    console.log(this.state);
  }

    render() {
        return(
            <form>
                <FormGroup
                            helperText="Helper text with details..."
                            label="Task Name"
                            labelFor="text-name"
                            labelInfo="(required)"
                        >
                            <InputGroup 
                                id="taskName"
                                name="taskName"
                                placeholder="Task Name"
                                value={this.state.taskName}
                                // onChange={this.handleChange}
                                onChange={this.handleChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup
                            helperText="Helper text with details..."
                            label="Time"
                            labelFor="text-time"
                            labelInfo="(required)"
                        >
                            <TimePicker 
                                id="taskTime"
                                name="taskTime"
                                className={Classes.LABEL}
                                defaultValue={new Date(this.state.taskTime)}
                                useAmPm={true}
                                onChange={(time) => this.setState({taskTime : time.toTimeString().split(':')[0] + ":" + time.toTimeString().split(':')[1]})}
                                required
                            />
                        </FormGroup>
                        <DateInput 
                            {...jsDateFormatter}
                            defaultValue={new Date()} 
                            onChange={(selectedDate,isUserChange) => this.setState({ taskDate : selectedDate.toLocaleDateString()})}
                            required
                        />
                        <FormGroup
                            helperText="Brief description of task"
                            label="Description"
                            labelFor="text-description"
                        >
                            <InputGroup 
                                id="taskDescription"
                                name="taskDescription"
                                placeholder="Description"
                                value={this.state.taskDescription}
                                onChange={this.handleChange}
                                required
                            />

                        </FormGroup>
                        <br />
                        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                            <Button intent={Intent.DANGER} onClick={this.toggleChildOverlay} style={{ margin: "" }}>
                                Close
                            </Button>
                            <Button onClick={this.handleSubmit} style={{ margin: "" }}>
                                Add
                            </Button>
                        </div>
            </form>
        );
    }
}


// Overlay for adding task
export default class AddTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            autoFocus: true,
            canEscapeKeyClose: true,
            canOutsideClickClose: true,
            enforceFocus: true,
            hasBackdrop: true,
            isOpen: false,
            usePortal: true,
            useTallContent: false,
        };
        this.refHandlers = {
            button: (ref) => (this.button = ref),
        };
        this.handleAutoFocusChange = handleBooleanChange(autoFocus => this.setState({ autoFocus }));
        this.handleBackdropChange = handleBooleanChange(hasBackdrop => this.setState({ hasBackdrop }));
        this.handleEnforceFocusChange = handleBooleanChange(enforceFocus => this.setState({ enforceFocus }));
        this.handleEscapeKeyChange = handleBooleanChange(canEscapeKeyClose => this.setState({ canEscapeKeyClose }));
        this.handleUsePortalChange = handleBooleanChange(usePortal => this.setState({ usePortal }));
        this.handleOutsideClickChange = handleBooleanChange(val => this.setState({ canOutsideClickClose: val }));
        this.handleOpen = () => this.setState({ isOpen: true });
        this.handleClose = () => this.setState({ isOpen: false, useTallContent: false });
        this.focusButton = () => this.button.focus();
        this.toggleScrollButton = () => this.setState({ useTallContent: !this.state.useTallContent });
        this.isOpenCallback = (childisOpen) => this.setState({isOpen: childisOpen});
        // form fields
        // this.handleNameChange = this.handleNameChange.bind(this);



    }
    render() {
        const overlayStyle = {
                width: "500px",
                left: "30%",
                top:"40%",
                position:"absolute"
            }
        const classes = classNames(Classes.CARD, Classes.ELEVATION_4, OVERLAY_EXAMPLE_CLASS);
        // console.log("classes: " + classes);
        return (
            <div>
                <Button elementRef={this.refHandlers.button} onClick={this.handleOpen} intent="success">
                    <Icon icon="document" />  &nbsp;&nbsp; Add Task</Button>
                <Overlay onClose={this.handleClose} className={Classes.OVERLAY_SCROLL_CONTAINER} {...this.state}>
                    <div className={classes} style={{width: "500px", left: "30%", position:"absolute"}}>
                        <H3>Add Task</H3>


                        <Form isOpen={this.state.isOpen} parentCallback = {this.isOpenCallback}/>


                        <br />

                    </div>
                </Overlay>
            </div>
        );
    }
}


                        // <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        //     <Button intent={Intent.DANGER} onClick={this.handleClose} style={{ margin: "" }}>
                        //         Close
                        //     </Button>
                        //     <Button onClick={this.focusButton} style={{ margin: "" }}>
                        //         Focus button
                        //     </Button>
                        // </div>
