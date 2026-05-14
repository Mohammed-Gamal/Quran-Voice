export function initBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);

    // Particles
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: '#59e1c7',
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Dynamic color update based on theme
    const updateParticleColor = () => {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        if (isLight) {
            particlesMaterial.color.set('#0b532c'); // Much darker green for visibility
            particlesMaterial.size = 0.08;          // Slightly larger particles
            particlesMaterial.opacity = 0.6;        // Higher opacity
            particlesMaterial.blending = THREE.NormalBlending;
        } else {
            particlesMaterial.color.set('#4db6ac'); // Matching muted Teal
            particlesMaterial.size = 0.05;
            particlesMaterial.opacity = 0.6;        // Slightly dimmed particles
            particlesMaterial.blending = THREE.AdditiveBlending;
        }
    };

    // Initial check
    updateParticleColor();

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'data-theme') {
                updateParticleColor();
            }
        });
    });
    observer.observe(document.documentElement, { attributes: true });

    // Subtle ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Responsive resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    window.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth - 0.5);
        mouseY = (event.clientY / window.innerHeight - 0.5);
    });

    const animate = () => {
        requestAnimationFrame(animate);

        particlesMesh.rotation.y += 0.001;
        
        // Add subtle mouse reaction
        particlesMesh.rotation.x += (mouseY * 0.05 - particlesMesh.rotation.x) * 0.05;
        particlesMesh.rotation.z += (mouseX * 0.05 - particlesMesh.rotation.z) * 0.05;

        renderer.render(scene, camera);
    };

    animate();
}
