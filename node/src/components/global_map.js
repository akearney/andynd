import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';
import TrackballControls from '../plugins/trackball';
import earth from './textures/AdjustedWorld.png';
import continents from '../data/continents.json';

import './global_map.css';

/*
const AXES_HELPER = true;
const DEBUG_PLANE = 'Djapar';
*/
const AXES_HELPER = false;
const DEBUG_PLANE = '';

export default class GlobalMap extends Component {
  constructor(props) {
    super(props);
    this.canvas = null;
    this.camera = null;
    this.scene = null;
    this.renderer = null;
    this.controls = null;
    this.globe = null;
    this.raycaster = null;
    this.mouse = null;
    this.info = {};
  }

  init() {
    this.mouse = new THREE.Vector2();
    this.canvas = ReactDOM.findDOMNode(this).getElementsByTagName('canvas')[0];
    this.camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 100 );
    this.camera.up.set(0, 1, 0);
    this.camera.position.x = 2;
    this.camera.lookAt(new THREE.Vector3(0,0,0));
    this.scene = new THREE.Scene();
    if (AXES_HELPER) {
      const axes = new THREE.AxesHelper(5);
      this.scene.add(axes);
    }

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5,5,5);
    this.camera.add(light)
    this.scene.add(this.camera);
    const ambient = new THREE.AmbientLight(0x222222);
    this.scene.add(ambient);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.controls = new TrackballControls(this.camera, this.canvas);
    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.8;

    this.controls.noZoom = false;
    this.controls.noPan = false;

    this.controls.staticMoving = true;
    this.controls.dynamicDampingFactor = 0.3;

    this.controls.keys = [ 65, 83, 68 ];
    this.raycaster = new THREE.Raycaster();
		this.addInfoSquares();
	}

  addInfoSquares() {
    for (let i = 0; i < continents.names.length; i++) {
      const name = continents.names[i];
      const plane = continents[name].plane;
      if (!plane) {
        continue;
      }
      if (DEBUG_PLANE && name != DEBUG_PLANE) {
        continue;
      }
      const geometry = new THREE.PlaneGeometry(plane.size.x, plane.size.y, 32);
      const material = new THREE.MeshBasicMaterial( {
        color: 0xffff00,
        transparent: true,
        side: THREE.DoubleSide
      } );
      // material.opacity = 0;
      const planeMesh = new THREE.Mesh( geometry, material );
      planeMesh.position.x = plane.position.x;
      planeMesh.position.y = plane.position.y;
      planeMesh.position.z = plane.position.z;
      planeMesh.rotation.x = plane.rotation.x;
      planeMesh.rotation.y = plane.rotation.y;
      planeMesh.rotation.z = plane.rotation.z;
      this.scene.add(planeMesh);
      this.info[name] = planeMesh;
    }
  }

  animate() {
    this.updateDimensions();
    requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.scene, this.camera);
    this.controls.update();
    if (this.mouse && this.mouse.x && this.mouse.y) {
      const mousePoint = new THREE.Vector3(this.mouse.x, this.mouse.y, 1);
      mousePoint.unproject(this.camera);
      const ray = new THREE.Raycaster(
        this.camera.position, mousePoint.sub(this.camera.position).normalize());
      const intersect = ray.intersectObjects(this.scene.children);
      if (intersect && intersect.length > 1) {
        for (let i = 0; i < intersect.length; i++) {
          if (intersect[i].object !== this.globe) {
            Object.keys(this.info).forEach(name => {
              if (this.info[name] === intersect[i].object) {
                this.props.onContinent(name);
              }
            });
          } else {
            break;
          }
        }
      }
    }
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
    this.controls.handleResize();
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

  handleMouseMove(event) {
    const target = event.target;
    const rect = target.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = ((event.clientY - rect.top) / rect.height) * -2 + 1;;
  }

  render() {
    return (
      <div className="canvasContainer">
        <canvas onMouseMove={ this.handleMouseMove.bind(this) }
            className="canvas"></canvas>
      </div>
    );
  }
}
