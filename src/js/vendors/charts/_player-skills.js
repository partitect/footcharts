var myChart = echarts.init(document.getElementById("playerSkills"), null, {
	renderer: "canvas"
});
//var myChart = echarts.init(document.getElementById('chartli1'));
myChart.showLoading();
var titleName,
	valdata,
	PlayerData,
	datas,
	playerImage,
	clubImage,
	countryImage,
	datalen;

var newids = 0;
$("body").keydown(function(e) {
	if (e.keyCode == 37) {
		// left
		$(".left-button").click();
	} else if (e.keyCode == 39) {
		// right
		$(".right-button").click();
	}
});
$.get("./assets/data/player-skills.json", function(data) {
	myChart.hideLoading();
	datalen = data.players.length;

	datas = data.players[0];

	if (datas.Position == "GK") {
		PlayerData = [datas.GKDiving, datas.GKReflexes, datas.Overall];
		titlename = ["DIVING", "REFLEXES", "OVERALL"];
	} else {
		PlayerData = [datas.Dribbling, datas.Finishing, datas.Overall];
		titlename = ["DRIBBLING", "FINISHING", "OVERALL"];
	}

	$(".navbar-menu").css("background", datas.CardColor);
	$(".player-card").css(
		"background",
		"linear-gradient(110deg, " +
			datas.ColorOne +
			" 60%, " +
			datas.ColorTwo +
			" 60%)"
	);
	$(".card-wrapper").css(
		"background",
		"linear-gradient(70deg, " +
			datas.ColorTwo +
			"  30%, rgba(0,0,0,0) 30%), linear-gradient(30deg, " +
			datas.ColorThree +
			" 60%, " +
			datas.ColorOne +
			" 60%)"
	);
	$(".left-button").css("background", datas.ColorOne);
	$(".right-button").css("background", datas.ColorTwo);
	$(".pagination-button").css("color", datas.textColor);
	playerImage = datas.Photo;
	clubImage = datas.Club_Logo;
	countryImage = "assets/img/countries/" + datas.Nationality + ".svg";

	$(".pagination-button").on("click", function() {
		if ($(this).hasClass("right-button")) {
			newids += 1;

			if (newids >= datalen) {
				newids = 0;
				datas = data.players[0];
			} else {
				datas = data.players[newids];
			}
		} else {
			if (newids == 0) {
				newids = datalen - 1;
				datas = data.players[newids];
			} else {
				newids -= 1;
				datas = data.players[newids];
			}
		}
		if (datas.Position == "GK") {
			PlayerData = [datas.GKDiving, datas.GKReflexes, datas.Overall];
			titlename = ["DIVING", "REFLEXES", "OVERALL"];
		} else {
			PlayerData = [datas.Dribbling, datas.Finishing, datas.Overall];
			titlename = ["DRIBBLING", "FINISHING", "OVERALL"];
		}
		$(".navbar-menu").css("background", datas.CardColor);
		$(".player-card").css(
			"background",
			"linear-gradient(110deg, " +
				datas.ColorOne +
				" 60%, " +
				datas.ColorTwo +
				" 60%)"
		);
		$(".card-wrapper").css(
			"background",
			"linear-gradient(70deg, " +
				datas.ColorTwo +
				"  30%, rgba(0,0,0,0) 30%), linear-gradient(30deg, " +
				datas.ColorThree +
				" 60%, " +
				datas.ColorOne +
				" 60%)"
		);
		$(".left-button").css("background", datas.ColorOne);
		$(".right-button").css("background", datas.ColorTwo);
		$(".pagination-button").css("color", datas.textColor);
		playerImage = datas.Photo;
		clubImage = datas.Club_Logo;
		countryImage = "assets/img/countries/" + datas.Nationality + ".svg";
		var changeOption = {
			baseOption: {
				lazyUpdate: true,
				title: [
					{
						text: datas.Name,
						textStyle: {
							color: datas.textColor
						}
					},
					{
						text: datas.Club + " - " + datas.Position,
						textStyle: {
							color: datas.textColor
						}
					},
					{
						subtext: datas.Age,
						subtextStyle: {
							color: datas.textColor
						}
					},
					{
						subtext: datas.Height,
						subtextStyle: {
							color: datas.textColor
						}
					},
					{
						subtext: datas.Weight,
						subtextStyle: {
							color: datas.textColor
						}
					},
					{
						text: datas.Jersey_Number,
						textStyle: {
							color: datas.ColorOne
						}
					}
				],
				yAxis: [
					{
						data: titlename
					},
					{
						data: PlayerData
					}
				],

				graphic: {
					elements: [
						{
							style: {
								image: playerImage,
								shadowColor: datas.ColorOne
							}
						},
						{
							style: {
								image: clubImage,
								shadowColor: datas.ColorOne
							}
						},
						{
							style: {
								image: countryImage,
								shadowColor: datas.ColorTwo
							}
						}
					]
				},
				toolbox: {
					feature: {
						saveAsImage: {
							backgroundColor: new echarts.graphic.LinearGradient(
								0,
								0,
								0,
								1,
								[
									{
										offset: 0,
										color: datas.ColorOne
									},
									{
										offset: 1,
										color: datas.ColorTwo
									}
								]
							)
						}
					}
				},
				series: [
					{
						data: PlayerData,
						itemStyle: {
							normal: {
								color: datas.textColor
							}
						}
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
								text: datas.Name,
								textStyle: {
									fontSize: 40,
									color: datas.textColor,
									fontWeight: "bold"
								},
								x: "20",
								top: "20"
							},
							{
								text: datas.Club + " - " + datas.Position,
								textStyle: {
									fontSize: 20,
									color: datas.textColor
								},
								x: "20",
								top: "75"
							},
							{
								text: "AGE",
								subtext: datas.Age,
								textStyle: {
									fontSize: 10,
									color: "#FFF",
									align: "center"
								},
								subtextStyle: {
									fontSize: 20,
									color: datas.textColor,
									align: "center"
								},
								x: "20",
								top: "190"
							},
							{
								text: "HEIGHT",
								subtext: datas.Height,
								textStyle: {
									fontSize: 10,
									color: "#FFF",
									align: "center"
								},
								subtextStyle: {
									fontSize: 20,
									color: datas.textColor,
									align: "center"
								},
								x: "80",
								top: "190"
							},
							{
								text: "WEIGHT",
								subtext: datas.Weight,
								textStyle: {
									fontSize: 10,
									color: "#FFF",
									align: "center"
								},
								subtextStyle: {
									fontSize: 20,
									color: datas.textColor,
									align: "center"
								},
								x: "150",
								top: "190"
							},
							{
								text: datas.Jersey_Number,
								textStyle: {
									verticalAlign: "top",
									fontSize: 40,
									color: datas.ColorOne,
									fontWeight: "bold"
								},
								bottom: "0",
								right: "0",
								zlevel: 1
							}
						],
						graphic: {
							elements: [
								{
									type: "image",
									style: {
										image: playerImage,
										width: 250,
										height: 350,
										shadowColor: datas.ColorOne,
										shadowOffsetY: 5,
										shadowOffsetX: 5,
										shadowBlur: 10
									},
									right: "0",
									bottom: "0",
									zlevel: 1
								},
								{
									type: "image",
									style: {
										image: clubImage,
										width: 50,
										height: 50,
										shadowColor: datas.ColorOne,
										shadowOffsetY: 5,
										shadowOffsetX: 5,
										shadowBlur: 10
									},
									right: "10",
									top: "10",
									zlevel: -1
								},
								{
									type: "image",
									style: {
										image: countryImage,
										width: 50,
										height: 50,
										shadowColor: datas.ColorTwo
									},
									left: "58%",
									bottom: "0",
									zlevel: -1
								}
							]
						},
						yAxis: [
							{
								axisLabel: {
									textStyle: {
										fontSize: 10
									}
								}
							},
							{
								axisLabel: {
									textStyle: {
										fontSize: 20
									}
								}
							}
						]
					}
				},
				{
					query: {
						minWidth: 681 // when container width is smaller than 500
					},
					option: {
						title: [
							{
								text: datas.Name,
								textStyle: {
									fontSize: 120,
									color: datas.textColor,
									fontWeight: "bold"
								},
								x: "20",
								top: "20"
							},
							{
								text: datas.Club + " - " + datas.Position,
								textStyle: {
									fontSize: 30,
									color: datas.textColor
								},
								x: "20",
								top: "145"
							},
							{
								text: "AGE",
								subtext: datas.Age,
								textStyle: {
									fontSize: 30,
									color: "#FFF",
									align: "center"
								},
								subtextStyle: {
									fontSize: 50,
									color: datas.textColor,
									align: "center"
								},
								x: "20",
								top: "190"
							},
							{
								text: "HEIGHT",
								subtext: datas.Height,
								textStyle: {
									fontSize: 30,
									color: "#FFF",
									align: "center"
								},
								subtextStyle: {
									fontSize: 50,
									color: datas.textColor,
									align: "center"
								},
								x: "150",
								top: "190"
							},
							{
								text: "WEIGHT",
								subtext: datas.Weight,
								textStyle: {
									fontSize: 30,
									color: "#FFF",
									align: "center"
								},
								subtextStyle: {
									fontSize: 50,
									color: datas.textColor,
									align: "center"
								},
								x: "300",
								top: "190"
							},
							{
								text: datas.Jersey_Number,
								textStyle: {
									verticalAlign: "top",
									fontSize: 100,
									color: datas.ColorOne,
									fontWeight: "bold"
								},
								bottom: "0",
								right: "0",
								zlevel: 1
							}
						],
						graphic: {
							elements: [
								{
									type: "image",
									style: {
										image: playerImage,
										width: 400,
										height: 550,
										shadowColor: datas.ColorOne,
										shadowOffsetY: 5,
										shadowOffsetX: 5,
										shadowBlur: 10
									},
									right: "0",
									bottom: "0",
									zlevel: 1
								},
								{
									type: "image",
									style: {
										image: clubImage,
										width: 120,
										height: 120,
										shadowColor: datas.ColorOne,
										shadowOffsetY: 5,
										shadowOffsetX: 5,
										shadowBlur: 10
									},
									right: "10",
									top: "10",
									zlevel: -1
								},
								{
									type: "image",
									style: {
										image: countryImage,
										width: 120,
										height: 120,
										shadowColor: datas.ColorTwo
									},
									left: "58%",
									bottom: "0",
									zlevel: -1
								}
							]
						},
						yAxis: [
							{
								show: true,
								data: titlename,
								inverse: true,
								axisLine: {
									show: false
								},
								splitLine: {
									show: false
								},
								axisTick: {
									show: false
								},
								axisLabel: {
									align: "left",
									margin: 0,
									lineHeight: 15,
									verticalAlign: "bottom",
									textStyle: {
										fontSize: 20,
										color: "#fff"
									},
									formatter: function(value, index) {
										return ["\n" + value + "\n"];
									}
								}
							},
							{
								show: true,
								inverse: true,
								data: PlayerData,
								axisLabel: {
									align: "right",
									margin: 0,
									lineHeight: 15,
									verticalAlign: "bottom",
									textStyle: {
										fontSize: 20,
										color: "#fff"
									},
									formatter: function(value, index) {
										return ["\n" + value + "\n"];
									}
								},
								axisLine: {
									show: false
								},
								splitLine: {
									show: false
								},
								axisTick: {
									show: false
								}
							}
						]
					}
				}
			]
		};
		myChart.setOption(changeOption);
	});
	var option = {
		baseOption: {
			textStyle: {
				fontFamily: "Quantico, sans-serif"
			},
			grid: {
				top: 320,
				left: 20,
				right: "50%",
				bottom: 0,
				containLabel: false
			},
			toolbox: {
				feature: {
					saveAsImage: {
						show: true,
						pixelRatio: 2,
						backgroundColor: new echarts.graphic.LinearGradient(
							0,
							0,
							0,
							1,
							[
								{
									offset: 0,
									color: datas.ColorOne
								},
								{
									offset: 1,
									color: datas.ColorTwo
								}
							]
						)
					}
				},
				bottom: 0,
				zlevel: 9
			},
			title: [
				{
					text: datas.Name,
					textStyle: {
						fontSize: 120,
						color: datas.textColor,
						fontWeight: "bold"
					},
					x: "20",
					top: "20"
				},
				{
					text: datas.Club + " - " + datas.Position,
					textStyle: {
						fontSize: 30,
						color: datas.textColor
					},
					x: "20",
					top: "145"
				},
				{
					text: "AGE",
					subtext: datas.Age,
					textStyle: {
						fontSize: 30,
						color: "#FFF",
						align: "center"
					},
					subtextStyle: {
						fontSize: 50,
						color: datas.textColor,
						align: "center"
					},
					x: "20",
					top: "190"
				},
				{
					text: "HEIGHT",
					subtext: datas.Height,
					textStyle: {
						fontSize: 30,
						color: "#FFF",
						align: "center"
					},
					subtextStyle: {
						fontSize: 50,
						color: datas.textColor,
						align: "center"
					},
					x: "150",
					top: "190"
				},
				{
					text: "WEIGHT",
					subtext: datas.Weight,
					textStyle: {
						fontSize: 30,
						color: "#FFF",
						align: "center"
					},
					subtextStyle: {
						fontSize: 50,
						color: datas.textColor,
						align: "center"
					},
					x: "300",
					top: "190"
				},
				{
					text: datas.Jersey_Number,
					textStyle: {
						verticalAlign: "top",
						fontSize: 100,
						color: datas.ColorOne,
						fontWeight: "bold"
					},
					bottom: "0",
					right: "0",
					zlevel: 1
				}
			],
			xAxis: {
				show: false
			},
			yAxis: [
				{
					show: true,
					data: titlename,
					inverse: true,
					axisLine: {
						show: false
					},
					splitLine: {
						show: false
					},
					axisTick: {
						show: false
					},
					axisLabel: {
						align: "left",
						margin: 0,
						lineHeight: 15,
						verticalAlign: "bottom",
						textStyle: {
							fontSize: 20,
							color: "#fff"
						},
						formatter: function(value, index) {
							return ["\n" + value + "\n"];
						}
					}
				},
				{
					show: true,
					inverse: true,
					data: PlayerData,
					axisLabel: {
						align: "right",
						margin: 0,
						lineHeight: 15,
						verticalAlign: "bottom",
						textStyle: {
							fontSize: 20,
							color: "#fff"
						},
						formatter: function(value, index) {
							return ["\n" + value + "\n"];
						}
					},
					axisLine: {
						show: false
					},
					splitLine: {
						show: false
					},
					axisTick: {
						show: false
					}
				}
			],

			graphic: {
				elements: [
					{
						type: "image",
						style: {
							image: playerImage,
							width: 400,
							height: 550,
							shadowColor: datas.ColorOne,
							shadowOffsetY: 5,
							shadowOffsetX: 5,
							shadowBlur: 10
						},
						right: "0",
						bottom: "0",
						zlevel: 1
					},
					{
						type: "image",
						style: {
							image: clubImage,
							width: 120,
							height: 120,
							shadowColor: datas.ColorOne,
							shadowOffsetY: 5,
							shadowOffsetX: 5,
							shadowBlur: 10
						},
						right: "10",
						top: "10",
						zlevel: -1
					},
					{
						type: "image",
						style: {
							image: countryImage,
							width: 120,
							height: 120,
							shadowColor: datas.ColorTwo
						},
						left: "58%",
						bottom: "0",
						zlevel: -1
					}
				]
			},
			series: [
				{
					name: "Player",
					type: "bar",
					yAxisIndex: 0,
					data: PlayerData,
					barWidth: 16,
					z: 2,
					zlevel: 2,
					itemStyle: {
						normal: {
							barBorderRadius: 30,
							color: datas.textColor
						}
					},
					label: {
						normal: {
							show: false
						}
					}
				},
				{
					name: "",
					type: "bar",
					barWidth: 16,
					label: {
						normal: {
							show: false
						}
					},
					silent: true,
					itemStyle: {
						normal: {
							color: "rgba(0,0,0,.5)",
							barBorderRadius: 10
						}
					},
					barGap: "-100%",
					barCategoryGap: "50%",
					data: [100, 100, 100]
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
							text: datas.Name,
							textStyle: {
								fontSize: 40,
								color: datas.textColor,
								fontWeight: "bold"
							},
							x: "20",
							top: "20"
						},
						{
							text: datas.Club + " - " + datas.Position,
							textStyle: {
								fontSize: 20,
								color: datas.textColor
							},
							x: "20",
							top: "75"
						},
						{
							text: "AGE",
							subtext: datas.Age,
							textStyle: {
								fontSize: 10,
								color: "#FFF",
								align: "center"
							},
							subtextStyle: {
								fontSize: 20,
								color: datas.textColor,
								align: "center"
							},
							x: "20",
							top: "190"
						},
						{
							text: "HEIGHT",
							subtext: datas.Height,
							textStyle: {
								fontSize: 10,
								color: "#FFF",
								align: "center"
							},
							subtextStyle: {
								fontSize: 20,
								color: datas.textColor,
								align: "center"
							},
							x: "80",
							top: "190"
						},
						{
							text: "WEIGHT",
							subtext: datas.Weight,
							textStyle: {
								fontSize: 10,
								color: "#FFF",
								align: "center"
							},
							subtextStyle: {
								fontSize: 20,
								color: datas.textColor,
								align: "center"
							},
							x: "150",
							top: "190"
						},
						{
							text: datas.Jersey_Number,
							textStyle: {
								verticalAlign: "top",
								fontSize: 40,
								color: datas.ColorOne,
								fontWeight: "bold"
							},
							bottom: "0",
							right: "0",
							zlevel: 1
						}
					],
					graphic: {
						elements: [
							{
								type: "image",
								style: {
									image: playerImage,
									width: 250,
									height: 350,
									shadowColor: datas.ColorOne,
									shadowOffsetY: 5,
									shadowOffsetX: 5,
									shadowBlur: 10
								},
								right: "0",
								bottom: "0",
								zlevel: 1
							},
							{
								type: "image",
								style: {
									image: clubImage,
									width: 50,
									height: 50,
									shadowColor: datas.ColorOne,
									shadowOffsetY: 5,
									shadowOffsetX: 5,
									shadowBlur: 10
								},
								right: "10",
								top: "10",
								zlevel: -1
							},
							{
								type: "image",
								style: {
									image: countryImage,
									width: 50,
									height: 50,
									shadowColor: datas.ColorTwo
								},
								left: "58%",
								bottom: "0",
								zlevel: -1
							}
						]
					},
					yAxis: [
						{
							axisLabel: {
								textStyle: {
									fontSize: 10
								}
							}
						},
						{
							axisLabel: {
								textStyle: {
									fontSize: 20
								}
							}
						}
					]
				}
			},
			{
				query: {
					minWidth: 681 // when container width is smaller than 500
				},
				option: {
					title: [
						{
							text: datas.Name,
							textStyle: {
								fontSize: 120,
								color: datas.textColor,
								fontWeight: "bold"
							},
							x: "20",
							top: "20"
						},
						{
							text: datas.Club + " - " + datas.Position,
							textStyle: {
								fontSize: 30,
								color: datas.textColor
							},
							x: "20",
							top: "145"
						},
						{
							text: "AGE",
							subtext: datas.Age,
							textStyle: {
								fontSize: 30,
								color: "#FFF",
								align: "center"
							},
							subtextStyle: {
								fontSize: 50,
								color: datas.textColor,
								align: "center"
							},
							x: "20",
							top: "190"
						},
						{
							text: "HEIGHT",
							subtext: datas.Height,
							textStyle: {
								fontSize: 30,
								color: "#FFF",
								align: "center"
							},
							subtextStyle: {
								fontSize: 50,
								color: datas.textColor,
								align: "center"
							},
							x: "150",
							top: "190"
						},
						{
							text: "WEIGHT",
							subtext: datas.Weight,
							textStyle: {
								fontSize: 30,
								color: "#FFF",
								align: "center"
							},
							subtextStyle: {
								fontSize: 50,
								color: datas.textColor,
								align: "center"
							},
							x: "300",
							top: "190"
						},
						{
							text: datas.Jersey_Number,
							textStyle: {
								verticalAlign: "top",
								fontSize: 100,
								color: datas.ColorOne,
								fontWeight: "bold"
							},
							bottom: "0",
							right: "0",
							zlevel: 1
						}
					],
					graphic: {
						elements: [
							{
								type: "image",
								style: {
									image: playerImage,
									width: 400,
									height: 550,
									shadowColor: datas.ColorOne,
									shadowOffsetY: 5,
									shadowOffsetX: 5,
									shadowBlur: 10
								},
								right: "0",
								bottom: "0",
								zlevel: 1
							},
							{
								type: "image",
								style: {
									image: clubImage,
									width: 120,
									height: 120,
									shadowColor: datas.ColorOne,
									shadowOffsetY: 5,
									shadowOffsetX: 5,
									shadowBlur: 10
								},
								right: "10",
								top: "10",
								zlevel: -1
							},
							{
								type: "image",
								style: {
									image: countryImage,
									width: 120,
									height: 120,
									shadowColor: datas.ColorTwo
								},
								left: "58%",
								bottom: "0",
								zlevel: -1
							}
						]
					},
					yAxis: [
						{
							show: true,
							data: titlename,
							inverse: true,
							axisLine: {
								show: false
							},
							splitLine: {
								show: false
							},
							axisTick: {
								show: false
							},
							axisLabel: {
								align: "left",
								margin: 0,
								lineHeight: 15,
								verticalAlign: "bottom",
								textStyle: {
									fontSize: 20,
									color: "#fff"
								},
								formatter: function(value, index) {
									return ["\n" + value + "\n"];
								}
							}
						},
						{
							show: true,
							inverse: true,
							data: PlayerData,
							axisLabel: {
								align: "right",
								margin: 0,
								lineHeight: 15,
								verticalAlign: "bottom",
								textStyle: {
									fontSize: 20,
									color: "#fff"
								},
								formatter: function(value, index) {
									return ["\n" + value + "\n"];
								}
							},
							axisLine: {
								show: false
							},
							splitLine: {
								show: false
							},
							axisTick: {
								show: false
							}
						}
					]
				}
			}
		]
	};
	myChart.setOption(option);
});
