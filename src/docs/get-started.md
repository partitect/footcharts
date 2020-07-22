# Get Started

> Footcharts File Structure
```treeview
📁 assets
│───📁 css
│   │──  🦄 app.css
│   │──  🦄 app.min.css
│───📁 data
│   │──  💾 leagues.json
│   │──  💾 fixture.json
│   │──  💾 player-comapare.json
│   │──  💾 player-versus.json
│   │──  💾 team-passes.json
│   │──  ...other data
│───📁 fonts
│   │──  📁 quantico
│   │──  📁 exo-2
│   │──  📁 quicksand
│   │──  📁 cuprum
│   │──  📁 ...other fonts
│───📁 img
│   │──  📁 envato-img
│───📁 js
│   │──  📁 vendors
│   │──  │──  📁 charts
│   │──  │──  │── ✨ _fixture.js
│   │──  │──  │── ✨ _fixture.min.js
│   │──  │──  │── ✨ _league-table.js
│   │──  │──  │── ✨ _league-table.min.js
│   │──  │──  │── ✨ _team-passes.js
│   │──  │──  │── ✨ _team-passes.min.js
│   │──  │──  │── ✨ ...other script files
│   │──  ✨ app.js
│   │──  ✨ app.min.js
│───📁 vendors
│   │──  📁 echarts
│   │──  │──  📁 dist
│   │──  │──  │── ✨ echarts-en.min.js
│   │──  📁 fomantic-ui
│   │──  │──  📁 dist
│   │──  │──  │── 📁 components
│   │──  │──  │── 📁 themes
│   │──  │──  │── 🦄 semantic.min.css
│   │──  │──  │── ✨ semantic.min.js
│   │──  ...other javascript plugins
│───📁 docs
│   │──  📄 README.md
│   │──  📄 changelog.md
│   │──  🌐 index.html
│   │──  ...other document files
🌐 index.html
🌐 player-passes.html
🌐 team-compare.html
🌐 fixture.html
🌐 player-skills.html
🌐 league-table.html
...other html pages
```
> [!WARNING]
> Local json files are not work on static html files, because browsers blocked "Origin Access". Html pages are not working file:///C:/Downloads/footcharts/dist/team-passes.html in this way. That's way you must start project like this http://localhost:9999/team-passes.html


```html
❌ DON'T WORK ==> file:///C:/Downloads/footcharts/dist/team-passes.html
```
```html
✔  WORK ==> http://localhost:9999/team-passes.html
```
----


> Create html div element and write style="width:100%;height:300px"
```html
<div id="myFirstChartID" style="width:100%;height:300px"></div>
```

> Create json file like this
```json
{
   "categories":[
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
   ],
   "data":[
      820,
      932,
      901,
      934,
      1290,
      1330,
      1320
   ]
}
```
> Call json file with $.get ajax call and write chart scripts.
```javascript
var myFirstChart = echarts.init(document.getElementById("myFirstChartID"));
$.get("./data.json", function(responsedata) {
	var option = {
			xAxis: {
					type: 'category',
					data: responsedata.categories
			},
			yAxis: {
					type: 'value'
			},
			series: [{
					data: responsedata.data
					type: 'line'
			}]
	};
	myFirstChart.setOption(option);
}
```
