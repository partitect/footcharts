"use strict";
var myChart = echarts.init(document.getElementById("p_passes"));

myChart.showLoading();
if (localStorage.getItem("passesPlayer") === null) {
	localStorage.setItem("passesPlayer", "kane");
}

if (localStorage.getItem("passesColor") === null) {
	localStorage.setItem("passesColor", "#007236");
}
var SaveIcon = "./assets/img/template-images/screenshot.svg";

$(".pl1")
	.dropdown({
		onChange: function(value) {
			localStorage.setItem("passesPlayer", value);
			GetPasses(value, localStorage.getItem("passesColor"));
		}
	})
	.dropdown("set selected", localStorage.getItem("passesPlayer"));

$(".ui.dropdown.color")
	.dropdown({
		onChange: function(value) {
			localStorage.setItem("passesColor", value);
			GetPasses(localStorage.getItem("passesPlayer"), value);
		}
	})
	.dropdown("set selected", localStorage.getItem("passesColor"));

GetPasses(
	localStorage.getItem("passesPlayer"),
	localStorage.getItem("passesColor")
);

function GetPasses(pl1, clr) {
	$.get("./assets/data/player-passes.json", function(data) {
		var forward_triangle = "./assets/img/template-images/forward-triangle.png";
		var right_triangle = "./assets/img/template-images/right-triangle.png";
		var back_triangle = "./assets/img/template-images/back-triangle.png";
		var left_triangle = "./assets/img/template-images/left-triangle.png";

		var p1Data = [];
		var direction = ["RIGHT", "BACK", "LEFT", "FORWARD"];
		//console.log(dataNames)
		$.each(data.players, function(i, v) {
			if (v.identy == pl1) {
				p1Data.push(v);
			}
		});
		var player1Names = "";
		var colorItems = "";
		for (var i = 0; i < data.players.length; i++) {
			player1Names +=
				'<div class="item" data-value="' +
				data.players[i].identy +
				'"><i class="icon circle" style="color:#2B81EE"></i>' +
				data.players[i].name +
				"</div>";
		}
		$(".pl1 .menu").html(player1Names);

		for (var i = 0; i < data.colors.length; i++) {
			colorItems +=
				'<div class="item" data-value="' +
				data.colors[i].value +
				'"><i class="icon circle" style="color:' +
				data.colors[i].value +
				'"></i>' +
				data.colors[i].name +
				"</div>";
		}

		$(".color .menu").html(colorItems);

		var player_image =
			"./assets/img/footballers/" + p1Data[0].identy + ".png";
		var option = {
			baseOption: {
				textStyle: {
					fontFamily: "Exo_2, sans-serif"
				},
				title: [
					{
						text: p1Data[0].name,
						left: "2%",
						top: "2%",
						subtext: p1Data[0].team,
						textStyle: {
							fontSize: 40,
							color: clr
						},
						subtextStyle: {
							fontSize: 20,
							color: "#fff"
						}
					},

					{
						text: "Passes Maps",
						right: "2%",
						bottom: "2%",
						textStyle: {
							fontSize: 30,
							color: clr
						}
					}
				],
				toolbox: {
					itemSize: 40,
					tooltip: {
						show: true,
						backgroundColor: "#fff",
						textStyle: {
							fontSize: 12,
							color: "#000"
						},
						extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);" // user-defined CSS styles
					},
					feature: {
						saveAsImage: {
							name: p1Data[0].name + "-passes-" + p1Data[0].team,
							show: true,
							pixelRatio: 2,
							backgroundColor: "171B22",
							title: "Save As Image",
							icon: "image://" + SaveIcon + ""
						}
					},
					top: 0,
					right: 20,
					zlevel: 9
				},
				backgroundColor: "#242424",
				angleAxis: {
					type: "category",
					startAngle: 45,
					z: 10,
					axisTick: {
						show: false
					},

					axisLine: {
						show: false
					}
				},
				radiusAxis: {
					min: 0,
					max: 100,
					show: true,
					axisLine: {
						show: false
					},
					axisLabel: {
						show: false
					},
					axisTick: {
						show: false
					}
				},
				polar: {},
				graphic: {
					elements: [
						{
							type: "image",
							style: {
								image: player_image,
								width: 100,
								height: 100
							},
							left: "center",
							top: "center"
						}
					]
				},
				radar: [
					{
						axisLine: {
							show: false
						},
						axisLabel: {
							show: false
						},
						splitLine: {
							show: false
						},
						splitArea: {
							show: false
						},
						name: {
							rich: {
								forward: {
									backgroundColor: {
										image: forward_triangle
									},
									width: 30,
									height: 30,
									align: "center"
								},
								right: {
									backgroundColor: {
										image: right_triangle
									},
									width: 30,
									height: 30,
									align: "center"
								},
								left: {
									backgroundColor: {
										image: left_triangle
									},
									width: 30,
									height: 30,
									align: "center"
								},
								back: {
									backgroundColor: {
										image: back_triangle
									},
									width: 30,
									height: 30,
									align: "center"
								},
								lblstyle: {
									color: "#FFF",
									borderWidth: 1,
									borderColor: "#fff",
									padding: [12, 8],
									borderRadius: 5,
									backgroundColor: "#242424",
									fontWeight: "bold"
								}
							},
							formatter: function(text, index) {
								if (text === "RIGHT") {
									return (
										"{lblstyle|" +
										direction[0] +
										"}   {right|}"
									);
								} else if (text === "BACK") {
									return (
										"{lblstyle|" +
										direction[1] +
										"}\n\n{back|}"
									);
								} else if (text === "LEFT") {
									return (
										"{left|}   {lblstyle|" +
										direction[2] +
										"}"
									);
								} else if (text === "FORWARD") {
									return (
										"{forward|}\n\n{lblstyle|" +
										direction[3] +
										"}"
									);
								}
							}
						},
						indicator: [
							{
								text: "FORWARD",
								max: 100
							},
							{
								text: "LEFT",
								max: 100
							},
							{
								text: "BACK",
								max: 100
							},
							{
								text: "RIGHT",
								max: 100
							}
						],
						center: ["50%", "50%"],
						radius: "70%"
					}
				],
				series: [
					{
						name: "Harry Kane",
						type: "pie",
						radius: ["16%", "75%"],
						center: ["50%", "50%"],
						roseType: "area",
						color: ["#3fa7dc"],
						coordinateSystem: "polar",
						hoverOffset: 0,
						labelLine: {
							show: false,
							length: 0,
							length2: 0
						},
						itemStyle: {
							color: clr,
							shadowBlur: 10,
							shadowOffsetX: 0,
							borderWidth: 1,
							borderColor: "rgba(0,0,0,.2)",
							emphasis: {
								color: "#fdc203"
							}
						},
						data: p1Data[0].data
					},
					{
						type: "radar",
						itemStyle: {
							normal: {
								areaStyle: {
									type: "default"
								}
							}
						},
						data: [
							{
								value: [],
								name: ""
							}
						]
					}
				]
			},
			media: [
				{
					query: {
						maxWidth: 680 // when container width is smaller than 500
					},
					option: {
						graphic: {
							elements: [
								{
									type: "image",
									style: {
										image: player_image,
										width: 50,
										height: 50
									},
									left: "center",
									top: "center"
								}
							]
						},
						radar: {
							radius: "30%"
						}
					}
				},
				{
					query: {
						minWidth: 681 // when container width is smaller than 500
					},
					option: {
						graphic: {
							elements: [
								{
									type: "image",
									style: {
										image: player_image,
										width: 100,
										height: 100
									},
									left: "center",
									top: "center"
								}
							]
						},
						radar: {
							radius: "70%"
						}
					}
				}
			]
		};
		myChart.setOption(option);
	});
	myChart.hideLoading();
}
