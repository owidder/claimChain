import * as d3 from 'd3';
import * as _ from 'lodash';
import {DIM_X, DIM_Y} from '../blockChain/info';

const MARGIN = 1;
const GRID_THICKNESS = 1;

const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

export class Field {
    constructor(containerSelector, width, height) {
        this.width = width;
        this.height = height;

        const _rectWidth = width / DIM_X;
        const _rectHeight = height / DIM_Y;
        this.rectSize = Math.min(_rectHeight, _rectWidth);
        this.tileSize = this.rectSize + (2 * MARGIN + GRID_THICKNESS);
        this.fieldWidth = this.tileSize * DIM_X;
        this.fieldHeight = this.tileSize * DIM_Y;

        this.root = d3.select(containerSelector)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        this.drawGridX();
        this.drawGridY();
    }

    xcoord(xpos) {
        return xpos * this.tileSize + MARGIN;
    }

    ycoord(ypos) {
        return ypos * this.tileSize + MARGIN;
    }

    drawGridX() {
        this.root.selectAll("line.gridx")
            .data(_.range(0, DIM_X + 1))
            .enter()
            .append("line")
            .attr("x1", d => (this.xcoord(d) - MARGIN))
            .attr("y1", 0)
            .attr("x2", d => (this.xcoord(d) - MARGIN))
            .attr("y2", this.fieldWidth)
            .attr("stroke", "black")
    }

    drawGridY() {
        this.root.selectAll("line.gridy")
            .data(_.range(0, DIM_Y + 1))
            .enter()
            .append("line")
            .attr("x1", 0)
            .attr("y1", d => (this.ycoord(d) - MARGIN))
            .attr("x2", this.fieldHeight)
            .attr("y2", d => (this.xcoord(d) - MARGIN))
            .attr("stroke", "black")
    }

    extendPositions(positions) {
        const extendedPositions = [];
        _.forOwn(positions, (positionsForId) => {
            const size = positionsForId.length;
            if(size > 0) {
                const extendedPositionsForId = [...positionsForId];
                extendedPositionsForId[size-1].head = true;
                Array.prototype.push.apply(extendedPositions, extendedPositionsForId);
            }
        });

        return extendedPositions;
    }

    drawPositions(positions) {
        const _extendedPositions = this.extendPositions(positions);
        const data = this.root.selectAll("rect.position").data(_extendedPositions);

        data.enter()
            .append("rect")
            .attr("width", this.rectSize)
            .attr("height", this.rectSize)
            .attr("x", d => this.xcoord(d.x))
            .attr("y", d => this.ycoord(d.y))
            .attr("fill", d => colorScale(d.id));
    }
}
