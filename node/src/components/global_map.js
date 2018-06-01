import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';
import TrackballControls from 'three-trackballcontrols';
import earth from './textures/WorldMapFlat.png';

import './global_map.css';

export default class GlobalMap extends Component {
  constructor(props) {
    super(props);
    this.canvas = null;
    this.camera = null;
    this.scene = null;
    this.renderer = null;
    this.controls = null;
    this.globe = null;
  }

  init() {
    this.canvas = ReactDOM.findDOMNode(this).getElementsByTagName('canvas')[0];
    this.camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 100 );
    this.camera.up.set(0, 1, 0);
    this.camera.position.z = 1;
    this.camera.lookAt(new THREE.Vector3(0,0,0));
    this.scene = new THREE.Scene();

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5,5,5);
    this.scene.add(light)
    const ambient = new THREE.AmbientLight(0x222222);
    this.scene.add(ambient);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.controls = new TrackballControls(this.camera, this.canvas);
	}

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.globe.rotation.x += 0.001;
    this.globe.rotation.y += 0.002;
    this.renderer.render(this.scene, this.camera);
  }

  updateDimensions() {
    const root = ReactDOM.findDOMNode(this);
    this.canvas.width = root.clientWidth;
    this.canvas.height = root.clientHeight;
    this.canvas.setAttribute(
      'style', `width: ${root.clientWidth}px; height: ${root.clientHeight}px;`);
    this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
  }

  componentDidMount() {
    this.init();
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const material = new THREE.MeshPhongMaterial({
      map: THREE.ImageUtils.loadTexture(earth)
    });
    this.globe = new THREE.Mesh(geometry, material);
    this.scene.add(this.globe);
    this.animate();
    window.addEventListener("resize", this.updateDimensions.bind(this));
    this.updateDimensions();
  }

  componentDidUnMount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  render() {
    return (
      <div className="canvasContainer">
        <canvas className="canvas"></canvas>
      </div>
    );
  }
}
