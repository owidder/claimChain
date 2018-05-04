import * as d3 from 'd3';
import * as _ from 'lodash';
import * as $ from "jquery";
import 'tooltipster';
import {DIM_X, DIM_Y} from '../blockChain/info';
import {guid} from '../util/random';

import './Field.css';

const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

const emptyFlattenedMatrix = () => {
    const flattenedMatrix = [];
    _.range(DIM_Y).forEach((y) => {
        _.range(DIM_X).forEach((x) => {
            const uuid = guid();
            const hash = "0";
            const id = "";
            flattenedMatrix.push({id, x, y, hash, uuid});
        })
    });

    return flattenedMatrix;
}

const flattenCoords = (x, y) => {
    return Number(y) * DIM_X + Number(x);
}

const idFromObjectWithXAndY = (obj) => {
    return "_" + obj.x + "_" + obj.y;
}

export class SvgField {
    constructor(containerSelector, width, height, hoverCallback) {
        const self = this;

        this.width = width;
        this.height = height;
        this.hoverCallback = hoverCallback;

        const _tileWidth = width / DIM_X;
        const _tileHeight = height / DIM_Y;
        this.tileSize = Math.min(_tileHeight, _tileWidth);
        this.fieldWidth = this.tileSize * DIM_X;
        this.fieldHeight = this.tileSize * DIM_Y;

        this.root = d3.select(containerSelector)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .on("mouseout", () => {
                if(_.isFunction(this.hoverCallback)) {
                    self.isOver = false;
                    if(_.isUndefined(self.timer)) {
                        self.timer = setTimeout(() => {
                            self.timer = undefined;
                            if(!self.isOver) {
                                this.hoverCallback(undefined, undefined, []);
                            }
                        }, 5000);
                    }
                }
            })

        this.root.append("g").attr("class", "rects");

        this.root.append("g").attr("class", "lines");

        this.glines = this.root.select("g.lines");
        this.grects = this.root.select("g.rects");

        this.drawGridX();
        this.drawGridY();

        this.flattenedMatrix = emptyFlattenedMatrix();
        this.history = {};

        this.isOver = false;
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

    putInHistory(position) {
        const id = idFromObjectWithXAndY(position);
        if(_.isUndefined(this.history[id])) {
            this.history[id] = [position];
        }
        else {
            this.history[id].push(position);
        }
    }

    getHistoryIncludingCurrentPosition(position) {
        const id = idFromObjectWithXAndY(position);
        const history = this.history[id];
        if(_.isEmpty(history)) {
            return [position];
        }
        return [...history, position];
    }

    newPosition(position) {
        const index = flattenCoords(position.x, position.y);
        const currentPositionAtIndex = this.flattenedMatrix[index];
        if(!_.isEmpty(currentPositionAtIndex.id)) {
            this.putInHistory(currentPositionAtIndex);
        }
        this.flattenedMatrix[index] = position;
        this.drawMatrix();
    }

    removeAllHeads() {
        this.grects.selectAll(".head")
            .classed("head", false);
    }

    addHead(head) {
        const xyClass = idFromObjectWithXAndY(head);
        this.grects.selectAll("." + xyClass)
            .classed("head", true);
    }

    drawHeads() {
        this.removeAllHeads();
        _.values(this.heads).forEach((head) => {
            this.addHead(head);
        })
    }

    newHeads(heads) {
        this.heads = heads;
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
            .attr("class", d => "tooltip position " + idFromObjectWithXAndY(d))
            .on("mouseover", d => {
                this.isOver = true;
                if(_.isFunction(this.hoverCallback)) {
                    const historyIncludingCurrentPosition = this.getHistoryIncludingCurrentPosition(d);
                    this.hoverCallback(d.x, d.y, historyIncludingCurrentPosition);
                }
            });

        this.drawHeads();
    }
}
