<template>
  <main class="search">
    <div class="wrap">
      <el-table :data="songs">
        <el-table-column label="歌曲名称" prop="name"></el-table-column>
        <el-table-column label="歌手" prop="artist"></el-table-column>
        <el-table-column label="专辑" prop="album"></el-table-column>
        <el-table-column label="歌曲时长" prop="duration"></el-table-column>
      </el-table>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()

const songs = ref([])
const keywords = computed(() => route.query.keywords)

const fetchSongs = async () => {
  try {
    const { data } = await axios.get(`http://localhost:4001/search?keywords=${keywords.value}`)
    songs.value = data.result.songs.map(song => ({
      name: song.name,
      artist: song.artists[0].name,
      album: song.album.name,
      duration: formatTime(song.duration),
    }))
  } catch (error) {
    console.log(error)
  }
}
const formatTime = time => {
  let second = Math.floor(time / 1000) % 60
  second = second > 9 ? second : '0' + second
  let minute = Math.floor(time / (1000 * 60))
  minute = minute > 9 ? minute : '0' + minute
  return `${minute}:${second}`
}
watch(keywords, () => fetchSongs())
onMounted(() => fetchSongs())
</script>

<style lang="scss" scoped>
.search {
  background-color: #eee;
}
:deep(.cell) {
  text-align: center;
  white-space: nowrap;
}
</style>
