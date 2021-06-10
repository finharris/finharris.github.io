import * as THREE from './js/three.module.js';
import { APP } from './js/app.js';
import { VRButton } from './js/VRButton.js';

window.THREE = THREE; // Used by APP Scripts.
window.VRButton = VRButton; // Used by APP Scripts.

var loader = new THREE.FileLoader();
loader.load('app.json', function (text) {
  var player = new APP.Player();
  player.load(JSON.parse(text));
  player.setSize(window.innerWidth, window.innerHeight);
  player.play();

  document.body.appendChild(player.dom);

  window.addEventListener('resize', function () {
    player.setSize(window.innerWidth, window.innerHeight);
  });
});
