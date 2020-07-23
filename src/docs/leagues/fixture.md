# Fixture

![logo](../../assets/img/sample/ex-10.png ':size=100% :class=previewImage')



> First of all create html div element

````html
<div id="fixtureGraph" style="width:100%;height:580px"></div>
````

````javascript
var fixtureChart = echarts.init(document.getElementById("fixtureGraph"), null, {
	renderer: "canvas"
});
$.get("./assets/data/premier-league/weeks.json", function(data) {
	fixtureChart.hideLoading();
	var option: {...chart configrations}
	fixtureChart.setOption(option);
}
````

> [!TIP|style:flat|label:Sample Json Data]
> Sample json data must be like this for fixture.


````json
{
	"RECORDS": [
			{
					"id": "1",
					"league": "Premier League",
					"logo": "premier-league"
			},
			{
					"id": "2",
					"league": "La Liga",
					"logo": "laliga"
			},
			{
					"id": "3",
					"league": "Bundesliga",
					"logo": "bundesliga"
			},
			{
					"id": "4",
					"league": "Serie A",
					"logo": "seriea"
			},
			{
					"id": "5",
					"league": "League 1",
					"logo": "league1"
			},
			{
					"id": "6",
					"league": "Super League",
					"logo": "super-league"
			}
	]
}

````
````json
{
    "RECORDS": [
        {
            "id": "157",
            "HOMETEAM": "Liverpool",
            "hscore": "4",
            "ascore": "1",
            "AWAYTEAM": "Norwich City",
            "date": "9/8/2019 22:00:00",
            "week_id": "1",
            "t1logo": "liverpool",
            "t2logo": "norwich-city",
            "stadium": "Anfield",
            "t1color1": "#C8102E",
            "t1color2": "#00B2A9",
            "t2color1": "#00a650",
            "t2color2": "#fff200",
            "referee": "Michael Oliver"
        },
        {
            "id": "163",
            "HOMETEAM": "West Ham United",
            "hscore": "0",
            "ascore": "5",
            "AWAYTEAM": "Manchester City",
            "date": "10/8/2019 14:30:00",
            "week_id": "1",
            "t1logo": "westham-united",
            "t2logo": "manchester-city",
            "stadium": "London Stadium",
            "t1color1": "#7A263A",
            "t1color2": "#1BB1E7",
            "t2color1": "#6CABDD",
            "t2color2": "#1C2C5B",
            "referee": "Mike Dean"
        },
        {
            "id": "159",
            "HOMETEAM": "Watford",
            "hscore": "0",
            "ascore": "3",
            "AWAYTEAM": "Brighton and Hove Albion",
            "date": "10/8/2019 17:00:00",
            "week_id": "1",
            "t1logo": "watford",
            "t2logo": "brighton",
            "stadium": "Vicarage Road",
            "t1color1": "#FBEE23",
            "t1color2": "#ED2127",
            "t2color1": "#0057B8",
            "t2color2": "#FFCD00",
            "referee": "Craig Pawson"
        },
        {
            "id": "160",
            "HOMETEAM": "Crystal Palace",
            "hscore": "0",
            "ascore": "0",
            "AWAYTEAM": "Everton",
            "date": "10/8/2019 17:00:00",
            "week_id": "1",
            "t1logo": "crystal-palace",
            "t2logo": "everton",
            "stadium": "Selhurst Park",
            "t1color1": "#1B458F",
            "t1color2": "#C4122E",
            "t2color1": "#003399",
            "t2color2": "#FFFFFF",
            "referee": "Jonathan Moss"
        },
        {
            "id": "161",
            "HOMETEAM": "Burnley",
            "hscore": "3",
            "ascore": "0",
            "AWAYTEAM": "Southampton",
            "date": "10/8/2019 17:00:00",
            "week_id": "1",
            "t1logo": "burnley",
            "t2logo": "southampton",
            "stadium": "Turf Moor",
            "t1color1": "#6C1D45",
            "t1color2": "#99D6EA",
            "t2color1": "#D71920",
            "t2color2": "#130C0E",
            "referee": "Graham Scott"
        },
        {
            "id": "162",
            "HOMETEAM": "AFC Bornemouth",
            "hscore": "1",
            "ascore": "1",
            "AWAYTEAM": "Sheffield United",
            "date": "10/8/2019 17:00:00",
            "week_id": "1",
            "t1logo": "bournemouth",
            "t2logo": "sheffield-united",
            "stadium": "Vitality Stadium",
            "t1color1": "#B50E12",
            "t1color2": "#000000",
            "t2color1": "#ec2227",
            "t2color2": "#010101",
            "referee": "Kevin Friend"
        },
        {
            "id": "158",
            "HOMETEAM": "Tottenham Hotspur",
            "hscore": "3",
            "ascore": "1",
            "AWAYTEAM": "Aston Villa",
            "date": "10/8/2019 19:30:00",
            "week_id": "1",
            "t1logo": "tottenham",
            "t2logo": "aston-villa",
            "stadium": "Tottenham Hotspur Stadium",
            "t1color1": "#132257",
            "t1color2": "#FFFFFF",
            "t2color1": "#95BFE5",
            "t2color2": "#670E36",
            "referee": "Chris Kavanagh"
        },
        {
            "id": "164",
            "HOMETEAM": "Newcastle United",
            "hscore": "0",
            "ascore": "1",
            "AWAYTEAM": "Arsenal",
            "date": "11/8/2019 16:00:00",
            "week_id": "1",
            "t1logo": "newcastle-united",
            "t2logo": "arsenal",
            "stadium": "St. James Park",
            "t1color1": "#241F20",
            "t1color2": "#F1BE48",
            "t2color1": "#EF0107",
            "t2color2": "#063672",
            "referee": "Martin Atkinson"
        },
        {
            "id": "165",
            "HOMETEAM": "Leicester City",
            "hscore": "0",
            "ascore": "0",
            "AWAYTEAM": "Wolverhampton Wanderers",
            "date": "11/8/2019 16:00:00",
            "week_id": "1",
            "t1logo": "leicester-city",
            "t2logo": "wolves",
            "stadium": "King Power Stadium",
            "t1color1": "#003090",
            "t1color2": "#FDBE11",
            "t2color1": "#FDB913",
            "t2color2": "#231F20",
            "referee": "Andre Marriner"
        },
        {
            "id": "166",
            "HOMETEAM": "Manchester United",
            "hscore": "4",
            "ascore": "0",
            "AWAYTEAM": "Chelsea",
            "date": "11/8/2019 18:30:00",
            "week_id": "1",
            "t1logo": "manchester-united",
            "t2logo": "chelsea",
            "stadium": "Old Trafford",
            "t1color1": "#DA291C",
            "t1color2": "#FBE122",
            "t2color1": "#034694",
            "t2color2": "#EE242C",
            "referee": "Anthony Taylor"
        },
        {
            "id": "168",
            "HOMETEAM": "Southampton",
            "hscore": "1",
            "ascore": "2",
            "AWAYTEAM": "Liverpool",
            "date": "17/8/2019 15:00:00",
            "week_id": "2",
            "t1logo": "southampton",
            "t2logo": "liverpool",
            "stadium": "St. Marys Stadium",
            "t1color1": "#D71920",
            "t1color2": "#130C0E",
            "t2color1": "#C8102E",
            "t2color2": "#00B2A9",
            "referee": "Andre Marriner"
        },
        {
            "id": "167",
            "HOMETEAM": "Manchester City",
            "hscore": "2",
            "ascore": "2",
            "AWAYTEAM": "Tottenham Hotspur",
            "date": "17/8/2019 17:30:00",
            "week_id": "2",
            "t1logo": "manchester-city",
            "t2logo": "tottenham",
            "stadium": "Etihad Stadium",
            "t1color1": "#6CABDD",
            "t1color2": "#1C2C5B",
            "t2color1": "#132257",
            "t2color2": "#FFFFFF",
            "referee": "Michael Oliver"
        },
        {
            "id": "169",
            "HOMETEAM": "Norwich City",
            "hscore": "3",
            "ascore": "1",
            "AWAYTEAM": "Newcastle United",
            "date": "17/8/2019 21:58:55",
            "week_id": "2",
            "t1logo": "norwich-city",
            "t2logo": "newcastle-united",
            "stadium": "Carrow Road",
            "t1color1": "#00a650",
            "t1color2": "#fff200",
            "t2color1": "#241F20",
            "t2color2": "#F1BE48",
            "referee": ""
        }
    ]
}
````
