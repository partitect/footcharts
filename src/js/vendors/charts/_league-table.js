var myChart = echarts.init(document.getElementById("table"), null, {
  renderer: "canvas"
});


//Set Starting Parameters
myChart.showLoading();
if (localStorage.getItem("league") === null) {
  localStorage.setItem("league", "premier-league");
}
if (localStorage.getItem("week") === null) {
  localStorage.setItem("week", "week1");
}
if (localStorage.getItem("chartColor") == null) {
  localStorage.setItem("chartColor", "55, 0, 60");
}
if (localStorage.getItem("title1") == null) {
  localStorage.setItem("title1", "Premier League");
}
if (localStorage.getItem("title2") == null) {
  localStorage.setItem("title2", "Week 1");
}
$(".table-segment").css(
  "background",
  "rgba(" + localStorage.getItem("chartColor") + ",1)"
);
var SaveIcon = "./assets/img/template-images/screenshot.svg";
//League Select Function
$(".ui.dropdown.league-select")
  .dropdown({
    onChange: function(value, text) {
      localStorage.setItem("league", value);
      GetTable(
        value,
        localStorage.getItem("week"),
        localStorage.getItem("chartColor")
      );
      localStorage.setItem("title1", text.replace(/(<([^>]+)>)/gi, ""));
    }
  })
  .dropdown("set selected", localStorage.getItem("league"));

//Week Select Function
$(".ui.dropdown.week-select")
  .dropdown({
    onChange: function(value, text) {
      localStorage.setItem("week", value);
      GetTable(
        localStorage.getItem("league"),
        value,
        localStorage.getItem("chartColor")
      );
      localStorage.setItem("title2", text.replace(/(<([^>]+)>)/gi, ""));
    }
  })
  .dropdown("set selected", localStorage.getItem("week").replace("week", ""));

//Chart Color Select Function
$(".ui.dropdown.color-select")
  .dropdown({
    onChange: function(value) {
      localStorage.setItem("chartColor", value);

      $(".table-segment").css("background", "rgba(" + value + ",1)");

      GetTable(
        localStorage.getItem("league"),
        localStorage.getItem("week"),
        value
      );
    }
  })
  .dropdown("set selected", localStorage.getItem("chartColor"));

GetTable(
  localStorage.getItem("league"),
  localStorage.getItem("week"),
  localStorage.getItem("chartColor")
);

function GetTable(league, weeko, chartColor = "rgba(55, 0, 60,.6)") {
  $.get("./assets/data/" + league + "/table.json", function(data) {
    var newDatas = [];
    var newStatus = [];
    var barData = [];
    var newPositions = [];
    newStatus.push(data.status);
    newDatas.push(data.weeks);

    var cWeek = []; //Current Week

    var weekname = weeko.replace("week", "");

    $.each(newDatas, function(index, value) {
      cWeek.push([value["week" + weekname + ""]]);
    });

    var CurrentWeek = cWeek[0][0];

    var datas = [];
    var barItemStyle = [];
    var bar2ItemStyle = [];
    var bar4ItemStyle = [];

    var temp = []; //create array

    for (var i in CurrentWeek) temp.push(CurrentWeek[i]); //fill array
    var sorted = temp.sort(function(a, b) {
      return b.pts - a.pts || b.gd - a.gd || b.ga - a.ga || b.gf - a.gf;
    }); //sort array
    var weekMenu = "";
    $.map(data.weeks, function(n, i, index) {
      weekMenu +=
        '<div class="item" data-value="' +
        i +
        '"><img src="./assets/img/template-images/calendar.svg" class="ui avatar image calendar-image"/>Week ' +
        i.replace("week", "") +
        "</div>";
      $(".ui.dropdown.week-select").dropdown(
        "set selected",
        localStorage.getItem("week")
      );
    });

    $(".week-menu").html(weekMenu);
    for (var i = 0; i < sorted.length; i++) {
      barItemStyle.push({
        value: 81,
        name: sorted[i].name,
        itemStyle: {
          color: new echarts.graphic.RadialGradient(0, 10, 2, [
            {
              offset: 0,
              color: "rgb(251, 118, 123)"
            },
            {
              offset: 1,
              color: "rgba(" + chartColor + ",.6)"
            }
          ])
        },
        tooltip: {
          show: false
          /* textStyle:{
            color:'#fff',
            fontSize:20,
            },
            position: 'inside',
            padding: 10,
            extraCssText: 'border-radius:100%;height:100px;width:100px;background:linear-gradient(180deg, ' + sorted[i].color2 + ' 50%, ' + sorted[i].color1 + ' 50%)',

            formatter: function(value) {
                var type =" ";
                return type;
            } */
        },
        label: {
          color: "black",
          position: [40, 9],
          rich: {
            start1: {
              backgroundColor: {
                image:
                  "./assets/img/leagues/" +
                  league +
                  "/team-logo/" +
                  sorted[i].logo +
                  ".png"
              },

              width: 40,
              height: 40,
              align: "left"
            },
            up: {
              backgroundColor: {
                image: "./assets/img/template-images/up.svg"
              }
            },
            down: {
              backgroundColor: {
                image: "./assets/img/template-images/down.svg"
              }
            },
            black: {
              color: "#fff",
              fontSize: 16,
              align: "left"
            }
          },
          formatter: function(value) {
            return (
              "  {black|" +
              (value.dataIndex + 1) +
              ".}    {start1|}    {black|" +
              value.name +
              "}"
            );
          }
        }
      });
      barData.push({
        value: 4,
        name: sorted[i].previous_position + "-" + sorted[i].league_position,
        itemStyle: { color: "transparent" },
        tooltip: {
          backgroundColor: "#000",
          textStyle: {
            color: "#fff",
            textShadowColor: "red",
            textShadowBlur: 20,
            fontSize: 20
          },
          position: "right",
          padding: 10,
          extraCssText:
            "margin-left:-40px;background:linear-gradient(180deg, " +
            sorted[i].color2 +
            " 50%, " +
            sorted[i].color1 +
            " 50%)",
          formatter: function(value) {
            var type = "";
            var position = value.name.split("-");

            var prev = parseInt(position[0]);
            var curr = parseInt(position[1]);
            if (prev == 0) {
              type = "First Week";
            } else {
              type = "Previus Position : " + prev + "";
            }

            return type;
          }
        },
        label: {
          show: true,
          position: [20, 23],
          rich: {
            up: {
              backgroundColor: {
                image: "./assets/img/template-images/up.svg"
              },
              width: 15,
              height: 15
            },
            down: {
              backgroundColor: {
                image: "./assets/img/template-images/down.svg"
              },
              width: 15,
              height: 15
            },
            fixed: {
              backgroundColor: {
                image: "./assets/img/template-images/eq.svg"
              },
              width: 12,
              height: 12
            }
          },
          formatter: function(value) {
            var type = "";
            var position = value.name.split("-");

            var prev = parseInt(position[0]);
            var curr = parseInt(position[1]);
            if (prev == 0) {
              type = "{fixed|}        ";
            } else {
              if (curr < prev) {
                type = "{up|}        ";
              } else if (curr > prev) {
                type = "{down|}        ";
              } else if (curr == prev) {
                type = "{fixed|}        ";
              }
            }

            return type;
          }
        }
      });
      bar2ItemStyle.push({
        value: 10,
        name: sorted[i].lp,
        itemStyle: {
          color: new echarts.graphic.RadialGradient(0, 10, 2, [
            {
              offset: 0,
              color: "rgb(251, 118, 123)"
            },
            {
              offset: 1,
              color: "rgba(" + chartColor + ",.6)"
            }
          ])
        },
        tooltip: {
          backgroundColor: "#000",
          textStyle: {
            color: "#fff",
            textShadowColor: "red",
            textShadowBlur: 20,
            fontSize: 12
          },
          position: "top",
          padding: 10,
          extraCssText: "margin-left:-80px;margin-top:20px",

          formatter: function(value) {
            //console.log(value.data.name.length)
            var type = "Last 5 Mactch<hr/>";
            for (var a = 0; a < value.data.name.length; a++) {
              if (value.data.name[a].name == "1") {
                type += "Won-" + value.data.name[a].value + "<br/>";
              } else if (value.data.name[a].name == "0") {
                type += "Draw-" + value.data.name[a].value + "<br/>";
              } else if (value.data.name[a].name == "2") {
                type += "Lost-" + value.data.name[a].value + "<br/>";
              }
            }
            return type;
          }
        },
        label: {
          color: "black",
          position: [30, "30%"],
          align: "left",
          rich: {
            win: {
              backgroundColor: {
                image: "./assets/img/template-images/win1.svg"
              },
              width: 20,
              height: 20
            },
            draw: {
              backgroundColor: {
                image: "./assets/img/template-images/draw1.svg"
              },
              width: 20,
              height: 20
            },
            lost: {
              backgroundColor: {
                image: "./assets/img/template-images/lost1.svg"
              },
              width: 20,
              height: 20
            }
          },
          formatter: function(value) {
            console.log(value.data.name.length);
            var type = "";
            for (var a = 0; a < value.data.name.length; a++) {
              if (value.data.name[a].name == "1") {
                type += "{win|}";
              } else if (value.data.name[a].name == "0") {
                type += "{draw|}";
              } else if (value.data.name[a].name == "2") {
                type += "{lost|}";
              }
            }
            return type;
          }
        }
      });
      bar4ItemStyle.push({
        value: 10,
        name: sorted[i].next_play,
        itemStyle: {
          color: new echarts.graphic.RadialGradient(0, 10, 2, [
            {
              offset: 0,
              color: "rgb(251, 118, 123)"
            },
            {
              offset: 1,
              color: "rgba(" + chartColor + ",.6)"
            }
          ])
        },
        tooltip: {
          backgroundColor: "#000",
          textStyle: {
            color: "#fff",
            textShadowColor: "red",
            textShadowBlur: 20,
            fontSize: 14,
            align: "center"
          },
          position: "top",

          padding: 10,
          extraCssText: "margin-left:-80px;margin-top:20px",
          formatter: function(value) {
            return (
              "Next Round<hr/>" +
              value.data.name.name +
              "<br />" +
              value.data.name.date +
              ""
            );
          }
        },
        label: {
          color: "black",
          position: "inside",
          align: "left",
          rich: {
            win: {
              backgroundColor: {
                image:
                  "./assets/img/leagues/" +
                  league +
                  "/team-logo/" +
                  sorted[i].next_play.logo +
                  ".png"
              },
              width: 30,
              height: 30
            }
          },
          formatter: function(value) {
            var type = "";
            type = "{win|}";
            return type;
          }
        }
      });
      datas.push(
        [i, 5, sorted[i].win + sorted[i].draw + sorted[i].lost],
        [i, 6, sorted[i].win],
        [i, 7, sorted[i].draw],
        [i, 8, sorted[i].lost],
        [i, 9, sorted[i].gf],
        [i, 10, sorted[i].ga],
        [i, 11, sorted[i].gf - sorted[i].ga],
        [i, 12, sorted[i].win * 3 + sorted[i].draw]
      );
    }

    var hours = [
      "Pos.",
      "Club",
      "",
      "",
      "",
      "Play",
      "Won",
      "Draw",
      "Lost",
      "GF",
      "GA",
      "GD",
      "Pts",
      "Form",
      "",
      "Next"
    ];

    var data = datas;

    data = data.map(function(item) {
      return [item[1], item[0], item[2]];
    });

    option = {
      textStyle: {
        fontFamily: "Exo_2, sans-serif",
        fontWeight: 400
      },
      title: {
        text:
          localStorage.getItem("title1") + "-" + localStorage.getItem("title2"),
        left: "17",
        top: 10,
        textStyle: {
          fontFamily: "Quantico, sans-serif",
          fontWeight: 700,
          fontSize: 40,
          color: "#FBE122"
        }
      },
      tooltip: {
        position: "top"
      },
      grid: {
        top: 100,
        left: 0,
        right: 0,
        bottom: 50,
        containLabel: false
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
            show: true,
            pixelRatio: 2,
            backgroundColor: "rgba(" + chartColor + ",.6)",
            title: "Save As Image",
            icon: "image://" + SaveIcon + ""
          }
        },
        top: 10,
        right: 20,
        zlevel: 9
      },
      xAxis: [
        {
          position: "top",
          type: "category",

          data: hours,
          splitArea: {
            show: true,
            interval: 12
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            fontSize: 18,
            margin: 17,
            color: "#fff",
            verticalAlign: "middle"
          }
        },
        {
          type: "value",
          show: false,
          max: 100
        }
      ],
      yAxis: {
        type: "category",
        //data: days,
        inverse: true,
        splitArea: {
          show: true
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          show: false
        }
      },

      series: [
        {
          name: "",
          type: "heatmap",
          data: data,
          blurSize: 1,
          minOpacity: 1,
          zlevel: 9,
          label: {
            normal: {
              show: true,
              fontSize: 16
            }
          },
          itemStyle: {
            color: "rgba(0,0,0,0)"
          }
        },
        {
          name: "",
          type: "bar",
          barWidth: 60,
          zlevel: 9,
          data: barData,
          xAxisIndex: 1
        },
        {
          name: "",
          type: "bar",
          barWidth: 60,
          zlevel: 9,
          data: newStatus[0],
          xAxisIndex: 1
        },
        {
          name: "",
          type: "bar",
          barWidth: 60,
          stack: "扫描量",
          animationThreshold: 100,
          animationDuration: function(idx) {
            // delay for later data is larger
            return idx * 30;
          },
          data: barItemStyle,
          xAxisIndex: 1,
          label: {
            normal: {
              show: true,
              fontSize: 16
            }
          }
        },
        {
          type: "bar",
          barGap: "-100%",
          barWidth: 60,
          animation: false,
          z: 99,
          stack: "扫描量",
          xAxisIndex: 1,
          itemStyle: {
            color: "#2f3b4e"
          },
          label: {
            show: true
            //position: 'right',
          },
          data: bar2ItemStyle
        },
        {
          type: "bar",
          barGap: "-100%",
          barWidth: 60,
          animation: false,
          z: 100,
          zlevel: 1090,
          stack: "扫描量",
          xAxisIndex: 1,
          itemStyle: {
            color: "#2f3b4e"
          },
          label: {
            show: true
            //position: 'right',
          },
          data: bar4ItemStyle
        }
      ]
    };
    myChart.hideLoading();
    myChart.setOption(option);
  });
}
