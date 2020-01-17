import React, {Component} from 'react';
import {fabric} from "fabric";

class Canvas extends Component {

    componentDidMount() {
        this.canvas = new fabric.Canvas('canvas', {
            preserveObjectStacking: true
        });
        this.props.canvas(this.canvas);
    }

    render() {
        return (
            <canvas id="canvas" width="750" height="750"/>
        );
    }
}

export default Canvas;