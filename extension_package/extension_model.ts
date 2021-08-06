import {LayoutDOM, LayoutDOMView} from "@bokehjs/models/layouts/layout_dom"
import {ColumnDataSource} from "@bokehjs/models/sources/column_data_source"
import {LayoutItem} from "@bokehjs/core/layout"
import * as p from "@bokehjs/core/properties"

declare namespace vis {
  class Graph3d {
    constructor(el: HTMLElement, data: object, OPTIONS: object)
    setData(data: vis.DataSet): void
  }

  class DataSet {
    add(data: unknown): void
  }
}

const OPTIONS = {
  width: '600px',
  height: '600px',
  style: 'surface',
  showPerspective: true,
  showGrid: true,
  keepAspectRatio: true,
  verticalRatio: 1.0,
  legendLabel: 'stuff',
  cameraPosition: {
    horizontal: -0.35,
    vertical: 0.22,
    distance: 1.8,
  },
}

export class Surface3dView extends LayoutDOMView {
  model: Surface3d

  private _graph: vis.Graph3d

  initialize(): void {
    super.initialize()

    const url = "https://cdnjs.cloudflare.com/ajax/libs/vis/4.16.1/vis.min.js"
    const script = document.createElement("script")
    script.onload = () => this._init()
    script.async = false
    script.src = url
    document.head.appendChild(script)
  }

  private _init(): void {
    this._graph = new vis.Graph3d(this.el, this.get_data(), OPTIONS)

    this.connect(this.model.data_source.change, () => {
      this._graph.setData(this.get_data())
    })
  }

  get_data(): vis.DataSet {
    const data = new vis.DataSet()
    const source = this.model.data_source
    for (let i = 0; i < source.get_length()!; i++) {
      data.add({
        x: source.data[this.model.x][i],
        y: source.data[this.model.y][i],
        z: source.data[this.model.z][i],
      })
    }
    return data
  }

  get child_models(): LayoutDOM[] {
    return []
  }

  _update_layout(): void {
    this.layout = new LayoutItem()
    this.layout.set_sizing(this.box_sizing())
  }
}

export namespace Surface3d {
  export type Attrs = p.AttrsOf<Props>

  export type Props = LayoutDOM.Props & {
    x: p.Property<string>
    y: p.Property<string>
    z: p.Property<string>
    data_source: p.Property<ColumnDataSource>
  }
}

export interface Surface3d extends Surface3d.Attrs {}

export class Surface3d extends LayoutDOM {
  properties: Surface3d.Props
  __view_type__: Surface3dView

  static __module__ = "extension_package.extension_model"

  constructor(attrs?: Partial<Surface3d.Attrs>) {
    super(attrs)
  }

  static __name__ = "Surface3d"

  static init_Surface3d() {
    this.prototype.default_view = Surface3dView

    this.define<Surface3d.Props>(({String, Ref}) => ({
      x:            [ String ],
      y:            [ String ],
      z:            [ String ],
      data_source:  [ Ref(ColumnDataSource) ],
    }))
  }
}
