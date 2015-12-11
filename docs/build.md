# Build

By default, each version of **Karyo.JS** comes with a `build` folder, where you can find the compiled scripts, images and styles ready to integrate the tool to your web application. Therefore, you can build your own version of the tool following the steps described here.

### Requisites

**Karyo.JS** is written in JavaScript and CSS. We use two libraries for making it running: [jQuery](https://jquery.com/) and [SVG.js](http://svgjs.com/). Also, we use [gulp](http://gulpjs.com) to compile and minimize the code, and [NPM](http://npmjs.org) (Node Package Manager) for managing the dependencies.

#### Install NPM

**NPM** needs [Node.JS](https://nodejs.org/en/) to run. You can download it from the [Node.JS downloads page](https://nodejs.org/en/download/). The installation also comes with the latest version of NPM.

#### Clone the Karyo.JS repository

Next, you need the source code of **Karyo.JS**. You can download the source from [here](https://github.com/jmjuanes/karyojs/archive/dev.zip), or clone the repository using the next command:

```
git clone https://github.com/jmjuanes/karyojs.git
```

Note that you must have the [Git client](https://git-scm.com/) tool installed on your computer for this.

#### Install gulp

**Gulp** is a tool for automatize some tasks. We use it for concat all source files in only one, minimize it and copy all files into the `build` folder.

You can simply install gulp and its dependencies running the next command from the **Karyo.JS** root folder:

```
npm install
```

You might need to install the gulp package globally, run `npm install -g gulp`.


### Compile/build Karyo.JS

Once you have gulp and its dependencies installed, you can run the next command from the root folder of the tool:

```
gulp build
```

This will compile **Karyo.JS** and place the compiled files into the `build` folder.
