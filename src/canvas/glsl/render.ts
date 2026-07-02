import * as THREE from 'three';
import { OrthographicCamera } from '@/script/core/Camera';
import { Three } from '@/script/core/Three';
import { Gui } from '@/script/Gui';

import fragment from './index.frag?raw';
import vertex from './index.vert?raw';

class APP extends Three {
  private readonly camera: OrthographicCamera;
  private mesh!: THREE.Mesh;

  constructor() {
    const canvas = document.getElementById('webgl-canvas') as HTMLCanvasElement;
    super(canvas);

    this.camera = new OrthographicCamera({ left: -1, right: 1, top: 1, bottom: -1, near: 0.1, far: 10 });
    this.camera.position.z = 1;

    this.createGeometry();
    this.resize();

    this.setGui();

    window.addEventListener('resize', this.resize.bind(this));
    this.renderer.setAnimationLoop(this.animate.bind(this));
  }

  private createGeometry() {
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        n: { value: 1.0 },
        m: { value: 5.0 },
      },
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(0, 0, 0);
    this.scene.add(this.mesh);
  }

  private setGui() {
    const PARAMS = {
      n: 1.0,
      m: 5.0,
    };

    const pane = new Gui();
    pane.addBinding(PARAMS, 'n', { min: 1, max: 10, step: 1 });
    pane.addBinding(PARAMS, 'm', { min: 1, max: 10, step: 1 });

    pane.on('change', () => {
      const material = this.mesh.material as THREE.ShaderMaterial;
      material.uniforms.n.value = PARAMS.n;
      material.uniforms.m.value = PARAMS.m;
    });
  }

  private animate() {
    this.renderer.render(this.scene, this.camera);
  }

  private resize() {
    this.camera.update();
  }
}

export const onload = () => {
  new APP();
};
