import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import React, { useEffect, useRef } from "react";
import cubejs from "@cubejs-client/core";
import { QueryRenderer, QueryRendererRenderProps } from "@cubejs-client/react";
import { Spin } from 'antd';
import moment from "moment";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

am4core.useTheme(am4themes_animated);


const colorSet = new am4core.ColorSet();
const dataSet = [{
    "title": "Brussels",
    "latitude": 50.8371,
    "longitude": 4.3676,
    "color": colorSet.next()
}, {
    "title": "Copenhagen",
    "latitude": 55.6763,
    "longitude": 12.5681,
    "color": colorSet.next()
}, {
    "title": "Paris",
    "latitude": 48.8567,
    "longitude": 2.3510,
    "color": colorSet.next()
}, {
    "title": "Reykjavik",
    "latitude": 64.1353,
    "longitude": -21.8952,
    "color": colorSet.next()
}, {
    "title": "Moscow",
    "latitude": 55.7558,
    "longitude": 37.6176,
    "color": colorSet.next()
}, {
    "title": "Madrid",
    "latitude": 40.4167,
    "longitude": -3.7033,
    "color": colorSet.next()
}, {
    "title": "London",
    "latitude": 51.5002,
    "longitude": -0.1262,
    "url": "http://www.google.co.uk",
    "color": colorSet.next()
}, {
    "title": "Peking",
    "latitude": 39.9056,
    "longitude": 116.3958,
    "color": colorSet.next()
}, {
    "title": "New Delhi",
    "latitude": 28.6353,
    "longitude": 77.2250,
    "color": colorSet.next()
}, {
    "title": "Tokyo",
    "latitude": 35.6785,
    "longitude": 139.6823,
    "url": "http://www.google.co.jp",
    "color": colorSet.next()
}, {
    "title": "Ankara",
    "latitude": 39.9439,
    "longitude": 32.8560,
    "color": colorSet.next()
}, {
    "title": "Buenos Aires",
    "latitude": -34.6118,
    "longitude": -58.4173,
    "color": colorSet.next()
}, {
    "title": "Brasilia",
    "latitude": -15.7801,
    "longitude": -47.9292,
    "color": colorSet.next()
}, {
    "title": "Ottawa",
    "latitude": 45.4235,
    "longitude": -75.6979,
    "color": colorSet.next()
}, {
    "title": "Washington",
    "latitude": 38.8921,
    "longitude": -77.0241,
    "color": colorSet.next()
}, {
    "title": "Kinshasa",
    "latitude": -4.3369,
    "longitude": 15.3271,
    "color": colorSet.next()
}, {
    "title": "Cairo",
    "latitude": 30.0571,
    "longitude": 31.2272,
    "color": colorSet.next()
}, {
    "title": "Pretoria",
    "latitude": -25.7463,
    "longitude": 28.1876,
    "color": colorSet.next()
}];

export default function AMMaps() {
    return (
        <div>
            <MapsChart CHART_ID={"AM-MAPS"} data={dataSet} />
        </div>
    );
}

function MapsChart({ data, CHART_ID }) {
    const chartRef = useRef(null);

    useEffect(() => {

        function animateBullet(circle) {
            const chart = chartRef.current;
            const animation = circle.animate([{ property: "scale", from: 1 / chart.zoomLevel, to: 5 / chart.zoomLevel }, { property: "opacity", from: 1, to: 0 }], 1000, am4core.ease.circleOut);
            animation.events.on("animationended", function (event) {
                animateBullet(event.target.object);
            });
        }

        if (!chartRef.current) {

            /**
             * ---------------------------------------
             * This demo was created using amCharts 4.
             * 
             * For more information visit:
             * https://www.amcharts.com/
             * 
             * Documentation is available at:
             * https://www.amcharts.com/docs/v4/
             * ---------------------------------------
             */

            // Themes begin
            // Themes end

            // Create map instance
            chartRef.current = am4core.create(CHART_ID, am4maps.MapChart);
            const chart = chartRef.current;

            // Set map definition
            chart.geodata = am4geodata_worldLow;

            // Set projection
            chart.projection = new am4maps.projections.Miller();

            // Create map polygon series
            const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

            // Exclude Antartica
            polygonSeries.exclude = ["AQ"];

            // Make map load polygon (like country names) data from GeoJSON
            polygonSeries.useGeodata = true;

            // Configure series
            const polygonTemplate = polygonSeries.mapPolygons.template;
            polygonTemplate.tooltipText = "{name}";
            polygonTemplate.polygon.fillOpacity = 0.6;


            // Create hover state and set alternative fill color
            const hs = polygonTemplate.states.create("hover");
            hs.properties.fill = chart.colors.getIndex(0);

            // Add image series
            const imageSeries = chart.series.push(new am4maps.MapImageSeries());
            imageSeries.mapImages.template.propertyFields.longitude = "longitude";
            imageSeries.mapImages.template.propertyFields.latitude = "latitude";
            imageSeries.mapImages.template.tooltipText = "{title}";
            imageSeries.mapImages.template.propertyFields.url = "url";

            const circle = imageSeries.mapImages.template.createChild(am4core.Circle);
            circle.radius = 3;
            circle.propertyFields.fill = "color";
            circle.nonScaling = true;

            const circle2 = imageSeries.mapImages.template.createChild(am4core.Circle);
            circle2.radius = 3;
            circle2.propertyFields.fill = "color";


            circle2.events.on("inited", function (event) {
                animateBullet(event.target);
            });

            imageSeries.data = data
        }

        return () => {
            chartRef.current && chartRef.current.dispose();
        };
    }, []);

    // Load data into chart
    // useEffect(() => {
    //     if (chartRef.current) {
    //         chartRef.current.data = data;
    //     }
    // }, [data]);

    // Handle component unmounting, dispose chart
    useEffect(() => {
        return () => {
            chartRef.current && chartRef.current.dispose();
        };
    }, []);

    return <div
        id={CHART_ID}
        style={{
            width: '100%',
            height: '300px',
            margin: '50px 0'
        }}
    />;
}
