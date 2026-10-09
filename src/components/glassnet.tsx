import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { LINES, STATIONS, type Station } from "../data/network";
import type { Category } from "../data/projects";

/* The transit network as one glass object: clear refractive tubes around
   coloured cores, glass bead stations, lit by a studio environment.
   Station labels are real DOM buttons pinned to their 3D positions, so
   they stay crisp and keyboard-reachable. Drag turns the object;
   choosing a station glides it into view. */

const SCALE = 72;                       // 2D map units per 3D unit
const LIFT: Record<Category, number> = { Mobile: 0, Web: 0, Enterprise: -1.5, IoT: 1.5 };
const CORE: Record<Category, string> = { Mobile: "#ff3b30", Web: "#28b14c", Enterprise: "#0a84ff", IoT: "#ff9500" };

// the 2D map's corner points, with depth: diagonal legs rise or fall in z
const POINTS: Record<Category, [number, number, number][]> = {
  Mobile:     [[500, 290, 0], [960, 290, 0]],
  Web:        [[500, 290, 0], [40, 290, 0]],
  Enterprise: [[500, 290, 0], [700, 90, LIFT.Enterprise], [930, 90, LIFT.Enterprise]],
  IoT:        [[500, 290, 0], [300, 490, LIFT.IoT], [70, 490, LIFT.IoT]],
};

const v3 = (x: number, y: number, z: number) => new THREE.Vector3((x - 500) / SCALE, -(y - 290) / SCALE, z);
const stationPos = (s: Station) => v3(s.x, s.y, s.line.id === "Mobile" || s.line.id === "Web" ? 0 : LIFT[s.line.id]);

/** Straight segments with each corner rounded by a quadratic curve. */
function roundedPath(pts: THREE.Vector3[], r = 0.7) {
  const path = new THREE.CurvePath<THREE.Vector3>();
  let from = pts[0].clone();
  for (let i = 1; i < pts.length - 1; i++) {
    const c = pts[i];
    const a = c.clone().add(pts[i - 1].clone().sub(c).setLength(r));
    const b = c.clone().add(pts[i + 1].clone().sub(c).setLength(r));
    path.add(new THREE.LineCurve3(from, a));
    path.add(new THREE.QuadraticBezierCurve3(a, c, b));
    from = b;
  }
  path.add(new THREE.LineCurve3(from, pts[pts.length - 1]));
  return path;
}

export default function GlassNet({
  current, filter, onPick,
}: { current: Station; filter: Category | null; onPick: (s: Station) => void }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  // the render loop reads these without re-creating the scene
  const live = useRef({ current, filter });
  live.current = { current, filter };

  useEffect(() => {
    const host = hostRef.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.prepend(renderer.domElement);
    renderer.domElement.setAttribute("aria-hidden", "true");

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#eef0f3");          // the page ground, so the glass refracts it
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
    camera.position.set(0, 0.4, 19);

    const key = new THREE.DirectionalLight("#ffffff", 1.2);
    key.position.set(4, 8, 6);
    scene.add(key);

    const net = new THREE.Group();
    scene.add(net);

    const glass = new THREE.MeshPhysicalMaterial({
      color: "#ffffff", transmission: 1, thickness: 0.6, roughness: 0.06, ior: 1.45,
      clearcoat: 1, clearcoatRoughness: 0.04, metalness: 0, envMapIntensity: 1.1,
    });

    // lines: a glass tube around a coloured core
    const cores: Record<string, THREE.MeshStandardMaterial> = {};
    const disposables: { dispose: () => void }[] = [glass, pmrem];
    LINES.forEach(l => {
      const path = roundedPath(POINTS[l.id].map(([x, y, z]) => v3(x, y, z)));
      const outer = new THREE.TubeGeometry(path, 220, 0.2, 28, false);
      const inner = new THREE.TubeGeometry(path, 220, 0.075, 16, false);
      const core = new THREE.MeshStandardMaterial({ color: CORE[l.id], emissive: CORE[l.id], emissiveIntensity: 0.28, roughness: 0.35 });
      cores[l.id] = core;
      net.add(new THREE.Mesh(inner, core), new THREE.Mesh(outer, glass));
      disposables.push(outer, inner, core);
    });

    // interchange capsule
    const hubGeo = new THREE.CapsuleGeometry(0.42, 0.9, 8, 24);
    const hub = new THREE.Mesh(hubGeo, glass);
    hub.position.copy(v3(500, 290, 0));
    net.add(hub);
    disposables.push(hubGeo);

    // stations: glass beads with a coloured heart; the chosen one wears a ring
    const beadGeo = new THREE.SphereGeometry(0.36, 40, 24);
    const heartGeo = new THREE.SphereGeometry(0.15, 24, 16);
    const hearts: Record<string, THREE.Mesh> = {};
    STATIONS.forEach(s => {
      const p = stationPos(s);
      const bead = new THREE.Mesh(beadGeo, glass);
      bead.position.copy(p);
      const heart = new THREE.Mesh(heartGeo, cores[s.line.id]);
      heart.position.copy(p);
      hearts[s.code] = heart;
      net.add(bead, heart);
    });
    const ringGeo = new THREE.TorusGeometry(0.58, 0.07, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({ color: "#ffcc00", emissive: "#ffb800", emissiveIntensity: 0.45, roughness: 0.25, metalness: 0.1 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    net.add(ring);
    disposables.push(beadGeo, heartGeo, ringGeo, ringMat);

    // drag to turn; the object springs back toward its resting angle
    const turn = { yaw: -0.18, pitch: 0.12, ty: -0.18, tp: 0.12, drag: false, x: 0, y: 0 };
    const down = (e: PointerEvent) => { turn.drag = true; turn.x = e.clientX; turn.y = e.clientY; host.setPointerCapture(e.pointerId); };
    const move = (e: PointerEvent) => {
      if (!turn.drag) return;
      turn.ty = THREE.MathUtils.clamp(turn.ty + (e.clientX - turn.x) * 0.005, -0.75, 0.75);
      turn.tp = THREE.MathUtils.clamp(turn.tp + (e.clientY - turn.y) * 0.004, -0.35, 0.45);
      turn.x = e.clientX; turn.y = e.clientY;
    };
    const up = () => { turn.drag = false; };
    renderer.domElement.addEventListener("pointerdown", down);
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerup", up);
    host.addEventListener("pointercancel", up);

    // fit the network into the free area the overlay leaves:
    // left of the project sign, between the headline and the line key
    const stage = host.parentElement!;
    const box = (sel: string) => stage.querySelector(sel)?.getBoundingClientRect();
    const NET_W = 14.6, NET_H = 7.6;                      // network extent in 3D units, with margin
    const tanHalf = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const size = () => {
      const r = host.getBoundingClientRect();
      const { width, height } = r;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      const sign = box(".plat"), intro = box(".net-intro"), key = box(".net-key");
      const right = sign ? sign.left - r.left - 24 : width;
      const top = intro ? intro.bottom - r.top + 12 : 0;
      const bottom = key ? key.top - r.top - 12 : height;
      const fw = Math.max(right, width * 0.4), fh = Math.max(bottom - top, height * 0.35);
      // stand far enough back that the network fits both ways
      const d = Math.max((NET_W * width / fw) / (2 * tanHalf * camera.aspect), (NET_H * height / fh) / (2 * tanHalf));
      camera.position.z = d;
      // shift the frame so the network's centre lands in the middle of the free area
      camera.setViewOffset(width, height, width / 2 - fw / 2, height / 2 - (top + fh / 2), width, height);
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(size);
    ro.observe(host);
    size();

    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(host);

    const focus = new THREE.Vector3();
    const tmp = new THREE.Vector3();
    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible || document.hidden) return;
      const t = clock.getElapsedTime();
      const k = reduce ? 1 : 0.07;
      const { current: cur, filter: f } = live.current;

      // glide: the chosen station drifts toward the frame's centre
      const target = stationPos(cur).multiplyScalar(0.12);
      focus.lerp(target, k);
      net.position.set(-focus.x, -focus.y, -focus.z * 0.5);

      const sway = reduce || turn.drag ? 0 : Math.sin(t * 0.25) * 0.05;
      turn.yaw += (turn.ty + sway - turn.yaw) * (reduce ? 1 : 0.08);
      turn.pitch += (turn.tp - turn.pitch) * (reduce ? 1 : 0.08);
      net.rotation.set(turn.pitch, turn.yaw, 0);

      // the ring sits on the chosen station, turned to face the camera
      ring.position.lerp(stationPos(cur), reduce ? 1 : 0.18);
      ring.quaternion.copy(camera.quaternion);

      // filtered-out lines go quiet
      LINES.forEach(l => {
        const on = !f || f === l.id;
        const m = cores[l.id];
        m.emissiveIntensity += ((on ? 0.28 : 0) - m.emissiveIntensity) * 0.15;
        m.color.lerp(new THREE.Color(on ? CORE[l.id] : "#c7cad0"), 0.15);
      });
      Object.entries(hearts).forEach(([code, h]) => h.scale.setScalar(code === cur.code ? 1.25 : 1));

      renderer.render(scene, camera);

      // pin each DOM label to its station on screen
      const w = renderer.domElement.clientWidth, h = renderer.domElement.clientHeight;
      STATIONS.forEach(s => {
        const el = labelRefs.current[s.code];
        if (!el) return;
        tmp.copy(stationPos(s));
        net.localToWorld(tmp);
        tmp.project(camera);
        const x = (tmp.x * 0.5 + 0.5) * w, y = (-tmp.y * 0.5 + 0.5) * h;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      renderer.domElement.removeEventListener("pointerdown", down);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerup", up);
      host.removeEventListener("pointercancel", up);
      disposables.forEach(d => d.dispose());
      scene.environment?.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div ref={hostRef} className="gn" role="group" aria-label="Project network, drag to turn">
      {STATIONS.map(s => {
        const on = s.code === current.code;
        const dim = !!filter && filter !== s.line.id;
        return (
          <button
            key={s.code}
            ref={el => { labelRefs.current[s.code] = el; }}
            className={`gn-label${on ? " is-on" : ""}${dim ? " is-dim" : ""}${s.label === "above" ? " is-above" : ""}`}
            aria-pressed={on}
            aria-label={`${s.code} ${s.project.title}, ${s.line.name}, ${s.project.year}`}
            onClick={() => onPick(s)}
          >
            <span className="gn-tag">
              <span className="gn-code" style={{ background: CORE[s.line.id] }}>{s.code}</span>
              {s.short}
            </span>
          </button>
        );
      })}
    </div>
  );
}
