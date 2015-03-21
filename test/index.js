'use strict';

Function.prototype.bind = require("function-bind"); // Phantomjs / testling nonsense

var onImagesReady = require('../index.js');
var test = require('tape');

test('load a single image', function(assert) {
    var img = new Image();
    document.body.appendChild(img);

    onImagesReady([img], function(images) {
        if(images[0].img === img) {
            assert.pass('The image was properly loaded.');
            assert.end();
        }
        else {
            assert.fail('The image was NOT loaded.');
        }
    });

    img.src = './test/octocat.png';
});

test('load a few images', function(assert) {
    assert.plan(3);

    var imgs = ['1.jpg', '2.jpg', '3.jpg'].map(function(url) {
        var img = new Image();
        img.src = './test/' + url;
        document.body.appendChild(img);
        return img;
    });

    onImagesReady(imgs, function(images) {
        imgs.forEach(function(img, i) {
            if(img === images[i].img) {
                assert.pass('The image ' + (i + 1) + ' was properly loaded.');
            }
            else {
                assert.fail('The image ' + (i + 1) + ' was NOT loaded.');
            }
        })
    });
});