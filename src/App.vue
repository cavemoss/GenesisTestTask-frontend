<script setup lang="ts">
import { type Ref, ref, } from 'vue'
import axios from 'axios'

import { useAmoCrmStore } from '@/stores/amocrm'
import Button from '@/components/Button.vue'
import Dropdown from '@/components/Dropdown.vue'
import Log from '@/components/Log.vue'

const defaults = [
    { 'name' : 'Default Name' }
]
const options: { [key: string]: string } = {
    'Сделка' : 'leads',
    'Контакт' : 'contacts',
    'Компания' : 'companies'
}
const selected: Ref<string> = ref('')
const pending: Ref<boolean> = ref(false)
const pendingToggle = () => pending.value = !pending.value
const amoCrmStore = useAmoCrmStore()

async function handleSubmit() {
    const payload = {
        'entity' : options[selected.value],
        'data' : defaults,
    }

    pendingToggle()
    try 
    {
        const response = await axios.post('http://localhost:8000/amocrm/create', payload)
        if (response.status !== 201) throw 'Error when creating entity'

        var entity = Object.keys(response.data._embedded)[0]
        var result = response.data._embedded[entity][0]
        amoCrmStore.appendLog(entity, { id: result.id, name: result.name })
    }
    catch (error) { console.log(error) }
    pendingToggle()
}

</script>

<template>
    <div class="controls">
        <Dropdown 
        :options="Object.keys(options)" 
        @select="(value: string) => selected = value"
        />
        <Button 
        text="Создать" 
        :active="selected !== '' && selected !== 'Не выбрано'"
        :pending="pending"
        @click="handleSubmit"
        />
    </div>
    <div class="results">
        <div v-for="entity in Object.keys(amoCrmStore.results)" class="entity">
            <span class="title">{{ entity }}</span>
            <Log v-for="log in amoCrmStore.results[entity]" :data="log" />
        </div>
    </div>
</template>

<style lang="scss">
#app {
    font-family: "Noto Sans", sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    color: #444;
}
.controls {
    display: flex;
    height: min-content;
    gap: 10px
}
.results {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;

    .entity {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
}
</style>
