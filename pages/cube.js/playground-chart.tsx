import ReactDOM from 'react-dom';
import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { CartesianGrid, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, LineChart, Line } from 'recharts';
import { Row, Col, Statistic, Table } from 'antd';

const CartesianChart = ({ resultSet, children, ChartComponent }) => (
    <ResponsiveContainer width="100%" height={350}>
        <ChartComponent data={resultSet.chartPivot()}>
            <XAxis dataKey="x" />
            <YAxis />
            <CartesianGrid />
            {children}
            <Legend />
            <Tooltip />
        </ChartComponent>
    </ResponsiveContainer>
);

const colors = ['#FF6492', '#141446', '#7A77FF'];

const stackedChartData = (resultSet) => {
    const data = resultSet
        .pivot()
        .map(({ xValues, yValuesArray }) =>
            yValuesArray.map(([yValues, m]) => ({
                x: resultSet.axisValuesString(xValues, ', '),
                color: resultSet.axisValuesString(yValues, ', '),
                measure: m && Number.parseFloat(m),
            }))
        )
        .reduce((a, b) => a.concat(b), []);
    return data;
};


const cubejsApi = cubejs(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjgyNDc0NjMsImV4cCI6MTYyODMzMzg2M30.WnQniYAUgOVy_jm-tQpDQwGZVnH3dDjNJE0X439PF00',
    { apiUrl: 'http://localhost:4000/cubejs-api/v1' }
);

const renderChart = ({ resultSet, error, pivotConfig }) => {
    if (error) {
        return <div>{error.toString()}</div>;
    }

    if (!resultSet) {
        return <Spin />;
    }

    return (
        <CartesianChart resultSet={resultSet} ChartComponent={LineChart}>
            {resultSet.seriesNames().map((series, i) => (
                <Line
                    key={series.key}
                    // stackId="a"
                    dataKey={series.key}
                    name={series.title}
                    stroke={colors[i]}
                />
            ))}
        </CartesianChart>
    );

};

const ChartRenderer = () => {
    return (
        <QueryRenderer
            query={{
                "measures": [
                    "LineItems.quantity",
                    "LineItems.price"
                ],
                "timeDimensions": [
                    {
                        "dimension": "LineItems.createdAt",
                        "granularity": "month"
                    }
                ],
                "order": {
                    "LineItems.createdAt": "asc"
                },
                "dimensions": []
            }}
            cubejsApi={cubejsApi}
            resetResultSetOnChange={false}
            render={(props) => renderChart({
                ...props,
                // chartType: 'line',
                pivotConfig: {
                    "x": [
                        "LineItems.createdAt.day"
                    ],
                    "y": [
                        "measures"
                    ],
                    "fillMissingDates": true,
                    "joinDateRange": false
                }
            })}
        />
    );
};

export default function PlayGroundGenerated() {
    return (
        <ChartRenderer />
    )
}

// const rootElement = document.getElementById('root');
// ReactDOM.render(<ChartRenderer />, rootElement);
