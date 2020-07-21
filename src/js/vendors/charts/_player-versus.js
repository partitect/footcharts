"use strict";
var myChart = echarts.init(document.getElementById("versus"));
var height = document.getElementById("versus").offsetHeight;
var width = document.getElementById("versus").offsetWidth;

var radiusMax = width >= height ? height : width;

if (localStorage.getItem("player1") === null) {
	localStorage.setItem("player1", "sane");
}
if (localStorage.getItem("player2") === null) {
	localStorage.setItem("player2", "kane");
}
if (localStorage.getItem("pvColor") === null) {
	localStorage.setItem("pvColor", "#3BB273");
}

var SaveIcon = "./assets/img/prod/saveas.svg";
GetVersus(
	localStorage.getItem("player1"),
	localStorage.getItem("player2"),
	localStorage.getItem("pvColor")
);
myChart.showLoading();
function GetVersus(pl1, pl2, clr) {
	$.get("./assets/data/player-versus.json", function(data) {
		var p1Data = [];
		var p2Data = [];
		var dataNames = [];
		dataNames.push(data.dataNames);
		//console.log(dataNames)
		$.each(data.players, function(i, v) {
			if (v.identy == pl1) {
				p1Data.push(v);
			}
		});
		$.each(data.players, function(i, v) {
			if (v.identy == pl2) {
				p2Data.push(v);
			}
		});

		var player1Names = "";
		var player2Names = "";
		var colorItems = "";
		for (var i = 0; i < data.players.length; i++) {
			if (data.players[i].identy != pl2) {
				player1Names +=
					'<div class="item" data-value="' +
					data.players[i].identy +
					'"><i class="icon circle" style="color:#2B81EE"></i>' +
					data.players[i].name +
					"</div>";
			}
		}
		$(".pl1 .menu").html(player1Names);

		for (var i = 0; i < data.players.length; i++) {
			if (data.players[i].identy != pl1) {
				player2Names +=
					'<div class="item" data-value="' +
					data.players[i].identy +
					'"><i class="icon circle" style="color:#69C8A1"></i>' +
					data.players[i].name +
					"</div>";
			}
		}
		$(".pl2 .menu").html(player2Names);

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
		var option = {
			baseOption: {
				backgroundColor: "#171B22",
				textStyle: {
					fontFamily: "Exo_2, sans-serif"
				},
				color: ["#2B81EE", "#69C8A1"],
				title: [
					{
						text: p1Data[0].name,
						textStyle: {
							fontSize: 100,
							color: clr,
							fontWeight: "bold"
						},
						left: "2%",
						top: "20"
					},
					{
						text: p2Data[0].name,
						textStyle: {
							fontSize: 100,
							color: clr,
							fontWeight: "bold"
						},
						right: "2%",
						top: "20"
					}
				],
				tooltip: {
					show: false
				},
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
							name: p1Data[0].name + "-vs-" + p2Data[0].name,
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
				graphic: {
					elements: [
						{
							type: "image",
							style: {
								image: p1Data[0].image,
								width: 400,
								height: 550
							},
							left: "0",
							bottom: "-5",
							zlevel: 1
						},
						{
							type: "image",
							style: {
								image: p2Data[0].image,
								width: 400,
								height: 550
							},
							right: "0",
							bottom: "-5",
							zlevel: 1
						}
					]
				},
				radar: {
					radius: "75%",
					splitNumber: 10,
					shape: "circle",
					axisLine: {
						show: false,
						lineStyle: {
							color: "#fff",
							type: "dashed"
						}
					},
					splitArea: {
						areaStyle: {
							color: "rgba(0,0,0,0)",
							opacity: 1,
							shadowBlur: 45,
							shadowColor: "rgba(0,0,0,.5)",
							shadowOffsetX: 0,
							shadowOffsetY: 15
						}
					},
					name: {
						show: true,
						formatter: function(indicator, value) {
							if (value.text == "Overall") {
								return (
									"{a|" +
									p1Data[0].data[0] +
									"}{c|/}{b|" +
									p2Data[0].data[0] +
									"\n}{x|Overall}"
								);
							} else if (value.text == "Dribbling") {
								return (
									"{a|" +
									p1Data[0].data[1] +
									"}{c|/}{b|" +
									p2Data[0].data[1] +
									"\n}{x|Dribbling}"
								);
							} else if (value.text == "Finishing") {
								return (
									"{a|" +
									p1Data[0].data[2] +
									"}{c|/}{b|" +
									p2Data[0].data[3] +
									"\n}{x|Finishing}"
								);
							} else if (value.text == "Shot Power") {
								return (
									"{a|" +
									p1Data[0].data[3] +
									"}{c|/}{b|" +
									p2Data[0].data[3] +
									"\n}{x|Shot Power}"
								);
							} else if (value.text == "Stamina") {
								return (
									"{a|" +
									p1Data[0].data[4] +
									"}{c|/}{b|" +
									p2Data[0].data[4] +
									"\n}{x|Stamina}"
								);
							} else if (value.text == "Positioning") {
								return (
									"{a|" +
									p1Data[0].data[5] +
									"}{c|/}{b|" +
									p2Data[0].data[5] +
									"\n}{x|Positioning}"
								);
							}
						},
						rich: {
							x: {
								fontSize: 20,

								color: "#888A8D"
							},
							a: {
								fontSize: 20,

								color: "#2B81EE"
							},
							b: {
								fontSize: 20,

								color: "#6FD098"
							},
							c: {
								fontSize: 15,
								padding: 10,
								color: "#888A8D"
							}
						}
					},
					splitLine: {
						lineStyle: {
							width: 2,
							color: [
								"rgba(224,134,82, 0.1)",
								"rgba(224,134,82, 0.2)",
								"rgba(224,134,82, 0.4)",
								"rgba(224,134,82, 0.6)",
								"rgba(224,134,82, 0.8)",
								"rgba(224,134,82, 1)"
							].reverse()
						}
					},
					indicator: dataNames[0]
				},
				series: [
					{
						type: "radar",
						symbolSize: 0,
						areaStyle: {
							normal: {
								shadowBlur: 13,
								shadowColor: "rgba(255,255,255,.2)",
								shadowOffsetX: 5,
								shadowOffsetY: 10,
								opacity: 0.4
							}
						},
						lineStyle: {
							width: 5
						},
						data: [
							{
								value: p1Data[0].data,
								name: p1Data[0].name
							},
							{
								value: p2Data[0].data,
								name: p2Data[0].name
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
						title: [
							{
								text: p1Data[0].name,
								textStyle: {
									fontSize: 40,
									color: clr,
									fontWeight: "bold"
								},
								left: "2%",
								top: "100"
							},
							{
								text: p2Data[0].name,
								textStyle: {
									fontSize: 40,
									color: clr,
									fontWeight: "bold"
								},
								right: "2%",
								top: "100"
							}
						],
						graphic: {
							elements: [
								{
									type: "image",
									style: {
										image: p1Data[0].image,
										width: 200,
										height: 350
									},
									left: "-40",
									bottom: "-5",
									zlevel: 1
								},
								{
									type: "image",
									style: {
										image: p2Data[0].image,
										width: 200,
										height: 350
									},
									right: "-40",
									bottom: "-5",
									zlevel: 1
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
						title: [
							{
								text: p1Data[0].name,
								textStyle: {
									fontSize: 100,
									color: clr,
									fontWeight: "bold"
								},
								left: "2%",
								top: "20"
							},
							{
								text: p2Data[0].name,
								textStyle: {
									fontSize: 100,
									color: clr,
									fontWeight: "bold"
								},
								right: "2%",
								top: "20"
							}
						],
						radar: {
							radius: "50%"
						},
						graphic: {
							elements: [
								{
									type: "image",
									style: {
										image: p1Data[0].image,
										width: 400,
										height: 550
									}
								},
								{
									type: "image",
									style: {
										image: p2Data[0].image,
										width: 400,
										height: 550
									}
								}
							]
						}
					}
				}
			]
		};
		myChart.setOption(option);
		myChart.hideLoading();
	});
}

$(".pl1")
	.dropdown({
		onChange: function(value) {
			localStorage.setItem("player1", value);
			GetVersus(
				value,
				localStorage.getItem("player2"),
				localStorage.getItem("pvColor")
			);
		}
	})
	.dropdown("set selected", localStorage.getItem("player1"));

$(".pl2")
	.dropdown({
		onChange: function(value) {
			localStorage.setItem("player2", value);
			GetVersus(
				localStorage.getItem("player1"),
				value,
				localStorage.getItem("pvColor")
			);
		}
	})
	.dropdown("set selected", localStorage.getItem("player2"));

$(".ui.dropdown.color")
	.dropdown({
		onChange: function(value) {
			localStorage.setItem("pvColor", value);
			GetVersus(
				localStorage.getItem("player1"),
				localStorage.getItem("player2"),
				value
			);
		}
	})
	.dropdown("set selected", localStorage.getItem("pvColor"));
