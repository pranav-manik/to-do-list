import React from 'react';
import { Button, Card, Elevation, Icon, Intent, ITreeNode, Position, Tooltip, Tree } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import DayTree from './DayTree'
import AddTask from './AddTask'

var getWeekday = (day) => {
	var d = new Date(day);
	var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	var _day = day.split('/');
	var dateObj = {month: _day[1], day: _day[2], year: _day[0]};

	return weekday[d.getDay()] + ", " + dateObj.month + '/' + dateObj.day + '/' + dateObj.year;;
}; 

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
			<h5><a href="#">Edit</a> | <a href="#">Delete</a></h5>
		</Card>
	);
}

function Day(props) {
	var tasksList = props.description.sort((a,b) => new Date(a.day + ' ' + a.time) - new Date(b.day + ' ' + b.time)).map((task, index) => {
 				return(<Item id={task.id} name={task.name} time={task.time} description={task.description} />);
 			});
	return(
		<div>
			<p>{getWeekday(props.date)}</p>
			{tasksList}
		</div>
	);
}

class List extends React.Component {
	
	render() {
		// var tasks = ["Read", "Cook", "Clean", "Code"];
		var tasks = [
			{
				id: "1",
				name: "Read",
				description: "Read Thinking with Strangers",
				time: "2:30 PM",
				day: "2020/04/21",
				done: false
			},
			{
				id: "2",
				name: "Cook",
				description: "Make Stir Fry",
				time: "4:20 PM",
				day: "2020/04/20",
				done: false
			},
			{
				id: "3",
				name: "Clean",
				description: "Clean bathroom and kitchen",
				time: "6:00 PM",
				day: "2020/04/20",
				done: false
			},
			{
				id: "4",
				name: "Code",
				description: "Code some React and Leetcode",
				time: "1:30 PM",
				day: "2020/04/20",
				done: false
			}
		];
		// tasks.sort((a,b) => a.time > b.time);
		var tasksList = tasks.sort((a,b) => new Date(a.day + ' ' + a.time) - new Date(b.day + ' ' + b.time)).map((task, index) => {
				return(<Item name={task.name} time={task.time}/>);
			});

		var taskDaysGrouped = groupBy(tasks, 'day');
		// console.log(taskDaysGrouped);
		var taskDayKeys = Object.keys(taskDaysGrouped)

		var taskDaysList = taskDayKeys.map((day, index) => {
			// console.log(day);
			// console.log(JSON.stringify(taskDaysGrouped[day]));
			return(<Day date={day} description={taskDaysGrouped[day]}/>);
		});
		// taskDaysGrouped.((a,b) => new Date(a.day) - new Date(b.day)).map((day, index) => {
		// 	return(<p>{day}</p>);
		// });
		return(
				<div>
					<AddTask />
					{taskDaysList}
				</div>
				);
	}
}


// class AddTaskButton extends React.Component {

// 	constructor()

// }

// class Day extends React.Component {
// 	constructor(props) {
// 		super(props);

// 		this.state = {
// 			date: "",
// 			tasks: []
// 		}
// 	}

// 	setTasks = (date, tasks) => {
// 		this.setState({
// 			date: date,
// 			tasks: tasks
// 		});
// 	}

// 	render() {
// 		var tasksList = this.state.tasks.sort((a,b) => new Date(a.day + ' ' + a.time) - new Date(b.day + ' ' + b.time)).map((task, index) => {
// 				return(<Item name={task.name} time={task.time} description={task.description} />);
// 			});
// 		return(
// 			<div>
// 				<p>{this.state.date}</p>
// 				{tasksList}
// 			</div>);
// 	}
// }

export default List;