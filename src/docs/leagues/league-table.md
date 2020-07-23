# League Table

![logo](../../assets/img/sample/ex-12.png ':size=100% :class=previewImage')



> First of all create html div element

````html
<div id="leagueTableGraph" style="width:100%;height:580px"></div>
````

````javascript
var leagueTableChart = echarts.init(document.getElementById("leagueTableGraph"), null, {
	renderer: "canvas"
});
$.get("./assets/data/premier-league/table.json", function(data) {
	leagueTableChart.hideLoading();
	var option: {...chart configrations}
	leagueTableChart.setOption(option);
}
````

> [!TIP|style:flat|label:Sample Json Data]
> Sample json data must be like this for leagueTable.


````json
{
    "name":"Premier League",
    "status":[
        {
            "value": [0.7, 0],
            "name": "Champions League",
            "itemStyle": { "color": "#01004B" }
          },
          {
            "value": [0.7, 1],
            "name": "Champions League",
            "itemStyle": { "color": "#01004B" }
          },
          {
            "value": [0.7, 2],
            "name": "Champions League",
            "itemStyle": { "color": "#01004B" }
          },
          {
            "value": [0.7, 3],
            "name": "Champions League",
            "itemStyle": { "color": "#01004B" }
          },
          {
            "value": [0.7, 4],
            "name": "Europe League",
            "itemStyle": { "color": "#F18701" }
          },
          {
            "value": [0.7, 17],
            "name": "Play Off",
            "itemStyle": { "color": "#E1CA96" }
          },
          {
            "value": [0.7, 18],
            "name": "Play Off",
            "itemStyle": { "color": "#E1CA96" }
          },
          {
            "value": [0.7, 19],
            "name": "Play Off",
            "itemStyle": { "color": "#E1CA96" }
          }
    ],
    "weeks":{
        "week1":[
            {
                "name":"Liverpool",
                "logo":"liverpool",
                "color1":"rgba(200,16,46,1)",
                "color2":"rgba(0,178,169,1)",
                "play":1,
                "win":1,
                "draw":0,
                "lost":0,
                "gf":4,
                "ga":1,
                "gd":3,
                "pts":3,
                "league_position":11,"previous_position":0,"next_play":"","lp":[
                    "W"
                ]
            },
            {
                "name":"Manchester City",
                "logo":"manchester-city",
                "color1":"rgba(108,171,221,1)",
                "color2":"rgba(28,44,91,1)",
                "play":1,
                "win":1,
                "draw":0,
                "lost":0,
                "gf":5,
                "ga":0,
                "gd":5,
                "pts":3,
                "league_position":11,"previous_position":0,"next_play":"","lp":[
                    "W"
                ]
            },
            {
                "name":"Leicester City",
                "logo":"leicester-city",
                "color1":"rgba(0,83,160,1)",
                "color2":"rgba(253,190,17,1)",
                "play":1,
                "win":0,
                "draw":1,
                "lost":0,
                "gf":0,
                "ga":0,
                "gd":1,
                "pts":1,
                "league_position":11,"previous_position":0,"next_play":"","lp":[
                    "D"
                ]
			},
			...More Objects
        ]
    }
}
````
