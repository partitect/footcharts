var option1;
var myChart = echarts.init(document.getElementById("p_compare"));
myChart.showLoading();
if (localStorage.getItem("vs1") === null) {
	localStorage.setItem("vs1", "aubameyang");
}
if (localStorage.getItem("vs2") === null) {
	localStorage.setItem("vs2", "salah");
}
if (localStorage.getItem("color") === null) {
	localStorage.setItem("color", "#3BB273");
}
$(".ui.dropdown.pl1")
	.dropdown({
		onChange: function(value, text) {
			localStorage.setItem("vs1", value);
			GetPlayers(
				value,
				localStorage.getItem("vs2"),
				localStorage.getItem("color")
			);
		}
	})
	.dropdown("set selected", localStorage.getItem("vs1"));
$(".ui.dropdown.pl2")
	.dropdown({
		onChange: function(value) {
			localStorage.setItem("vs2", value);
			GetPlayers(
				localStorage.getItem("vs1"),
				value,
				localStorage.getItem("color")
			);
		}
	})
	.dropdown("set selected", localStorage.getItem("vs2"));

$(".ui.dropdown.color")
	.dropdown({
		onChange: function(value) {
			localStorage.setItem("color", value);
			GetPlayers(
				localStorage.getItem("vs1"),
				localStorage.getItem("vs2"),
				value
			);
		}
	})
	.dropdown("set selected", localStorage.getItem("color"));

GetPlayers(
	localStorage.getItem("vs1"),
	localStorage.getItem("vs2"),
	localStorage.getItem("color")
);
var SaveIcon = "./assets/img/prod/prod/saveas.svg";

function GetPlayers(pl1, pl2, clr) {
	$.get("./assets/data/player-compare.json", function(response) {
		var newDatas = [];
		var plyr1 = [];
		var plyr2 = [];

		newDatas.push(response.players);

		var playerItems1 = "";
		var playerItems2 = "";
		var colorItems = "";
		for (var i = 0; i < newDatas[0].length; i++) {
			if (newDatas[0][i].identy != pl2) {
				playerItems1 +=
					'<div class="item" data-value="' +
					newDatas[0][i].identy +
					'">' +
					newDatas[0][i].name +
					"</div>";
			}
		}
		for (var i = 0; i < newDatas[0].length; i++) {
			if (newDatas[0][i].identy != pl1) {
				playerItems2 +=
					'<div class="item" data-value="' +
					newDatas[0][i].identy +
					'">' +
					newDatas[0][i].name +
					"</div>";
			}
		}
		for (var i = 0; i < response.colors.length; i++) {
			colorItems +=
				'<div class="item" data-value="' +
				response.colors[i].value +
				'"><i class="icon circle" style="color:' +
				response.colors[i].value +
				'"></i>' +
				response.colors[i].name +
				"</div>";
		}

		$(".pl1 .menu").html(playerItems1);
		$(".pl2 .menu").html(playerItems2);
		$(".color .menu").html(colorItems);

		var pimg1,
			pimg2,
			pname1,
			pname2 = "";

		$(".pl1").dropdown("set selected", pl1);
		$(".pl2").dropdown("set selected", pl2);

		var pName = [];
		$.each(response.players, function(key, value) {
			if (value.identy == pl1) {
				plyr1.push(value.data);
				pname1 = value.name;
				pimg1 = value.identy;
			} else if (value.identy == pl2) {
				plyr2.push(value.data);
				pname2 = value.name;
				pimg2 = value.identy;
			}
		});

		var pData = [];
		pName.push(pname1, pname2);
		console.log(pName);

		$.each(response.dataNames, function(i) {
			pData.push({
				_name: response.dataNames[i],
				_left: plyr1[0][i],
				_right: plyr2[0][i]
			});
		});

		var player_data = {
			_type: "statistics",
			_title: "Premier League 2019",
			_data: pData,
			_players: pName,
			_league_name: "Premier League"
		};

		var uploadedDataURL3 = "./assets/img/prod/footballers/" + pimg1 + ".png";
		var uploadedDataURL4 = "./assets/img/prod/footballers/" + pimg2 + ".png";
		var zongjine = [0];
		var players = [];
		var myData = [];
		var myData_l = [];
		var myData_r = [];
		var garybar = [];
		var data_l = [];
		var data_r = [];
		var colorList1 = [];
		var colorList2 = [];

		function dataConvert(data) {
			players = player_data["_players"];
			for (var i = 0; i < data["_data"].length; i++) {
				myData.push(data["_data"][i]["_name"]);
				var l = parseFloat(data["_data"][i]["_left"]);
				var r = parseFloat(data["_data"][i]["_right"]);
				myData_l.push(data["_data"][i]["_left"]);
				myData_r.push(data["_data"][i]["_right"]);
				garybar.push(1);
				var l2 = l / (l + r);
				var r2 = r / (l + r);
				data_l.push(l2);
				data_r.push(r2);
				if (l2 > r2) {
					colorList1.push(clr);
					colorList2.push("#564D4A");
				} else if (l2 == r2) {
					colorList1.push(clr);
					colorList2.push(clr);
				} else {
					colorList1.push("#564D4A");
					colorList2.push(clr);
				}
			}
		}
		dataConvert(player_data);
		var option = {
			baseOption: {
				textStyle: {
					fontFamily: "Exo_2, sans-serif",
					fontWeight: 400
				},
				title: [
					{
						text: players[0],
						top: "19%",
						textAlign: "left",
						x: "6.5%",
						textStyle: {
							fontFamily: "Quantico, sans-serif",
							fontWeight: 700,
							fontSize: 60,
							color: clr
						}
					},
					{
						text: "V",
						top: "4%",
						left: "43%",
						textStyle: {
							fontFamily: "Quantico, sans-serif",
							fontWeight: 700,
							fontSize: 160,
							color: clr
						}
					},
					{
						text: "S",
						top: "10%",
						left: "48%",
						textStyle: {
							fontFamily: "Quantico, sans-serif",
							fontWeight: 700,
							fontSize: 160,
							color: clr
						}
					},
					{
						text: players[1],
						top: "19%",
						textAlign: "right",
						x: "92.5%",
						textStyle: {
							fontFamily: "Quantico, sans-serif",
							fontWeight: 700,
							fontSize: 60,
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
							show: true,
							pixelRatio: 2,
							//backgroundColor: clr,
							title: "Save As Image",
							icon: "image://" + SaveIcon + ""
						}
					},
					top: 10,
					right: 20,
					zlevel: 9
				},
				grid: [
					{
						show: false,
						left: "3%",
						top: 250,
						bottom: 50,
						width: "0%"
					},
					{
						show: false,
						left: "7%",
						top: 250,
						bottom: 50,
						containLabel: true,
						width: "33%"
					},
					{
						show: false,
						left: "49%",
						top: 250,
						bottom: 50,
						width: "0%"
					},
					{
						show: false,
						right: "7%",
						top: 250,
						bottom: 50,
						containLabel: true,
						width: "33%"
					},
					{
						show: false,
						right: "3%",
						top: 250,
						bottom: 50,
						width: "0%"
					},
					{
						show: false,
						left: "23%",
						top: 5,
						bottom: 50,
						containLabel: true,
						width: "10%"
					},
					{
						show: false,
						left: "68%",
						top: 5,
						bottom: 50,
						containLabel: true,
						width: "10%"
					}
				],

				xAxis: [
					{
						show: false
					},
					{
						gridIndex: 1,
						type: "value",
						inverse: true,
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
						},
						position: "top",
						axisLabel: {
							show: false,
							textStyle: {
								color: "#B2B2B2",
								fontSize: 12
							}
						},
						splitLine: {
							show: false,
							lineStyle: {
								color: "#1F2022",
								width: 1,
								type: "solid"
							}
						}
					},
					{
						gridIndex: 2,
						show: false
					},
					{
						gridIndex: 3,
						type: "value",
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
						},
						position: "top",
						axisLabel: {
							show: false,
							textStyle: {
								color: "#B2B2B2",
								fontSize: 12
							}
						},
						splitLine: {
							show: false,
							lineStyle: {
								color: "#1F2022",
								width: 1,
								type: "solid"
							}
						}
					},
					{
						gridIndex: 4,
						show: false
					},
					{
						gridIndex: 5,
						show: false
					},
					{
						gridIndex: 6,
						show: false
					}
				],
				yAxis: [
					{
						type: "category",
						inverse: true,
						position: "right",
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
						},
						axisLabel: {
							show: true,
							textStyle: {
								color: "#403F4C",
								fontSize: 16
							}
						},
						data: myData_l.map(function(value) {
							return {
								value: value,
								textStyle: {
									align: "center"
								}
							};
						})
					},
					{
						gridIndex: 1,
						type: "category",
						inverse: true,
						position: "right",
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
						},
						axisLabel: {
							show: false,
							margin: 8,
							textStyle: {
								color: "#403F4C",
								fontSize: 12
							}
						},
						data: myData
					},
					{
						gridIndex: 2,
						type: "category",
						inverse: true,
						position: "right",
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
						},
						axisLabel: {
							show: true,
							textStyle: {
								color: "#403F4C",
								fontSize: 16
							}
						},
						data: myData.map(function(value) {
							return {
								value: value,
								textStyle: {
									align: "center"
								}
							};
						})
					},
					{
						gridIndex: 3,
						type: "category",
						inverse: true,
						position: "left",
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
						},
						axisLabel: {
							show: false,
							textStyle: {
								color: "#403F4C",
								fontSize: 12
							}
						},
						data: myData
					},
					{
						gridIndex: 4,
						type: "category",
						inverse: true,
						position: "left",
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
						},
						axisLabel: {
							show: true,
							textStyle: {
								color: "#403F4C",
								fontSize: 16
							}
						},
						data: myData_r.map(function(value) {
							return {
								value: value,
								textStyle: {
									align: "center"
								}
							};
						})
					},
					{
						gridIndex: 5,
						type: "category",
						inverse: true,
						position: "left",
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
						},
						axisLabel: {
							show: false,
							textStyle: {
								color: "#403F4C",
								fontSize: 16
							}
						},
						data: myData_r.map(function(value) {
							return {
								value: value,
								textStyle: {
									align: "center"
								}
							};
						})
					},
					{
						gridIndex: 6,
						type: "category",
						inverse: true,
						position: "left",
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
						},
						axisLabel: {
							show: false,
							textStyle: {
								color: "#403F4C",
								fontSize: 16
							}
						},
						data: myData_r.map(function(value) {
							return {
								value: value,
								textStyle: {
									align: "center"
								}
							};
						})
					}
				],
				series: [
					{
						type: "bar",
						itemStyle: {
							normal: {
								color: "#ddd"
							}
						},
						silent: true,
						xAxisIndex: 1,
						yAxisIndex: 1,
						barWidth: 30,
						barGap: "-100%",
						data: garybar
					},
					{
						type: "bar",
						itemStyle: {
							color: function(params) {
								var colorList = colorList1;
								return colorList[params.dataIndex];
							}
						},
						xAxisIndex: 1,
						yAxisIndex: 1,

						barWidth: 30,
						z: 10,
						data: data_l
					},
					{
						type: "bar",
						itemStyle: {
							normal: {
								color: "#ddd"
							}
						},
						silent: true,
						barWidth: 30,
						barGap: "-100%",
						xAxisIndex: 3,
						yAxisIndex: 3,
						data: garybar
					},
					{
						type: "bar",
						itemStyle: {
							color: function(params) {
								var colorList = colorList2;
								return colorList[params.dataIndex];
							}
						},
						barWidth: 30,
						xAxisIndex: 3,
						yAxisIndex: 3,
						z: 10,
						data: data_r
					},
					{
						type: "bar",
						xAxisIndex: 5,
						yAxisIndex: 5,
						barGap: "-100%",

						barWidth: "25%",
						itemStyle: {
							normal: {
								barBorderRadius: 20,
								color: "#fff"
							}
						},
						label: {
							normal: {
								show: true,
								position: "insideTopCenter",
								offset: [-100, 0],
								rich: {
									start1: {
										backgroundColor: {
											image: uploadedDataURL3
										},
										width: 150,
										height: 150,
										align: "right"
									}
								},
								formatter: function(value) {
									return "{start1|}";
								}
							}
						},
						data: zongjine
					},
					{
						type: "bar",
						xAxisIndex: 6,
						yAxisIndex: 6,
						animationDuration: function(idx) {
							// delay for later data is larger
							return idx * 100;
						},
						//zlevel:-1,
						barGap: "-100%",
						barWidth: "25%", //统计条宽度
						itemStyle: {
							normal: {
								barBorderRadius: 20,
								color: "#fff"
							}
						},
						label: {
							normal: {
								show: true,
								position: "insideTopCenter",
								offset: [50, 0],
								rich: {
									start1: {
										backgroundColor: {
											image: uploadedDataURL4
										},
										width: 150,
										height: 150,
										align: "right"
									}
								},
								formatter: function(value) {
									return "{start1|}";
								}
							}
						},
						data: zongjine
					}
				]
			},
			media: [
				{
					query: {
						minWidth: 1200
					},
					option: {
						textStyle: {
							fontFamily: "Exo_2, sans-serif",
							fontWeight: 400
						},
						title: [
							{
								text: players[0],
								top: "19%",
								textAlign: "left",
								x: "6.5%",
								textStyle: {
									fontFamily: "Quantico, sans-serif",
									fontWeight: 700,
									fontSize: 60,
									color: clr
								}
							},
							{
								text: "V",
								top: "4%",
								left: "43%",
								textStyle: {
									fontFamily: "Quantico, sans-serif",
									fontWeight: 700,
									fontSize: 160,
									color: clr
								}
							},
							{
								text: "S",
								top: "10%",
								left: "48%",
								textStyle: {
									fontFamily: "Quantico, sans-serif",
									fontWeight: 700,
									fontSize: 160,
									color: clr
								}
							},
							{
								text: players[1],
								top: "19%",
								textAlign: "right",
								x: "92.5%",
								textStyle: {
									fontFamily: "Quantico, sans-serif",
									fontWeight: 700,
									fontSize: 60,
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
								extraCssText:
									"box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);" // user-defined CSS styles
							},
							feature: {
								saveAsImage: {
									show: true,
									pixelRatio: 2,
									//backgroundColor: clr,
									title: "Save As Image",
									icon: "image://" + SaveIcon + ""
								}
							},
							top: 10,
							right: 20,
							zlevel: 9
						},
						grid: [
							{
								show: false,
								left: "3%",
								top: 250,
								bottom: 50,
								width: "0%"
							},
							{
								show: false,
								left: "7%",
								top: 250,
								bottom: 50,
								containLabel: true,
								width: "33%"
							},
							{
								show: false,
								left: "49%",
								top: 250,
								bottom: 50,
								width: "0%"
							},
							{
								show: false,
								right: "7%",
								top: 250,
								bottom: 50,
								containLabel: true,
								width: "33%"
							},
							{
								show: false,
								right: "3%",
								top: 250,
								bottom: 50,
								width: "0%"
							},
							{
								show: false,
								left: "23%",
								top: 5,
								bottom: 50,
								containLabel: true,
								width: "10%"
							},
							{
								show: false,
								left: "68%",
								top: 5,
								bottom: 50,
								containLabel: true,
								width: "10%"
							}
						],

						xAxis: [
							{
								show: false
							},
							{
								gridIndex: 1,
								type: "value",
								inverse: true,
								axisLine: {
									show: false
								},
								axisTick: {
									show: false
								},
								position: "top",
								axisLabel: {
									show: false,
									textStyle: {
										color: "#B2B2B2",
										fontSize: 12
									}
								},
								splitLine: {
									show: false,
									lineStyle: {
										color: "#1F2022",
										width: 1,
										type: "solid"
									}
								}
							},
							{
								gridIndex: 2,
								show: false
							},
							{
								gridIndex: 3,
								type: "value",
								axisLine: {
									show: false
								},
								axisTick: {
									show: false
								},
								position: "top",
								axisLabel: {
									show: false,
									textStyle: {
										color: "#B2B2B2",
										fontSize: 12
									}
								},
								splitLine: {
									show: false,
									lineStyle: {
										color: "#1F2022",
										width: 1,
										type: "solid"
									}
								}
							},
							{
								gridIndex: 4,
								show: false
							},
							{
								gridIndex: 5,
								show: false
							},
							{
								gridIndex: 6,
								show: false
							}
						],
						yAxis: [
							{
								type: "category",
								inverse: true,
								position: "right",
								axisLine: {
									show: false
								},
								axisTick: {
									show: false
								},
								axisLabel: {
									show: true,
									textStyle: {
										color: "#403F4C",
										fontSize: 16
									}
								},
								data: myData_l.map(function(value) {
									return {
										value: value,
										textStyle: {
											align: "center"
										}
									};
								})
							},
							{
								gridIndex: 1,
								type: "category",
								inverse: true,
								position: "right",
								axisLine: {
									show: false
								},
								axisTick: {
									show: false
								},
								axisLabel: {
									show: false,
									margin: 8,
									textStyle: {
										color: "#403F4C",
										fontSize: 12
									}
								},
								data: myData
							},
							{
								gridIndex: 2,
								type: "category",
								inverse: true,
								position: "right",
								axisLine: {
									show: false
								},
								axisTick: {
									show: false
								},
								axisLabel: {
									show: true,
									textStyle: {
										color: "#403F4C",
										fontSize: 16
									}
								},
								data: myData.map(function(value) {
									return {
										value: value,
										textStyle: {
											align: "center"
										}
									};
								})
							},
							{
								gridIndex: 3,
								type: "category",
								inverse: true,
								position: "left",
								axisLine: {
									show: false
								},
								axisTick: {
									show: false
								},
								axisLabel: {
									show: false,
									textStyle: {
										color: "#403F4C",
										fontSize: 12
									}
								},
								data: myData
							},
							{
								gridIndex: 4,
								type: "category",
								inverse: true,
								position: "left",
								axisLine: {
									show: false
								},
								axisTick: {
									show: false
								},
								axisLabel: {
									show: true,
									textStyle: {
										color: "#403F4C",
										fontSize: 16
									}
								},
								data: myData_r.map(function(value) {
									return {
										value: value,
										textStyle: {
											align: "center"
										}
									};
								})
							},
							{
								gridIndex: 5,
								type: "category",
								inverse: true,
								position: "left",
								axisLine: {
									show: false
								},
								axisTick: {
									show: false
								},
								axisLabel: {
									show: false,
									textStyle: {
										color: "#403F4C",
										fontSize: 16
									}
								},
								data: myData_r.map(function(value) {
									return {
										value: value,
										textStyle: {
											align: "center"
										}
									};
								})
							},
							{
								gridIndex: 6,
								type: "category",
								inverse: true,
								position: "left",
								axisLine: {
									show: false
								},
								axisTick: {
									show: false
								},
								axisLabel: {
									show: false,
									textStyle: {
										color: "#403F4C",
										fontSize: 16
									}
								},
								data: myData_r.map(function(value) {
									return {
										value: value,
										textStyle: {
											align: "center"
										}
									};
								})
							}
						],
						series: [
							{
								type: "bar",
								itemStyle: {
									normal: {
										color: "#ddd"
									}
								},
								silent: true,
								xAxisIndex: 1,
								yAxisIndex: 1,
								barWidth: 30,
								barGap: "-100%",
								data: garybar
							},
							{
								type: "bar",
								itemStyle: {
									color: function(params) {
										var colorList = colorList1;
										return colorList[params.dataIndex];
									}
								},
								xAxisIndex: 1,
								yAxisIndex: 1,

								barWidth: 30,
								z: 10,
								data: data_l
							},
							{
								type: "bar",
								itemStyle: {
									normal: {
										color: "#ddd"
									}
								},
								silent: true,
								barWidth: 30,
								barGap: "-100%",
								xAxisIndex: 3,
								yAxisIndex: 3,
								data: garybar
							},
							{
								type: "bar",
								itemStyle: {
									color: function(params) {
										var colorList = colorList2;
										return colorList[params.dataIndex];
									}
								},
								barWidth: 30,
								xAxisIndex: 3,
								yAxisIndex: 3,
								z: 10,
								data: data_r
							},
							{
								type: "bar",
								xAxisIndex: 5,
								yAxisIndex: 5,
								barGap: "-100%",

								barWidth: "25%",
								itemStyle: {
									normal: {
										barBorderRadius: 20,
										color: "#fff"
									}
								},
								label: {
									normal: {
										show: true,
										position: "insideTopCenter",
										offset: [-100, 0],
										rich: {
											start1: {
												backgroundColor: {
													image: uploadedDataURL3
												},
												width: 150,
												height: 150,
												align: "right"
											}
										},
										formatter: function(value) {
											return "{start1|}";
										}
									}
								},
								data: zongjine
							},
							{
								type: "bar",
								xAxisIndex: 6,
								yAxisIndex: 6,
								animationDuration: function(idx) {
									// delay for later data is larger
									return idx * 100;
								},
								//zlevel:-1,
								barGap: "-100%",
								barWidth: "25%", //统计条宽度
								itemStyle: {
									normal: {
										barBorderRadius: 20,
										color: "#fff"
									}
								},
								label: {
									normal: {
										show: true,
										position: "insideTopCenter",
										offset: [50, 0],
										rich: {
											start1: {
												backgroundColor: {
													image: uploadedDataURL4
												},
												width: 150,
												height: 150,
												align: "right"
											}
										},
										formatter: function(value) {
											return "{start1|}";
										}
									}
								},
								data: zongjine
							}
						]
					}
				},
				{
					query: {
						maxWidth: 1200
					},
					option: {
						title: [
							{
								text: players[0],
								top: "19%",
								textAlign: "left",
								x: "6.5%",
								textStyle: {
									fontFamily: "Quantico, sans-serif",
									fontWeight: 700,
									fontSize: 20,
									color: clr
								}
							},
							{
								text: "V",
								top: "4%",
								left: "43%",
								textStyle: {
									fontFamily: "Quantico, sans-serif",
									fontWeight: 700,
									fontSize: 100,
									color: clr
								}
							},
							{
								text: "S",
								top: "10%",
								left: "48%",
								textStyle: {
									fontFamily: "Quantico, sans-serif",
									fontWeight: 700,
									fontSize: 100,
									color: clr
								}
							},
							{
								text: players[1],
								top: "19%",
								textAlign: "right",
								x: "92.5%",
								textStyle: {
									fontFamily: "Quantico, sans-serif",
									fontWeight: 700,
									fontSize: 20,
									color: clr
								}
							}
						],
						yAxis: [
							{
								type: "category",
								inverse: true,
								position: "right",
								axisLine: {
									show: false
								},
								axisTick: {
									show: false
								},
								axisLabel: {
									show: true,
									textStyle: {
										color: "#403F4C",
										fontSize: 10
									}
								},
								data: myData_l.map(function(value) {
									return {
										value: value,
										textStyle: {
											align: "center"
										}
									};
								})
							},
							{
								gridIndex: 1,
								type: "category",
								inverse: true,
								position: "right",
								axisLine: {
									show: false
								},
								axisTick: {
									show: false
								},
								axisLabel: {
									show: false,
									margin: 8,
									textStyle: {
										color: "#403F4C",
										fontSize: 10
									}
								},
								data: myData
							},
							{
								gridIndex: 2,
								type: "category",
								inverse: true,
								position: "right",
								axisLine: {
									show: false
								},
								axisTick: {
									show: false
								},
								axisLabel: {
									show: true,
									textStyle: {
										color: "#403F4C",
										fontSize: 10
									}
								},
								data: myData.map(function(value) {
									return {
										value: value,
										textStyle: {
											align: "center"
										}
									};
								})
							},
							{
								gridIndex: 3,
								type: "category",
								inverse: true,
								position: "left",
								axisLine: {
									show: false
								},
								axisTick: {
									show: false
								},
								axisLabel: {
									show: false,
									textStyle: {
										color: "#403F4C",
										fontSize: 10
									}
								},
								data: myData
							},
							{
								gridIndex: 4,
								type: "category",
								inverse: true,
								position: "left",
								axisLine: {
									show: false
								},
								axisTick: {
									show: false
								},
								axisLabel: {
									show: true,
									textStyle: {
										color: "#403F4C",
										fontSize: 10
									}
								},
								data: myData_r.map(function(value) {
									return {
										value: value,
										textStyle: {
											align: "center"
										}
									};
								})
							},
							{
								gridIndex: 5,
								type: "category",
								inverse: true,
								position: "left",
								axisLine: {
									show: false
								},
								axisTick: {
									show: false
								},
								axisLabel: {
									show: false,
									textStyle: {
										color: "#403F4C",
										fontSize: 10
									}
								},
								data: myData_r.map(function(value) {
									return {
										value: value,
										textStyle: {
											align: "center"
										}
									};
								})
							},
							{
								gridIndex: 6,
								type: "category",
								inverse: true,
								position: "left",
								axisLine: {
									show: false
								},
								axisTick: {
									show: false
								},
								axisLabel: {
									show: false,
									textStyle: {
										color: "#403F4C",
										fontSize: 10
									}
								},
								data: myData_r.map(function(value) {
									return {
										value: value,
										textStyle: {
											align: "center"
										}
									};
								})
							}
						],
						series: [
							{
								type: "bar",
								itemStyle: {
									normal: {
										color: "#ddd"
									}
								},
								silent: true,
								xAxisIndex: 1,
								yAxisIndex: 1,
								barWidth: 30,
								barGap: "-100%",
								data: garybar
							},
							{
								type: "bar",
								itemStyle: {
									color: function(params) {
										var colorList = colorList1;
										return colorList[params.dataIndex];
									}
								},
								xAxisIndex: 1,
								yAxisIndex: 1,

								barWidth: 30,
								z: 10,
								data: data_l
							},
							{
								type: "bar",
								itemStyle: {
									normal: {
										color: "#ddd"
									}
								},
								silent: true,
								barWidth: 30,
								barGap: "-100%",
								xAxisIndex: 3,
								yAxisIndex: 3,
								data: garybar
							},
							{
								type: "bar",
								itemStyle: {
									color: function(params) {
										var colorList = colorList2;
										return colorList[params.dataIndex];
									}
								},
								barWidth: 30,
								xAxisIndex: 3,
								yAxisIndex: 3,
								z: 10,
								data: data_r
							},
							{
								type: "bar",
								xAxisIndex: 5,
								yAxisIndex: 5,
								barGap: "-100%",

								barWidth: "25%",
								itemStyle: {
									normal: {
										barBorderRadius: 20,
										color: "#fff"
									}
								},
								label: {
									normal: {
										show: true,
										position: "insideTopCenter",
										offset: [0, 0],
										rich: {
											start1: {
												backgroundColor: {
													image: uploadedDataURL3
												},
												width: 100,
												height: 100,
												align: "right"
											}
										},
										formatter: function(value) {
											return "{start1|}";
										}
									}
								},
								data: zongjine
							},
							{
								type: "bar",
								xAxisIndex: 6,
								yAxisIndex: 6,
								animationDuration: function(idx) {
									// delay for later data is larger
									return idx * 100;
								},
								//zlevel:-1,
								barGap: "-100%",
								barWidth: "25%", //统计条宽度
								itemStyle: {
									normal: {
										barBorderRadius: 20,
										color: "#fff"
									}
								},
								label: {
									normal: {
										show: true,
										position: "insideTopCenter",
										offset: [0, 0],
										rich: {
											start1: {
												backgroundColor: {
													image: uploadedDataURL4
												},
												width: 100,
												height: 100,
												align: "right"
											}
										},
										formatter: function(value) {
											return "{start1|}";
										}
									}
								},
								data: zongjine
							}
						]
					}
				}
			]
		};
		myChart.setOption(option);
		myChart.hideLoading();
	});
}
