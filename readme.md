# A Bokeh prebuilt extension example
This repository contains a simple [Bokeh prebuilt extension](https://docs.bokeh.org/en/latest/docs/user_guide/extensions.html#pre-built-extensions). This example was produced using Bokeh version 2.3.3.

It is mostly just the "[Wrapping a JavaScript library](https://docs.bokeh.org/en/latest/docs/user_guide/extensions_gallery/wrapping.html#userguide-extensions-examples-wrapping)" example reworked to be used as a prebuilt extension as opposed to an inline extension used in the tutorial. The only changes are those necessary to convert it to a prebuilt extension.

Assuming you have Python, Node, and Bokeh prepared in advance, to build the example extension, go to the `extension_package` directory and run `bokeh build`. Then the script which uses the extension should run correctly, and produce a 3D graphic which can be rotated, etc.

# Useful information
The [Bokeh documentation on prebuilt extensions](https://docs.bokeh.org/en/latest/docs/user_guide/extensions.html#pre-built-extensions) (as of 2021-08-05) is a bit sparse. Here is some useful information learned while creating this extension example.

* `bokeh init` and `bokeh build` should be run from the extension package directory.
* `bokeh init` creates a file with an outdated dependency name in `package.json`. It references the old `bokehjs`. This needs to be changed to `@bokeh/bokehjs`
  * After changing this name, run `npm install` to install the Node module `@bokeh/bokehjs`.
* You will need a `.py` and a `.ts` file pair to hold the model representation on both the Python and TypeScript side of things.
* In the TypeScript model, you need to add a special property defining the path to the Python module. In the example case, this is the `static __module__ = "extension_package.extension_model"` property of the `Surface3d` class in the `extension_model.ts` file.
  * The TypeScript model points to the Python model. The Python model does not need have any indicator of the TypeScript model.
* The paths used to import from `bokehjs` modules is significantly different from the inline versions. You need to specify the `npm` installed version and the related paths specified in `tsconfig.json`. Compare the imports in `extension_model.ts` and path definitions in `tsconfig.json`.
* The `index.ts` file is being used to register the models with Bokeh.

# Other notes
* I have not previously used Node. There are two improvements I would expect could be made, but I was unable to get them working.
  1. I would expect the files which define the package (e.g., `package.json`, `tsconfig.json`) could live in the project root directory rather than inside the package extension directory, similar to how I would structure packages in Python.
  2. I would expect the `"paths": { "@bokehjs/*": [ ...` entry in `tsconfig.json` to be unnecessary, and that there would be a way to specify these paths to the `node_modules` directly in the code.
* The [Awesome Panel documentation about their Bokeh prebuilt extension](https://awesome-panel.readthedocs.io/en/latest/prebuilt_bokeh_model_extensions.html) was useful in getting this example up and running.