import React from 'react';
import { Button, Card, Elevation, Icon, Intent, ITreeNode, Position, Tooltip, Tree } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import DayTree from './DayTree'
import AddTask from './AddTask'

var getWeekday = (date) => {
	var d = new Date(date);
	var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	return weekday[d.getDay()] + ", " + date;
};

var formatTime = (time) => {
	var timeFormated = time.split(':')
	if (timeFormated[0] > "12") {
		time = (timeFormated[0] - 12) + ":" + timeFormated[1] + " PM"
	}
	else {
		time = time + " AM"
	}
	return time
} 

var groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};


const CardStyle = {
	width: "40em",
	margin: "1em",
	padding: "2em",
	marginLeft: "4em"
}

function Item(props) {
	return(
		<Card interactive={true} elevation={Elevation.TWO} style={CardStyle}>
			<h4>{props.name}</h4>
			<p>{props.time} : {props.description}</p>
			<h5><a href="#">Edit</a> | <a href="#" id={props.id} onClick={props.deleteTask} >Delete</a></h5>
		</Card>
	);
}

function Day(props) {
	var tasksList = props.description.sort((a,b) => new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time)).map((task, index) => {
 				return(<Item id={task.id} name={task.name} time={formatTime(task.time)} description={task.description} deleteTask={props.deleteTask(task.id)}/>);
 			});
	return(
		<div>
			<p>{getWeekday(props.date)}</p>
			{tasksList}
		</div>
	);
}

class List extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			tasks: [
				{
					id: "1",
					name: "Read",
					description: "Read Thinking with Strangers",
					time: "14:30",
					date: "4/21/2020",
					done: false
				},
				{
					id: "2",
					name: "Cook",
					description: "Make Stir Fry",
					time: "16:20",
					date: "4/20/2020",
					done: false
				},
				{
					id: "3",
					name: "Clean",
					description: "Clean bathroom and kitchen",
					time: "18:00",
					date: "4/20/2020",
					done: false
				},
				{
					id: "4",
					name: "Code",
					description: "Code some React and Leetcode",
					time: "13:30",
					date: "4/23/2020",
					done: false
				}
			]
		}

		this.formCallback = this.formCallback.bind(this);
		this.deleteTask = this.deleteTask.bind(this);


	}

	formCallback = (formData) => {
   
            formData["id"] = parseInt(Math.random()*100).toString();
            formData["done"] = false;
            this.state.tasks.push(formData);
            this.forceUpdate(); 
            // this.setState({tasks: tasksUpdated});
            console.log(this.state.tasks);
        };

    deleteTask = (event) => {
    	var id = event.target.id
    	// console.log(event.target.id)
        	this.state.tasks = this.state.tasks.filter((task) => {
        		return task.id !== id;
        	});
        	this.forceUpdate();
        }
	
	render() {

		var tasksList = this.state.tasks.sort((a,b) => new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time)).map((task, index) => {
				return(<Item name={task.name} time={task.time}/>);
			});

		var taskDaysGrouped = groupBy(this.state.tasks, 'date');
		var taskDayKeys = Object.keys(taskDaysGrouped)
		var taskDaysList = taskDayKeys.map((date, index) => {
			return(<Day date={date} description={taskDaysGrouped[date]} deleteTask={(id) => this.deleteTask} />);
		});

		return(
				<div>
					<AddTask formCallback={this.formCallback} />
					{taskDaysList}
				</div>
				);
	}
}


export default List;