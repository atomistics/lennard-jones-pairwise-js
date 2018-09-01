const test = require("tape");
const LJ = require("./index");

function testLJ(t, lj, expected) {
  const data = [];
  for (let i = 0.1; i < 1.5; i += 0.1) {
    data.push(lj(i));
  }
  t.same(data, expected);
}

test("varying config", t => {
  const expected = [
    { energy: 999997999999.9987, force: 119999879999999.83 },
    { energy: 244109374.99999967, force: 14647499999.999979 },
    { energy: 1878932.9389339518, force: 75212187.24185738 },
    { energy: 59116.363525390545, force: 1780815.1245117162 },
    { energy: 3968, force: 96768 },
    { energy: 416.5267169826943, force: 8759.203749804778 },
    { energy: 55.24789630438078, force: 1092.8186752576262 },
    { energy: 6.9225206971168625, force: 161.05826944112798 },
    { energy: -0.2226466848456896, force: 22.12039651084311 },
    { energy: -1, force: 8.881784197001252e-15 },
    { energy: -0.8103170423971983, force: -2.681924861928225 },
    { energy: -0.5576392985761531, force: -2.2274132189576905 },
    { energy: -0.37143043964801503, force: -1.5161928795231856 },
    { energy: -0.24798203918144376, force: -0.9871862618703107 },
  ];
  testLJ(t, LJ(), expected);
  testLJ(t, LJ({ depth: 1 }), expected);
  testLJ(t, LJ({ length: 1 }), expected);
  testLJ(t, LJ({ cutoff: undefined }), expected);
  testLJ(t, LJ({ depth: 1, length: 1 }), expected);
  testLJ(t, LJ({ depth: 1, cutoff: undefined }), expected);
  testLJ(t, LJ({ depth: 1, length: 1, cutoff: undefined }), expected);
  t.end();
});

test("cutoff", t => {
  const expected = [
    { energy: 999998000000.5563, force: 119999879999999.83 },
    { energy: 244109375.55763897, force: 14647499999.999979 },
    { energy: 1878933.4965732503, force: 75212187.24185738 },
    { energy: 59116.92116468912, force: 1780815.1245117162 },
    { energy: 3968.5576392985763, force: 96768 },
    { energy: 417.08435628127046, force: 8759.203749804778 },
    { energy: 55.80553560295694, force: 1092.8186752576262 },
    { energy: 7.480159995693016, force: 161.05826944112798 },
    { energy: 0.3349926137304635, force: 22.12039651084311 },
    { energy: -0.44236070142384687, force: 8.881784197001252e-15 },
    { energy: -0.25267774382104513, force: -2.681924861928225 },
    { energy: 0, force: -2.2274132189576905 },
    { energy: 0, force: -1.5161928795231856 },
    { energy: 0, force: -0.9871862618703107 },
  ];
  const lj = LJ({ cutoff: 1.2 });
  testLJ(t, lj, expected);
  t.end();
});

test("negative cutoff throws", t => {
  t.throws(() => {
    LJ({ cutoff: -1 });
  }, "Lennard Jones cutoff cannot be negative.");
  t.end();
});

test("various values", t => {
  t.equals(
    LJ({ depth: 1.0, length: 1.0, cutoff: undefined })(1.1).energy,
    -0.8103170423971979
  );
  t.equals(
    LJ({ depth: 1.0, length: 2.0, cutoff: undefined })(0.7).force,
    5063695.599935187
  );
  t.equals(
    LJ({ depth: 2.0, length: 1.0, cutoff: undefined })(2.2).energy,
    -0.03512403917440094
  );
  t.equals(
    LJ({ depth: 2.0, length: 3.0, cutoff: undefined })(0.2).force,
    15569559179999978
  );
  t.equals(LJ({ depth: 1.1, length: 2.1, cutoff: 1.9 })(2.2).energy, 0);
  t.equals(
    LJ({ depth: 9.2, length: 3.0, cutoff: 3.1 })(3.01).force,
    -0.7107384305237261
  );
  t.end();
});
