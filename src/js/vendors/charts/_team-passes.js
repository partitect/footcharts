'use strict';
var chartliexample3 = echarts.init(document.getElementById('teamPasses'));
chartliexample3.showLoading();
function sumArray(array) {
	for (var index = 0, length = array.length, sum = 0; index < length; sum += array[index++]);
	return sum;
}
var wdt = '';
wdt = $(window).width();
//var wtd = $("#teamPasses").width();
$(window).resize(function() {
	wdt = $(window).width();
	chartliexample3.setOption({
		graphic: [
			{
				style: {
					width: wdt
				}
			}
		]
	});
});

$.ajax({
	type: 'GET',
	contentType: 'application/json; charset=utf-8',
	dataType: 'json',
	url: './assets/data/team-passes.json',
	error: function() {
		alert('An error occurred.');
	},
	success: function(data) {
		var datas = data.league.premier_league.teams.tottenham.players;
		chartliexample3.setOption({
			// Fill with texture
			color: {
				image: './assets/img/template-images/forward-triangle.png', // HTMLImageElement, and HTMLCanvasElement are supported, while string path is not supported
				repeat: 'repeat' // whether to repeat texture, whose value can be repeat-x, repeat-y, or no-repeat
			},
			toolbox: {
				feature: {
					saveAsImage: {
						backgroundColor: '#232323',
						pixelRatio: 1
					}
				}
			},
			graphic: [
				{
					type: 'image',
					id: 'logo',
					right: 0,
					top: 0,
					z: -10,
					bounding: 'raw',
					origin: [0, 0],
					style: {
						image: './assets/img/template-images/footbal-pitch.svg',
						width: wdt,
						height: 2100
					}
				}
			],
			series: [
				{
					name: datas[0].name,
					type: 'pie',
					radius: ['10%', '25%'],
					center: ['50%', '90%'],
					roseType: 'area',
					color: ['#3fa7dc'],
					hoverOffset: 0,
					label: {
						show: false
					},
					itemStyle: {
						color: '#007236',
						shadowBlur: 10,
						shadowOffsetX: 0,
						borderWidth: 1,
						borderColor: 'rgba(0,0,0,.2)',
						emphasis: {
							color: '#fdc203'
						}
					},
					data: datas[0].data
				},
				{
					name: 'Lloris',
					type: 'pie',
					radius: ['0', '10%'],
					center: ['50%', '90%'],
					itemStyle: {
						color: 'transparent'
					},
					data: [100],
					labelLine: {
						show: false
					},
					hoverAnimation: false,
					label: {
						position: 'center',
						formatter: ['\n', '{b|}', '{x|' + datas[0].name + '}', '{x|' + sumArray(datas[0].data) + '(68.7)}'].join(
							'\n'
						),
						rich: {
							b: {
								backgroundColor: {
									image: datas[0].image
								},
								width: 80,
								height: 80
							},
							x: {
								fontSize: 14,
								fontFamily: 'Lato',
								color: '#fdc203'
							}
						}
					}
				},
				{
					name: datas[1].name,
					type: 'pie',
					radius: ['10%', '25%'],
					center: ['15%', '65%'],
					roseType: 'area',
					color: ['#3fa7dc'],

					hoverOffset: 0,
					label: {
						show: false
					},
					itemStyle: {
						color: '#007236',
						shadowBlur: 10,
						shadowOffsetX: 0,
						borderWidth: 1,
						borderColor: 'rgba(0,0,0,.2)',
						emphasis: {
							color: '#fdc203'
						}
					},
					data: datas[1].data
				},
				{
					name: datas[1].name,
					type: 'pie',
					radius: ['0', '10%'],
					center: ['15%', '65%'],
					itemStyle: {
						color: 'transparent'
					},
					data: [100],
					labelLine: {
						show: false
					},
					hoverAnimation: false,
					label: {
						position: 'center',
						formatter: ['\n', '{b|}', '{x|' + datas[1].name + '}', '{x|' + sumArray(datas[1].data) + '(72.4)}'].join(
							'\n'
						),
						rich: {
							b: {
								backgroundColor: {
									image: datas[1].image
								},
								width: 80,
								height: 80
							},
							x: {
								fontSize: 14,
								fontFamily: 'Lato',
								color: '#fdc203'
							}
						}
					}
				},
				{
					name: datas[2].name,
					type: 'pie',
					radius: ['10%', '25%'],
					center: ['38%', '75%'],
					roseType: 'area',
					color: ['#3fa7dc'],

					hoverOffset: 0,
					label: {
						show: false
					},
					itemStyle: {
						color: '#007236',
						shadowBlur: 10,
						shadowOffsetX: 0,
						borderWidth: 1,
						borderColor: 'rgba(0,0,0,.2)',
						emphasis: {
							color: '#fdc203'
						}
					},
					data: datas[2].data
				},
				{
					name: datas[2].name,
					type: 'pie',
					radius: ['0', '10%'],
					center: ['38%', '75%'],
					itemStyle: {
						color: 'transparent'
					},
					data: [100],
					labelLine: {
						show: false
					},
					hoverAnimation: false,
					label: {
						position: 'center',
						formatter: ['\n', '{b|}', '{x|' + datas[2].name + '}', '{x|' + sumArray(datas[2].data) + '(80.5)}'].join(
							'\n'
						),
						rich: {
							b: {
								backgroundColor: {
									image: datas[2].image
								},
								width: 80,
								height: 80
							},
							x: {
								fontSize: 14,
								fontFamily: 'Lato',
								color: '#fdc203'
							}
						}
					}
				},
				{
					name: datas[3].name,
					type: 'pie',
					radius: ['10%', '25%'],
					center: ['65%', '75%'],
					roseType: 'area',
					color: ['#3fa7dc'],

					hoverOffset: 0,
					label: {
						show: false
					},
					itemStyle: {
						color: '#007236',
						shadowBlur: 10,
						shadowOffsetX: 0,
						borderWidth: 1,
						borderColor: 'rgba(0,0,0,.2)',
						emphasis: {
							color: '#fdc203'
						}
					},
					data: datas[3].data
				},
				{
					name: datas[3].name,
					type: 'pie',
					radius: ['0', '10%'],
					center: ['65%', '75%'],
					itemStyle: {
						color: 'transparent'
					},
					data: [100],
					labelLine: {
						show: false
					},
					hoverAnimation: false,
					label: {
						position: 'center',
						formatter: ['\n', '{b|}', '{x|' + datas[3].name + '}', '{x|' + sumArray(datas[3].data) + '(94.1)}'].join(
							'\n'
						),
						rich: {
							b: {
								backgroundColor: {
									image: datas[3].image
								},
								width: 80,
								height: 80
							},
							x: {
								fontSize: 14,
								fontFamily: 'Lato',
								color: '#fdc203'
							}
						}
					}
				},
				{
					name: datas[4].name,
					type: 'pie',
					radius: ['10%', '25%'],
					center: ['82%', '65%'],
					roseType: 'area',
					color: ['#3fa7dc'],

					hoverOffset: 0,
					label: {
						show: false
					},
					itemStyle: {
						color: '#007236',
						shadowBlur: 10,
						shadowOffsetX: 0,
						borderWidth: 1,
						borderColor: 'rgba(0,0,0,.2)',
						emphasis: {
							color: '#fdc203'
						}
					},
					data: datas[4].data
				},
				{
					name: datas[4].name,
					type: 'pie',
					radius: ['0', '10%'],
					center: ['82%', '65%'],
					itemStyle: {
						color: 'transparent'
					},
					data: [100],
					labelLine: {
						show: false
					},
					hoverAnimation: false,
					label: {
						position: 'center',
						formatter: ['\n', '{b|}', '{x|' + datas[4].name + '}', '{x|' + sumArray(datas[4].data) + '(82.4)}'].join(
							'\n'
						),
						rich: {
							b: {
								backgroundColor: {
									image: datas[4].image
								},
								width: 80,
								height: 80
							},
							x: {
								fontSize: 14,
								fontFamily: 'Lato',
								color: '#fdc203'
							}
						}
					}
				},
				{
					name: datas[5].name,
					type: 'pie',
					radius: ['10%', '25%'],
					center: ['30%', '50%'],
					roseType: 'area',
					color: ['#3fa7dc'],

					hoverOffset: 0,
					label: {
						show: false
					},
					itemStyle: {
						color: '#007236',
						shadowBlur: 10,
						shadowOffsetX: 0,
						borderWidth: 1,
						borderColor: 'rgba(0,0,0,.2)',
						emphasis: {
							color: '#fdc203'
						}
					},
					data: datas[5].data
				},
				{
					name: datas[5].name,
					type: 'pie',
					radius: ['0', '10%'],
					center: ['30%%', '50%'],
					itemStyle: {
						color: 'transparent'
					},
					data: [100],
					labelLine: {
						show: false
					},
					hoverAnimation: false,
					label: {
						position: 'center',
						formatter: ['\n', '{b|}', '{x|' + datas[5].name + '}', '{x|' + sumArray(datas[5].data) + '(90.5)}'].join(
							'\n'
						),
						rich: {
							b: {
								backgroundColor: {
									image: datas[5].image
								},
								width: 80,
								height: 80
							},
							x: {
								fontSize: 14,
								fontFamily: 'Lato',
								color: '#fdc203'
							}
						}
					}
				},
				{
					name: datas[6].name,
					type: 'pie',
					radius: ['10%', '25%'],
					center: ['70%', '50%'],
					roseType: 'area',
					color: ['#3fa7dc'],

					hoverOffset: 0,
					label: {
						show: false
					},
					itemStyle: {
						color: '#007236',
						shadowBlur: 10,
						shadowOffsetX: 0,
						borderWidth: 1,
						borderColor: 'rgba(0,0,0,.2)',
						emphasis: {
							color: '#fdc203'
						}
					},
					data: datas[6].data
				},
				{
					name: datas[6].name,
					type: 'pie',
					radius: ['0', '10%'],
					center: ['70%%', '50%'],
					itemStyle: {
						color: 'transparent'
					},
					data: [100],
					labelLine: {
						show: false
					},
					hoverAnimation: false,
					label: {
						position: 'center',
						formatter: ['\n', '{b|}', '{x|' + datas[6].name + '}', '{x|' + sumArray(datas[6].data) + '(88.5)}'].join(
							'\n'
						),
						rich: {
							b: {
								backgroundColor: {
									image: datas[6].image
								},
								width: 80,
								height: 80
							},
							x: {
								fontSize: 14,
								fontFamily: 'Lato',
								color: '#fdc203'
							}
						}
					}
				},
				{
					name: datas[7].name,
					type: 'pie',
					radius: ['10%', '25%'],
					center: ['20%', '20%'],
					roseType: 'area',
					color: ['#3fa7dc'],

					hoverOffset: 0,
					label: {
						show: false
					},
					itemStyle: {
						color: '#007236',
						shadowBlur: 10,
						shadowOffsetX: 0,
						borderWidth: 1,
						borderColor: 'rgba(0,0,0,.2)',
						emphasis: {
							color: '#fdc203'
						}
					},
					data: datas[7].data
				},
				{
					name: datas[7].name,
					type: 'pie',
					radius: ['0', '10%'],
					center: ['20%', '20%'],
					itemStyle: {
						color: 'transparent'
					},
					data: [100],
					labelLine: {
						show: false
					},
					hoverAnimation: false,
					label: {
						position: 'center',
						formatter: ['\n', '{b|}', '{x|' + datas[7].name + '}', '{x|' + sumArray(datas[7].data) + '(75.3)}'].join(
							'\n'
						),
						rich: {
							b: {
								backgroundColor: {
									image: datas[7].image
								},
								width: 80,
								height: 80
							},
							x: {
								fontSize: 14,
								fontFamily: 'Lato',
								color: '#fdc203'
							}
						}
					}
				},
				{
					name: datas[8].name,
					type: 'pie',
					radius: ['10%', '25%'],
					center: ['50%', '35%'],
					roseType: 'area',
					color: ['#3fa7dc'],

					hoverOffset: 0,
					label: {
						show: false
					},
					itemStyle: {
						color: '#007236',
						shadowBlur: 10,
						shadowOffsetX: 0,
						borderWidth: 1,
						borderColor: 'rgba(0,0,0,.2)',
						emphasis: {
							color: '#fdc203'
						}
					},
					data: datas[8].data
				},
				{
					name: datas[8].name,
					type: 'pie',
					radius: ['0', '10%'],
					center: ['50%', '35%'],
					itemStyle: {
						color: 'transparent'
					},
					data: [100],
					labelLine: {
						show: false
					},
					hoverAnimation: false,
					label: {
						position: 'center',
						formatter: ['\n', '{b|}', '{x|' + datas[8].name + '}', '{x|' + sumArray(datas[8].data) + '(90.4)}'].join(
							'\n'
						),
						rich: {
							b: {
								backgroundColor: {
									image: datas[8].image
								},
								width: 80,
								height: 80
							},
							x: {
								fontSize: 14,
								fontFamily: 'Lato',
								color: '#fdc203'
							}
						}
					}
				},
				{
					name: datas[9].name,
					type: 'pie',
					radius: ['10%', '25%'],
					center: ['85%', '20%'],
					roseType: 'area',
					color: ['#3fa7dc'],

					hoverOffset: 0,
					label: {
						show: false
					},
					itemStyle: {
						color: '#007236',
						shadowBlur: 10,
						shadowOffsetX: 0,
						borderWidth: 1,
						borderColor: 'rgba(0,0,0,.2)',
						emphasis: {
							color: '#fdc203'
						}
					},
					//data directions forward == >> to forward
					data: datas[9].data
				},
				{
					name: datas[9].name,
					type: 'pie',
					radius: ['0', '10%'],
					center: ['85%', '20%'],
					itemStyle: {
						color: 'transparent'
					},
					data: [100],
					labelLine: {
						show: false
					},
					hoverAnimation: false,
					label: {
						position: 'center',
						formatter: ['\n', '{b|}', '{x|' + datas[9].name + '}', '{x|' + sumArray(datas[9].data) + '(58.5)}'].join(
							'\n'
						),
						rich: {
							b: {
								backgroundColor: {
									image: datas[9].image
								},
								width: 80,
								height: 80
							},
							x: {
								fontSize: 14,
								fontFamily: 'Lato',
								color: '#fdc203'
							}
						}
					}
				},
				{
					name: datas[10].name,
					type: 'pie',
					radius: ['10%', '25%'],
					center: ['50%', '13%'],
					roseType: 'area',
					color: ['#3fa7dc'],

					hoverOffset: 0,
					label: {
						show: false
					},
					itemStyle: {
						color: '#007236',
						shadowBlur: 10,
						shadowOffsetX: 0,
						borderWidth: 1,
						borderColor: 'rgba(0,0,0,.2)',
						emphasis: {
							color: '#fdc203'
						}
					},
					data: datas[10].data
				},
				{
					name: datas[10].name,
					type: 'pie',
					radius: ['0', '10%'],
					center: ['50%', '13%'],
					itemStyle: {
						color: 'transparent'
					},
					data: [100],
					labelLine: {
						show: false
					},
					hoverAnimation: false,
					label: {
						position: 'center',
						formatter: ['\n', '{b|}', '{x|' + datas[10].name + '}', '{x|' + sumArray(datas[10].data) + '(54.3)}'].join(
							'\n'
						),
						rich: {
							b: {
								backgroundColor: {
									image: datas[10].image
								},
								width: 80,
								height: 80
							},
							x: {
								fontSize: 14,
								fontFamily: 'Lato',
								color: '#fdc203'
							}
						}
					}
				}
			]
		});
		chartliexample3.hideLoading();
	}
});
