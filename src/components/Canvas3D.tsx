import { useEffect, useRef } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Face {
  indices: number[];
  color: string;
}

interface ShapeInstance {
  type: "cube" | "tetrahedron" | "octahedron" | "crystal";
  vertices: Point3D[];
  faces: Face[];
  x: number; // current baseline x in world space
  y: number; // current baseline y in world space
  z: number; // depth
  size: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  speedX: number;
  speedY: number;
  speedZ: number;
  pulseSpeed: number;
  pulsePhase: number;
}

export default function Canvas3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Handle high DPI retina screens
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", resize);
    resize();

    // Define 3D Shapes Geometry Generators
    const createCube = (size: number): { vertices: Point3D[]; faces: Face[] } => {
      const h = size / 2;
      const vertices: Point3D[] = [
        { x: -h, y: -h, z: -h },
        { x: h, y: -h, z: -h },
        { x: h, y: h, z: -h },
        { x: -h, y: h, z: -h },
        { x: -h, y: -h, z: h },
        { x: h, y: -h, z: h },
        { x: h, y: h, z: h },
        { x: -h, y: h, z: h },
      ];
      const faces: Face[] = [
        { indices: [0, 1, 2, 3], color: "rgba(120, 120, 120, 0.04)" }, // Back
        { indices: [4, 5, 6, 7], color: "rgba(255, 255, 255, 0.05)" }, // Front
        { indices: [0, 4, 7, 3], color: "rgba(150, 150, 150, 0.03)" }, // Left
        { indices: [1, 5, 6, 2], color: "rgba(180, 180, 180, 0.03)" }, // Right
        { indices: [0, 1, 5, 4], color: "rgba(220, 220, 220, 0.04)" }, // Top
        { indices: [3, 2, 6, 7], color: "rgba(100, 100, 100, 0.04)" }, // Bottom
      ];
      return { vertices, faces };
    };

    const createTetrahedron = (size: number): { vertices: Point3D[]; faces: Face[] } => {
      const s = size * 0.8;
      const vertices: Point3D[] = [
        { x: 0, y: -s * 0.8, z: 0 },
        { x: -s, y: s * 0.5, z: -s * 0.5 },
        { x: s, y: s * 0.5, z: -s * 0.5 },
        { x: 0, y: s * 0.5, z: s },
      ];
      const faces: Face[] = [
        { indices: [0, 1, 2], color: "rgba(255, 255, 255, 0.05)" },
        { indices: [0, 2, 3], color: "rgba(180, 180, 180, 0.04)" },
        { indices: [0, 3, 1], color: "rgba(140, 140, 140, 0.03)" },
        { indices: [1, 3, 2], color: "rgba(100, 100, 100, 0.04)" },
      ];
      return { vertices, faces };
    };

    const createOctahedron = (size: number): { vertices: Point3D[]; faces: Face[] } => {
      const s = size * 0.85;
      const vertices: Point3D[] = [
        { x: 0, y: -s, z: 0 }, // Top vertex
        { x: -s, y: 0, z: -s }, // Middle ring
        { x: s, y: 0, z: -s },
        { x: s, y: 0, z: s },
        { x: -s, y: 0, z: s },
        { x: 0, y: s, z: 0 }, // Bottom vertex
      ];
      const faces: Face[] = [
        { indices: [0, 1, 2], color: "rgba(255, 255, 255, 0.05)" },
        { indices: [0, 2, 3], color: "rgba(180, 180, 180, 0.04)" },
        { indices: [0, 3, 4], color: "rgba(140, 140, 140, 0.03)" },
        { indices: [0, 4, 1], color: "rgba(200, 200, 200, 0.04)" },
        { indices: [5, 2, 1], color: "rgba(100, 100, 100, 0.03)" },
        { indices: [5, 3, 2], color: "rgba(120, 120, 120, 0.04)" },
        { indices: [5, 4, 3], color: "rgba(160, 160, 160, 0.03)" },
        { indices: [5, 1, 4], color: "rgba(180, 180, 180, 0.05)" },
      ];
      return { vertices, faces };
    };

    // Instantiate shapes distributed nicely on the sides to avoid overlapping center text
    const shapes: ShapeInstance[] = [];
    const shapeTypes: ("cube" | "tetrahedron" | "octahedron")[] = ["cube", "tetrahedron", "octahedron"];

    for (let i = 0; i < 6; i++) {
      const type = shapeTypes[i % shapeTypes.length];
      const size = 50 + Math.random() * 30; // Slightly more compact
      let geom;
      if (type === "cube") geom = createCube(size);
      else if (type === "tetrahedron") geom = createTetrahedron(size);
      else geom = createOctahedron(size);

      // Distribute to left band (-38% to -20%) or right band (20% to 38%)
      const isLeft = i % 2 === 0;
      const xPercent = isLeft 
        ? -26 - Math.random() * 18 // Left side
        : 26 + Math.random() * 18;  // Right side

      shapes.push({
        type,
        vertices: geom.vertices,
        faces: geom.faces,
        x: xPercent, 
        y: (Math.random() * 70 - 35),  // Vertical spread
        z: 160 + Math.random() * 200,  // Push deeper
        size,
        rotX: Math.random() * Math.PI,
        rotY: Math.random() * Math.PI,
        rotZ: Math.random() * Math.PI,
        speedX: (Math.random() - 0.5) * 0.003,
        speedY: (Math.random() - 0.5) * 0.003,
        speedZ: (Math.random() - 0.5) * 0.003,
        pulseSpeed: 0.0015 + Math.random() * 0.002,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // Capture mouse moves
    const handleMouseMove = (e: MouseEvent) => {
      const mx = (e.clientX / window.innerWidth) - 0.5;
      const my = (e.clientY / window.innerHeight) - 0.5;
      mouseRef.current.targetX = mx;
      mouseRef.current.targetY = my;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 3D Matrix/Rotation core transforms
    const rotateX = (p: Point3D, angle: number): Point3D => {
      const rad = angle;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      return {
        x: p.x,
        y: p.y * cos - p.z * sin,
        z: p.y * sin + p.z * cos,
      };
    };

    const rotateY = (p: Point3D, angle: number): Point3D => {
      const rad = angle;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      return {
        x: p.x * cos + p.z * sin,
        y: p.y,
        z: -p.x * sin + p.z * cos,
      };
    };

    const rotateZ = (p: Point3D, angle: number): Point3D => {
      const rad = angle;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      return {
        x: p.x * cos - p.y * sin,
        y: p.x * sin + p.y * cos,
        z: p.z,
      };
    };

    // Main animation loop
    const render = (time: number) => {
      // Clear with very smooth dark glow
      ctx.fillStyle = "#030303";
      ctx.fillRect(0, 0, width, height);

      // Mouse smoothing (lerp)
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Draw elegant dark grid/dots accent
      ctx.strokeStyle = "rgba(255, 255, 255, 0.015)";
      ctx.lineWidth = 1;
      const gridSpacing = 80;
      for (let xPos = 0; xPos < width; xPos += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(xPos, 0);
        ctx.lineTo(xPos, height);
        ctx.stroke();
      }
      for (let yPos = 0; yPos < height; yPos += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, yPos);
        ctx.lineTo(width, yPos);
        ctx.stroke();
      }

      // Projection parameters
      const fov = 450;
      const centerX = width / 2;
      const centerY = height / 2;

      // Render shapes
      shapes.forEach((shape) => {
        // Subtle drift rotation
        shape.rotX += shape.speedX + mouse.y * 0.01;
        shape.rotY += shape.speedY + mouse.x * 0.01;
        shape.rotZ += shape.speedZ;
        shape.pulsePhase += shape.pulseSpeed;

        // Floating hover sway offset
        const swayY = Math.sin(shape.pulsePhase) * 15;
        const swayX = Math.cos(shape.pulsePhase * 0.7) * 10;

        // Convert shape normalized positions (x, y % of center) to world positions
        const worldX = (shape.x / 100) * width + mouse.x * -80 + swayX;
        const worldY = (shape.y / 100) * height + mouse.y * -80 + swayY;
        const worldZ = shape.z + Math.sin(shape.pulsePhase) * 10;

        const projectedVertices: { x: number; y: number; originalZ: number }[] = [];

        shape.vertices.forEach((v) => {
          // 1. Rotate vertex based on object's local animation angles
          let r = rotateZ(v, shape.rotZ);
          r = rotateY(r, shape.rotY);
          r = rotateX(r, shape.rotX);

          // 2. Translate coordinates to world space
          const wx = r.x + worldX;
          const wy = r.y + worldY;
          const wz = r.z + worldZ;

          // 3. Perspective projection
          const factor = fov / (fov + wz);
          const px = wx * factor + centerX;
          const py = wy * factor + centerY;

          projectedVertices.push({ x: px, y: py, originalZ: wz });
        });

        // Depth sorting for faces to prevent 3D overlapping issues (painters algorithm)
        const sortedFaces = shape.faces
          .map((face, faceIndex) => {
            // calculated average Z depth of face
            const avgZ = face.indices.reduce((sum, idx) => sum + projectedVertices[idx].originalZ, 0) / face.indices.length;
            return { face, faceIndex, avgZ };
          })
          .sort((a, b) => b.avgZ - a.avgZ); // draw deepest faces first

        // Draw faces & outlines
        sortedFaces.forEach(({ face }) => {
          if (face.indices.length < 3) return;

          // Compute Face normal for a simple dynamic directional light source
          // Light comes from top-left-front: (-0.5, -0.8, -1) normalized
          const v0 = shape.vertices[face.indices[0]];
          const v1 = shape.vertices[face.indices[1]];
          const v2 = shape.vertices[face.indices[2]];

          // Rotate local vectors to current orientation
          const r0 = rotateX(rotateY(rotateZ(v0, shape.rotZ), shape.rotY), shape.rotX);
          const r1 = rotateX(rotateY(rotateZ(v1, shape.rotZ), shape.rotY), shape.rotX);
          const r2 = rotateX(rotateY(rotateZ(v2, shape.rotZ), shape.rotY), shape.rotX);

          const vecA = { x: r1.x - r0.x, y: r1.y - r0.y, z: r1.z - r0.z };
          const vecB = { x: r2.x - r0.x, y: r2.y - r0.y, z: r2.z - r0.z };

          // Cross product to get normal vector
          const normal = {
            x: vecA.y * vecB.z - vecA.z * vecB.y,
            y: vecA.z * vecB.x - vecA.x * vecB.z,
            z: vecA.x * vecB.y - vecA.y * vecB.x,
          };
          const len = Math.sqrt(normal.x * normal.x + normal.y * normal.y + normal.z * normal.z);
          if (len > 0) {
            normal.x /= len;
            normal.y /= len;
            normal.z /= len;
          }

          // Dot product with lighting vector
          const lightDir = { x: -0.4, y: -0.6, z: -0.7 };
          const lightLen = Math.sqrt(lightDir.x * lightDir.x + lightDir.y * lightDir.y + lightDir.z * lightDir.z);
          const dot = (normal.x * lightDir.x + normal.y * lightDir.y + normal.z * lightDir.z) / lightLen;
          const intensity = Math.max(0, (dot + 1) / 2); // Map -1..1 to 0..1

          // Fill face with responsive lighting overlay
          ctx.beginPath();
          ctx.moveTo(projectedVertices[face.indices[0]].x, projectedVertices[face.indices[0]].y);
          for (let i = 1; i < face.indices.length; i++) {
            ctx.lineTo(projectedVertices[face.indices[i]].x, projectedVertices[face.indices[i]].y);
          }
          ctx.closePath();

          // Calculate glassmorphic fill color based on lighting intensity
          const opacity = 0.03 + intensity * 0.05;
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.fill();

          // Draw minimalist glass edges/strokes
          ctx.lineWidth = 0.75;
          const strokeOpacity = 0.06 + intensity * 0.12;
          ctx.strokeStyle = `rgba(255, 255, 255, ${strokeOpacity})`;
          ctx.stroke();
        });
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      id="canvas-3d-scene"
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block pointer-events-none"
      style={{ mixBlendMode: "screen", opacity: 0.85 }}
    />
  );
}
