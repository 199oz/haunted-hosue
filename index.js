import * as THREE from 'three';
import GUI  from "lil-gui";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


function init() {
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    
    camera.position.set(0, 5, 15);
    
    // *Objects
    const material = new THREE.MeshBasicMaterial({side: THREE.DoubleSide})
    
    const houseMesh = new THREE.Mesh(
        new THREE.BoxGeometry(10, 10, 10),
        material
    )
    
    const rooftopMesh = new THREE.Mesh(
        new THREE.ConeGeometry(8, 5, 4),
        material
    )
    
    const chimneyMesh = new THREE.Mesh(
        new THREE.BoxGeometry(2, 4, 2),
        material
    )
    chimneyMesh.position.set(4,6,-2)

    rooftopMesh.rotation.set(0, Math.PI * 2 / 8, 0)
    rooftopMesh.position.y = 7
    
    scene.add(chimneyMesh)
    scene.add(rooftopMesh)
    scene.add(houseMesh)

    const graveyardGeometry = new THREE.BoxGeometry(1,3.5,2);
    const count = 20
    for (let index = 0; index < count; index++) {
        const material = new THREE.MeshBasicMaterial({side: THREE.DoubleSide})
        const materialMesh = new THREE.Mesh(
            graveyardGeometry,
            material
        )
        scene.add(materialMesh)
        materialMesh.position.x = (Math.random() - 0.5) * 40 
        materialMesh.position.z = (Math.random() - 0.5) * 40
        materialMesh.rotation.y = Math.PI / 2

        
    }







    const gui = new GUI();



    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
    }
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(sizes.width, sizes.height);
    
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;

    function tick() {
        requestAnimationFrame(tick);
        controls.update()
        renderer.render(scene, camera);
    }
    tick();

    window.addEventListener('resize', onResize, false);
    function onResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
}
init();