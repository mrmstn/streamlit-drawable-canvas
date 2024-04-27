import { fabric } from "fabric"
import FabricTool, { ConfigureCanvasProps } from "./fabrictool"

class TextTool extends FabricTool {
  isMouseDown: boolean = false
  strokeWidth: number = 10
  textColor: string = "#ffffff"
  currentText: fabric.Textbox = new fabric.Textbox("")

  configureCanvas({
                    strokeWidth,
                    strokeColor,
                  }: ConfigureCanvasProps): () => void {
    this._canvas.isDrawingMode = false
    this._canvas.selection = false
    this._canvas.forEachObject((o) => (o.selectable = o.evented = false))

    this.strokeWidth = strokeWidth
    this.textColor = strokeColor

    this._canvas.on("mouse:down", (e: any) => this.onMouseDown(e))
    this._canvas.on("mouse:move", (e: any) => this.onMouseMove(e))
    this._canvas.on("mouse:up", (e: any) => this.onMouseUp(e))
    this._canvas.on("mouse:out", (e: any) => this.onMouseOut(e))
    return () => {
      this._canvas.off("mouse:down")
      this._canvas.off("mouse:move")
      this._canvas.off("mouse:up")
      this._canvas.off("mouse:out")
    }
  }

  onMouseDown(o: any) {
    let canvas = this._canvas
    let _clicked = o.e["button"]
    this.isMouseDown = true
    var pointer = canvas.getPointer(o.e)
    var point = new fabric.Point(pointer.x, pointer.y)
    let objects = canvas.getObjects()


    let textObject = objects.find(obj => {
      return obj instanceof fabric.Textbox && obj.containsPoint(point)
    }) as fabric.Textbox

    if (!textObject) {
      this.currentText = new fabric.Textbox("", {
        left: pointer.x,
        top: pointer.y,
        strokeWidth: this.strokeWidth,
        fill: this.textColor,
        stroke: this.textColor,
        originX: "left",
        originY: "top",
        selectable: true,
        editable: true,
        evented: false,
      })
      if (_clicked === 0) {
        canvas.add(this.currentText)
        canvas.setActiveObject(this.currentText)
        this.currentText.enterEditing()
      }
    } else if (_clicked === 0) {
      // If the text object is clicked, make it the active object
      canvas.setActiveObject(textObject)
      textObject.enterEditing()
    }
  }

  onMouseMove(o: any) {
    if (!this.isMouseDown) return
    let canvas = this._canvas
    this.currentText.setCoords()
    canvas.renderAll()
  }

  onMouseUp(o: any) {
    this.isMouseDown = false
  }

  onMouseOut(o: any) {
    this.isMouseDown = false
  }
}

export default TextTool
