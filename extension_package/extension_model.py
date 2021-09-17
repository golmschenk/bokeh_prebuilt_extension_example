from bokeh.core.property.instance import Instance
from bokeh.core.property.primitive import String
from bokeh.models import LayoutDOM, ColumnDataSource


class Surface3d(LayoutDOM):
    data_source = Instance(ColumnDataSource)
    x = String()
    y = String()
    z = String()
