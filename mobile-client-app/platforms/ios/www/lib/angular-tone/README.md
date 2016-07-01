angular-tone
=============================

Make Music with AngularJS! This Module wraps ToneJS together with many music UI elements such as keyboards and pads.

# Installation

1. Install via bower:

```sh
bower install angular-tone --save
```

2. Add ```ec.angular.tone``` dependency to your Angular Module.

# How to Use

## Keyboard with Synthesizer

To get a Synthesizer Keyboard, use the ``keyboard``` directive in your template:

```html
<keyboard id="smoothKeys" width="500" synth="smoothSynth"></keyboard>
```

and define the ToneJS Synthesizer in your controller's scope, for example:

```javascript
    $scope.smoothSynth = new Tone.MonoSynth({
      "envelope":       {
        "attack":  0.005,
        "decay":   0.2
      }).toMaster();
```

## Mixer to control Synth Parameters

You can easily control any type of parameters for your music app. For example, to control the above synthesizer's envelope, use the following snippet in your template:

```html
<mixer ng-model="smoothSynth.envelope"></mixer>
```

The ```mixer``` directive will automatically look for numbers in the given ngModel and renders them as poti knobs!
Coming Soon: Latching Potis for discrete values!
 
## Potis

You can also just render a single poti with the ```poti``` directive:

```html
<poti ng-model="smoothSynth.envelope.attack" label="attack" min="0" max="100"></poti>
```

## Matrix

The ```matrix``` directive shows a two dimensional array of pads:

```html
<matrix width="3" height="3" on-trigger="doSomething"></matrix>
```

The onTrigger callback contains three parameters:
**active**: boolean that reflects the state of the pad you have just triggered
**position**: An object, containing x and y values for the pads position (starting at zero)
**state**: The current state of the whole matrix, represented by a two dimensional object with booleans at the bottom lvl.

You can do whatever you want with the given information! Coming Soon: Matrix Sequencer! 

## Pad

The ```pad``` directive shows a single pad.

```html  
<pad on-trigger="doSomething" data="someData"></pad>
```

The onTrigger callback has two params:
**active**: Boolean reflecting the state of the pad after the click.
**data**: The contents of the optional data attribute

Coming Soon: More mouse interaction events. 

# Running the Demo

## System Preparation

To use the included demo, you'll need the following things installed on your machine.

1. [NodeJS](http://nodejs.org)
2. [GulpJS](https://github.com/gulpjs/gulp) - `$ npm install -g gulp` 
3. [Bower](http://bower.io/) - `$ npm install -g bower` 

## Local Installation

1. Clone this repo, or download it into a directory of your choice.
2. Inside the directory, run `npm install`.

## Development

This will give you file watching, browser synchronisation, auto-rebuild, CSS injecting etc etc.

```shell
$ gulp serve
```

### adding a new js lib
To add a js library, use the provided bower package and run

```shell
$ bower install jquery -s
```

The `-s` attribute ensures, that the package is added to your bower.json file.


### adding sass files from external libs
After adding and installing the library with bower, you can import the files in your sass-files using the relative path to the library in the bower_modules folder.

## Deploy / build project

To build the project, run

```shell
$ gulp build
```

All files will be stored in the `dist` folder.