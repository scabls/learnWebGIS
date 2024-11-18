import { defineStore, acceptHMRUpdate } from 'pinia'

export const useLoginStore = defineStore('login', () => {
  return {}
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLoginStore, import.meta.hot))
}
