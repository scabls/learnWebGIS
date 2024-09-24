<template>
  <div class="container">
    <el-form :model="user" :rules="rules">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="user.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          type="password"
          v-model="user.password"
          placeholder="请输入密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="user.gender">
          <el-radio value="male">男</el-radio>
          <el-radio value="female">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="爱好">
        <el-checkbox-group v-model="user.hobbies">
          <el-checkbox label="吃饭" value="eat" />
          <el-checkbox label="睡觉" value="sleep" />
          <el-checkbox label="打豆豆" value="beatBeans" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="城市">
        <el-select v-model="user.city">
          <el-option label="武汉" value="wuhan"></el-option>
          <el-option label="北京" value="beijing"></el-option>
          <el-option label="上海" value="shanghai"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="签名">
        <el-input v-model="user.sign" placeholder="请输入签名" type="textarea" autosize></el-input
      ></el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const user = ref({
  name: '',
  password: '',
  gender: 'male',
  hobbies: ['eat', 'sleep', 'beatBeans'],
  city: 'wuhan',
  sign: 'I love coding',
})
const rules = ref({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
})
</script>

<style scoped>
div.container {
  margin-bottom: 1rem;
}
.el-form {
  width: 30rem;
  margin: 0 auto;
}
</style>
