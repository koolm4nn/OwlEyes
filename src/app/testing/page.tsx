'use client'

import React from "react";
import { useState } from "react"
import { SketchPicker } from "react-color";

function ColorPicker() {
    const [color, setColor] = useState("#ff0000")

    return (
        <>
        <div>
            <input 
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}>
                </input>
        </div>     
        <div>
                <SketchPicker 
                    color={color}
                    onChangeComplete={(color) => setColor(color.hex)}
                />
        </div>
        <div>
            <p>Selected color: {color}</p>
        </div>
        </>
    )
} 

export default function Testing(){
    return (
        <div className="grid grid-cols-4 gap-1">
            <div className="grid grid-cols-1 gap-2">
                <button className="w-[100px] rounded-lg bg-primary text-white py-1 hover:brightness-110">
                    Primary
                </button>
                <button className="w-[100px] rounded-lg bg-secondary text-white py-1 hover:brightness-110">
                    Secondary
                </button>
                <button className="w-[100px] rounded-lg bg-accent text-white py-1 hover:brightness-110">
                    Accent
                </button>
                <button className="w-[100px] rounded-lg bg-focus text-white py-1 hover:brightness-110">
                    Focus
                </button>
                <button className="w-[100px] rounded-lg bg-success text-white py-1 hover:brightness-110">
                    Success
                </button>
                <button className="w-[100px] rounded-lg bg-warning text-white py-1 hover:brightness-110">
                    Warning
                </button>
                <button className="w-[100px] rounded-lg bg-select text-neutral-800 py-1 hover:brightness-110">
                    Select
                </button>
                <button className="w-[100px] rounded-lg bg-error text-white py-1 hover:brightness-110">
                    Error
                </button>
            </div>
            <div className="bg-red-200">
                <ColorPicker />
            </div>
        </div>
    )
}