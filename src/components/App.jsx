import React, {Component} from 'react';
import {Page, Layout, Card, Button, VisuallyHidden} from '@shopify/polaris';
import Canvas from './Canvas.jsx';
import {fabric} from 'fabric';

class App extends Component {

    constructor(){
        super();
        this.fileInputRef= React.createRef();
    }

    loadImage(imgObj) {
        if (imgObj._element == null) {
            console.log(imgObj);
        } else {
            imgObj.scaleX = this.canvas.width / imgObj.width;
            imgObj.scaleY = this.canvas.height / imgObj.height;
            this.canvas.backgroundImage = imgObj;
            this.canvas.renderAll();
        }
    }

    addBG(url) {
        fabric.Image.fromURL(url, this.loadImage.bind(this));
    };

    loadCanvasProps(obj) {
        let loadedCanvasWidth = obj['width'];
        let loadedCanvasHeight = obj['height'];
        this.widthRatio = this.canvas.width / loadedCanvasWidth;
        this.heightRatio = this.canvas.height / loadedCanvasHeight;
        for (let key in obj) {
            if (key === 'width' || key === 'height')
                continue;
            if (key === 'backgroundImage') {
                this.addBG(obj[key]);
                continue;
            }
            this.canvas[key] = obj[key];
        }
        this.canvas.renderAll();
    }

    loadShape(obj) {
        let shapeObj;
        switch (obj.type) {
            case 'rect':
                shapeObj = new fabric.Rect(obj);
                break;
            case 'circle':
                shapeObj = new fabric.Circle(obj);
                break;
            case 'triangle':
                shapeObj = new fabric.Triangle(obj);
                break;
            case 'polygon':
                shapeObj = new fabric.Polygon(obj.points, obj);
                break;
            default:
                break;
        }
        shapeObj.scaleY = obj.scaleY * this.heightRatio;
        shapeObj.scaleX = obj.scaleX * this.widthRatio;
        shapeObj.top = obj.top * this.heightRatio;
        shapeObj.left = obj.left * this.widthRatio;
        shapeObj.angle = obj.angle;
        this.canvas.add(shapeObj).renderAll();
    }

    loadJSON() {
        this.canvas.clear();
        this.loadedJSON.forEach((obj) => {
            if (obj.type === 'canvas') {
                this.loadCanvasProps(obj);
            } else {
                this.loadShape(obj);
            }
        });
    }

    onReaderLoad(event) {
        this.loadedJSON = JSON.parse(event.target.result);
        this.loadJSON();
    }

    _handleUpload(event) {
        let reader = new FileReader();
        reader.onload = this.onReaderLoad.bind(this);
        reader.readAsText(event.target.files[0]);
    }

    _handleBtnClick(){
        this.fileInputRef.current.click();
    }

    render() {
        return (
            <Page fullWidth>
                <Layout>
                    <Layout.Section secondary>
                        <Card sectioned>
                            <Button fullWidth={true} onClick={this._handleBtnClick.bind(this)}>
                                Load JSON
                            </Button>
                            <VisuallyHidden>
                                <input type="file" ref={this.fileInputRef} accept=".json" onChange={this._handleUpload.bind(this)}/>
                            </VisuallyHidden>
                        </Card>
                    </Layout.Section>
                    <Layout.Section>
                        <Card sectioned>
                            <Canvas canvas={(canvas) => {
                                this.canvas = canvas
                            }}/>
                        </Card>
                    </Layout.Section>
                </Layout>
            </Page>
        );
    }
}

export default App;