<template>
  <main>
    <h3>简易用户管理系统</h3>
    <div class="button-container">
      <button id="add" @click="handleAdd">新增用户</button>
    </div>
    <table v-if="users.length">
      <thead>
        <tr>
          <th>id</th>
          <th>用户名</th>
          <th>年龄</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.age }}</td>
          <td>
            <button id="update" @click="handleEdit(user.id)">修改</button>
            <button id="delete" @click="hanleDelete(user.id)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <h4 v-else>暂无用户</h4>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// 导入users中的方法
import { getUsersApi, deleteUserApi } from '@/api/users'

const users = ref([])
const router = useRouter()

const handleAdd = () => router.push({ name: 'addUser' })
const handleEdit = id => router.push({ name: 'editUser', params: { id } })
const hanleDelete = async id => {
  await deleteUserApi(id)
  getUsers()
}

const getUsers = async () => {
  // 发送请求
  users.value = await getUsersApi()
}
onMounted(() => getUsers())
</script>

<style scoped></style>
