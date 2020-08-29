import React from "react";
import Chart from "react-apexcharts";
import { useState } from 'react';
import PieChart from '../PieChart/PieChart'

function ApexChart(props) {
	/*const { UiObjs } = props;
	const [series, setSeries] = useState([]);
	let series = []
	let categories = []

	{
		UiObjs &&
		UiObjs.map((column, index) => {
			column.tasks.map((task) => {
				series.push({
					name: task.diffItem.updatedFields[0].fieldName,
					data: 
				});
				categories.concat(task.diffItem.updateTime);
			})
		})
	}
	const Data = {
		series: series,
		options: {
			chart: {
				type: "bar",
				height: 350,
			},
			plotOptions: {
				bar: {
					horizontal: false,
					columnWidth: "55%",
					endingShape: "rounded"
				}
			},

			responsive: [
				{
					breakpoint: 480,
					options: {
						legend: {
							position: "bottom",
							offsetX: -10,
							offsetY: 0,
						},
					},
				},
			],
			plotOptions: {
				bar: {
					horizontal: false,
				},
			},
			xaxis: {
				type: "datetime",
				categories: categories,
			},
			legend: {
				position: "bottom",
				offsetY: 40,
			},
			fill: {
				opacity: 1,
			},
		},
	};

	return (
		<div className="wrapper">
			<div className="chart__Wrapper">
				<div className="chart">

					<Chart
						options={Data.options}
						height="450"
						series={Data.series}
						type="bar"
					/>


				</div>
			</div>
		</div>

	)
}*/



 	/* const handleClick = (e) => {
		console.log(e.target)
	/*	console.log(dummyData.series[0].data)

  }
  
	const dummyData = {
		series: [
			{
				name: "Backlog",
				data: [44, 55, 41, 67, 22, 43],
				
			},
			{
				name: "Done",
				data: [20, 5, 12, 65, 25, 43],
				
			},
			{
				name: "Backlog",
				data: [80, 58,50, 70, 82, 46],
				
			},

			
			
		],
		options: {
			chart: {
				type: "bar",
				height: 350,
				events: {
					click: handleClick 
					}
				},
			},
		
			plotOptions: {
				bar: {
					horizontal: false,
					columnWidth: "55%",
					endingShape: "rounded"
				}
			},

			responsive: [
				{
					breakpoint: 480,
					options: {
						legend: {
							position: "bottom",
							offsetX: -10,
							offsetY: 0,
						},
					},
				},
			],
			plotOptions: {
				bar: {
					horizontal: false,
				},
			},
			xaxis: {
				type: "datetime",
				categories: [
					"01/01/2011 GMT",
					"01/02/2012 GMT",
					"01/03/2013 GMT",
					"01/04/2014 GMT",
					"01/05/2015 GMT",
					"01/06/2016 GMT",
				],
			},
			tooltip: {
				intersect: true,
				shared: false
			},
			legend: {
				position: "bottom",
				offsetY: 40,
			},
			fill: {
				opacity: 1,
			},
		
	}

return (
<div id="daily_chart" style={{ width: "100%" }}>
  <Chart
	options={dummyData.options}
	height="450"
	series={dummyData.series}
	type="bar"
	
  />


</div>
);
}
*/
}
export default ApexChart;


