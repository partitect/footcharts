"use strict";
var EventChart = echarts.init(document.getElementById("singleGame"));

var urlParams = new URLSearchParams(window.location.search);

var gameID = urlParams.get("gameId");
var option = "";
GetPlayers(gameID);
var SaveIcon = "./assets/img/template-images/screenshot.svg";
var direction = "";
var labelAngel = "";
var rotateVal = "";
var symbol = "";
var offsetVal = 0;
var labelAlign = "";
var lineData = [];
var lineDataOffset1 = 0;
var lineDataOffset2 = 0;
var lineDataYOffset = -1;

function GetPlayers(id) {
  $.get("./assets/data/single-game.json", function (response) {
    var evts = response.events;
    var SeriesData = [];
    for (var i = 0; i < evts.length; i++) {
      if (evts[i].team == "a") {
        direction = "left";
        labelAlign = "right";
        offsetVal = -40;
        lineDataOffset1 = 45;
        lineDataOffset2 = 40;

        if (i != 0) {
          if (evts[i - 1].minute == evts[i].minute) {

            lineDataYOffset += 1.5;
          }
        }
      } else if (evts[i].team == "b") {
        direction = "right";
        labelAlign = "left";
        lineDataOffset1 = 45;
        lineDataOffset2 = 50;
        offsetVal = 40;

        if (i != 0) {
          if (evts[i - 1].minute == evts[i].minute) {

            lineDataYOffset += 1.5;

          }
        }
      }

      if (evts[i].type == "Yellow Card") symbol = "yellowcard";
      else if (evts[i].type == "Goal") symbol = "soccer";
      else if (evts[i].type == "VAR") symbol = "Monitor";
      else if (evts[i].type == "Penalty") symbol = "goal";
      else if (evts[i].type == "Red Card") symbol = "redcard";
      else if (evts[i].type == "Double Yellow Card") symbol = "cards";
      else if (evts[i].type == "Subsition") symbol = "subs";
      lineData.push({
        coords: [
          [lineDataOffset1, evts[i].minute],
          [lineDataOffset2, evts[i].minute + lineDataYOffset]
        ],
        value: evts[i].minute,
        name: evts[i].type,
        pname: evts[i].player_name,
        subname: evts[i].sub_player_name,
        minute: evts[i].minute,
        label: {
          borderWidth: 2,
          borderLeftColor: "white",
          verticalAlign: "middle",
          align: labelAlign,
          rich: {
            logo: {
              backgroundColor: {
                image: "./assets/img/template-images/" + symbol + ".svg"
              },
              width: 15,
              height: 15
            },
            name: {
              textAlign: "left",
              fontFamily: "Oxygen, sans-serif",
              fontSize: 14,
              color: "#cb8753",
              textBorderColor: "transparent"
            }
          },
          formatter: function (value) {
            var subsName = "";
            if (value.data.name == "Subsition") {
              subsName = "-" + "(" + value.data.subname + ")";
            } else {
              subsName = "";
            }
            return (
              " {name|" +
              value.data.minute +
              '"' +
              "} {logo|} {name| " +
              value.data.pname +
              subsName +
              "} "
            );
          }
        }
      })
      SeriesData.push({
        value: evts[i].minute,
        name: evts[i].type,
        pname: evts[i].player_name,
        subname: evts[i].sub_player_name,
        minute: evts[i].minute,
        itemStyle: {
          color: evts[i].color
        },
      });
    }
    option = {
      backgroundColor: "#110708",
      tooltip: {
        trigger: "item"
      },
      grid: [{
          top: 0,
          left: 0,
          width: "55%",
          bottom: 0,
          containLabel: false
        },
        {
          top: 50,
          width: "100%",
          right: "0",
          bottom: 100,
          containLabel: false
        }
      ],
      xAxis: [{
          show: false,
          type: "category",
          data: [1],
          gridIndex: 1
        },
        {
          show: false,
          min: 0,
          max: 90,
          interval: 1,
          gridIndex: 1
        }
      ],
      yAxis: [{
          show: false,
          interval: 3,
          type: "value",
          max: 90,
          min: 0,
          inverse: true,
          splitNumber: 10,
          gridIndex: 1
        },
        {
          show: false,
          min: 0,
          max: 90,
          interval: 1,
          gridIndex: 1,
          inverse: true
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
            backgroundColor: "#110708",
            title: "Save As Image",
            icon: "image://" + SaveIcon + ""
          }
        },
        top: 0,
        right: 20,
        zlevel: 9
      },
      series: [{
          name: "Event",
          type: "bar",
          data: [90],
          tooltip: {
            show: false
          },
          barWidth: 2,
          itemStyle: {
            color: "#cb8753"
          },
          markPoint: {
            symbol: "image://./assets/img/template-images/whistle.svg",
            silent: false,
            label: {
              formatter: "KICK OFF",
              position: "top",
              offset: [0, 10],
              fontSize: 16,
              fontFamily: "Oxygen, sans-serif"
            },
            tooltip: {
              show: false
            },
            symbolKeepAspect: true,
            symbolSize: 20,
            data: [{
              coord: [0, 0]
            }]
          },
          label: {
            normal: {
              show: false
            }
          }
        },
        {
          name: "Liverpool v Tottenham",
          type: "lines",
          coordinateSystem: "cartesian2d",
          data: lineData,
          xAxisIndex: 1,
          yAxisIndex: 1,
          symbol:'circle',
          lineStyle: {
            normal: {
              color: "#cb8753",
              opacity: 1,
              width: 1,
              curveness: .2
            }
          },
          label: {
            show: true
          }
        }
      ]
    };
    EventChart.setOption(option);
  });
}
