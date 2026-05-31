<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    keywords: string[];
}>();

const accentClasses = [
    'text-sky-700 bg-sky-100 border-sky-200',
    'text-emerald-700 bg-emerald-100 border-emerald-200',
    'text-rose-700 bg-rose-100 border-rose-200',
    'text-amber-700 bg-amber-100 border-amber-200',
    'text-indigo-700 bg-indigo-100 border-indigo-200',
];

const positionedKeywords = computed(() => {
    const totalKeywords = props.keywords.length;
    const radius = 145;

    return props.keywords.map((keyword, index) => {
        const verticalAngle = Math.acos(-1 + (2 * index + 1) / totalKeywords);
        const horizontalAngle =
            Math.sqrt(totalKeywords * Math.PI) * verticalAngle;
        const depth = Math.cos(verticalAngle);
        const xPosition =
            radius * Math.cos(horizontalAngle) * Math.sin(verticalAngle);
        const yPosition =
            radius * Math.sin(horizontalAngle) * Math.sin(verticalAngle);
        const zPosition = radius * depth;
        const scale = 0.78 + (depth + 1) * 0.16;

        return {
            keyword,
            className: accentClasses[index % accentClasses.length],
            style: {
                transform: `translate3d(${xPosition}px, ${yPosition}px, ${zPosition}px) scale(${scale})`,
                opacity: `${0.56 + (depth + 1) * 0.22}`,
                zIndex: `${Math.round((depth + 1) * 100)}`,
            },
        };
    });
});
</script>

<template>
    <div class="keyword-sphere" aria-label="Technology keywords">
        <div class="keyword-sphere__orbit" aria-hidden="true">
            <span
                v-for="item in positionedKeywords"
                :key="item.keyword"
                :class="['keyword-sphere__tag', item.className]"
                :style="item.style"
            >
                {{ item.keyword }}
            </span>
        </div>
    </div>
</template>

<style scoped>
.keyword-sphere {
    display: grid;
    min-height: 23rem;
    place-items: center;
    overflow: hidden;
    perspective: 900px;
}

.keyword-sphere__orbit {
    position: relative;
    width: min(22rem, 80vw);
    height: min(22rem, 80vw);
    transform-style: preserve-3d;
    animation: keyword-sphere-spin 24s linear infinite;
}

.keyword-sphere__orbit::before {
    position: absolute;
    inset: 8%;
    border: 1px solid rgba(15, 23, 42, 0.08);
    border-radius: 999px;
    content: '';
}

.keyword-sphere__tag {
    position: absolute;
    top: 50%;
    left: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 4.25rem;
    min-height: 2.2rem;
    padding: 0.45rem 0.7rem;
    border-width: 1px;
    border-radius: 999px;
    box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08);
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0;
    text-align: center;
    transform-style: preserve-3d;
    translate: -50% -50%;
    white-space: nowrap;
}

@keyframes keyword-sphere-spin {
    from {
        transform: rotateY(0deg) rotateX(8deg);
    }

    to {
        transform: rotateY(360deg) rotateX(8deg);
    }
}

@media (prefers-reduced-motion: reduce) {
    .keyword-sphere__orbit {
        animation: none;
        transform: rotateY(-18deg) rotateX(8deg);
    }
}
</style>
