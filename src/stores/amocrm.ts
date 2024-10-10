import { type Ref, ref } from 'vue'
import { type Log, type Result } from '@/types'
import { defineStore } from 'pinia'

export const useAmoCrmStore = defineStore('results', function() {
  const results: Ref<Log> = ref({ })
  const appendLog = (entity: string, newLog: Result) => {
    if (!results.value[entity]) results.value[entity] = []
    results.value[entity].push(newLog)
  }
  return { results, appendLog }
})
