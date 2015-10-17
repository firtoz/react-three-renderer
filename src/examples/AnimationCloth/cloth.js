/*
 * Cloth Simulation using a relaxed constrains solver
 */

// Suggested Readings

// Advanced Character Physics by Thomas Jakobsen Character
// http://freespace.virgin.net/hugo.elias/models/m_cloth.htm
// http://en.wikipedia.org/wiki/Cloth_modeling
// http://cg.alexandra.dk/tag/spring-mass-system/
// Real-time Cloth Animation http://www.darwin3d.com/gamedev/articles/col0599.pdf
import THREE from 'three.js';


function plane(width, height) {
  return (u, v) => {
    const x = (u - 0.5) * width;
    const y = (v + 0.5) * height;
    const z = 0;

    return new THREE.Vector3(x, y, z);
  };
}

const DAMPING = 0.03;
const DRAG = 1 - DAMPING;
const MASS = 0.1;
const restDistance = 25;

const xSegs = 10; //
const ySegs = 10; //

const clothFunction = plane(restDistance * xSegs, restDistance * ySegs);

class Particle {
  constructor(x, y, z, mass) {
    void z;

    this.position = clothFunction(x, y); // position
    this.previous = clothFunction(x, y); // previous
    this.original = clothFunction(x, y);
    this.a = new THREE.Vector3(0, 0, 0); // acceleration
    this.mass = mass;
    this.invMass = 1 / mass;
    this.tmp = new THREE.Vector3();
    this.tmp2 = new THREE.Vector3();
  }

  // Force -> Acceleration
  addForce(force) {
    this.a.add(
      this.tmp2.copy(force).multiplyScalar(this.invMass)
    );
  }

  // Performs verlet integration
  integrate(timesQ) {
    const newPos = this.tmp.subVectors(this.position, this.previous);
    newPos.multiplyScalar(DRAG).add(this.position);
    newPos.add(this.a.multiplyScalar(timesQ));

    this.tmp = this.previous;
    this.previous = this.position;
    this.position = newPos;

    this.a.set(0, 0, 0);
  }
}

class Cloth {
  static clothFunction = clothFunction;
  static MASS = MASS;

  constructor(w = 10, h = 10) {
    this.w = w;
    this.h = h;

    const particles = [];
    const constrains = [];

    let u;
    let v;

    // Create particles
    for (v = 0; v <= h; v++) {
      for (u = 0; u <= w; u++) {
        particles.push(
          new Particle(u / w, v / h, 0, MASS)
        );
      }
    }

    function index(indexU, indexV) {
      return indexU + indexV * (w + 1);
    }

    // Structural

    for (v = 0; v < h; v++) {
      for (u = 0; u < w; u++) {
        constrains.push([
          particles[index(u, v)],
          particles[index(u, v + 1)],
          restDistance,
        ]);

        constrains.push([
          particles[index(u, v)],
          particles[index(u + 1, v)],
          restDistance,
        ]);
      }
    }

    for (u = w, v = 0; v < h; v++) {
      constrains.push([
        particles[index(u, v)],
        particles[index(u, v + 1)],
        restDistance,
      ]);
    }

    for (v = h, u = 0; u < w; u++) {
      constrains.push([
        particles[index(u, v)],
        particles[index(u + 1, v)],
        restDistance,
      ]);
    }


    this.particles = particles;
    this.constrains = constrains;

    this.index = index;
  }
}

export default Cloth;
