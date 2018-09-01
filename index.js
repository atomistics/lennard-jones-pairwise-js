function energy(a, b, r) {
  return a / Math.pow(r, 12) - b / Math.pow(r, 6);
}

function derivative(a, b, r) {
  return (6 * b) / Math.pow(r, 7) - (12 * a) / Math.pow(r, 13);
}

function force(a, b, r) {
  return -derivative(a, b, r);
}

module.exports = function LennardJones({
  depth = 1.0,
  length = 1.0,
  cutoff = undefined,
} = {}) {
  if (cutoff < 0) throw new Error("Lennard Jones cutoff cannot be negative.");
  const a = depth * Math.pow(length, 12);
  const b = 2 * depth * Math.pow(length, 6);
  const shift = cutoff === undefined ? 0 : energy(a, b, cutoff);
  if (cutoff === undefined) {
    return r => {
      return {
        energy: energy(a, b, r),
        force: force(a, b, r),
      };
    };
  } else {
    return r => {
      return {
        energy: r <= cutoff ? energy(a, b, r) - shift : 0.0,
        force: force(a, b, r),
      };
    };
  }
};
