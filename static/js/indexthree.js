// var controls;

var banner = document.getElementById('banner')

//场景
var scene = new THREE.Scene();

// 相机  PerspectiveCamera  远景相机  视角 75
// 第二个属性设置的是相机拍摄面的长宽比（aspect ratio）。我们几乎总是会使用元素的宽除以高，否则会出现挤压变形。
// 接下来的2个属性是近裁剪面（near clipping plane） 和 远裁剪面（far clipping plane）。
// var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var camera = new THREE.PerspectiveCamera(75, banner.offsetWidth / banner.offsetHeight, 0.1, 1000);
// var camera = new THREE.PerspectiveCamera(75, banner.clientWidth / banner.clientHeight, 0.1, 1000);

// var innerColor = 0xff0000,
//     outerColor = 0xff9900;
var innerColor = 0x081E7E,
    outerColor = 0x081E7E;
var innerSize = 55,
    outerSize = 60;

// 渲染器
// 抗锯齿效果 有效
var renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setClearColor(0x000000, 0); // background
renderer.setClearColor(0x151933, 0); // background

// renderer.setSize(window.innerWidth, window.innerHeight); //画布大小 获取窗口的高度与宽度(不包含工具条与滚动条):
renderer.setSize(banner.offsetWidth, banner.offsetHeight); //画布大小 获取窗口的高度与宽度(不包含工具条与滚动条):
// renderer.setSize(banner.clientWidth, banner.clientHeight); //画布大小 获取窗口的高度与宽度(不包含工具条与滚动条):
// document.body.appendChild(renderer.domElement);
banner.appendChild(renderer.domElement);

// controls = new THREE.TrackballControls( camera );
// controls.noPan = true;
// controls.minDistance = 120;
// controls.maxDistance = 650;

// camera.position.z = -400;



// Mesh
// var group = new THREE.Group();
// scene.add(group);



// Lights 光源基类
// 环境光
// var light = new THREE.AmbientLight(0x404040); // soft white light
var light = new THREE.AmbientLight(0x687dd8); // soft white light
// var light = new THREE.AmbientLight(0x081E7E); // soft white light
scene.add(light);

var directionalLight = new THREE.DirectionalLight(0xffffff, 1); // 平行光源  颜色 强度
// var directionalLight = new THREE.DirectionalLight(0x687dd8, 1); // 平行光源
directionalLight.position.set(0, 128, 128);
scene.add(directionalLight);


// Sphere Wireframe Inner 球体线框内部
//  mesh网格模型 两个参数：形状 材质
var sphereWireframeInner = new THREE.Mesh(
    // 正十二面体 半径 细节层次
    new THREE.IcosahedronGeometry(innerSize, 2),
    // 网格兰伯特材料 高级材质 该材质非常易用，而且会对场景中的光源产生反应。
    new THREE.MeshLambertMaterial({
        color: innerColor,
        ambient: innerColor, // 这仅仅是该材质的环境色。跟之前提到过的 AmbientLight 光源一起使用。这个颜色会与 AmbientLight 光源的颜色相乘。默认为白色
        wireframe: true, // 如果为true，则将材质渲染成线框，在调试的时候可以起到很好的作用  
        transparent: true, // 是否透明，如果为true则结合opacity设置透明度。如果为false则物体不透明
        //alphaMap: THREE.ImageUtils.loadTexture( 'javascripts/alphamap.jpg' ),
        shininess: 0 // 指定高光部分的亮度，默认值为30.
    })
);
scene.add(sphereWireframeInner);

// Sphere Wireframe Outer
var sphereWireframeOuter = new THREE.Mesh(
    new THREE.IcosahedronGeometry(outerSize, 3),
    new THREE.MeshLambertMaterial({
        color: outerColor,
        ambient: outerColor,
        wireframe: true,
        transparent: true,
        //alphaMap: THREE.ImageUtils.loadTexture( 'javascripts/alphamap.jpg' ),
        shininess: 0
    })
);
scene.add(sphereWireframeOuter);


// Sphere Glass Inner 球形玻璃内部
var sphereGlassInner = new THREE.Mesh(
    // 球体  半径 经度上的分段数 维度上的分段数
    new THREE.SphereGeometry(innerSize, 32, 32),
    // 材质 光亮表面的材质效果
    new THREE.MeshPhongMaterial({
        color: innerColor,
        ambient: innerColor,
        transparent: true,
        shininess: 25,
        //alphaMap: THREE.ImageUtils.loadTexture( 'javascripts/twirlalphamap.jpg' ),
        opacity: 0.3,
    })
);
scene.add(sphereGlassInner);

// Sphere Glass Outer
var sphereGlassOuter = new THREE.Mesh(
    new THREE.SphereGeometry(outerSize, 32, 32),
    new THREE.MeshPhongMaterial({
        color: outerColor,
        ambient: outerColor,
        transparent: true,
        shininess: 25,
        //alphaMap: THREE.ImageUtils.loadTexture( 'javascripts/twirlalphamap.jpg' ),
        opacity: 0.3,
    })
);
// scene.add(sphereGlassOuter);

// Particles Outer 外颗粒
var geometry = new THREE.Geometry();
for (i = 0; i < 35000; i++) {

    var x = -1 + Math.random() * 2;
    var y = -1 + Math.random() * 2;
    var z = -1 + Math.random() * 2;
    var d = 1 / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
    x *= d;
    y *= d;
    z *= d;

    var vertex = new THREE.Vector3(
        x * outerSize,
        y * outerSize,
        z * outerSize
    );

    // 创造点
    geometry.vertices.push(vertex);

}

// THREE.PointCloud 两个参数：几何体和材质（PointCloudMaterial）
var particlesOuter = new THREE.PointCloud(geometry, new THREE.PointCloudMaterial({
    size: 0.1, // 该属性指定粒子的大小。默认值为1。
    // color: outerColor,
    color: 0x6db4f0,
    //map: THREE.ImageUtils.loadTexture( 'javascripts/particletextureshaded.png' ),
    transparent: true,
}));
scene.add(particlesOuter);

// Particles Inner
var geometry = new THREE.Geometry();
for (i = 0; i < 35000; i++) {

    var x = -1 + Math.random() * 2;
    var y = -1 + Math.random() * 2;
    var z = -1 + Math.random() * 2;
    var d = 1 / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
    x *= d;
    y *= d;
    z *= d;

    // 定义点
    var vertex = new THREE.Vector3(
        x * outerSize,
        y * outerSize,
        z * outerSize
    );

    geometry.vertices.push(vertex);

}


var particlesInner = new THREE.PointCloud(geometry, new THREE.PointCloudMaterial({
    size: 0.1,
    color: innerColor,
    //map: THREE.ImageUtils.loadTexture( 'javascripts/particletextureshaded.png' ),
    transparent: true,
}));
scene.add(particlesInner);

// Starfield 星空
var geometry = new THREE.Geometry();
for (i = 0; i < 5000; i++) {
    var vertex = new THREE.Vector3();
    vertex.x = Math.random() * 2000 - 1000;
    vertex.y = Math.random() * 2000 - 1000;
    vertex.z = Math.random() * 2000 - 1000;
    geometry.vertices.push(vertex);
}
var starField = new THREE.PointCloud(geometry, new THREE.PointCloudMaterial({
    // size: 2,
    // color: 0xffff99
    color: 0x081E7E
}));
scene.add(starField);


camera.position.z = -110;
//camera.position.x = mouseX * 0.05;
//camera.position.y = -mouseY * 0.05;
//camera.lookAt(scene.position);

var time = new THREE.Clock(); //时间跟踪

// 渲染循环
var render = function () {
    //camera.position.x = mouseX * 0.05;
    //camera.position.y = -mouseY * 0.05;
    // 这样物体一直在屏幕的中央。
    camera.lookAt(scene.position);

    sphereWireframeInner.rotation.x += 0.002;
    sphereWireframeInner.rotation.z += 0.002;

    sphereWireframeOuter.rotation.x += 0.001;
    sphereWireframeOuter.rotation.z += 0.001;

    sphereGlassInner.rotation.y += 0.005;
    sphereGlassInner.rotation.z += 0.005;

    sphereGlassOuter.rotation.y += 0.01;
    sphereGlassOuter.rotation.z += 0.01;

    particlesOuter.rotation.y += 0.0005;
    particlesInner.rotation.y -= 0.002;

    // starField.rotation.y -= 0.002;
    // starField.rotation.y -= 0.0002;
    starField.rotation.z += 0.0002;

    var innerShift = Math.abs(Math.cos(((time.getElapsedTime() + 2.5) / 20)));
    var outerShift = Math.abs(Math.cos(((time.getElapsedTime() + 5) / 10)));

    starField.material.color.setHSL(Math.abs(Math.cos((time.getElapsedTime() / 10))), 1, 1); // 粒子渐变色

    // sphereWireframeOuter.material.color.setHSL(0, 1, outerShift); // 线条颜色
    // sphereGlassOuter.material.color.setHSL(0, 1, outerShift);
    // particlesOuter.material.color.setHSL(0, 1, outerShift); // 点的颜色

    // sphereWireframeInner.material.color.setHSL(0.08, 1, innerShift); // 线条颜色
    // particlesInner.material.color.setHSL(0.08, 1, innerShift);
    // sphereGlassInner.material.color.setHSL(0.08, 1, innerShift);

    sphereWireframeInner.material.opacity = Math.abs(Math.cos((time.getElapsedTime() + 0.5) / 0.9) * 0.5);
    sphereWireframeOuter.material.opacity = Math.abs(Math.cos(time.getElapsedTime() / 0.9) * 0.5);


    // 光源位置不停在变
    directionalLight.position.x = Math.cos(time.getElapsedTime() / 0.5) * 128;
    directionalLight.position.y = Math.cos(time.getElapsedTime() / 0.5) * 128;
    directionalLight.position.z = Math.sin(time.getElapsedTime() / 0.5) * 128;

    // controls.update();

    renderer.render(scene, camera);
    requestAnimationFrame(render);
};

// 这将创建一个循环，以每秒60次的频率来绘制场景。
render();


// Mouse and resize events
// document.addEventListener('mousemove', onDocumentMouseMove, false);
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// function onDocumentMouseMove(event) {
//     mouseX = event.clientX - window.innerWidth / 2;
//     mouseY = event.clientY - window.innerHeight / 2;
// }