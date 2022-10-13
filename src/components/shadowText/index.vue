<template>
    <div class="textOuter" :data-text="text">{{text}}</div>
</template>

<script setup lang='ts'>

const props = defineProps<{
    text: string
}>()

</script>

<style lang="less" scoped>
.textOuter {
    color: var(--font-sub-color);
    width: 100%;
    text-align: center;
    font-size: 32px;
    position: relative;
    line-height: 64px;
    font-weight: 700;
    z-index: 0;
    margin: 40px 0;

    &::after {
        content: attr(data-text);
        display: block;
        text-align: center;
        font-size: 64px;
        line-height: 64px;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        opacity: .2;
        color: var(--font-sub-color);
        font-weight: 700;
        z-index: -1;
    }
}
</style>
