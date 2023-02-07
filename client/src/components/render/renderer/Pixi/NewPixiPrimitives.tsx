import { Graphics as GraphicsType, } from "@pixi/graphics";
import memoizee from "memoizee";
import { Component, Event } from "../../types/render";
import * as PIXI from 'pixi.js';

export type DrawingInstruction = (event:Event) => (graphic:GraphicsType) => void;

export type InstrinsicComponents = {
  [key:string]: {"converter" : (comp:Component)=>DrawingInstruction,
                 "renderer": string}
}

// default context
const context = {
  current: null,
  parent: null,
  events: null,
  colour: {
    source: 0x26a69a,
    destination: 0xf06292,
    expanding: 0xff5722,
    updating: 0xff5722,
    generating: 0xffeb3b,
    closing: 0xb0bec5,
    end: 0xec407a,
  },
  scale: 15,
  fill: 0x000000,
  alpha: 1,
}

const scale = (length: number): number => {
  return length * context.scale;
}

export const d2InstrinsicComponents: InstrinsicComponents = {
  "rect": {
    "converter": (comp: Component) => rectDrawingCoverter(comp),
    "renderer": "2d-pixi",
  }
}

function rectDrawingCoverter(component: Component) {

  return memoizee((event: Event) => {

    for (const prop in component) {
      if (typeof component[prop] === "function") {
        component[prop] = component[prop](event);
      }
    }

    let color;

    if (event.type !== undefined && event.type in context.colour) {
      color = context.colour[event.type as keyof typeof context.colour];
    }

    if (!color) {
      console.dir(event.type);
    }

    const [x, y, w, h] = [
      scale(component.x), 
      scale(component.y),
      scale(component.width ?? 1),
      scale(component.height ?? 1)
    ];

    const rect = new PIXI.Graphics();
    rect
      .beginFill(component.fill ?? color ?? 0xff5722,
        component.alpha ?? context.alpha)
      .drawRect(
        scale(component.x),
        scale(component.y),
        scale(component.width ?? 1),
        scale(component.height ?? 1)
      )
      .endFill();

    if (component.text) {
      const buttonText = new PIXI.Text(component.text,
        {
          fontFamily: 'Arial',
          fontSize: 10,
          fill: "black",
        });
      buttonText.y = scale(component.y)
      buttonText.x = scale(component.x);
      rect.addChild(buttonText);
    }
    
    
    return (g: GraphicsType) => {g.addChild(rect)};
  }, {primitive:true})
}