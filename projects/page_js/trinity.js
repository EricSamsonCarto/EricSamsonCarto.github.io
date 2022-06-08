const dataSource = {
    "chart": {
    "caption": "Trinity Alps Wilderness Precip Totals(mm)",
    "subcaption": "2018 vs 2019",
    "plottooltext": "<b>$dataValue</b> mm",
    "theme": "fusion"
},
    "categories": [
    {
        "category": [
        {
            "label": "Nov"
        },
        {
            "label": "Dec"
        },
        {
            "label": "Jan"
        },
        {
            "label": "Feb"
        },
        {
            "label": "March"
        },
        {
            "label": "April"
        },
        {
            "label": "May"
        }
        ]
    }
    ],
    "dataset": [
    {
        "seriesname": "2017-2018",
        "data": [
        {
            "value": "18910"
        },
        {
            "value": "1220"
        },
        {
            "value": "14678"
        },
        {
            "value": "1398"
        },
        {
            "value": "16238"
        },
        {
            "value": "9430"
        },
        {
            "value": "2602"
        }
        ]
    },
    {
        "seriesname": "2018-2019",
        "data": [
        {
            "value": "14281"
        },
        {
            "value": "11544"
        },
        {
            "value": "23965"
        },
        {
            "value": "33000"
        },
        {
            "value": "16514"
        },
        {
            "value": "10602"
        },
        {
            "value": "9739"
        }
    ]
    }
]
};

FusionCharts.ready(function() {
    var myChart = new FusionCharts({
        type: "msbar3d",
        renderAt: "chart-container",
        width: "100%",
        height: "100%",
        dataFormat: "json",
        dataSource
    }).render();
});

//AM CHART
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
var chart = am4core.create("Areachart2018", am4charts.XYChart3D);

// Add data
chart.data = [{
    "Month": "2018",
    "Precip": 55
}, {
    "Month": "2019",
    "Precip": 317
}];

// Create axes
let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "Month";
categoryAxis.renderer.labels.template.rotation = 0;
categoryAxis.renderer.labels.template.hideOversized = false;
categoryAxis.renderer.minGridDistance = 20;
categoryAxis.renderer.labels.template.horizontalCenter = "right";
categoryAxis.renderer.labels.template.verticalCenter = "middle";
categoryAxis.tooltip.label.rotation = 270;
categoryAxis.tooltip.label.horizontalCenter = "right";
categoryAxis.tooltip.label.verticalCenter = "middle";


let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());


// Create series
var series = chart.series.push(new am4charts.ColumnSeries3D());
series.dataFields.valueY = "Precip";
series.dataFields.categoryX = "Month";
series.name = "Precip";
series.tooltipText = "{categoryX}: [bold]{valueY}[/]";
series.columns.template.fillOpacity = .8;

var columnTemplate = series.columns.template;
columnTemplate.strokeWidth = 1;
columnTemplate.strokeOpacity = 1;
columnTemplate.stroke = am4core.color("#FFFFFF");

columnTemplate.adapter.add("fill", function(fill, target) {
    return chart.colors.getIndex(target.dataItem.index);
})

columnTemplate.adapter.add("stroke", function(stroke, target) {
    return chart.colors.getIndex(target.dataItem.index);
})

chart.cursor = new am4charts.XYCursor();
chart.cursor.lineX.strokeOpacity = 0;
chart.cursor.lineY.strokeOpacity = 0;

var title = chart.titles.create();
title.text = "May Snow Cover (KM^2)";
title.fontSize = 20;
title.marginBottom = 2;
title.marginTop = 0;