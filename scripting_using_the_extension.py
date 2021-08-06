import numpy as np
from bokeh.io import show
from bokeh.models import ColumnDataSource

from extension_package.extension_model import Surface3d

x = np.arange(0, 300, 10)
y = np.arange(0, 300, 10)
xx, yy = np.meshgrid(x, y)
xx = xx.ravel()
yy = yy.ravel()
value = np.sin(xx / 50) * np.cos(yy / 50) * 50 + 50

source = ColumnDataSource(data=dict(x=xx, y=yy, z=value))

surface = Surface3d(x="x", y="y", z="z", data_source=source, width=600, height=600)

show(surface)
