# Player Skills



![logo](../../assets/img/sample/ex-8.png ':size=100% :class=previewImage')



> First of all create html div element

````html
<div id="skillsGraph" style="width:100%;height:580px"></div>
````

````javascript
var skillChart = echarts.init(document.getElementById("skillsGraph"), null, {
	renderer: "canvas"
});
$.get("./assets/data/player-skills.json", function(data) {
	skillChart.hideLoading();
	var option: {
					title: [
							{
								text: datas.Name,
								textStyle: {
									fontSize: 120,
									color: datas.textColor,
									fontWeight: "bold"
								},
								x: "20",
								top: "20"
							}
							],
							...chart configrations
						}
	skillChart.setOption(option);
}
````

> [!TIP|style:flat|label:Sample Json Data]
> Sample json data must be like this for player-skills.

```json
{
   "players":[
      {
         "Button":0,
         "ID":158023,
         "ColorOne":"RGBA(0,77,152,.8)",
         "ColorTwo":"RGBA(168,19,62,.8)",
         "ColorThree":"RGBA(237,187,0,.8)",
         "textColor":"#EDBC00",
         "Name":"L. Messi",
         "Age":31,
         "Photo":"assets/img/prod/players/messi.png",
         "Nationality":"Argentina",
         "Overall":94,
         "Potential":94,
         "Club":"FC Barcelona",
         "Club_Logo":"assets/img/teams/barca.svg",
         "Value":"€110.5M",
         "Wage":"€565K",
         "Special":2202,
         "Preferred Foot":"Left",
         "International Reputation":5,
         "Weak Foot":4,
         "Skill Moves":4,
         "Work Rate":"Medium/ Medium",
         "Body Type":"Messi",
         "Real Face":"Yes",
         "Position":"RF",
         "Jersey_Number":10,
         "Joined":"Jul 1, 2004",
         "Loaned From":"Button",
         "Contract Valid Until":2021,
         "Height":"5'7",
         "Weight":"159lbs",
         "LS":"88+2",
         "ST":"88+2",
         "RS":"88+2",
         "LW":"92+2",
         "LF":"93+2",
         "CF":"93+2",
         "RF":"93+2",
         "RW":"92+2",
         "LAM":"93+2",
         "CAM":"93+2",
         "RAM":"93+2",
         "LM":"91+2",
         "LCM":"84+2",
         "CM":"84+2",
         "RCM":"84+2",
         "RM":"91+2",
         "LWB":"64+2",
         "LDM":"61+2",
         "CDM":"61+2",
         "RDM":"61+2",
         "RWB":"64+2",
         "LB":"59+2",
         "LCB":"47+2",
         "CB":"47+2",
         "RCB":"47+2",
         "RB":"59+2",
         "Crossing":84,
         "Finishing":95,
         "HeadingAccuracy":70,
         "ShortPassing":90,
         "Volleys":86,
         "Dribbling":97,
         "Curve":93,
         "FKAccuracy":94,
         "LongPassing":87,
         "BallControl":96,
         "Acceleration":91,
         "SprintSpeed":86,
         "Agility":91,
         "Reactions":95,
         "Balance":95,
         "ShotPower":85,
         "Jumping":68,
         "Stamina":72,
         "Strength":59,
         "LongShots":94,
         "Aggression":48,
         "Interceptions":22,
         "Positioning":94,
         "Vision":94,
         "Penalties":75,
         "Composure":96,
         "Marking":33,
         "StandingTackle":28,
         "SlidingTackle":26,
         "GKDiving":6,
         "GKHandling":11,
         "GKKicking":15,
         "GKPositioning":14,
         "GKReflexes":8,
         "Release Clause":"€226.5M"
      },
      {
         "Button":1,
         "ID":20801,
         "ColorOne":"RGBA(0,0,0,.8)",
         "ColorTwo":"RGBA(255,255,255,.8)",
         "ColorThree":"RGBA(255,205,0,.8)",
         "textColor":"#FFCF00",
         "Name":"C. Ronaldo",
         "Age":33,
         "Photo":"assets/img/prod/players/ronaldo.png",
         "Nationality":"Portugal",
         "Overall":94,
         "Potential":94,
         "Club":"Juventus",
         "Club_Logo":"assets/img/teams/juve.svg",
         "Value":"€77M",
         "Wage":"€405K",
         "Special":2228,
         "Preferred Foot":"Right",
         "International Reputation":5,
         "Weak Foot":4,
         "Skill Moves":5,
         "Work Rate":"High/ Low",
         "Body Type":"C. Ronaldo",
         "Real Face":"Yes",
         "Position":"ST",
         "Jersey_Number":7,
         "Joined":"Jul 10, 2018",
         "Loaned From":"Button",
         "Contract Valid Until":2022,
         "Height":"6'2",
         "Weight":"183lbs",
         "LS":"91+3",
         "ST":"91+3",
         "RS":"91+3",
         "LW":"89+3",
         "LF":"90+3",
         "CF":"90+3",
         "RF":"90+3",
         "RW":"89+3",
         "LAM":"88+3",
         "CAM":"88+3",
         "RAM":"88+3",
         "LM":"88+3",
         "LCM":"81+3",
         "CM":"81+3",
         "RCM":"81+3",
         "RM":"88+3",
         "LWB":"65+3",
         "LDM":"61+3",
         "CDM":"61+3",
         "RDM":"61+3",
         "RWB":"65+3",
         "LB":"61+3",
         "LCB":"53+3",
         "CB":"53+3",
         "RCB":"53+3",
         "RB":"61+3",
         "Crossing":84,
         "Finishing":94,
         "HeadingAccuracy":89,
         "ShortPassing":81,
         "Volleys":87,
         "Dribbling":88,
         "Curve":81,
         "FKAccuracy":76,
         "LongPassing":77,
         "BallControl":94,
         "Acceleration":89,
         "SprintSpeed":91,
         "Agility":87,
         "Reactions":96,
         "Balance":70,
         "ShotPower":95,
         "Jumping":95,
         "Stamina":88,
         "Strength":79,
         "LongShots":93,
         "Aggression":63,
         "Interceptions":29,
         "Positioning":95,
         "Vision":82,
         "Penalties":85,
         "Composure":95,
         "Marking":28,
         "StandingTackle":31,
         "SlidingTackle":23,
         "GKDiving":7,
         "GKHandling":11,
         "GKKicking":15,
         "GKPositioning":14,
         "GKReflexes":11,
         "Release Clause":"€127.1M"
		}
		...More Objects
   ]
}
```
