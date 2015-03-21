'use strict';

module.exports = function (images, callback) {
    return new ImageWaiter(images, callback);
};;

module.exports.Waiter = ImageWaiter;

/**
 * Fire a callback when ALL provided images are loaded
 * @param {NodeList/Array}      List of images to process
 * @param {Function} callback   onComplete callback
 */
function ImageWaiter(images, callback) {
    this.callback = callback;
    this.images = [];

    for(var i = 0; i < images.length; i++) {
        var img = images[i];
        img.onload = this.onLoad.bind(this, i);
        this.images[i] = {
            img: img,
            loaded: false,
            event: null
        };
    }
}

ImageWaiter.prototype.constructor = ImageWaiter;

ImageWaiter.prototype.onLoad = function(index, event) {
    (event.target || event.srcElement).onload = null;
    var data = this.images[index];
    data.loaded = true;
    data.event = event;

    if(this.images.every(function(data) {
        return data.loaded;
    })) this.onComplete();
};

ImageWaiter.prototype.onComplete = function() {
    this.callback(this.images);
    this.callback = null;
    this.images = null;
};