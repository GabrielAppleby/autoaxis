import * as d3 from 'd3';
import React, {useEffect, useRef, useState} from "react";
import {ControlCoord, InstanceCoord} from "../../constants/constants";

const BUFFER_PROPORTION = 1 / 20;
const MARGINS_PROPORTION = 1 / 8;
const CIRCLE_R = 2;
const colors = d3.scaleOrdinal(d3.schemeCategory10);
const WIDTH = 500;
const HEIGHT = 500;

interface EmbeddingChartProps {
    readonly coords: InstanceCoord[] | undefined;
    readonly controlPoints: InstanceCoord[] | undefined;
    readonly addControlPoint: (coord: ControlCoord) => void;
}

export const EmbeddingChart: React.FC<EmbeddingChartProps> = ({coords, controlPoints, addControlPoint}) => {
    const d3Container = useRef(null);
    const [xScale, setXScale] = useState<d3.ScaleLinear<number, number> | undefined>(undefined);
    const [yScale, setYScale] = useState<d3.ScaleLinear<number, number> | undefined>(undefined);

    useEffect(() => {
        if (coords) {

            const margins = WIDTH * MARGINS_PROPORTION;
            const getX = (d: InstanceCoord) => d.x;
            const getY = (d: InstanceCoord) => d.y;
            const minX = d3.min(coords, getX);
            const maxX = d3.max(coords, getX);
            const minY = d3.min(coords, getY);
            const maxY = d3.max(coords, getY);


            if (minX !== undefined && maxX !== undefined && minY !== undefined && maxY !== undefined) {
                const xScaleBuffer = (maxX - minX) * BUFFER_PROPORTION;
                const yScaleBuffer = (maxY - minY) * BUFFER_PROPORTION;

                const xScaleTemp = d3.scaleLinear()
                    .domain([minX - xScaleBuffer, maxX + xScaleBuffer])
                    .range([margins, (WIDTH - margins)]);
                const yScaleTemp = d3.scaleLinear()
                    .domain([minY - yScaleBuffer, maxY + yScaleBuffer])
                    .range([(HEIGHT - margins), margins]);

                const xAxis = d3.axisBottom(xScaleTemp);
                const yAxis = d3.axisLeft(yScaleTemp);

                const rootG = d3.select(d3Container.current);
                rootG.selectAll('g').remove().exit();

                const circlesG = rootG.append('g').attr("id", "circles");
                const xAxisG = rootG.append('g');
                const yAxisG = rootG.append('g');

                circlesG
                    .selectAll('circle')
                    .data(coords)
                    .enter()
                    .append('circle')
                    .attr('cx', function (d) {
                        return xScaleTemp(d.x);
                    })
                    .attr('cy', function (d) {
                        return yScaleTemp(d.y);
                    })
                    .attr('r', CIRCLE_R)
                    .attr('id', (d) => {
                        return "id" + d.id.toString();
                    })
                    .style("stroke", "black")
                    .style("fill", (d) => {
                        return colors(String(d.label));
                    })
                    .style("stroke-width", .25);

                xAxisG
                    .attr("class", "axis")
                    .attr("transform", "translate(0," + (HEIGHT - margins) + ")")
                    .call(xAxis);

                yAxisG
                    .attr("class", "axis")
                    .attr("transform", "translate(" + margins + ", 0)")
                    .call(yAxis);

                setXScale(() => xScaleTemp);
                setYScale(() => yScaleTemp);
            }
        }

    }, [coords]);


    useEffect(() => {
        if (xScale && yScale && controlPoints) {
            const rootG = d3.select(d3Container.current);

            const drag = d3.drag()
                .subject(function() {
                    return {x: d3.event.x, y: d3.event.y};
                })
                .on('start', function() {
                    d3.select(this).style("fill", "black");
                })
                .on('drag', function() {
                    d3.select(this)
                        .attr("cx", d3.event.x)
                        .attr("cy", d3.event.y);
                })
                .on('end', function(d) {
                    const coord = d as InstanceCoord;
                    const ids = controlPoints.map((d) => d.id);
                    if (!ids.includes(coord.id))
                    {
                        addControlPoint({id: coord.id, x: coord.x, y: coord.y, label: coord.label, controlledX: xScale.invert(d3.event.x), controlledY: yScale.invert(d3.event.y)})
                    }
                    d3.select(this).style("fill", colors(String(coord.label))).attr('class', 'controlled');
                });

                rootG
                    .select("g#circles")
                    .selectAll('circle')
                    // @ts-ignore
                    .call(drag);
        }
    }, [xScale, yScale, addControlPoint, controlPoints]);


    useEffect(() => {
        if (xScale && yScale && controlPoints) {
            const ids = controlPoints.map((p) => p.id)
            const circlesG = d3.select(d3Container.current).select("g#circles");
            circlesG
                .selectAll('.controlled')
                .attr('class', (d) => {
                    const coord = d as InstanceCoord;
                    if (ids.includes(coord.id))
                    {
                        return 'controlled';
                    }
                    return 'free';
                });

            circlesG
                .selectAll('.free')
                .attr('cx', function (d) {
                    const coord = d as InstanceCoord;
                    return xScale(coord.x);
                })
                .attr('cy', function (d) {
                    const coord = d as InstanceCoord;
                    return yScale(coord.y);
                })
                .attr('class', '');
        }
    }, [xScale, yScale, controlPoints]);
    
    return (
        <svg ref={d3Container} width={500} height={500}/>
    )

}