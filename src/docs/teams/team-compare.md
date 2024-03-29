# Team Compare

![logo](../../assets/img/chart-images/ex-20.png ':size=100% :class=previewImage')



> First of all create html div element

````html
<div id="teamsCompareGraph" style="width:100%;height:580px"></div>
````

````javascript
var teamsCompareChart = echarts.init(document.getElementById("teamsCompareGraph"), null, {
	renderer: "canvas"
});
$.get("./assets/data/team-compare.json", function(data) {
	teamsCompareChart.hideLoading();
	var option: {...chart configrations}
	teamsCompareChart.setOption(option);
}
````

> [!TIP|style:flat|label:Sample Json Data]
> Sample json data must be like this for player-teamsCompare.


````json
{
   "dataNames":[
      "Matches played",
      "Wins",
      "Losses",
      "Goals",
      "Clean sheets",
      "Goals per match",
      "Shots",
      "Shots on target",
      "Passes",
      "Pass accuracy %",
      "Yellow cards",
      "Red cards",
      "Penalties scored"
   ],
   "colors":[
      {
         "name":"Green",
         "value":"#3BB273"
      },
      {
         "name":"Blue",
         "value":"#0B5563"
      },
      {
         "name":"Orange",
         "value":"#E94F37"
      },
      {
         "name":"Purple",
         "value":"#2F2235"
      },
      {
         "name":"Purple2",
         "value":"#6B0E3E"
      }
   ],
   "players":[
      {
         "name":"Liverpool",
         "identy":"liverpool",
         "data":[
            39,
            30,
            1,
            89,
            21,
            2.28,
            575,
            226,
            23638,
            84,
            38,
            2,
            7
         ]
      },
      {
         "name":"Chelsea",
         "identy":"chelsea",
         "data":[
            39,
            21,
            8,
            63,
            16,
            1.66,
            607,
            198,
            25070,
            88,
            49,
            0,
            5
         ]
      },
      {
         "name":"M.United",
         "identy":"manu",
         "data":[
            39,
            19,
            10,
            65,
            7,
            1.67,
            526,
            225,
            19202,
            82,
            73,
            4,
            9
         ]
      },
      {
         "name":"Tottenham",
         "identy":"tottenham",
         "data":[
            39,
            23,
            13,
            67,
            13,
            1.76,
            537,
            189,
            21295,
            83,
            56,
            3,
            4
         ]
      },
      {
         "name":"M.City",
         "identy":"mancity",
         "data":[
            39,
            32,
            4,
            95,
            20,
            2.50,
            683,
            260,
            26581,
            89,
            44,
            1,
            3
         ]
      },
      {
         "name":"Arsenal",
         "identy":"arsenal",
         "data":[
            39,
            21,
            10,
            73,
            8,
            1.92,
            467,
            170,
            20805,
            83,
            72,
            2,
            4
         ]
      }
   ]
}
````
