<script setup lang="ts">
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import type { KeywordGroup, KeywordGroupTone } from '@/data/portfolio';

interface SkillFilterPayload {
    label: string;
    filterCode?: string;
}

interface MeshNode {
    label: string;
    description: string;
    filterCode?: string;
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

interface NodeHitArea {
    nodeIndex: number;
    depth: number;
    height: number;
    screenX: number;
    screenY: number;
    searchOpacity: number;
    width: number;
}

interface RotationState {
    x: number;
    y: number;
    isTargeting: boolean;
    lastTimestamp: number | null;
    targetX: number;
    targetY: number;
}

const props = defineProps<{
    groups: KeywordGroup[];
}>();

const emit = defineEmits<{
    'filter-skill': [payload: SkillFilterPayload];
}>();

const { t } = useI18n({ useScope: 'global' });

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
const selectedNodeIndex = ref<number | null>(null);
const isSkillDialogVisible = ref(false);

const rotationState: RotationState = {
    x: 0.18,
    y: -0.54,
    isTargeting: false,
    lastTimestamp: null,
    targetX: 0.18,
    targetY: -0.54,
};

let animationFrameId = 0;
let latestHitAreas: NodeHitArea[] = [];
let motionMediaQuery: MediaQueryList | null = null;
let performanceMediaQuery: MediaQueryList | null = null;
let resizeObserver: ResizeObserver | null = null;
let lastDrawTimestamp: number | null = null;
const isLowPerformanceDevice = ref(false);

interface DragState {
    active: boolean;
    startX: number;
    startY: number;
    startRotationX: number;
    startRotationY: number;
    pointerId: number | null;
    moved: boolean;
    hitAreaAtDown: NodeHitArea | null;
}

const dragState: DragState = {
    active: false,
    startX: 0,
    startY: 0,
    startRotationX: 0,
    startRotationY: 0,
    pointerId: null,
    moved: false,
    hitAreaAtDown: null,
};

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
        `${node.label} ${node.groupTitle} ${node.description}`.toLocaleLowerCase();

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
        group.items.map((item, itemIndex) => {
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
                label: item.label,
                description: item.description,
                filterCode: item.filterCode,
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

const selectedNode = computed(() => {
    const nodeIndex = selectedNodeIndex.value;

    if (nodeIndex === null) {
        return null;
    }

    return meshNodes.value.find((node) => node.nodeIndex === nodeIndex) ?? null;
});

const canFilterSelectedSkill = computed(
    () => selectedNode.value?.tone === 'software',
);

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

const accessibleSkills = computed(() =>
    meshNodes.value.map((node) => ({
        key: `${node.groupTitle}-${node.label}`,
        label: `${node.label}. ${node.groupTitle}. ${node.description}`,
        nodeIndex: node.nodeIndex,
    })),
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
    const pixelRatio = isLowPerformanceDevice.value
        ? 1
        : Math.min(window.devicePixelRatio || 1, 1.5);
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

const getShortestAngleDelta = (currentAngle: number, targetAngle: number) =>
    Math.atan2(
        Math.sin(targetAngle - currentAngle),
        Math.cos(targetAngle - currentAngle),
    );

const getClosestRotationAngle = (currentAngle: number, targetAngle: number) =>
    currentAngle + getShortestAngleDelta(currentAngle, targetAngle);

const updateRotation = (timestamp: number) => {
    if (rotationState.lastTimestamp === null) {
        rotationState.lastTimestamp = timestamp;
    }

    const elapsedTime = Math.min(timestamp - rotationState.lastTimestamp, 64);
    rotationState.lastTimestamp = timestamp;

    if (selectedNodeIndex.value !== null) {
        if (!rotationState.isTargeting || prefersReducedMotion.value) {
            rotationState.x = rotationState.targetX;
            rotationState.y = rotationState.targetY;
            rotationState.isTargeting = false;

            return;
        }

        const easing = Math.min(1, elapsedTime / 220);
        const xDelta = getShortestAngleDelta(
            rotationState.x,
            rotationState.targetX,
        );
        const yDelta = getShortestAngleDelta(
            rotationState.y,
            rotationState.targetY,
        );

        rotationState.x += xDelta * easing;
        rotationState.y += yDelta * easing;

        if (Math.abs(xDelta) < 0.002 && Math.abs(yDelta) < 0.002) {
            rotationState.x = rotationState.targetX;
            rotationState.y = rotationState.targetY;
            rotationState.isTargeting = false;
        }

        return;
    }

    rotationState.isTargeting = false;

    if (prefersReducedMotion.value) {
        rotationState.x = 0.18;
        rotationState.y = -0.54;

        return;
    }

    rotationState.y += elapsedTime * 0.00013;
    rotationState.x += elapsedTime * 0.00008;

    if (Math.abs(rotationState.x) > Math.PI * 2) {
        rotationState.x %= Math.PI * 2;
    }
};

const setRotationTargetForNode = (node: MeshNode) => {
    const horizontalDistance = Math.hypot(node.x, node.z);
    const targetY = Math.atan2(-node.x, node.z);
    const targetX = Math.atan2(node.y, horizontalDistance);

    rotationState.targetX = getClosestRotationAngle(rotationState.x, targetX);
    rotationState.targetY = getClosestRotationAngle(rotationState.y, targetY);
    rotationState.isTargeting = !prefersReducedMotion.value;

    if (prefersReducedMotion.value) {
        rotationState.x = rotationState.targetX;
        rotationState.y = rotationState.targetY;
    }
};

const projectNodes = (
    canvasWidth: number,
    canvasHeight: number,
): ProjectedNode[] => {
    const size = Math.min(canvasWidth, canvasHeight);
    const radius = size * 0.34;
    const perspective = size * 1.18;
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    const rotationY = rotationState.y;
    const rotationX = rotationState.x;
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
    updateRotation(timestamp);

    const size = Math.min(width, height);
    const centerX = width / 2;
    const centerY = height / 2;
    const sphereRadius = size * 0.39;
    const projectedNodes = projectNodes(width, height);
    const orderedNodes = [...projectedNodes].sort(
        (firstNode, secondNode) => firstNode.depth - secondNode.depth,
    );
    const selectedIndex = selectedNodeIndex.value;
    const selectedProjectedNode =
        selectedIndex === null
            ? null
            : (projectedNodes.find(
                  (node) => node.nodeIndex === selectedIndex,
              ) ?? null);
    const drawableNodes = selectedProjectedNode
        ? [
              ...orderedNodes.filter(
                  (node) => node.nodeIndex !== selectedProjectedNode.nodeIndex,
              ),
              selectedProjectedNode,
          ]
        : orderedNodes;

    context.clearRect(0, 0, width, height);
    latestHitAreas = [];

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
        const reducedDetail = isLowPerformanceDevice.value;

        context.strokeStyle = `rgba(${palette.rgb}, ${(0.1 + depth * 0.28) * searchOpacity})`;
        context.lineWidth = 0.7 + depth * 1.1;
        context.shadowColor = reducedDetail
            ? 'transparent'
            : `rgba(${palette.rgb}, ${(0.08 + depth * 0.14) * searchOpacity})`;
        context.shadowBlur = reducedDetail ? 0 : 8 + depth * 10;
        context.beginPath();
        context.moveTo(fromNode.screenX, fromNode.screenY);
        context.lineTo(toNode.screenX, toNode.screenY);
        context.stroke();
    });

    context.restore();

    drawableNodes.forEach((node) => {
        const palette = getTonePalette(node.tone);
        const labelHeight = 23;
        const isSelected = node.nodeIndex === selectedIndex;
        const searchOpacity = getSearchOpacity(node);

        context.save();
        context.globalAlpha = isSelected ? 1 : node.opacity * searchOpacity;
        context.translate(node.screenX, node.screenY);
        context.scale(node.scale, node.scale);
        context.font = labelFont;
        context.textAlign = 'center';
        context.textBaseline = 'middle';

        const labelWidth = Math.max(
            50,
            Math.ceil(context.measureText(node.label).width) + 20,
        );

        latestHitAreas.push({
            nodeIndex: node.nodeIndex,
            depth: isSelected ? 2 : node.depth,
            height: labelHeight * node.scale + 8,
            screenX: node.screenX,
            screenY: node.screenY,
            searchOpacity,
            width: labelWidth * node.scale + 8,
        });

        const reducedDetail = isLowPerformanceDevice.value;
        context.shadowColor = reducedDetail
            ? 'transparent'
            : `rgba(${palette.rgb}, ${isSelected ? 0.34 : 0.14 + node.depth * 0.12})`;
        context.shadowBlur = reducedDetail ? 0 : isSelected ? 28 : 18;
        context.fillStyle = `rgba(${palette.rgb}, ${isSelected ? 0.2 : 0.1 + node.depth * 0.06})`;
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
        context.strokeStyle = `rgba(${palette.rgb}, ${isSelected ? 0.95 : 0.28 + node.depth * 0.34})`;
        context.lineWidth = isSelected ? 1.8 : 1;
        context.stroke();

        context.fillStyle = palette.solid;
        context.fillText(node.label, 0, 1);
        context.restore();
    });
};

const shouldIgnoreDimmedSearchResult = (hitArea: NodeHitArea) => {
    return Boolean(normalizedSearchQuery.value) && hitArea.searchOpacity < 0.5;
};

const selectSkillNode = (nodeIndex: number) => {
    const node = meshNodes.value.find(
        (currentNode) => currentNode.nodeIndex === nodeIndex,
    );

    if (!node) {
        return;
    }

    selectedNodeIndex.value = node.nodeIndex;
    isSkillDialogVisible.value = true;
    setRotationTargetForNode(node);
    rotationState.lastTimestamp = null;
    queueFrame();
};

const getHitAreaAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.value;

    if (!canvas) {
        return null;
    }

    const bounds = canvas.getBoundingClientRect();
    const pointerX = clientX - bounds.left;
    const pointerY = clientY - bounds.top;

    return (
        latestHitAreas
            .filter((area) => {
                if (shouldIgnoreDimmedSearchResult(area)) {
                    return false;
                }

                const halfWidth = area.width / 2;
                const halfHeight = area.height / 2;

                return (
                    pointerX >= area.screenX - halfWidth &&
                    pointerX <= area.screenX + halfWidth &&
                    pointerY >= area.screenY - halfHeight &&
                    pointerY <= area.screenY + halfHeight
                );
            })
            .sort((first, second) => second.depth - first.depth)[0] ?? null
    );
};

const handleCanvasPointerDown = (event: PointerEvent) => {
    const canvas = canvasRef.value;

    if (!canvas) {
        return;
    }

    canvas.setPointerCapture(event.pointerId);
    dragState.active = true;
    dragState.pointerId = event.pointerId;
    dragState.startX = event.clientX;
    dragState.startY = event.clientY;
    dragState.startRotationX = rotationState.x;
    dragState.startRotationY = rotationState.y;
    dragState.moved = false;
    dragState.hitAreaAtDown = getHitAreaAt(event.clientX, event.clientY);
    rotationState.lastTimestamp = null;
};

const handleCanvasPointerMove = (event: PointerEvent) => {
    if (!dragState.active || dragState.pointerId !== event.pointerId) {
        return;
    }

    const deltaX = event.clientX - dragState.startX;
    const deltaY = event.clientY - dragState.startY;

    if (!dragState.moved && Math.hypot(deltaX, deltaY) > 4) {
        dragState.moved = true;
        rotationState.isTargeting = false;
    }

    if (dragState.moved) {
        const rotationFactor = 0.006;
        rotationState.y += event.movementX * rotationFactor;
        rotationState.x -= event.movementY * rotationFactor;
        rotationState.lastTimestamp = null;
        queueFrame();
    }
};

const handleCanvasPointerUp = (event: PointerEvent) => {
    if (!dragState.active || dragState.pointerId !== event.pointerId) {
        return;
    }

    const canvas = canvasRef.value;

    if (canvas && 'hasPointerCapture' in canvas) {
        try {
            if (canvas.hasPointerCapture(event.pointerId)) {
                canvas.releasePointerCapture(event.pointerId);
            }
        } catch {
            // Ignore invalid pointer capture states.
        }
    }

    if (!dragState.moved && dragState.hitAreaAtDown) {
        selectSkillNode(dragState.hitAreaAtDown.nodeIndex);
    }

    dragState.active = false;
    dragState.pointerId = null;
    dragState.hitAreaAtDown = null;
};

const closeSkillDialog = () => {
    isSkillDialogVisible.value = false;
    selectedNodeIndex.value = null;
    rotationState.isTargeting = false;
    rotationState.lastTimestamp = null;
    queueFrame();
};

const filterSelectedSkill = () => {
    const node = selectedNode.value;

    if (!node || node.tone !== 'software') {
        return;
    }

    emit('filter-skill', {
        label: node.label,
        filterCode: node.filterCode,
    });
    closeSkillDialog();
};

const shouldContinueAnimating = () => {
    if (prefersReducedMotion.value || document.hidden) {
        return false;
    }

    return selectedNodeIndex.value === null || rotationState.isTargeting;
};

const queueFrame = () => {
    window.cancelAnimationFrame(animationFrameId);
    animationFrameId = window.requestAnimationFrame((timestamp) => {
        const frameDelay = isLowPerformanceDevice.value ? 33 : 22;

        if (lastDrawTimestamp === null || timestamp - lastDrawTimestamp >= frameDelay) {
            drawMesh(timestamp);
            lastDrawTimestamp = timestamp;
        }

        if (shouldContinueAnimating()) {
            queueFrame();
        }
    });
};

const handleVisibilityChange = () => {
    if (!document.hidden) {
        rotationState.lastTimestamp = null;
        lastDrawTimestamp = null;
        queueFrame();
    }
};

const updateDevicePerformanceState = () => {
    prefersReducedMotion.value = motionMediaQuery?.matches ?? false;
    isLowPerformanceDevice.value = performanceMediaQuery?.matches ?? false;

    if (selectedNode.value) {
        setRotationTargetForNode(selectedNode.value);
    }

    rotationState.lastTimestamp = null;
    queueFrame();
};

onMounted(() => {
    motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    performanceMediaQuery = window.matchMedia(
        '(pointer: coarse), (max-width: 720px)',
    );

    updateDevicePerformanceState();
    motionMediaQuery.addEventListener('change', updateDevicePerformanceState);
    performanceMediaQuery.addEventListener('change', updateDevicePerformanceState);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    if (canvasRef.value) {
        resizeObserver = new ResizeObserver(() => queueFrame());
        resizeObserver.observe(canvasRef.value);
    }

    queueFrame();
});

onBeforeUnmount(() => {
    window.cancelAnimationFrame(animationFrameId);
    motionMediaQuery?.removeEventListener('change', updateDevicePerformanceState);
    performanceMediaQuery?.removeEventListener('change', updateDevicePerformanceState);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    resizeObserver?.disconnect();
});

watch(
    () => props.groups,
    () => {
        isSkillDialogVisible.value = false;
        selectedNodeIndex.value = null;
        rotationState.isTargeting = false;
        rotationState.lastTimestamp = null;
        queueFrame();
    },
    { deep: true },
);

watch(searchQuery, () => {
    queueFrame();
});
</script>

<template>
    <div class="keyword-sphere" :aria-label="t('labels.skillSphere')">
        <label class="keyword-sphere__search">
            <span class="sr-only">{{ t('labels.searchSkills') }}</span>
            <i
                class="pi pi-search keyword-sphere__search-icon"
                aria-hidden="true"
            />
            <input
                v-model="searchQuery"
                class="keyword-sphere__search-input"
                type="search"
                :placeholder="t('labels.searchSkills')"
                autocomplete="off"
            />
        </label>

        <canvas
            ref="canvasRef"
            class="keyword-sphere__canvas"
            aria-hidden="true"
            @pointerdown="handleCanvasPointerDown"
            @pointermove="handleCanvasPointerMove"
            @pointerup="handleCanvasPointerUp"
            @pointercancel="handleCanvasPointerUp"
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

        <ul class="sr-only" :aria-label="t('labels.skillSphere')">
            <li v-for="skill in accessibleSkills" :key="skill.key">
                <button type="button" @click="selectSkillNode(skill.nodeIndex)">
                    {{ skill.label }}
                </button>
            </li>
        </ul>

        <Dialog
            v-model:visible="isSkillDialogVisible"
            class="keyword-sphere__dialog"
            :draggable="false"
            :header="selectedNode?.label"
            :modal="false"
            :style="{ width: 'min(92vw, 28rem)' }"
            @hide="closeSkillDialog"
        >
            <div v-if="selectedNode" class="keyword-sphere__dialog-body">
                <p class="keyword-sphere__dialog-kicker">
                    {{ t('labels.skillGroup') }} / {{ selectedNode.groupTitle }}
                </p>
                <p class="keyword-sphere__dialog-copy">
                    {{ selectedNode.description }}
                </p>
                <Button
                    v-if="canFilterSelectedSkill"
                    class="keyword-sphere__dialog-action"
                    icon="pi pi-filter"
                    :label="
                        t('actions.viewProjectsWithSkill', {
                            skill: selectedNode.label,
                        })
                    "
                    @click="filterSelectedSkill"
                />
            </div>
        </Dialog>
    </div>
</template>

<style scoped>
.keyword-sphere {
    position: relative;
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
    gap: 0.8rem;
    min-height: 36rem;
    height: clamp(36rem, 70vw, 48rem);
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
    width: min(100%, 42rem);
    height: min(100%, 42rem);
    aspect-ratio: 1;
    cursor: pointer;
    touch-action: none;
}

.keyword-sphere__legend {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.65rem 1rem;
    width: min(100%, 42rem);
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

.keyword-sphere__dialog-body {
    display: grid;
    gap: 1rem;
}

.keyword-sphere__dialog-kicker {
    margin: 0;
    color: #0369a1;
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0;
    text-transform: uppercase;
}

.keyword-sphere__dialog-copy {
    margin: 0;
    color: #334155;
    font-size: 0.98rem;
    line-height: 1.7;
}

.keyword-sphere__dialog-action {
    justify-self: start;
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

    .keyword-sphere__dialog-action {
        width: 100%;
    }
}
</style>
