<template>
    <div class="container">
        <div class="input">
            {{ options[selected] }}
            <img width="12" src="../assets/dropdown.svg">
        </div>
        <div class="dropdown">
            <div class="option" v-for="(option, index) in options" @click="select(index)">
                <img v-if="selected == index" height="12" src="../assets/check.svg">{{ option }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['select'])
const props = defineProps({ options: Array })

const options = ref([ 'Не выбрано', ...props.options?? [] ])
const selected = ref(0)

function select(index: number) {
    selected.value = index
    emit('select', options.value[index])
}
</script>

<style lang="scss" scoped>
$border: #cacaca;
$width: 300px;
.container {
    z-index: 2;
}
.input {
    border: 1.4px solid $border;
    border-radius: 4px;
    background: linear-gradient(to bottom, #f3f3f3, #eee);
    box-shadow: 0 1px $border;
    padding: 6px;
    box-sizing: border-box;
    width: $width;
    display: inline-block;
    font-weight: 400;
    color: #444;
    transition: all 100ms;
    display: flex;
    justify-content: space-between;

    &:hover + .dropdown {
        visibility: visible;
    }
}
.dropdown {
    $b-radius: 4px;
    display: flex;
    visibility: hidden;
    flex-direction: column;
    background-color: #fff;
    border: 1.4px solid $border;
    border-radius: 4px;
    padding-top: 4px;
    position: absolute;
    margin-top: -$b-radius;
    box-sizing: border-box;
    cursor: pointer;
    width: $width;
    z-index: -1;

    &:hover {
        visibility: visible;
    }

    .option {
        padding: 6px;
        display: flex;
        align-items: center;
        gap: 4px;

        &:hover {
            background-color: #eee;
        }

        &::selection {
            background: none;
        }
    }
}
</style>