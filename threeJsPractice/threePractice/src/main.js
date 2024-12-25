import * as THREE from "three";

// シーンの追加
const scene = new THREE.Scene();

// カメラの追加
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 500);

// レンダラーの追加
const renderer = new THREE.WebGLRenderer({
  alpha: true,
});
// サイズ調整
renderer.setSize(window.innerWidth, window.innerHeight);
// レンダリングしたいDOM要素と紐付け
document.body.appendChild(renderer.domElement);

// ジオメトリ作成
const ballGeometry = new THREE.SphereGeometry(100, 64, 32);

// マテリアル作成
const ballMaterial = new THREE.MeshPhysicalMaterial();

// メッシュ化
const ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
scene.add(ballMesh);

// 平行光源の追加
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
// 光の当たる位置調整
directionalLight.position.set(1, 1, 1);
// シーンに追加
scene.add(directionalLight);

// ポイント光源を追加
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(-200, -200, -200);
scene.add(pointLight);

// レンダリング関数

function animate() {
  // ポジションを動的に指定
  pointLight.position.set(
    200 * Math.sin(Date.now() / 500),
    200 * Math.sin(Date.now() / 1000),
    200 * Math.cos(Date.now() / 500)
  );
  // フレーム単位で関数実行
  requestAnimationFrame(animate);

  // この関数内でレンダリング関数実行
  renderer.render(scene, camera);
}
animate(); // アニメーション関数の実行
