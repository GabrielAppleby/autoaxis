import * as d3 from 'd3';
import React, {useEffect, useRef} from "react";

const BUFFER_PROPORTION = 1 / 20;
const MARGINS_PROPORTION = 1 / 8;
const CIRCLE_R = 2;
const colors = d3.scaleOrdinal(d3.schemeCategory10);
const WIDTH = 500;
const HEIGHT = 500;

export const EmbeddingChart: React.FC<any> = ({}) => {
    const d3Container = useRef(null);

    // useEffect(() => {
    //     if (coords) {
    //         const margins = WIDTH * MARGINS_PROPORTION;
    //         const getX = (d: InstanceCoord) => d.x;
    //         const getY = (d: InstanceCoord) => d.y;
    //         const minX = d3.min(coords, getX);
    //         const maxX = d3.max(coords, getX);
    //         const minY = d3.min(coords, getY);
    //         const maxY = d3.max(coords, getY);
    //
    //         if (minX && maxX && minY && maxY) {
    //             const xScaleBuffer = (maxX - minX) * BUFFER_PROPORTION;
    //             const yScaleBuffer = (maxY - minY) * BUFFER_PROPORTION;
    //
    //             const xScale = d3.scaleLinear()
    //                 .domain([minX - xScaleBuffer, maxX + xScaleBuffer])
    //                 .range([margins, (WIDTH - margins)]);
    //             const yScale = d3.scaleLinear()
    //                 .domain([minY - yScaleBuffer, maxY + yScaleBuffer])
    //                 .range([(HEIGHT - margins), margins]);
    //             const xAxis = d3.axisBottom(xScale);
    //             const yAxis = d3.axisLeft(yScale);
    //
    //             const rootG = d3.select(d3Container.current);
    //             rootG.selectAll('g').remove().exit();
    //
    //             const circlesG = rootG.append('g');
    //             const xAxisG = rootG.append('g');
    //             const yAxisG = rootG.append('g');
    //
    //             circlesG
    //                 .selectAll('circle')
    //                 .data(coords)
    //                 .enter()
    //                 .append('circle')
    //                 .attr('cx', function (d) {
    //                     return xScale(d.x);
    //                 })
    //                 .attr('cy', function (d) {
    //                     return yScale(d.y);
    //                 })
    //                 .attr('r', CIRCLE_R)
    //                 .attr('id', (d) => {
    //                     return "id" + d.id;
    //                 })
    //                 .style("stroke", "black")
    //                 .style("fill", (d) => {
    //                     return colors(String(d.label));
    //                 })
    //                 .style("stroke-width", .25);
    //
    //             rootG
    //                 .on('mousemove', function () {
    //                     const mousePos = d3.mouse(d3.event.currentTarget);
    //                     handleCoordChange({
    //                         x: xScale.invert(mousePos[0]),
    //                         y: yScale.invert(mousePos[1])
    //                     });
    //                 });
    //
    //             xAxisG
    //                 .attr("class", "axis")
    //                 .attr("transform", "translate(0," + (HEIGHT - margins) + ")")
    //                 .call(xAxis);
    //
    //             yAxisG
    //                 .attr("class", "axis")
    //                 .attr("transform", "translate(" + margins + ", 0)")
    //                 .call(yAxis);
    //         }
    //     }
    // }, []);

    return (
        <svg ref={d3Container} width={500} height={500}/>
    )

}