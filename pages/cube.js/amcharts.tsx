import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import cubejs from "@cubejs-client/core";
import { QueryRenderer, QueryRendererRenderProps } from "@cubejs-client/react";
import { Spin } from 'antd';
import moment from "moment";

am4core.useTheme(am4themes_animated);

const cubejsApi = cubejs(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjgyNDc0NjMsImV4cCI6MTYyODMzMzg2M30.WnQniYAUgOVy_jm-tQpDQwGZVnH3dDjNJE0X439PF00',
    { apiUrl: 'http://localhost:4000/cubejs-api/v1' }
);

function DateLineChart({ data, CHART_ID }) {
    const chartRef = useRef(null);

    useEffect(() => {
        if (!chartRef.current) {

            // Add X Axis
            // let xAxis = chartRef.current.xAxes.push(new am4charts.DateAxis());

            // chartRef.current = am4core.create(CHART_ID, am4charts.XYChart);
            chartRef.current = am4core.createFromConfig({
            }, CHART_ID, am4charts.XYChart);
            chartRef.current.data = data;


            let xAxis = chartRef.current.xAxes.push(new am4charts.DateAxis());
            // const xAxis = new am4charts.DateAxis();
            xAxis.dataFields.category = "LineItems.createdAt.month";
            xAxis.renderer.cellStartLocation = 0.1;
            xAxis.renderer.cellEndLocation = 0.9;
            xAxis.renderer.grid.template.strokeOpacity = 0;
            xAxis.renderer.labels.template.fill = am4core.color('#ced1e0');
            xAxis.renderer.labels.template.fontSize = 12;
            // chartRef.current.xAxes.push(xAxis);

            // Add Y Axis
            let yAxis = chartRef.current.yAxes.push(new am4charts.ValueAxis());
            yAxis.renderer.grid.template.stroke = am4core.color('#f0f2fa');
            yAxis.renderer.grid.template.strokeOpacity = 1;
            yAxis.renderer.labels.template.fill = am4core.color('#ced1e0');
            yAxis.renderer.labels.template.fontSize = 12;

            // Create series
            const series = new am4charts.LineSeries()
            chartRef.current.series.push(series);
            series.dataFields.valueY = "LineItems.quantity";
            series.dataFields.dateX = "LineItems.createdAt.month";
            series.name = "Quantity";
            series.fillOpacity = 1;
            series.fill = am4core.color('#40e577');
            series.strokeWidth = 0;
            // series.columns.template.column.cornerRadiusTopLeft = 5;
            // series.columns.template.column.cornerRadiusTopRight = 5;

            // Series tooltip
            series.tooltipText = '{dateX}: [bold]{valueY}[/]';
            series.tooltip.pointerOrientation = 'down';
            series.tooltip.dy = -5;
            series.tooltip.background.filters.clear()
            series.tooltip.getFillFromObject = false;
            series.tooltip.background.fill = am4core.color('#2a2b2e');
            series.tooltip.background.stroke = am4core.color('#2a2b2e');


            // Create series 2
            const series2 = new am4charts.LineSeries();
            chartRef.current.series.push(series2);
            series2.dataFields.valueY = "LineItems.price";
            series2.dataFields.dateX = "LineItems.createdAt.month";
            series2.name = "Price";
            series2.fillOpacity = 1;
            series2.fill = am4core.color('#404be5');
            series2.strokeWidth = 0;
            // series2.columns.template.column.cornerRadiusTopLeft = 5;
            // series2.columns.template.column.cornerRadiusTopRight = 5;

            // Series tooltip
            series2.tooltipText = '{dateX}: [bold]{valueY}[/]';
            series2.tooltip.pointerOrientation = 'down';
            series2.tooltip.dy = -5;
            series2.tooltip.background.filters.clear()
            series2.tooltip.getFillFromObject = false;
            series2.tooltip.background.fill = am4core.color('#2a2b2e');
            series2.tooltip.background.stroke = am4core.color('#2a2b2e');


            // Add cursor
            chartRef.current.cursor = new am4charts.XYCursor();

            // Disable axis lines
            chartRef.current.cursor.lineX.disabled = true;
            chartRef.current.cursor.lineY.disabled = true;

            // Disable axis tooltips
            xAxis.cursorTooltipEnabled = false;
            yAxis.cursorTooltipEnabled = false;

            // Disable zoom
            chartRef.current.cursor.behavior = 'none';
        }

        return () => {
            chartRef.current && chartRef.current.dispose();
        };
    }, [CHART_ID]);

    // Load data into chart
    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.data = data;
        }
    }, [data]);

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
    />
}

const renderChart = ({ resultSet, error }: QueryRendererRenderProps) => {
    if (error) {
        return <div>{error.toString()}</div>;
    }

    if (!resultSet) {
        return <Spin />;
    }

    const data = resultSet.tablePivot();
    const newData = data.map((row) => ({
        "LineItems.createdAt.month": new Date(row["LineItems.createdAt.week"] as string),
        // "LineItems.createdAt.month": moment(row["LineItems.createdAt.month"] as string).format('MMM'),
        ...row
        // year: row['LineItems.createdAt.month'],
        // population: row['LineItems.quantity'],
        // // z: row['LineItems.price'],
    }))
    return (
        <div>
            <DateLineChart data={newData} CHART_ID={CHART_ID + Math.random()} />
        </div>
    );

};

export default function AmCharts() {
    return (
        <div>
            <QueryRenderer
                query={{
                    "measures": [
                        "LineItems.quantity",
                        "LineItems.price"
                    ],
                    "timeDimensions": [
                        {
                            "dimension": "LineItems.createdAt",
                            "granularity": "week"
                        }
                    ],
                    "order": {
                        "LineItems.createdAt": "asc"
                    },
                    "dimensions": []
                }}
                cubejsApi={cubejsApi}
                resetResultSetOnChange={false}
                render={(props) => renderChart(props)}
            />
        </div>
    )
}

const CHART_ID = 'population_chart';
