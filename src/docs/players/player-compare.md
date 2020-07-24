# Player Compare

![logo](../../assets/img/chart-images/ex-6.png ':size=100% :class=previewImage')



> First of all create html div element

````html
<div id="compareGraph" style="width:100%;height:580px"></div>
````

````javascript
var compareChart = echarts.init(document.getElementById("compareGraph"), null, {
	renderer: "canvas"
});
$.get("./assets/data/player-compare.json", function(data) {
	compareChart.hideLoading();
	var option: {...chart configrations}
	compareChart.setOption(option);
}
````

> [!TIP|style:flat|label:Sample Json Data]
> Sample json data must be like this for player-compare.

```json
{
   "dataNames":[
      "Appearances",
      "Goals",
      "Asists",
      "Goals per match",
      "Shots",
      "Shots on target",
      "Goals with right foot",
      "Goals with left foot",
      "Passes",
      "Passes per match",
      "Tackles",
      "Blocked shots",
      "Clearances"
   ],
   "colors":[
      {
         "name":"Green",
         "value":"#3BB273"
      },
      {
         "name":"Blue",
         "value":"#39A0ED"
      },
      {
         "name":"Orange",
         "value":"#F46036"
      },
      {
         "name":"Purple",
         "value":"#7768AE"
      },
      {
         "name":"Red",
         "value":"#E84855"
      }
   ],
   "players":[
      {
         "name":"H. Kane",
         "identy":"kane",
         "data":[
            28,
            17,
            4,
            0.61,
            102,
            46,
            12,
            3,
            551,
            19.68,
            9,
            24,
            14
         ]
      },
      {
         "name":"R. Sterling",
         "identy":"sterling",
         "data":[
            34,
            17,
            10,
            0.50,
            77,
            39,
            11,
            4,
            1236,
            37.15,
            32,
            17,
            4
         ]
      },
      {
         "name":"P. Aubameyang",
         "identy":"aubameyang",
         "data":[
            36,
            22,
            5,
            0.61,
            94,
            40,
            20,
            2,
            692,
            19.22,
            21,
            22,
            18
         ]
      },
      {
         "name":"M. Salah",
         "identy":"salah",
         "data":[
            38,
            22,
            8,
            0.58,
            137,
            64,
            4,
            18,
            1079,
            28.39,
            21,
            33,
            4
         ]
      },
      {
         "name":"Leroy Sané",
         "identy":"sane",
         "data":[
            31,
            10,
            10,
            0.32,
            56,
            24,
            1,
            8,
            847,
            27.32,
            24,
            16,
            2
         ]
      },
      {
         "name":"Son Heung-min",
         "identy":"son",
         "data":[
            31,
            12,
            6,
            0.39,
            74,
            29,
            7,
            5,
            752,
            24.26,
            23,
            23,
            4
         ]
      },
      {
         "name":"Sadio Mane",
         "identy":"mane",
         "data":[
            36,
            22,
            1,
            0.61,
            87,
            42,
            11,
            5,
            1184,
            32.89,
            34,
            11,
            8
         ]
      },
      {
         "name":"Paul Pogba",
         "identy":"pogba",
         "data":[
            35,
            13,
            9,
            0.37,
            105,
            50,
            11,
            1,
            2068,
            59.09,
            47,
            29,
            36
         ]
      },
      {
         "name":"Willian",
         "identy":"willian",
         "data":[
            32,
            3,
            6,
            0.09,
            62,
            22,
            3,
            0,
            1230,
            38.44,
            35,
            22,
            11
         ]
      },
      {
         "name":"Dele Alli",
         "identy":"delleali",
         "data":[
            25,
            5,
            3,
            0.20,
            39,
            19,
            1,
            0,
            1028,
            41.12,
            33,
            7,
            17
         ]
      },
      {
         "name":"Mesut Özil",
         "identy":"ozil",
         "data":[
            24,
            5,
            2,
            0.21,
            11,
            6,
            0,
            5,
            1118,
            46.58,
            12,
            3,
            4
         ]
      },
      {
         "name":"S. Agüero",
         "identy":"aguero",
         "data":[
            33,
            21,
            8,
            0.64,
            118,
            43,
            10,
            8,
            771,
            23.36,
            17,
            31,
            3
         ]
      }
   ]
}
```
