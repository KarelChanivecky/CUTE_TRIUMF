# Cute React page filesystem description

## Index
* [Root](#root)
* [build](#build)
* [public](#public)
* [docs](#docs)
* [src](#src)
* [pages](#pages)
* [widgets](#widgets)
* [components](#components)
* [constants](#constants)
* [img](#img)
* [style](#style)

## Root

In the root directory, the [public](#public), [build](#build), [src](#src), and [docs](#docs) directories are found.
Additionally, it contains the node_modules directory, where the dependencies are installed. The project dependencies 
are defined in the package.json and package-lock.json files also in this directory.

## build

In the build directory is the production-optimized version of the code. To run the code in this directory
follow the instructions in [deployment](https://facebook.github.io/create-react-app/docs/deployment).

## public

This directory contains the root html file that is served. The html file will invoke the
app.js script in [src](#src) which will start the rendering of the React application

## docs

This directory contains the documentation of this site.

## src

This is the directory where the source code is contained. The files within the src directory cannot import files outside of 
the directory. Directly inside this directory is the app.js file, which is the root of this React application.


The src directory also contains the following directories:
* [widgets](#widgets)
* [pages](#pages)
* [components](#components)
* [constants](#constants)
* [img](#img)
* [style](#style)


Inside the widgets, pages, components, the React components each React element is enclosed in a directory named after 
itself. This is to allow for better organization of supporting utility files or style files.

## pages

The application is first divided into pages. Pages can be swapped using react-router, however there is currently only 
one page in this application. Although unnecessary, this architecture was used to accommodate future expansion of the
hub.


The current page is called TabPage, and it includes and manages the data plotting tab, as well as the widget tab named 
CalibCryoFridgeTab, for which there are 2 different versions. full screen, and accordion. In narrow view, only the
calibration widget is currently displayed.

## widgets

This directory contains widgets. Widgets are self-supporting, encapsulated applications that can be inserted into the 
main hub. An example of a widget is the Fridge diagram.


## components

This directory contains elements that can be reused in other components, or widgets. The main difference between a 
component and a widget is that components are not useful as an app of their own, their sole function is to enhance the
functionality of the app.

## constants

This directory contains constants and enums to be used by the application.

## img

This directory contains image resources.

## style

This directory contains the global stylings for the application. That includes the css applied to body, and .app. 
Additionally, it also includes the Material UI theme customizations, such as palette and typography.