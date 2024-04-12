"use client"
import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

export const ChartComponent = (props) => {

    const {
        data,
        colors: {
            backgroundColor = 'white',
            lineColor = 'black',
            textColor = 'black',
            areaTopColor = 'black',
            areaBottomColor = 'white',
        } = {},
    } = props;

    const chart_container = useRef();

    useEffect(() => {

        const handleResize = () => {
            chart.applyOptions({ width: chart_container.current.clientWidth });
        };

        const chart = createChart(chart_container.current, {
            layout: {
                background: { type: ColorType.Solid, color: backgroundColor },
                textColor,
            },
            width: 1000,
            height: 500,
        });
        
        chart.timeScale().fitContent();

        const newSeries = chart.addAreaSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
        newSeries.setData(data);

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);

            chart.remove();
        };

    }, [data]);

    return (
        <div ref={chart_container}></div>
    );
};