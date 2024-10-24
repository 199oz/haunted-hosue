import * as THREE from 'three';
import GUI  from "lil-gui";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Sky } from 'three/addons/objects/Sky.js'
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';


function init() {
    const gui = new GUI();
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    
    camera.position.x = 8
    camera.position.y = 6
    camera.position.z = 13
// *Textures
    const textureLoader = new THREE.TextureLoader();
    const floorAlphaTexture = textureLoader.load('/static/16-haunted-house-resources/floor/alpha.jpg');

    const floorColorTexture = textureLoader.load('/static/16-haunted-house-resources/floor/aerial_rocks_04_1k/textures/aerial_rocks_04_diff_1k.jpg');
    const floorARMTexture = textureLoader.load('/static/16-haunted-house-resources/floor/aerial_rocks_04_1k/textures/aerial_rocks_04_arm_1k.jpg');
    const floorNormalTexture = textureLoader.load('/static/16-haunted-house-resources/floor/aerial_rocks_04_1k/textures/aerial_rocks_04_nor_1k.jpg');
    const floorDisplacementTexture = textureLoader.load('/static/16-haunted-house-resources/floor/aerial_rocks_04_1k/textures/aerial_rocks_04_disp_1k.jpg');

    const wallColorTexture = textureLoader.load('/static/16-haunted-house-resources/wall/rock_wall_05_1k/textures/rock_wall_05_diff_1k.jpg');
    const wallARMTexture = textureLoader.load('/static/16-haunted-house-resources/wall/rock_wall_05_1k/textures/rock_wall_05_arm_1k.jpg');
    const wallNormalTexture = textureLoader.load('/static/16-haunted-house-resources/wall/rock_wall_05_1k/textures/rock_wall_05_nor_gl_1k.jpg');;

    const roofColorTexture = textureLoader.load('/static/16-haunted-house-resources/wall/grey_roof_01_1k/textures/grey_roof_01_diff_1k.webp');
    const roofARMTexture = textureLoader.load('/static/16-haunted-house-resources/wall/grey_roof_01_1k/textures/grey_roof_01_arm_1k.webp');
    const roofNormalTexture = textureLoader.load('/static/16-haunted-house-resources/wall/grey_roof_01_1k/textures/grey_roof_01_nor_gl_1k.webp');;

    const graveColorTexture = textureLoader.load('/static/16-haunted-house-resources/grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.webp');
    const graveARMTexture = textureLoader.load('/static/16-haunted-house-resources/grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.webp');
    const graveNormalTexture = textureLoader.load('/static/16-haunted-house-resources/grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.webp');;

    const doorColorTexture = textureLoader.load('/static/16-haunted-house-resources/door/color.webp');
    const doorARMTexture = textureLoader.load('./static/16-haunted-house-resources/door/arm.webp');
    const doorNormalTexture = textureLoader.load('./static/16-haunted-house-resources/door/normal.webp');
    const doorRoughnessTexture = textureLoader.load('./static/16-haunted-house-resources/door/roughness.webp');
    const doorMetalnessTexture = textureLoader.load('./static/16-haunted-house-resources/door/metalness.webp');
    const doorDisplacementTexture = textureLoader.load('./static/16-haunted-house-resources/door/height.webp');
    const doorEmissiveTexture = textureLoader.load('./static/16-haunted-house-resources/door/emissive.webp');
    const doorAlphaTexture = textureLoader.load('./static/16-haunted-house-resources/door/alpha.webp');

    doorColorTexture.colorSpace = THREE.SRGBColorSpace
    doorEmissiveTexture.colorSpace = THREE.SRGBColorSpace
    doorAlphaTexture.colorSpace = THREE.SRGBColorSpace

    graveColorTexture.colorSpace = THREE.SRGBColorSpace

    roofColorTexture.colorSpace = THREE.SRGBColorSpace
    wallColorTexture.colorSpace = THREE.SRGBColorSpace
    graveColorTexture.repeat.set(0.3, 0.4)
    roofColorTexture.repeat.set(3, 1)
    roofARMTexture.repeat.set(3, 1)

    roofColorTexture.wrapS = THREE.RepeatWrapping
    roofARMTexture.wrapS = THREE.RepeatWrapping
    roofNormalTexture.wrapS = THREE.RepeatWrapping

    roofColorTexture.colorSpace = THREE.SRGBColorSpace

    floorColorTexture.repeat.set(8, 8)
    floorARMTexture.repeat.set(8, 8)
    floorNormalTexture.repeat.set(8, 8)
    floorDisplacementTexture.repeat.set(8, 8)

    floorColorTexture.wrapS = THREE.RepeatWrapping
    floorARMTexture.wrapS = THREE.RepeatWrapping
    floorNormalTexture.wrapS = THREE.RepeatWrapping
    floorDisplacementTexture.wrapS = THREE.RepeatWrapping

    floorColorTexture.wrapT = THREE.RepeatWrapping
    floorARMTexture.wrapT = THREE.RepeatWrapping
    floorNormalTexture.wrapT = THREE.RepeatWrapping
    floorDisplacementTexture.wrapT = THREE.RepeatWrapping
    
    floorColorTexture.colorSpace = THREE.SRGBColorSpace
    floorARMTexture.colorSpace = THREE.SRGBColorSpace
    floorNormalTexture.colorSpace = THREE.SRGBColorSpace

    
    // *Objects
    const house = new THREE.Group()
    const grave = new THREE.Group()
    scene.add(grave)
    
    const doorMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(4,6.4,200,200),
        new THREE.MeshStandardMaterial({
            map: doorColorTexture,
            aoMap: doorARMTexture,
            roughnessMap: doorRoughnessTexture,
            metalnessMap: doorMetalnessTexture,
            normalMap: doorNormalTexture,
            displacementMap: doorDisplacementTexture,
            displacementScale: 0.3,
            displacementBias: 0,
            metalness: 0.5,
            roughness: 0.4,
            
        })
    )
    doorMesh.position.z = 5 + 0.01
    doorMesh.position.y = 1

    scene.add(doorMesh)
    
    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(40 , 40 , 200, 200),
        new THREE.MeshStandardMaterial({
            alphaMap: floorAlphaTexture,
            transparent: true,
            map: floorColorTexture,
            aoMap: floorARMTexture,
            roughnessMap: floorARMTexture,
            metalnessMap: floorARMTexture,
            nomralMap: floorNormalTexture,
            displacementMap: floorDisplacementTexture,
            displacementScale: 0.3,
            displacementBias: -2
        })
    )
    floor.rotation.x = -Math.PI * 0.5
    scene.add(floor)



    const houseMesh = new THREE.Mesh(
        new THREE.BoxGeometry(10, 10, 10),
        new THREE.MeshStandardMaterial({
            map: wallColorTexture,
            aoMap: wallARMTexture,
            roughnessMap: wallARMTexture,
            metalnessMap: wallARMTexture,
            normalMap: wallNormalTexture
        })  )
    
    const rooftopMesh = new THREE.Mesh(
        new THREE.ConeGeometry(8, 5, 4),
        new THREE.MeshStandardMaterial({
            map: roofColorTexture,
            aoMap: roofARMTexture,
            roughnessMap: roofARMTexture,
            metalnessMap: roofARMTexture,
            normalMap: roofNormalTexture
        })
    )
    
    const chimneyMesh = new THREE.Mesh(
        new THREE.BoxGeometry(2, 4, 2),
        new THREE.MeshStandardMaterial({
            map: floorNormalTexture,
            aoMap: floorARMTexture,
            roughnessMap: floorARMTexture,
            metalnessMap: floorARMTexture
        })
    )
    chimneyMesh.position.set(4,6,-2)

    rooftopMesh.rotation.set(0, Math.PI * 0.25, 0)
    rooftopMesh.position.y = 7

    
    house.add(chimneyMesh);
    house.add(rooftopMesh);
    house.add(houseMesh);
    scene.add(house);


    // *Lights
    // const ambientLight = new THREE.AmbientLight('#86cdff', 0.175);
    // scene.add(ambientLight)
    const directionalLight = new THREE.DirectionalLight('#86cdff', 0.4)
    const doorLight = new THREE.PointLight('#ff7d46', 20)
    doorLight.position.set(0, 4.5, 6)
    scene.add(doorLight)

    directionalLight.shadow.mapSize.width = 2048;  // Default is 512
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.left = -20;
    directionalLight.shadow.camera.right = 20;
    directionalLight.shadow.camera.top = 20;
    directionalLight.shadow.camera.bottom = -20;
    directionalLight.shadow.camera.near = 1
    directionalLight.shadow.camera.far = 100
    directionalLight.position.set(10, 9, -8)
    scene.add(directionalLight)

    // *Ghosts
    const pointLight1 = new THREE.PointLight('#8800ff',8);
    const pointLight2 = new THREE.PointLight('#ff0088',8);
    const pointLight3 = new THREE.PointLight('#ff0000',8);

    scene.add(pointLight1)
    scene.add(pointLight2)
    scene.add(pointLight3)

    // *Skys
    const sky = new Sky()
    scene.add(sky)
    sky.scale.set(100, 100, 100)

    sky.material.uniforms['turbidity'].value = 10
    sky.material.uniforms['rayleigh'].value = 3
    sky.material.uniforms['mieCoefficient'].value = 0.1
    sky.material.uniforms['mieDirectionalG'].value = 0.95
    sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)


    // *Fogs
    // scene.fog = new THREE.Fog('#ff0000', 0.001, 0.0020)
    scene.fog = new THREE.FogExp2('#04343f', 0.07 )

    const graveyardGeometry = new THREE.BoxGeometry(1,3.5,2);
    const count = 20
    for (let index = 0; index < count; index++) {
        const material = new THREE.MeshStandardMaterial({
            side: THREE.DoubleSide,
            map: graveColorTexture,
            aoMap: graveARMTexture,
            roughnessMap: graveARMTexture,
            metalnessMap: graveARMTexture,
            normalMap: graveNormalTexture
        })  
        const materialMesh = new THREE.Mesh(
            graveyardGeometry,
            material
        )
        const angle = Math.random() * Math.PI * 2
        const radius = 12 + Math.random() * 6
        materialMesh.position.x = Math.cos(angle) * radius
        materialMesh.position.z = Math.sin(angle) * radius
        materialMesh.rotation.x = (Math.random() - 0.5) * 0.4
        materialMesh.rotation.y =( Math.random() * Math.PI * 0.5 ) - ( Math.random() * Math.PI * 0.5 )
        materialMesh.rotation.z = (Math.random() - 0.5) * 0.4

        grave.add(materialMesh)

    }

    // *GUI
    gui.add(floor.material, 'displacementScale').min(0).max(2).step(0.001).name('floorDisplacementScale')
    gui.add(floor.material, 'displacementBias').min(-2).max(1).step(0.001).name('floorDisplacementBias')
    gui.add(doorMesh.material, 'displacementScale').min(0).max(1).step(0.001).name('doorDisplacementScale')
    gui.add(doorMesh.material, 'displacementBias').min(0).max(0.5).step(0.001).name('doorDisplacementBias')


    // *Helper
    const pointHelper = new THREE.PointLightHelper(pointLight1);
    const pointHelper2 = new THREE.PointLightHelper(pointLight2);
    const pointHelper3 = new THREE.PointLightHelper(pointLight3);
    // const directionalHelper = new THREE.DirectionalLightHelper(directionalLight,5);
    // const shadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
    // const doorLightHelper = new THREE.PointLightHelper(doorLight);

    // scene.add(doorLightHelper)

    // scene.add(shadowHelper)
    // scene.add(directionalHelper)
    // scene.add(pointHelper)
    // scene.add(pointHelper2)
    // scene.add(pointHelper3)

    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
    }
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(sizes.width, sizes.height);
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    directionalLight.castShadow = true
    pointLight1.castShadow = true
    pointLight2.castShadow = true
    pointLight3.castShadow = true
    houseMesh.castShadow = true
    houseMesh.receiveShadow = true
    rooftopMesh.castShadow = true
    rooftopMesh.castShadow = true
    floor.receiveShadow = true
    for(const graves of grave.children){
        graves.castShadow = true
        graves.receiveShadow = true
    }

    pointLight1.shadow.mapSize.width = 256
    pointLight1.shadow.mapSize.height = 256
    pointLight1.shadow.camera.far = 10

    pointLight2.shadow.mapSize.width = 256
    pointLight2.shadow.mapSize.height = 256
    pointLight2.shadow.camera.far = 10

    pointLight3.shadow.mapSize.width = 256
    pointLight3.shadow.mapSize.height = 256
    pointLight3.shadow.camera.far = 10
    
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;

    const clock = new THREE.Clock()
    function tick() {
        requestAnimationFrame(tick);
        const elapsedTime = clock.getElapsedTime()

        // *Ghosts
        const ghost1 = elapsedTime - 0.5
        pointLight1.position.x = Math.cos(ghost1) * 12
        pointLight1.position.z = Math.sin(ghost1) * 8
        pointLight1.position.y = Math.sin(ghost1) * 3

        const ghost2 = elapsedTime * 0.8
        pointLight2.position.x = -(Math.cos(ghost2) * 10) 
        pointLight2.position.z = Math.sin(ghost2) * 18
        pointLight2.position.y = Math.sin(ghost2) * 1.5

        const ghost3 = elapsedTime * 0.5
        pointLight3.position.x = Math.cos(ghost3) * 5
        pointLight3.position.z = Math.sin(ghost3) * 17
        pointLight3.position.y = Math.sin(ghost3) * 3

        // Update door light with scaled intensity

    const frequency1 = 3
    const frequency2 = 6
    const frequency3 = 9
    const frequency4 = 12

    const phaseShift1 = 0 // Phase shift for each sine function (in radians)
    const phaseShift2 = Math.PI / 3
    const phaseShift3 = Math.PI / 2
    const phaseShift4 = Math.PI

    const flickerIntensity = 0.8 // Adjust the intensity scale to control brightness


    doorLight.intensity = flickerIntensity * (

        Math.abs(Math.sin(elapsedTime * frequency1 + phaseShift1)) +

        Math.abs(Math.sin(elapsedTime * frequency2 + phaseShift2)) +

        Math.abs(Math.sin(elapsedTime * frequency3 + phaseShift3)) +

        Math.abs(Math.sin(elapsedTime * frequency4 + phaseShift4))

    )
        

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