<template>
    <div class="button" @click="active? $emit('click') : {}" :class="{ 'active' : active }">
        {{ pending ? null : text }}
        <img id="preloader" v-show="pending" src="../assets/preloader.svg">
    </div>
</template>

<script setup lang="ts">
defineEmits(['click'])
defineProps({
    text: String,
    active: { type: Boolean, default: false },
    pending: { type: Boolean, default: false }
})
</script>

<style lang="scss" scoped>
$border: #cacaca;
.button {
    border: 1.4px solid $border;
    border-radius: 4px;
    background: #fbfbfb;
    padding: 6px 10px;
    display: flex;
    align-items: center;
    font-weight: 800;
    font-size: 13px;
    color: #444;
    transition: all 100ms;
    cursor: default;
    
    &::selection {
        background: none;
    }
}
.active {
    color: #fff;
    background: #4491e4;
    border-color: #4388d2;
    cursor: pointer;

    &:hover {
        opacity: 0.9;
    }
}
#preloader {
    animation: rotate 5s linear infinite;
    margin: auto;
}
@keyframes rotate {
  from { transform: rotate(0deg) }
  to { transform: rotate(360deg) }
}
</style>