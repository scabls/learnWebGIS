<template>
  <div class="login-page">
    <main class="login-main">
      <el-card class="login-card">
        <template #header>
          <section class="card-header">
            <h1 class="login-title">{{ status }}</h1>
          </section>
        </template>
        <el-form
          :model="loginInfo"
          :rules="formRules"
          label-width="auto"
          class="login-form"
          ref="loginFormEl"
        >
          <el-form-item label="用户名" prop="loginName">
            <el-input
              v-model.trim="loginInfo.loginName"
              placeholder="请输入用户名"
              :prefix-icon="User"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" class="last-item" prop="loginPwd">
            <el-input
              type="password"
              v-model.trim="loginInfo.loginPwd"
              placeholder="请输入密码"
              show-password
              :prefix-icon="Key"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <section class="card-footer">
            <el-button type="primary" plain class="login-btn" @click="handleSubmit">
              {{ status }}
            </el-button>
            <el-button class="reset-btn" @click="resetForm">清空</el-button>
          </section>
        </template>
      </el-card>
    </main>
  </div>
</template>

<script setup>
import { ref, useTemplateRef, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { User, Key } from '@element-plus/icons-vue'
import { adminLogin, adminRegister } from '@/api/admin'
import { ElMessageBox } from 'element-plus'

const route = useRoute()
const router = useRouter()
const loginFormEl = useTemplateRef('loginFormEl')

const loginInfo = ref({
  loginName: '',
  loginPwd: '',
})
const formRules = ref({
  loginName: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 1, max: 100, message: '用户名长度在1到100个字符', trigger: 'blur' },
  ],
  loginPwd: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 1, max: 100, message: '密码长度在1到100个字符', trigger: 'blur' },
  ],
})

const status = computed(() => {
  switch (route.name) {
    case 'login':
      return '登录'
    case 'register':
      return '注册'
    default:
      return ''
  }
})

const handleSubmit = () => {
  if (!loginFormEl.value) return
  loginFormEl.value.validate((valid) => {
    if (valid) {
      switch (route.name) {
        case 'login': {
          // TODO: 登录逻辑
          handleLogin()
          break
        }
        case 'register': {
          // TODO: 注册逻辑
          handleRegister()
          break
        }
        default:
          break
      }
    } else {
      ElMessageBox.alert(`${status.value}失败，请检查输入信息`, {
        confirmButtonText: '确定',
        type: 'error',
      })
    }
  })
}
const handleLogin = async () => {
  try {
    const loginName = await adminLogin(loginInfo.value)
    router.push({ name: 'home', params: { loginName } })
  } catch (error) {
    switch (error.status) {
      case 400: {
        ElMessageBox.alert('用户名或密码错误', {
          confirmButtonText: '确定',
          type: 'error',
        })
        break
      }
      case 404: {
        ElMessageBox.confirm('用户名未注册,是否跳转到注册页面', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          callback: (action) => {
            switch (action) {
              case 'confirm':
                router.push({ name: 'register' })
                break
            }
          },
        })
        break
      }
    }
  }
}
const handleRegister = async () => {
  try {
    const res = await adminRegister(loginInfo.value)
    console.log(res)
    router.push({ name: 'login' })
  } catch (error) {
    switch (error.status) {
      case 401: {
        ElMessageBox.confirm('注册失败,用户名已存在,是否跳转到登录页面', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          callback: (action) => {
            switch (action) {
              case 'confirm':
                router.push({ name: 'login' })
                break
            }
          },
        })
        break
      }
    }
  }
}
const resetForm = () => {
  if (!loginFormEl.value) return
  loginFormEl.value.resetFields()
}
</script>

<style lang="scss" scoped>
.login-page {
  .login-main {
    position: relative;
    top: 4rem;
    width: 22rem;
    margin: 0rem auto;
    .el-card {
      .card-header {
        .login-title {
          text-align: center;
        }
      }
      .el-form {
        .last-item {
          margin-bottom: 0;
        }
      }
      .card-footer {
        text-align: center;
      }
    }
  }
}
</style>
