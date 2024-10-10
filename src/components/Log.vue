<template>
    <div class="log">
        {{ data.name ?? 'Без Имени' }}
        <span>ID: {{ data.id }}</span>
    </div>
</template>

<script setup lang="ts">
defineProps(['data'])
</script>

<style lang="scss" scoped>
.log {
    padding: 10px 20px;
    font-size: 20px;
    border: 1.4px solid #ddd;
    border-radius: 4px;
    background: linear-gradient(to bottom, #fff, #eee);
    display: flex;
    gap: 40px;

    span {
        font-size: 15px;
    }
}
</style>