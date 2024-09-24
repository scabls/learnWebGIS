<template>
  <div class="container">
    <el-row :gutter="16">
      <el-col :span="8">
        <el-card>
          <div>简单卡片</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <template #header> Card name</template>
          <template #default>
            <ul>
              <li v-for="n in 5">List item {{ n }}</li>
            </ul>
          </template>
          <template #footer> Footer content</template>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="never">
          <template #header>Yummy hamburger</template>
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            style="width: 100%"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup></script>

<style scoped>
div.container {
  margin-bottom: 1rem;
}
.el-card {
  min-height: 10rem;
}
</style>
