import * as d3 from 'd3';
import * as _ from 'lodash';
import {DIM_X, DIM_Y} from '../blockChain/info';

import './Field.css';

const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

const emptyCell = (x, y) => {
    return {
        x, y,
        id: "",
        events: []
    }
}

const emptyFlattenedMatrix = () => {
    const flattenedMatrix = [];
    _.range(DIM_Y).forEach((y) => {
        _.range(DIM_X).forEach((x) => {
            flattenedMatrix.push(emptyCell(x, y));
        })
    });

    return flattenedMatrix;
}

const flattenCoords = (x, y) => {
    return Number(y) * DIM_X + Number(x);
}

export class Field {
    constructor(containerSelector, width, height) {
        this.width = width;
        this.height = height;

        const _tileWidth = width / DIM_X;
        const _tileHeight = height / DIM_Y;
        this.tileSize = Math.min(_tileHeight, _tileWidth);
        this.fieldWidth = this.tileSize * DIM_X;
        this.fieldHeight = this.tileSize * DIM_Y;

        this.root = d3.select(containerSelector)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        this.root.append("g").attr("class", "rects");

        this.root.append("g").attr("class", "lines");

        this.glines = this.root.select("g.lines");
        this.grects = this.root.select("g.rects");

        this.drawGridX();
        this.drawGridY();

        this.flattenedMatrix = emptyFlattenedMatrix();
    }

    xcoord(xpos) {
        return xpos * this.tileSize;
    }

    ycoord(ypos) {
        return ypos * this.tileSize;
    }

    drawGridX() {
        this.glines.selectAll("line.gridx")
            .data(_.range(0, DIM_X + 1))
            .enter()
            .append("line")
            .attr("x1", d => (this.xcoord(d)))
            .attr("y1", 0)
            .attr("x2", d => (this.xcoord(d)))
            .attr("y2", this.fieldWidth)
            .attr("stroke", "black")
    }

    drawGridY() {
        this.glines.selectAll("line.gridy")
            .data(_.range(0, DIM_Y + 1))
            .enter()
            .append("line")
            .attr("x1", 0)
            .attr("y1", d => (this.ycoord(d)))
            .attr("x2", this.fieldHeight)
            .attr("y2", d => (this.xcoord(d)))
            .attr("stroke", "black")
    }

    newPosition(position) {
        const index = flattenCoords(position.x, position.y);
        this.flattenedMatrix[index] = position;
        this.drawMatrix();
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

    drawMatrix() {
        const data = this.grects.selectAll("rect.position").data(this.flattenedMatrix, d => d.x + "-" + d.y);

        data.enter()
            .append("rect")
            .attr("width", this.tileSize)
            .attr("height", this.tileSize)
            .attr("x", d => this.xcoord(d.x))
            .attr("y", d => this.ycoord(d.y))
            .merge(data)
            .attr("fill", d => _.isEmpty(d.id) ? "white" : colorScale(d.id))
            .attr("class", d => "position" + (d.head ? " head" : "") + " " + d.x + " " + d.y)
    }

    drawPositions(positions) {
        const _extendedPositions = this.extendPositions(positions);
        const data = this.grects.selectAll("rect.position").data(_extendedPositions, d => d.id + "." + d.x + "." + d.y);

        data.enter()
            .append("rect")
            .attr("width", this.tileSize)
            .attr("height", this.tileSize)
            .attr("x", d => this.xcoord(d.x))
            .attr("y", d => this.ycoord(d.y))
            .attr("fill", d => _.isEmpty(d.id) ? "white" : colorScale(d.id))
            .merge(data)
            .attr("class", d => "position" + (d.head ? " head" : "") + " " + d.x + " " + d.y)
            .attr("rx", d => (d.head ? this.tileSize / 2 : 0))
            .attr("ry", d => (d.head ? this.tileSize / 2 : 0))
    }
}
