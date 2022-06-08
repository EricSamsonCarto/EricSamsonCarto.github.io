///AM CORE CHART!///
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
var chart = am4core.create("chartdiv", am4charts.XYChart3D);

// Add data
chart.data = [{
    "month": "November",
    "snow": 84,
}, {
    "month": "December",
    "snow": 113
}, {
    "month": "January",
    "snow": 54
}, {
    "month": "Febuary",
    "snow": 2
}, {
    "month": "March",
    "snow": 151
}      
            ];

// Create axes
let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "month";
categoryAxis.renderer.labels.template.rotation = 270;
categoryAxis.renderer.labels.template.hideOversized = false;
categoryAxis.renderer.minGridDistance = 20;
categoryAxis.renderer.labels.template.horizontalCenter = "right";
categoryAxis.renderer.labels.template.verticalCenter = "middle";
categoryAxis.tooltip.label.rotation = 270;
categoryAxis.tooltip.label.horizontalCenter = "right";
categoryAxis.tooltip.label.verticalCenter = "middle";

let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.title.text = "Snowfall (IN)";
valueAxis.title.fontWeight = "bold";

// Create series
var series = chart.series.push(new am4charts.ColumnSeries3D());
series.dataFields.valueY = "snow";
series.dataFields.categoryX = "month";
series.name = "snow";
series.tooltipText = "{categoryX}: [bold]{valueY}[/]";
series.columns.template.fillOpacity = .8;

var columnTemplate = series.columns.template;
columnTemplate.strokeWidth = 2;
columnTemplate.strokeOpacity = 1;
columnTemplate.stroke = am4core.color("#FFFFFF");

series.columns.template.adapter.add("fill", function(fill, target) {
if (target.dataItem && (target.dataItem.valueY > 150)) {
    return am4core.color("#810f7c");
}
if (target.dataItem && (target.dataItem.valueY > 100)) {
    return am4core.color("#8856a7");
}
if (target.dataItem && (target.dataItem.valueY > 80)) {
    return am4core.color("#8c96c6");
}
if (target.dataItem && (target.dataItem.valueY > 50)) {
    return am4core.color("#b3cde3");
}
if (target.dataItem && (target.dataItem.valueY > 1)) {
    return am4core.color("#edf8fb");
}
});

columnTemplate.adapter.add("stroke", function(stroke, target) {
    return chart.colors.getIndex(target.dataItem.index);
})

chart.cursor = new am4charts.XYCursor();
chart.cursor.lineX.strokeOpacity = 0;
chart.cursor.lineY.strokeOpacity = 0;

///LOAD ESRI MODULES, SET THEM WITHIN THE FUNCTION
require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/MapImageLayer",
    "esri/widgets/Legend",
    "esri/widgets/Expand",
    "esri/layers/GeoJSONLayer",
    "esri/widgets/Search",
], function(Map, MapView, MapImageLayer, Legend, Expand, GeoJSONLayer, Search) {

//GRAY VECTOR BASEMAP
var map = new Map({
    basemap: "gray-vector",
});

//SETTING UP THE MAPVIEW
var view = new MapView({
    container: "SkiMap",
    map: map,
    center: [-120.060775, 38.977779],
    zoom: 7,
    navigation: {
    mouseWheelZoomEnabled: false,
},
});
//RESTRICT USERS ZOOM CONTROL
view.constraints = {
    minZoom: 9,
    maxZoom: 6,
};

//LOAD SNOW DEPTH MAPSERVER, ADD TO MAP
var NOAA = new MapImageLayer({
    opacity: .80,            
    url:"https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/NOHRSC_Snow_Analysis/MapServer",
    sublayers: [{
    id: 3,
    visible: true},
]
});
map.add(NOAA);

//ADD A LEGEND
var legend = new Expand({
content: new Legend({
    view: view,
    layerInfos: [{
        layer: NOAA,
        title: "Snow Depth (Inches)",
    }],
}),
expanded: false
});
view.ui.add(legend, "bottom-left");

//SET UP A RENDERER TO ADD AN IMAGE TO THE POINT FILE, INCLUDE SIZE
var SkiResortStyle = {
    type: "simple",
    symbol: {
    type: "picture-marker",
    url: "https://assets.codepen.io/3352342/mountain2_1.png",
    width: "21px",
    height: "22px",
        }
}

//CREATE POP-UP USING THE TABLE'S "NAME" FIELD
var Ski_Template = {
    title: '{Name}',
    highlight: false,
};

//LOAD IN THE GEOJSON, INCLUDE THE POPUP TEMPLATE AND THE RENDERER
var SkiMTN_Points = new GeoJSONLayer({
    url: "https://gist.githubusercontent.com/EricSamsonCarto/546b5916196ac44c645af96dbbbd66de/raw/4e89cdecb0641c6804b27460d4f8c38e732e800e/UnitedStates_SkiResorts.geojson",
    popupTemplate: Ski_Template,
    renderer: SkiResortStyle,
});
map.add(SkiMTN_Points); 

//BACKGROUND STYLE
var background_style = {
type: "simple",
symbol: {
    type: "simple-fill", 
    color: [207, 211, 212],
    outline: {
        color: "black",
        width: 0.2,
}
}
};
//BACKGROUND GEOJSON
var background = new GeoJSONLayer({
    url: "https://gist.githubusercontent.com/EricSamsonCarto/d662ea1a4b6e189d9c6a34dd5c4b9feb/raw/3911ae3cf9d3e58d6fc2a2a40d3c00a4c743095d/Background_UnitedStates.geojson",
    renderer: background_style,
    opacity: 0.90,
});
map.add(background);

//SEARCH WIDGET WITH DEFAULT SOURCES REMOVED, SET THE SEARCH FIELDS TO "Name" AND EXACT MATCH TO "FALSE"
var searchWidget = new Search({
    view: view,
    includeDefaultSources: false,
    allPlaceholder: "Ski Resort Name",
sources: [
    {
    layer: SkiMTN_Points,
    searchFields: ["Name"],
    displayField: "Name",
    exactMatch: false,
    outFields: [ "NAME"],
    name: "Ski Resort Name",
    placeholder: "Example: Sugarloaf"
    },
        ]
});
view.ui.add(searchWidget, {
position: "top-right"
});

});
