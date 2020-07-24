"use strict";
var fixtureChart = echarts.init(document.getElementById("fixture"));

if (localStorage.getItem("fixtureLeague") === null) {
	localStorage.setItem("fixtureLeague", "premier-league");
}
if (localStorage.getItem("fixtureWeek") === null) {
	localStorage.setItem("fixtureWeek", "1");
}
if (localStorage.getItem("LeagueName") === null) {
	localStorage.setItem("LeagueName", "Premier League");
}
var SaveIcon = "./assets/img/template-images/screenshot.svg";

const curveness = 0.2;

GetFixtures(
	localStorage.getItem("fixtureWeek"),
	localStorage.getItem("fixtureLeague"),
	localStorage.getItem("LeagueName")
);

$.get("./assets/data/leagues.json", function(data) {
	var datas = data.RECORDS;
	var html = "";
	var weekhtml = "";
	for (var i = 0; i < datas.length; i++) {
		html +=
			'<div class="item" data-value="' +
			datas[i].logo +
			'">' +
			datas[i].league +
			"</div>";
	}
	$(".league-dd .menu").html(html);
	$(".league-dd").dropdown({
		onChange: function(value, $text) {
			localStorage.setItem("fixtureLeague", value);
			localStorage.setItem("LeagueName", $text);
			$.get("./assets/data/" + value + "/weeks.json", function(weekdata) {
				for (var i = 0; i < weekdata.RECORDS.length; i++) {
					weekhtml +=
						'<div class="item" data-value="' +
						weekdata.RECORDS[i].week +
						'">Week ' +
						weekdata.RECORDS[i].week +
						"</div>";
				}
				$(".week-dd .menu").html(weekhtml);
				$(".week-dd").dropdown({
					onChange: function(value1) {
						localStorage.setItem("fixtureWeek", value1);
						GetFixtures(
							value1,
							localStorage.getItem("fixtureLeague"),
							localStorage.getItem("LeagueName")
						);
					}
				});
			});
			GetFixtures(
				localStorage.getItem("fixtureWeek"),
				value,
				localStorage.getItem("LeagueName")
			);
		}
	});
});

function GetFixtures(weeko, leaguePath, leagueName) {
	$.get("./assets/data/" + leaguePath + "/fixture.json", function(data) {
		var option = "";
		var fixtureData = [];
		var weeksData = [];
		var SeriesData = [];
		var barData1 = [];
		var barData1Responsive = [];

		var barData2 = [];
		var barData3 = [];
		var timelineData = [];

		fixtureData.push(data.RECORDS);

		let group = fixtureData[0]
			.map(item => item.week_id)
			.filter((item, i, ar) => ar.indexOf(item) === i)
			.sort((a, b) => a - b)
			.map(item => {
				let new_list = fixtureData[0]
					.filter(itm => itm.week_id == item)
					.map(itm => itm);
				return {
					week: item,
					datas: new_list
				};
			});

		$.each(group, function(index, value) {
			if (value["week"] == weeko) weeksData.push(value);
		});
		console.log(weeksData);
		var winColors = "";
		var winColors1 = "";

		var loseColors = "";
		var loseColors1 = "";

		for (var i = 0; i < weeksData[0].datas.length; i++) {
			var weekInfo = "";
			timelineData.push(i + 1);
			weekInfo = weeksData[0].datas[i];
			if (weekInfo.hscore > weekInfo.ascore) {
				winColors = "rgb(59,178,115)";
				winColors1 = "rgb(69,188,125)";
			} else if (weekInfo.hscore < weekInfo.ascore) {
				winColors = "rgb(225,85,84)";
				winColors1 = "rgb(235,95,94)";
			} else if ((weekInfo.hscore = weekInfo.ascore)) {
				winColors = "rgb(64,63,76)";
				winColors1 = "rgb(74,73,86)";
			} else {
				winColors = "rgb(95,92,124)";
				winColors1 = "rgb(105,102,134)";
			}
			if (weekInfo.hscore < weekInfo.ascore) {
				loseColors = "rgb(59,178,115)";
				loseColors1 = "rgb(69,188,125)";
			} else if (weekInfo.hscore > weekInfo.ascore) {
				loseColors = "rgb(225,85,84)";
				loseColors1 = "rgb(235,95,94)";
			} else if ((weekInfo.hscore = weekInfo.ascore)) {
				loseColors = "rgb(64,63,76)";
				loseColors1 = "rgb(74,73,86)";
			} else {
				loseColors = "rgb(95,92,124)";
				loseColors1 = "rgb(105,102,134)";
			}
			barData1Responsive.push({
				label: {
					position: "insideLeft",
					offset: [-20, 0],
					rich: {
						logo: {
							backgroundColor: {
								image:
									"./assets/img/leagues/" +
									leaguePath +
									"/team-logo/" +
									weekInfo.t1logo +
									".png"
							},
							width: 50,
							height: 50
						},
						name: {
							fontFamily: "Quantico, sans-serif",
							fontSize: 10,
							color: "#fff",
							textBorderColor: "transparent",
							padding: [0, 0, 0, 20]
						}
					},
					formatter: function(value) {
						return "{logo|}{name|" + value.name + "}";
					}
				}
			});
			barData1.push({
				value: 45,
				name: weekInfo.HOMETEAM,
				itemStyle: {
					barBorderRadius: [25, 0, 0, 25],
					// x: 0, x2: 1, y: 0, y2: 0,
					color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
						{
							offset: 0,
							color: winColors
						},
						{
							offset: 0.5,
							color: winColors
						},
						{
							offset: 0.5,
							color: winColors1
						},
						{
							offset: 1,
							color: winColors1
						}
					])
				},
				label: {
					position: "insideLeft",
					offset: [-20, 0],
					rich: {
						logo: {
							backgroundColor: {
								image:
									"./assets/img/leagues/" +
									leaguePath +
									"/team-logo/" +
									weekInfo.t1logo +
									".png"
							},
							width: 50,
							height: 50
						},
						name: {
							fontFamily: "Quantico, sans-serif",
							fontSize: 20,
							color: "#fff",
							textBorderColor: "transparent",
							padding: [0, 0, 0, 20]
						}
					},
					formatter: function(value) {
						return "{logo|}{name|" + value.name + "}";
					}
				}
			});
			barData2.push({
				value: 45,
				name: weekInfo.AWAYTEAM,
				itemStyle: {
					barBorderRadius: [0, 25, 25, 0],
					// x: 0, x2: 1, y: 0, y2: 0,
					color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
						{
							offset: 0,
							color: loseColors
						},
						{
							offset: 0.5,
							color: loseColors
						},
						{
							offset: 0.5,
							color: loseColors1
						},
						{
							offset: 1,
							color: loseColors1
						}
					])
				},
				label: {
					position: "insideRight",
					offset: [20, 0],
					rich: {
						logo: {
							backgroundColor: {
								image:
									"./assets/img/leagues/" +
									leaguePath +
									"/team-logo/" +
									weekInfo.t2logo +
									".png"
							},
							width: 50,
							height: 50
						},
						name: {
							fontFamily: "Quantico, sans-serif",
							fontSize: 20,
							color: "#fff",
							textBorderColor: "transparent",
							padding: [0, 30, 0, 0]
						}
					},
					formatter: function(value) {
						return "{name|" + value.name + "}{logo|}";
					}
				}
			});

			barData3.push({
				value: 10,
				name: weekInfo.id,
				itemStyle: {
					color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [
						{
							offset: 0,
							color: "rgb(0,0,0)"
						},
						{
							offset: 0.5,
							color: "rgb(0,0,0)"
						},
						{
							offset: 0.5,
							color: "rgb(30,30,30)"
						},
						{
							offset: 1,
							color: "rgb(30,30,30)"
						}
					])
				},
				label: {
					show: true,
					position: "inside",
					fontFamily: "Quantico, sans-serif",

					fontSize: 14,
					color: "#fdc203",
					formatter:
						weekInfo.hscore +
						"-" +
						weekInfo.ascore +
						"\n" +
						moment(weekInfo.date, "DD/MM/YYYY HH:mm").format(
							"DD.MM.YYYY"
						) +
						"\n" +
						moment(weekInfo.date, "DD/MM/YYYY HH:mm").format(
							"HH:mm"
						)
				}
			});
		}
		SeriesData.push(
			{
				data: barData1,
				type: "bar",
				stack: weekInfo.id,
				label: {
					show: true
				},
				animationDuration: function(idx) {
					// delay for later data is larger
					return idx * 90;
				},
				animationEasing: "backOut"
			},
			{
				name: weekInfo.id,
				data: barData3,
				type: "bar",
				stack: weekInfo.id,
				label: {
					show: true
				}
			},
			{
				data: barData2,
				type: "bar",
				stack: weekInfo.id,
				label: {
					show: true
				},
				animationDuration: function(idx) {
					// delay for later data is larger
					return idx * 110;
				},
				animationEasing: "backOut"
			}
		);
		option = {
			baseOption: {
				title: {
					text: leagueName,
					subtext: "Week " + weeko + "",
					x: "center",
					textStyle: {
						fontFamily: "Quantico, sans-serif",
						fontWeight: 700,
						fontSize: 25,
						color: "#000"
					},
					subtextStyle: {
						fontFamily: "Quantico, sans-serif",
						fontWeight: 700,
						fontSize: 20,
						color: "#000"
					}
				},
				grid: {
					left: 20,
					right: 20,
					top: 60,
					bottom: 10,
					containLabel: true
				},
				yAxis: {
					type: "category",
					show: false,
					inverse: true
				},
				xAxis: [
					{
						type: "value",
						show: false,
						max: 100
					}
				],

				toolbox: {
					itemSize: 40,
					tooltip: {
						show: true,
						backgroundColor: "transparent",
						textStyle: {
							fontSize: 12,
							color: "#000"
						},
						extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);" // user-defined CSS styles
					},
					feature: {
						saveAsImage: {
							name: "Fixture",
							show: true,
							pixelRatio: 2,
							backgroundColor: "transparent",
							title: "Save As Image",
							icon: "image://" + SaveIcon + ""
						}
					},
					top: 0,
					right: 20,
					zlevel: 9
				},
				series: SeriesData
			},
			media: [
				{
					query: {
						maxWidth: 1100 // when container width is smaller than 500
					},
					option: {}
				}
			]
		};
		fixtureChart.setOption(option);
	});
	fixtureChart.on("click", "series.bar", function(params) {
		if (params.componentType === "series") {
			if (params.seriesType === "bar") {
				window.location =
					"/single-game.html?gameId=" +
					encodeURIComponent(params.seriesName) +
					"";
			}
		}
	});
}
