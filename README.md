images-ready
===

Wait for a set of images to be loaded.

## Installation
`npm i images-ready --save`

## Usage
`onImagesReady(images, callback)`
* `images` can be an array or a NodeList of HTMLImageElements.
* `callback` must be a function, called when all the images are loaded.

The callback is passed an `images` array that contains a list of object containing the image and its load event, in the same order the images were passed to the function.

`images`
* `img` the origin HTMLImageElement object
* `event` the load event

## Example
```js

var onImagesReady = require('images-ready');
var $images = document.querySelectorAll('img');
onImagesReady($images, function(images) {
  for(var i = 0; i < images.length; i++) {
    context.drawImage(images[i].img, 0, 0);
  }
});

```