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
if (localStorage.getItem("pvBg") === null) {
	localStorage.setItem("pvBg", "#3BB273");
}

var SaveIcon = "./assets/img/template-images/screenshot.svg";
GetVersus(
	localStorage.getItem("player1"),
	localStorage.getItem("player2"),
	localStorage.getItem("pvColor"),
	localStorage.getItem("pvBg")
);
myChart.showLoading();
function GetVersus(pl1, pl2, clr,bg) {
	$.get("./assets/data/versus.json", function(data) {
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
		var bgItems = "";

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

		for (var i = 0; i < data.bg.length; i++) {
			bgItems +=
				'<div class="item" data-value="' +
				data.bg[i].value +
				'"><i class="icon circle" style="color:' +
				data.bg[i].value +
				'"></i>' +
				data.bg[i].name +
				"</div>";
		}

		$(".bg .menu").html(bgItems);

		var option = {
			baseOption: {
				backgroundColor: bg,
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
					},
					{
						text: "X",
						top: "20%",
						left: "center",
						textStyle: {
							fontFamily: "Quantico, sans-serif",
							fontWeight: 700,
							fontSize: 550,
							color: clr
						}
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
							backgroundColor: bg,
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
								height:400
							},
							left: "0",
							top: 'center',
							zlevel: 1
						},
						{
							type: "image",
							style: {
								image: p2Data[0].image,
								width: 400,
								height:400
							},
							right: "0",
							top: 'center',
							zlevel: 1
						}
					]
				}
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
										height: 200
									},
									left: "-40",
									top: 'center',
									zlevel: 1
								},
								{
									type: "image",
									style: {
										image: p2Data[0].image,
										width: 200,
										height: 200
									},
									right: "-40",
									top: 'center',
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
										height:400
									}
								},
								{
									type: "image",
									style: {
										image: p2Data[0].image,
										width: 400,
										height:400
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
				localStorage.getItem("pvColor"),
				localStorage.getItem("pvBg")
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
				localStorage.getItem("pvColor"),
				localStorage.getItem("pvBg")
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
				value,
				localStorage.getItem("pvBg")
			);
		}
	})
	.dropdown("set selected", localStorage.getItem("pvColor"));

	$(".ui.dropdown.bg")
	.dropdown({
		onChange: function(value) {
			localStorage.setItem("pvBg", value);
			GetVersus(
				localStorage.getItem("player1"),
				localStorage.getItem("player2"),
				localStorage.getItem("pvColor"),
				value
			);
		}
	})
	.dropdown("set selected", localStorage.getItem("pvBg"));
