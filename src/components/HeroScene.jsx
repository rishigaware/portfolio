import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Original sci-fi hero: glowing energy core, rippling wireframe shell, orbiting rings and shards,
// a forward-moving grid and a particle field. Reacts to the pointer and to scroll position.
// Pauses off-screen; shows one still frame when reduced motion is on.
export default function HeroScene() {
  const mount = useRef(null)

  useEffect(() => {
    const el = mount.current
    let renderer
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }) } catch { return } // no WebGL: skip quietly
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1.5 : 2)) // lighter on phones
    el.appendChild(renderer.domElement)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
    camera.position.set(0, 0.4, 9.5)
    const rig = new THREE.Group()
    scene.add(rig)
    const LIME = 0xd4ff3a, CORAL = 0xff6b57

    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.55, 1), new THREE.MeshBasicMaterial({ color: LIME, wireframe: true }))
    const c = document.createElement('canvas'); c.width = c.height = 128
    const cx = c.getContext('2d')
    const g = cx.createRadialGradient(64, 64, 0, 64, 64, 64)
    g.addColorStop(0, 'rgba(212,255,58,0.9)'); g.addColorStop(0.35, 'rgba(212,255,58,0.25)'); g.addColorStop(1, 'rgba(212,255,58,0)')
    cx.fillStyle = g; cx.fillRect(0, 0, 128, 128)
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }))
    glow.scale.setScalar(4)

    const shellGeo = new THREE.IcosahedronGeometry(1.7, 1)
    const base = shellGeo.attributes.position.array.slice()
    const shell = new THREE.Mesh(shellGeo, new THREE.MeshBasicMaterial({ color: LIME, wireframe: true, transparent: true, opacity: 0.45 }))

    const mkRing = (r, color, tilt, w = 0.012) => {
      const m = new THREE.Mesh(new THREE.TorusGeometry(r, w, 8, 160), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 }))
      m.rotation.set(tilt[0], tilt[1], 0); return m
    }
    const rings = [mkRing(2.3, LIME, [1.2, 0.2]), mkRing(2.8, CORAL, [0.4, 1.1], 0.016), mkRing(3.3, 0xffffff, [1.5, -0.5], 0.008)]

    const segs = new THREE.InstancedMesh(new THREE.BoxGeometry(0.28, 0.04, 0.04), new THREE.MeshBasicMaterial({ color: LIME }), 48)
    const d = new THREE.Object3D()
    for (let i = 0; i < 48; i++) { const a = (i / 48) * Math.PI * 2; d.position.set(Math.cos(a) * 3.8, Math.sin(a) * 3.8, 0); d.rotation.z = a + Math.PI / 2; d.updateMatrix(); segs.setMatrixAt(i, d.matrix) }
    segs.rotation.x = 1.1

    const SH = 60
    const shards = new THREE.InstancedMesh(new THREE.TetrahedronGeometry(0.05), new THREE.MeshBasicMaterial({ color: LIME, transparent: true, opacity: 0.7 }), SH)
    const sd = Array.from({ length: SH }, () => ({ r: 2.2 + Math.random() * 2.2, sp: 0.2 + Math.random() * 0.5, ph: Math.random() * 6.28, y: (Math.random() - 0.5) * 2.4 }))

    rig.add(shell, core, glow, segs, shards, ...rings)

    const grid = new THREE.GridHelper(40, 40, LIME, LIME)
    grid.material.transparent = true; grid.material.opacity = 0.14; grid.position.y = -3.4
    scene.add(grid)

    const N = 600, pos = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      const r = 4 + Math.random() * 4, th = Math.random() * 6.283, ph = Math.acos(2 * Math.random() - 1)
      pos.set([r * Math.sin(ph) * Math.cos(th), r * Math.sin(ph) * Math.sin(th), r * Math.cos(ph)], i * 3)
    }
    const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const pts = new THREE.Points(pg, new THREE.PointsMaterial({ color: 0xffffff, size: 0.03, transparent: true, opacity: 0.6 }))
    scene.add(pts)

    const mouse = { x: 0, y: 0 }
    const onMove = (e) => { mouse.x = (e.clientX / window.innerWidth - 0.5) * 2; mouse.y = (e.clientY / window.innerHeight - 0.5) * 2 }
    window.addEventListener('pointermove', onMove, { passive: true })

    let baseScale = 1
    const draw = (t = 0) => {
      const s = t * 0.001
      const p = Math.min(window.scrollY / window.innerHeight, 1.5)
      const speed = 1 + p * 2.5
      const pa = shellGeo.attributes.position
      for (let i = 0; i < pa.count; i++) {
        const x = base[i * 3], y = base[i * 3 + 1], z = base[i * 3 + 2]
        const k = 1 + 0.09 * Math.sin(s * 1.6 + (x + y + z) * 1.8)
        pa.setXYZ(i, x * k, y * k, z * k)
      }
      pa.needsUpdate = true
      shell.rotation.y = s * 0.2 * speed
      core.rotation.set(s * 0.5, s * 0.7, 0)
      core.scale.setScalar(1 + Math.sin(s * 2.2) * 0.06)
      glow.scale.setScalar(4 + Math.sin(s * 2.2) * 0.3 + p * 1.5)
      rings.forEach((r, i) => { r.rotation.z = s * (0.25 + i * 0.15) * speed * (i % 2 ? -1 : 1); r.scale.setScalar(1 + p * 0.25) })
      segs.rotation.z = -s * 0.15 * speed
      for (let i = 0; i < SH; i++) {
        const o = sd[i], a = s * o.sp * speed + o.ph
        d.position.set(Math.cos(a) * o.r, o.y + Math.sin(a * 2) * 0.2, Math.sin(a) * o.r)
        d.rotation.set(a, a * 1.3, 0); d.updateMatrix(); shards.setMatrixAt(i, d.matrix)
      }
      shards.instanceMatrix.needsUpdate = true
      grid.position.z = (s * 1.5 * speed) % 1
      pts.rotation.y = s * 0.03
      rig.rotation.y += (mouse.x * 0.5 - rig.rotation.y) * 0.05
      rig.rotation.x += (mouse.y * 0.3 - rig.rotation.x) * 0.05
      rig.scale.setScalar(baseScale * (1 - Math.min(p * 0.3, 0.4)))
      camera.position.z = 9.5 + p * 2
      renderer.render(scene, camera)
    }

    const resize = () => {
      const w = el.clientWidth, h = el.clientHeight
      renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix()
      // Wide screens: object sits to the right of the text. Portrait screens: it sits above the text, smaller.
      const wide = w / h > 1.1
      rig.position.x = wide ? 3.4 : 0
      rig.position.y = wide ? 0 : 2.1
      baseScale = wide ? (w < 1024 ? 0.8 : 1) : 0.55
      if (reduced) draw(0)
    }
    const ro = new ResizeObserver(resize); ro.observe(el); resize()

    let raf, visible = true
    const loop = (t) => { if (visible) draw(t); raf = requestAnimationFrame(loop) }
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting }); io.observe(el)
    if (!reduced) raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect()
      window.removeEventListener('pointermove', onMove)
      scene.traverse((o) => { o.geometry?.dispose(); o.material?.map?.dispose(); o.material?.dispose() })
      renderer.dispose(); renderer.domElement.remove()
    }
  }, [])

  return <div ref={mount} aria-hidden className="pointer-events-none absolute inset-0 opacity-70 md:opacity-100" />
}
