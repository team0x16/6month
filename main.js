// Глубокий лор и огромные тексты (6 узлов, по одному на каждый месяц/этап)
const messages = [
    "Глава 1: Искра\n\nВсё началось 5 апреля 2026 года. Я в Геленджике, ты в Калуге. Между нами 1111 километров — цифра, которая для кого-то стала бы приговором, а для нас стала просто стартом. Кто бы мог подумать в тот день, во что всё это выльется? Первые сообщения, наши самые первые звонки... Помнишь, как мы только-только начинали узнавать друг друга? Каждая минута общения с тобой уже тогда была на вес золота.",
    
    "Глава 2: Притяжение\n\nС каждым днем это пресловутое расстояние в тысячу километров начало ощущаться совершенно иначе. Физически ты была далеко, но в душе — ближе всех. Каждое уведомление на телефоне заставляло сердце замирать. Мы узнали друг друга так глубоко и по-настоящему, как люди иногда не могут узнать друг друга, прожив годы в одной квартире. Ты стала частью моей повседневности, моих мыслей и моего сердца.",
    
    "Глава 3: Мой Щит\n\nЗа эти месяцы ты стала для меня не просто любимой девушкой, ты стала моей главной опорой. Твоя поддержка — это мой щит от любых проблем. Твой смех сквозь динамик телефона — лучшее лекарство, когда всё идет не так. Мы научились чувствовать настроение друг друга даже через экран, научились быть рядом, когда между нами города. Мы стали единым целым.",
    
    "Глава 4: Наш Геленджик\n\nНаши разговоры и фантазии постепенно начали обретать форму настоящих планов. Мечты перестали быть просто словами. Шум моря, солнце, Геленджик... Я каждый день смотрю на это море и до мельчайших деталей представляю ту самую секунду, когда впервые увижу тебя вживую. Как я подойду, как крепко обниму тебя и пойму, что всё это время мы ждали не зря. Этот день будет самым счастливым в моей жизни.",
    
    "Глава 5: Фундамент\n\nМы с тобой не просто мечтаем о встрече, мы строим фундамент для всей нашей жизни. Наш план: свадьба в 18 лет, а в 24 — наш первый ребенок. Для кого-то это просто слова, но я знаю, что это наше будущее. Мы пройдем через всё это вместе, шаг за шагом. У нас есть цель, у нас есть любовь, и нас ничто не остановит.",
    
    "Глава 6: Полгода\n\nИ вот, мы здесь. Сегодня нам ровно полгода.\n\nС момента той самой искры прошло уже {DAYS} дней.\nЭто {HOURS} часов, {MINUTES} минут и {SECONDS} секунд непрерывной связи.\n\nСпустя эти полгода я люблю тебя в тысячи раз сильнее, чем в самый первый день. Расстояние — это временно. А то, что мы построили — навсегда. С нашим днем, родная. Дальше — только больше!"
];

class TreeOfSouls {
    constructor() {
        this.canvasContainer = document.getElementById('canvas-container');
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        
        this.nodes = [];
        this.currentNodeIndex = -1;
        
        this.initThree();
        this.buildTree();
        this.bindEvents();
        
        this.clock = new THREE.Clock();
        this.animate = this.animate.bind(this);
        requestAnimationFrame(this.animate);
    }

    initThree() {
        this.scene = new THREE.Scene();
        // Настоящий 3D теплый космический туман!
        this.scene.fog = new THREE.FogExp2(0x1a0515, 0.0012); 

        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 4000);
        this.camera.position.set(0, 100, 600);

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x000000, 0); // Прозрачный для CSS фона
        this.canvasContainer.appendChild(this.renderer.domElement);
        
        // ВАЖНО: Добавляем OrbitControls для полного свободы вращения!
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.maxDistance = 1500;
        this.controls.minDistance = 10;
        this.controls.target.set(0, 80, 0); // Центр вращения — середина дерева
        this.controls.enabled = false; // Включим после интро
        
        this.treeGroup = new THREE.Group();
        this.scene.add(this.treeGroup);
    }

    buildTree() {
        const positions = [];
        const colors = [];

        const cTrunk = new THREE.Color(0x8a2be2); // Глубокий фиолетовый
        const cBranch = new THREE.Color(0x00ffff); // Циан
        const cLeaf = new THREE.Color(0xff1493); // Розовый

        // Рекурсивная фрактальная генерация дерева (настоящая органика)
        const buildBranch = (start, dir, length, radius, depth) => {
            if (depth === 0) return;
            
            const steps = Math.floor(length * 8); // Плотность частиц на ветку
            for(let i=0; i<steps; i++) {
                const t = i / steps;
                const pos = start.clone().add(dir.clone().multiplyScalar(t * length));
                
                // Органический шум (чем тоньше ветка, тем меньше шум)
                pos.x += (Math.random() - 0.5) * radius * 1.5;
                pos.y += (Math.random() - 0.5) * radius * 1.5;
                pos.z += (Math.random() - 0.5) * radius * 1.5;
                
                positions.push(pos.x, pos.y, pos.z);
                
                // Плавный градиент от корней к листьям
                const colorProgress = 1 - (depth / 7);
                let c;
                if (colorProgress < 0.5) {
                    c = cTrunk.clone().lerp(cBranch, colorProgress * 2);
                } else {
                    c = cBranch.clone().lerp(cLeaf, (colorProgress - 0.5) * 2);
                }
                
                // Добавляем случайные яркие искры
                if (Math.random() > 0.95) c.lerp(new THREE.Color(0xffffff), 0.8);
                
                colors.push(c.r, c.g, c.b);
            }
            
            // Ветвление (2-3 ветви)
            const numBranches = depth === 7 ? 5 : (Math.random() > 0.3 ? 2 : 3);
            for(let i=0; i<numBranches; i++) {
                // Случайное отклонение направления
                const spread = depth === 7 ? 1.5 : 1.0; 
                const newDir = dir.clone().add(new THREE.Vector3(
                    (Math.random() - 0.5) * spread,
                    (Math.random() - 0.2) * 0.5, // Склонность расти вверх
                    (Math.random() - 0.5) * spread
                )).normalize();
                
                const end = start.clone().add(dir.clone().multiplyScalar(length));
                buildBranch(end, newDir, length * 0.75, radius * 0.6, depth - 1);
            }
        };

        // Запуск генерации (глубина 7)
        buildBranch(new THREE.Vector3(0, -20, 0), new THREE.Vector3(0, 1, 0), 35, 4, 7);

        // Добавляем пыльцу / ауру вокруг дерева
        for(let j=0; j<15000; j++) {
            const x = (Math.random() - 0.5) * 300;
            const y = (Math.random() - 0.5) * 250 + 50;
            const z = (Math.random() - 0.5) * 300;
            positions.push(x, y, z);
            const c = Math.random() > 0.5 ? cBranch : cLeaf;
            colors.push(c.r, c.g, c.b);
        }

        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        // ВАЖНО: Текстура круга, чтобы не было квадратных пикселей!
        const circleTex = this.createGlowTexture(true);

        this.particleMat = new THREE.PointsMaterial({
            size: 2.5,
            map: circleTex,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            transparent: true,
            opacity: 0.0, // Изначально невидимо (появится при старте)
            depthWrite: false // Убирает черные квадраты вокруг частиц!
        });

        this.particles = new THREE.Points(geo, this.particleMat);
        this.treeGroup.add(this.particles);

        // --- Фоновые Звезды (Эффект Галактики) ---
        const bgParticleCount = 60000;
        const bgPositions = new Float32Array(bgParticleCount * 3);
        const bgColors = new Float32Array(bgParticleCount * 3);
        
        for(let j=0; j<bgParticleCount; j++) {
            // Распределяем в огромной сфере, исключая центр
            const r = 400 + Math.random() * 2000;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            
            bgPositions[j*3] = r * Math.sin(phi) * Math.cos(theta);
            bgPositions[j*3+1] = r * Math.sin(phi) * Math.sin(theta);
            bgPositions[j*3+2] = r * Math.cos(phi);
            
            // Цвета: от тускло-белого до глубокого синего и фиолетового
            const colorType = Math.random();
            let c;
            if (colorType > 0.95) c = new THREE.Color(0xffffff); // Редкие белые
            else if (colorType > 0.5) c = new THREE.Color(0x111144); // Темно-синие
            else c = new THREE.Color(0x330033); // Темно-фиолетовые
            
            c.multiplyScalar(0.3 + Math.random() * 0.7);
            bgColors[j*3] = c.r; bgColors[j*3+1] = c.g; bgColors[j*3+2] = c.b;
        }

        const bgGeo = new THREE.BufferGeometry();
        bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPositions, 3));
        bgGeo.setAttribute('color', new THREE.BufferAttribute(bgColors, 3));

        const bgMat = new THREE.PointsMaterial({
            size: 1.5,
            map: circleTex, // Используем ту же круглую текстуру
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            transparent: true,
            opacity: 0.8,
            depthWrite: false
        });

        this.bgStars = new THREE.Points(bgGeo, bgMat);
        this.scene.add(this.bgStars);

        // --- Узлы Воспоминаний ---
        const nodeGeo = new THREE.SphereGeometry(1.5, 32, 32);
        const nodeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        
        // ВАЖНО: Огромный невидимый хитбокс для клика
        const hitboxGeo = new THREE.SphereGeometry(12, 16, 16);
        const hitboxMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false });
        
        for(let i=0; i<messages.length; i++) {
            // Распределяем узлы по красивой спирали вокруг кроны
            const t = i / messages.length;
            const angle = t * Math.PI * 8;
            const r = 30 + t * 40; 
            
            const x = Math.cos(angle) * r;
            const z = Math.sin(angle) * r;
            const y = 30 + Math.sin(t * Math.PI) * 50;

            const mesh = new THREE.Mesh(nodeGeo, nodeMat);
            mesh.position.set(x, y, z);
            mesh.userData = { index: i, message: messages[i] };
            
            // Хитбокс добавляем внутрь узла
            const hitbox = new THREE.Mesh(hitboxGeo, hitboxMat);
            mesh.add(hitbox);
            mesh.userData.hitbox = hitbox;
            
            // Большое свечение узла (без черных квадратов)
            const glowTex = this.createGlowTexture(false);
            const glowMat = new THREE.SpriteMaterial({
                map: glowTex,
                color: cLeaf,
                blending: THREE.AdditiveBlending,
                transparent: true,
                depthWrite: false, // ВАЖНО!
                opacity: 0
            });
            const glow = new THREE.Sprite(glowMat);
            glow.scale.set(18, 18, 1);
            mesh.add(glow);
            mesh.userData.glow = glowMat; // Сохраняем ссылку для анимации

            // Синхрония (Линии)
            const lineGeo = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(0, 30, 0),
                new THREE.Vector3(x, y, z)
            ]);
            const lineMat = new THREE.LineBasicMaterial({ 
                color: 0xff1493, 
                transparent: true, 
                opacity: 0,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            });
            const line = new THREE.Line(lineGeo, lineMat);
            mesh.userData.line = lineMat;
            
            this.treeGroup.add(line);
            this.treeGroup.add(mesh);
            this.nodes.push(mesh);
            
            mesh.scale.set(0,0,0); // Скрыты до старта
        }
    }

    createGlowTexture(isParticle = false) {
        const canvas = document.createElement('canvas');
        canvas.width = 64; canvas.height = 64;
        const ctx = canvas.getContext('2d');
        const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        
        if (isParticle) {
            // Для мелких частиц - резче центр
            grad.addColorStop(0, 'rgba(255,255,255,1)');
            grad.addColorStop(0.4, 'rgba(255,255,255,0.6)');
            grad.addColorStop(1, 'rgba(0,0,0,0)');
        } else {
            // Для большого свечения - мягкий край
            grad.addColorStop(0, 'rgba(255,255,255,1)');
            grad.addColorStop(0.2, 'rgba(255,255,255,0.8)');
            grad.addColorStop(1, 'rgba(0,0,0,0)');
        }
        
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 64, 64);
        return new THREE.CanvasTexture(canvas);
    }

    bindEvents() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        document.getElementById('start-btn').addEventListener('click', () => this.startMagic());
        document.getElementById('next-node-btn').addEventListener('click', () => this.goToNextNode());
        document.getElementById('prev-node-btn').addEventListener('click', () => this.goToPrevNode());
        
        document.getElementById('close-message-btn').addEventListener('click', () => {
            document.getElementById('message-modal').classList.remove('active');
        });

        // Рейкастинг для клика по плодам
        window.addEventListener('click', (event) => {
            if (!this.controls.enabled) return; // Игнорим до старта
            if (event.target.tagName === 'BUTTON' || event.target.closest('.overlay')) return;
            if (document.getElementById('message-modal').classList.contains('active')) return;

            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            
            this.raycaster.setFromCamera(this.mouse, this.camera);
            
            // ВАЖНО: проверяем пересечения с невидимыми хитбоксами
            const hitboxes = this.nodes.map(n => n.userData.hitbox);
            const intersects = this.raycaster.intersectObjects(hitboxes);
            
            if (intersects.length > 0) {
                // Неважно, куда она нажала — всегда показываем следующую главу по порядку!
                this.goToNextNode();
            }
        });
    }

    startMagic() {
        document.getElementById('intro-ui').classList.add('hidden');
        document.getElementById('canvas-container').style.pointerEvents = 'auto'; 
        
        // Включаем ручное управление
        this.controls.enabled = true;
        
        // Плавное появление самого дерева (из невидимости)
        gsap.to(this.particleMat, { opacity: 0.8, duration: 4, ease: "power2.inOut" });
        
        // Появление плодов и линий
        this.nodes.forEach((node, i) => {
            gsap.to(node.scale, { x: 1, y: 1, z: 1, duration: 2, delay: 2 + i * 0.1, ease: "elastic.out(1, 0.5)" });
            gsap.to(node.userData.glow, { opacity: 1, duration: 2, delay: 2 + i * 0.1 });
            gsap.to(node.userData.line, { opacity: 0.4, duration: 2, delay: 2 + i * 0.1 });
        });
        
        // Эффектный подлет камеры из глубокого космоса к дереву
        gsap.to(this.camera.position, {
            x: 0,
            y: 80,
            z: 250,
            duration: 4,
            ease: "power2.inOut",
            onComplete: () => {
                document.getElementById('navigation-ui').classList.remove('hidden');
            }
        });
    }

    flyToNode(index) {
        this.currentNodeIndex = index;
        const node = this.nodes[this.currentNodeIndex];
        
        // Анимируем OrbitControls target к позиции узла
        gsap.to(this.controls.target, {
            x: node.position.x,
            y: node.position.y,
            z: node.position.z,
            duration: 1.5,
            ease: "power2.inOut"
        });

        // Подлетаем камерой чуть сбоку от узла
        const offset = node.position.clone().normalize().multiplyScalar(30);
        offset.y += 10;

        gsap.to(this.camera.position, {
            x: node.position.x + offset.x,
            y: node.position.y + offset.y,
            z: node.position.z + offset.z,
            duration: 1.5,
            ease: "power2.inOut",
            onComplete: () => {
                const textElement = document.getElementById('message-text');
                textElement.dataset.originalText = node.userData.message;
                textElement.innerText = node.userData.message; // will be immediately updated by animate
                document.getElementById('message-modal').classList.add('active');
            }
        });
    }

    goToNextNode() {
        let next = this.currentNodeIndex + 1;
        document.getElementById('message-modal').classList.remove('active');
        
        if (next >= this.nodes.length) {
            // Если главы закончились — запускаем финальную сцену!
            this.playOutro();
            return;
        }
        
        this.flyToNode(next);
    }

    playOutro() {
        // Забираем управление, но оставляем update для центровки
        this.controls.enableRotate = false;
        this.controls.enableZoom = false;
        this.controls.enablePan = false;
        
        // 1. Камера строго центрируется
        gsap.to(this.controls.target, { x: 0, y: 80, z: 0, duration: 1.5, ease: "power2.inOut" });
        gsap.to(this.camera.position, { x: 0, y: 80, z: 350, duration: 2.5, ease: "power2.inOut" });
        
        // Скрываем навигацию
        document.getElementById('navigation-ui').classList.add('hidden');

        // 2. Красивый распад Дерева
        setTimeout(() => {
            // Узлы плавно разлетаются и исчезают
            this.nodes.forEach((node) => {
                const dir = node.position.clone().normalize();
                gsap.to(node.position, {
                    x: node.position.x + dir.x * 100,
                    y: node.position.y + 100,
                    z: node.position.z + dir.z * 100,
                    duration: 3,
                    ease: "power2.inOut"
                });
                gsap.to(node.scale, { x: 0, y: 0, z: 0, duration: 2.5, delay: 0.5, ease: "power2.in" });
                gsap.to(node.userData.glow, { opacity: 0, duration: 2 });
                gsap.to(node.userData.line, { opacity: 0, duration: 2 });
            });

            // Само дерево красиво расширяется, кружится и превращается в пыль
            gsap.to(this.treeGroup.scale, { x: 2.5, y: 2.5, z: 2.5, duration: 3.5, ease: "power2.in" });
            gsap.to(this.treeGroup.position, { y: 100, duration: 3.5, ease: "power1.inOut" });
            gsap.to(this.treeGroup.rotation, { y: this.treeGroup.rotation.y + Math.PI, duration: 3.5, ease: "power2.in" });
            
            // Частицы дерева плавно гаснут и уменьшаются в размере
            gsap.to(this.particleMat, { size: 0, opacity: 0, duration: 3, ease: "power2.inOut" });

            // 3. Фон плавно темнеет до кромешной тьмы
            const fadeObj = { alpha: 0 };
            gsap.to(fadeObj, {
                alpha: 1,
                duration: 3.5,
                onUpdate: () => {
                    this.renderer.setClearColor(0x000000, fadeObj.alpha);
                    this.scene.fog.color.setHex(0x000000); 
                    this.scene.fog.density = 0.0012 + (fadeObj.alpha * 0.002); 
                }
            });
            
            // Фоновые звезды гаснут
            gsap.to(this.bgStars.material, { opacity: 0, duration: 3.5 });

            // 4. Появление текста БЫСТРО (через 3 секунды после начала распада)
            setTimeout(() => {
                const outro = document.getElementById('outro-ui');
                outro.classList.remove('hidden');
                gsap.to(outro, { opacity: 1, duration: 2, ease: "power2.inOut" });
            }, 3000);
            
        }, 1000); // Ждем 1 секунду после центровки камеры
    }

    goToPrevNode() {
        let prev = this.currentNodeIndex - 1;
        if (prev < 0) prev = this.nodes.length - 1;
        document.getElementById('message-modal').classList.remove('active');
        this.flyToNode(prev);
    }

    updateDynamicText() {
        const textElement = document.getElementById('message-text');
        if (!textElement.dataset.originalText) return;
        
        let msg = textElement.dataset.originalText;
        
        // Всегда проверяем на наличие хотя бы одного плейсхолдера
        if (msg.includes('{DAYS}') || msg.includes('{HOURS}') || msg.includes('{MINUTES}') || msg.includes('{SECONDS}')) {
            const startDate = new Date('2026-04-05T00:00:00+03:00').getTime();
            const now = new Date().getTime();
            
            const totalSeconds = Math.max(0, Math.floor((now - startDate) / 1000));
            
            const days = Math.floor(totalSeconds / (3600 * 24));
            const hours = Math.floor((totalSeconds / 3600)); 
            const minutes = Math.floor((totalSeconds / 60)); 
            const seconds = totalSeconds; 
            
            msg = msg.replace('{DAYS}', days)
                     .replace('{HOURS}', hours)
                     .replace('{MINUTES}', minutes)
                     .replace('{SECONDS}', seconds);
        }
        
        if (textElement.innerText !== msg) {
            textElement.innerText = msg;
        }
    }

    animate() {
        requestAnimationFrame(this.animate);
        const time = this.clock.getElapsedTime();

        // Очень медленное вращение всего дерева
        this.treeGroup.rotation.y = time * 0.02;

        // Пульсация плодов
        this.nodes.forEach((node, i) => {
            const s = 1 + Math.sin(time * 2 + i) * 0.2;
            node.scale.set(s,s,s);
        });

        // Живое обновление времени (Московское время)
        this.updateDynamicText();

        // Обновляем контроллы
        if (this.controls.enabled) {
            this.controls.update();
        }

        this.renderer.render(this.scene, this.camera);
    }
}

window.onload = () => {
    new TreeOfSouls();
};
