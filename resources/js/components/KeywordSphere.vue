<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';

import type { KeywordGroup, KeywordGroupTone } from '@/data/portfolio';

interface MeshNode {
    label: string;
    groupTitle: string;
    itemIndex: number;
    nodeIndex: number;
    tone: KeywordGroupTone;
    x: number;
    y: number;
    z: number;
}

interface MeshConnection {
    from: number;
    to: number;
    tone: KeywordGroupTone;
}

interface ProjectedNode extends MeshNode {
    depth: number;
    opacity: number;
    scale: number;
    screenX: number;
    screenY: number;
}

const props = defineProps<{
    groups: KeywordGroup[];
}>();

const tonePalette: Record<
    KeywordGroupTone,
    {
        rgb: string;
        solid: string;
    }
> = {
    software: {
        rgb: '18, 58, 124',
        solid: '#123a7c',
    },
    engineering: {
        rgb: '194, 65, 12',
        solid: '#c2410c',
    },
};

const canvasRef = ref<HTMLCanvasElement | null>(null);
const prefersReducedMotion = ref(false);
const searchQuery = ref('');

let animationFrameId = 0;
let motionMediaQuery: MediaQueryList | null = null;
let resizeObserver: ResizeObserver | null = null;

const labelFont =
    '700 11px "Instrument Sans", ui-sans-serif, system-ui, sans-serif';

const getTonePalette = (tone: KeywordGroupTone) => tonePalette[tone];

const normalizedSearchQuery = computed(() =>
    searchQuery.value.trim().toLocaleLowerCase(),
);

const getSearchOpacity = (node: MeshNode) => {
    const query = normalizedSearchQuery.value;

    if (!query) {
        return 1;
    }

    const searchableText =
        `${node.label} ${node.groupTitle}`.toLocaleLowerCase();

    return searchableText.includes(query) ? 1 : 0.14;
};

const meshNodes = computed<MeshNode[]>(() => {
    const totalItems = props.groups.reduce(
        (itemTotal, group) => itemTotal + group.items.length,
        0,
    );

    if (totalItems === 0) {
        return [];
    }

    const groupOffsetStep = props.groups.length > 1 ? 0.48 : 0;

    return props.groups.flatMap((group, groupIndex) =>
        group.items.map((label, itemIndex) => {
            const nodeIndex = props.groups
                .slice(0, groupIndex)
                .reduce(
                    (itemTotal, previousGroup) =>
                        itemTotal + previousGroup.items.length,
                    itemIndex,
                );
            const verticalAngle = Math.acos(
                -1 + (2 * nodeIndex + 1) / totalItems,
            );
            const groupOffset =
                (groupIndex - (props.groups.length - 1) / 2) * groupOffsetStep;
            const horizontalAngle =
                Math.sqrt(totalItems * Math.PI) * verticalAngle + groupOffset;

            return {
                label,
                groupTitle: group.title,
                itemIndex,
                nodeIndex,
                tone: group.tone,
                x: Math.cos(horizontalAngle) * Math.sin(verticalAngle),
                y: Math.sin(horizontalAngle) * Math.sin(verticalAngle),
                z: Math.cos(verticalAngle),
            };
        }),
    );
});

const meshConnections = computed<MeshConnection[]>(() => {
    const connections: MeshConnection[] = [];
    const connectionKeys = new Set<string>();
    let groupStartIndex = 0;

    const addConnection = (
        from: number,
        to: number,
        tone: KeywordGroupTone,
    ) => {
        const [first, second] = [from, to].sort((left, right) => left - right);
        const key = `${first}-${second}`;

        if (first === second || connectionKeys.has(key)) {
            return;
        }

        connectionKeys.add(key);
        connections.push({ from, to, tone });
    };

    props.groups.forEach((group) => {
        const groupIndexes = group.items.map(
            (_, itemIndex) => groupStartIndex + itemIndex,
        );

        groupIndexes.forEach((nodeIndex, itemIndex) => {
            addConnection(
                nodeIndex,
                groupIndexes[(itemIndex + 1) % groupIndexes.length],
                group.tone,
            );

            if (groupIndexes.length > 4) {
                addConnection(
                    nodeIndex,
                    groupIndexes[(itemIndex + 2) % groupIndexes.length],
                    group.tone,
                );
            }
        });

        groupStartIndex += group.items.length;
    });

    return connections;
});

const accessibleGroups = computed(() =>
    props.groups.map((group) => `${group.title}: ${group.items.join(', ')}`),
);

const drawRoundedRect = (
    context: CanvasRenderingContext2D,
    xPosition: number,
    yPosition: number,
    width: number,
    height: number,
    radius: number,
) => {
    const cornerRadius = Math.min(radius, width / 2, height / 2);

    context.beginPath();
    context.moveTo(xPosition + cornerRadius, yPosition);
    context.arcTo(
        xPosition + width,
        yPosition,
        xPosition + width,
        yPosition + height,
        cornerRadius,
    );
    context.arcTo(
        xPosition + width,
        yPosition + height,
        xPosition,
        yPosition + height,
        cornerRadius,
    );
    context.arcTo(
        xPosition,
        yPosition + height,
        xPosition,
        yPosition,
        cornerRadius,
    );
    context.arcTo(
        xPosition,
        yPosition,
        xPosition + width,
        yPosition,
        cornerRadius,
    );
    context.closePath();
};

const prepareCanvas = (canvas: HTMLCanvasElement) => {
    const bounds = canvas.getBoundingClientRect();
    const canvasWidth = Math.max(1, bounds.width);
    const canvasHeight = Math.max(1, bounds.height);
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const scaledWidth = Math.floor(canvasWidth * pixelRatio);
    const scaledHeight = Math.floor(canvasHeight * pixelRatio);

    if (canvas.width !== scaledWidth || canvas.height !== scaledHeight) {
        canvas.width = scaledWidth;
        canvas.height = scaledHeight;
    }

    const context = canvas.getContext('2d');

    if (!context) {
        return null;
    }

    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    return {
        context,
        height: canvasHeight,
        width: canvasWidth,
    };
};

const projectNodes = (
    canvasWidth: number,
    canvasHeight: number,
    timestamp: number,
): ProjectedNode[] => {
    const size = Math.min(canvasWidth, canvasHeight);
    const radius = size * 0.34;
    const perspective = size * 1.18;
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    const rotationY = prefersReducedMotion.value ? -0.54 : timestamp * 0.00013;
    const rotationX = prefersReducedMotion.value
        ? 0.18
        : 0.18 + Math.sin(timestamp * 0.00018) * 0.07;
    const cosY = Math.cos(rotationY);
    const sinY = Math.sin(rotationY);
    const cosX = Math.cos(rotationX);
    const sinX = Math.sin(rotationX);

    return meshNodes.value.map((node) => {
        const xPosition = node.x * radius;
        const yPosition = node.y * radius;
        const zPosition = node.z * radius;
        const rotatedX = xPosition * cosY + zPosition * sinY;
        const rotatedZ = -xPosition * sinY + zPosition * cosY;
        const rotatedY = yPosition * cosX - rotatedZ * sinX;
        const finalZ = yPosition * sinX + rotatedZ * cosX;
        const projectionScale = perspective / (perspective - finalZ);
        const depth = Math.max(0, Math.min(1, (finalZ / radius + 1) / 2));

        return {
            ...node,
            depth,
            opacity: 0.42 + depth * 0.58,
            scale: 0.74 + depth * 0.2,
            screenX: centerX + rotatedX * projectionScale,
            screenY: centerY + rotatedY * projectionScale,
        };
    });
};

const drawMesh = (timestamp: number) => {
    const canvas = canvasRef.value;

    if (!canvas) {
        return;
    }

    const preparedCanvas = prepareCanvas(canvas);

    if (!preparedCanvas) {
        return;
    }

    const { context, height, width } = preparedCanvas;
    const size = Math.min(width, height);
    const centerX = width / 2;
    const centerY = height / 2;
    const sphereRadius = size * 0.39;
    const projectedNodes = projectNodes(width, height, timestamp);
    const orderedNodes = [...projectedNodes].sort(
        (firstNode, secondNode) => firstNode.depth - secondNode.depth,
    );

    context.clearRect(0, 0, width, height);

    context.save();
    context.strokeStyle = 'rgba(15, 23, 42, 0.08)';
    context.lineWidth = 1;
    context.beginPath();
    context.ellipse(
        centerX,
        centerY,
        sphereRadius,
        sphereRadius * 0.82,
        0,
        0,
        Math.PI * 2,
    );
    context.stroke();
    context.beginPath();
    context.ellipse(
        centerX,
        centerY,
        sphereRadius * 0.68,
        sphereRadius,
        0.34,
        0,
        Math.PI * 2,
    );
    context.stroke();
    context.restore();

    context.save();
    context.lineCap = 'round';

    meshConnections.value.forEach((connection) => {
        const fromNode = projectedNodes[connection.from];
        const toNode = projectedNodes[connection.to];

        if (!fromNode || !toNode) {
            return;
        }

        const palette = getTonePalette(connection.tone);
        const depth = (fromNode.depth + toNode.depth) / 2;
        const searchOpacity = Math.min(
            getSearchOpacity(fromNode),
            getSearchOpacity(toNode),
        );

        context.strokeStyle = `rgba(${palette.rgb}, ${(0.1 + depth * 0.28) * searchOpacity})`;
        context.lineWidth = 0.7 + depth * 1.1;
        context.shadowColor = `rgba(${palette.rgb}, ${(0.08 + depth * 0.14) * searchOpacity})`;
        context.shadowBlur = 8 + depth * 10;
        context.beginPath();
        context.moveTo(fromNode.screenX, fromNode.screenY);
        context.lineTo(toNode.screenX, toNode.screenY);
        context.stroke();
    });

    context.restore();

    orderedNodes.forEach((node) => {
        const palette = getTonePalette(node.tone);
        const labelHeight = 23;

        context.save();
        context.globalAlpha = node.opacity * getSearchOpacity(node);
        context.translate(node.screenX, node.screenY);
        context.scale(node.scale, node.scale);
        context.font = labelFont;
        context.textAlign = 'center';
        context.textBaseline = 'middle';

        const labelWidth = Math.max(
            50,
            Math.ceil(context.measureText(node.label).width) + 20,
        );

        context.shadowColor = `rgba(${palette.rgb}, ${0.14 + node.depth * 0.12})`;
        context.shadowBlur = 18;
        context.fillStyle = `rgba(${palette.rgb}, ${0.1 + node.depth * 0.06})`;
        drawRoundedRect(
            context,
            -labelWidth / 2,
            -labelHeight / 2,
            labelWidth,
            labelHeight,
            999,
        );
        context.fill();

        context.shadowBlur = 0;
        context.strokeStyle = `rgba(${palette.rgb}, ${0.28 + node.depth * 0.34})`;
        context.lineWidth = 1;
        context.stroke();

        context.fillStyle = palette.solid;
        context.fillText(node.label, 0, 1);
        context.restore();
    });
};

const queueFrame = () => {
    window.cancelAnimationFrame(animationFrameId);
    animationFrameId = window.requestAnimationFrame((timestamp) => {
        drawMesh(timestamp);

        if (!prefersReducedMotion.value) {
            queueFrame();
        }
    });
};

const handleMotionPreferenceChange = () => {
    prefersReducedMotion.value = motionMediaQuery?.matches ?? false;
    queueFrame();
};

onMounted(() => {
    motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.value = motionMediaQuery.matches;
    motionMediaQuery.addEventListener('change', handleMotionPreferenceChange);

    if (canvasRef.value) {
        resizeObserver = new ResizeObserver(() => {
            if (prefersReducedMotion.value) {
                queueFrame();
            }
        });
        resizeObserver.observe(canvasRef.value);
    }

    queueFrame();
});

onBeforeUnmount(() => {
    window.cancelAnimationFrame(animationFrameId);
    motionMediaQuery?.removeEventListener(
        'change',
        handleMotionPreferenceChange,
    );
    resizeObserver?.disconnect();
});

watch(
    () => props.groups,
    () => queueFrame(),
    { deep: true },
);

watch(searchQuery, () => queueFrame());
</script>

<template>
    <div class="keyword-sphere" aria-label="Technology keyword mesh">
        <label class="keyword-sphere__search">
            <span class="sr-only">Search skills</span>
            <i
                class="pi pi-search keyword-sphere__search-icon"
                aria-hidden="true"
            />
            <input
                v-model="searchQuery"
                class="keyword-sphere__search-input"
                type="search"
                placeholder="Search skills"
                autocomplete="off"
            />
        </label>

        <canvas
            ref="canvasRef"
            class="keyword-sphere__canvas"
            aria-hidden="true"
        />

        <ul class="keyword-sphere__legend" aria-label="Skill groups">
            <li v-for="group in groups" :key="group.title">
                <span
                    class="keyword-sphere__legend-swatch"
                    :style="{
                        backgroundColor: getTonePalette(group.tone).solid,
                    }"
                    aria-hidden="true"
                />
                <span>{{ group.title }}</span>
            </li>
        </ul>

        <ul class="sr-only">
            <li v-for="group in accessibleGroups" :key="group">
                {{ group }}
            </li>
        </ul>
    </div>
</template>

<style scoped>
.keyword-sphere {
    position: relative;
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
    gap: 0.8rem;
    min-height: 28rem;
    height: clamp(28rem, 60vw, 38rem);
    place-items: center;
    overflow: hidden;
}

.keyword-sphere__search {
    position: relative;
    display: flex;
    align-items: center;
    width: min(100%, 28rem);
}

.keyword-sphere__search-icon {
    position: absolute;
    left: 0.95rem;
    color: #64748b;
    font-size: 0.86rem;
    pointer-events: none;
}

.keyword-sphere__search-input {
    width: 100%;
    min-height: 2.65rem;
    padding: 0.58rem 1rem 0.58rem 2.45rem;
    border: 1px solid #cbd5e1;
    border-radius: 999px;
    outline: none;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 14px 34px rgba(15, 23, 42, 0.07);
    color: #0f172a;
    font: inherit;
    font-size: 0.9rem;
    font-weight: 650;
    letter-spacing: 0;
}

.keyword-sphere__search-input::placeholder {
    color: #64748b;
}

.keyword-sphere__search-input:focus {
    border-color: #123a7c;
    box-shadow:
        0 0 0 0.2rem rgba(18, 58, 124, 0.12),
        0 14px 34px rgba(15, 23, 42, 0.08);
}

.keyword-sphere__canvas {
    width: min(100%, 32rem);
    height: min(100%, 32rem);
    aspect-ratio: 1;
}

.keyword-sphere__legend {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.65rem 1rem;
    width: min(100%, 32rem);
    margin: 0;
    padding: 0 1rem;
    color: #475569;
    font-size: 0.76rem;
    font-weight: 700;
    letter-spacing: 0;
    list-style: none;
}

.keyword-sphere__legend li {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    min-width: 0;
}

.keyword-sphere__legend-swatch {
    width: 0.55rem;
    height: 0.55rem;
    flex: 0 0 auto;
    border-radius: 999px;
    box-shadow: 0 0 0 0.22rem rgba(15, 23, 42, 0.05);
}

@media (max-width: 520px) {
    .keyword-sphere {
        min-height: 28rem;
        height: 28rem;
        gap: 0.65rem;
    }

    .keyword-sphere__canvas {
        width: min(100%, 20.5rem);
        height: min(100%, 20.5rem);
    }

    .keyword-sphere__legend {
        gap: 0.45rem 0.75rem;
        font-size: 0.72rem;
    }

    .keyword-sphere__search-input {
        min-height: 2.5rem;
        font-size: 0.84rem;
    }
}
</style>
