# Player Passes

![logo](../../assets/img/chart-images/ex-1.png ':size=100% :class=previewImage')



> First of all create html div element

````html
<div id="passGraph" style="width:100%;height:580px"></div>
````

````javascript
var passChart = echarts.init(document.getElementById("passGraph"), null, {
	renderer: "canvas"
});
$.get("./assets/data/player-passes.json", function(data) {
	passChart.hideLoading();
	var option: {...chart configrations}
	passChart.setOption(option);
}
````

> [!TIP|style:flat|label:Sample Json Data]
> Sample json data must be like this for player-passes.

```json
{
   "colors":[
      {
         "name":"Green",
         "value":"#3BB273"
      },
      {
         "name":"Blue",
         "value":"#4D9DE0"
      },
      {
         "name":"Orange",
         "value":"#E56B2D"
      },
      {
         "name":"Yellow",
         "value":"#E1BC29"
      },
      {
         "name":"Purple",
         "value":"#7768AE"
      },
      {
         "name":"Red",
         "value":"#E15554"
      }
   ],
   "players":[
      {
         "name":"A. Laporte",
         "identy":"laporte",
         "team":"Manchester City",
         "data":[
            82,
            54,
            74,
            96,
            25,
            38,
            95,
            48,
            51,
            76,
            62,
            68,
            95,
            98,
            102,
            36,
            85,
            24,
            75,
            86,
            44,
            58,
            63
         ]
      },
      {
         "name":"P. Pogba",
         "identy":"pogba",
         "team":"Manchester United",
         "data":[
            57,
            89,
            104,
            25,
            114,
            75,
            62,
            53,
            44,
            52,
            88,
            26,
            51,
            65,
            71,
            25
         ]
      },
      {
         "name":"H. Kane",
         "identy":"kane",
         "team":"Tottenham Hotspur",
         "data":[
            18,
            24,
            52,
            91,
            14,
            35,
            65,
            74,
            14,
            25,
            18,
            65,
            21,
            45,
            36,
            47,
            53,
            29,
            16,
            22,
            43,
            65,
            37,
            45
         ]
      },
      {
         "name":"V. Van Dijk",
         "identy":"vandijk",
         "team":"Liverpool",
         "data":[
            59,
            98,
            74,
            25,
            82,
            62,
            69,
            75,
            99,
            105,
            62,
            36,
            75,
            25,
            14
         ]
      },
      {
         "name":"Sigurdsson",
         "identy":"sigurdsson",
         "team":"Everton",
         "data":[
            5,
            3,
            2,
            4,
            1,
            3,
            2,
            4,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            5
         ]
      },
      {
         "name":"İ. Gündoğan",
         "identy":"gundogan",
         "team":"Manchester City",
         "data":[
            2,
            4,
            5,
            1,
            3,
            5,
            1,
            1,
            1,
            2,
            1,
            1,
            1,
            2,
            1,
            1,
            3,
            5,
            2,
            1,
            3,
            2,
            2,
            5
         ]
      },
      {
         "name":"Willian",
         "identy":"willian",
         "team":"Chealsea",
         "data":[
            2,
            3,
            6,
            3,
            1,
            2,
            4,
            1,
            2,
            2,
            1,
            2,
            1,
            1,
            3,
            2,
            1,
            2,
            4,
            1,
            2,
            3,
            1,
            4
         ]
      },
      {
         "name":"Mesut Özil",
         "identy":"ozil",
         "team":"Arsenal",
         "data":[
            1,
            2,
            3,
            5,
            4,
            6,
            4,
            5,
            3,
            1,
            2,
            5,
            1,
            1,
            2,
            1,
            1,
            0,
            0,
            0,
            0,
            0,
            0,
            1
         ]
      }
   ]
}
```
