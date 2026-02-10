import * as THREE from 'three';

class Visualization3D {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.setUpRenderer();
    this.createFootballField();
    this.addPlayers();
  }

  setUpRenderer() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  }

  createFootballField() {
    const fieldGeometry = new THREE.PlaneGeometry(100, 70);
    const fieldMaterial = new THREE.MeshBasicMaterial({ color: 0x228B22 }); // green color
    const field = new THREE.Mesh(fieldGeometry, fieldMaterial);
    field.rotation.x = - Math.PI / 2;
    this.scene.add(field);
  }

  addPlayers() {
    const playerGeometry = new THREE.SphereGeometry(1, 32, 32);
    const playerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // red color
    const player1 = new THREE.Mesh(playerGeometry, playerMaterial);
    const player2 = new THREE.Mesh(playerGeometry, playerMaterial);

    player1.position.set(-20, 1, 0);
    player2.position.set(20, 1, 0);

    this.scene.add(player1);
    this.scene.add(player2);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }
}

const visualization = new Visualization3D();
visualization.camera.position.z = 100;
visualization.animate();
