<template>
  <section class="second-com">
    <el-card shadow="hover">
      <template #header>
        <el-menu mode="horizontal" :default-active="activeIndex" @select="handleSelect">
          <el-menu-item index="1">销售额</el-menu-item>
          <el-menu-item index="2">访问量</el-menu-item>
        </el-menu>
        <div class="right">
          <el-radio-group v-model="radio" size="large">
            <el-radio-button label="今日" value="today" />
            <el-radio-button label="本周" value="this-week" />
            <el-radio-button label="本月" value="this-month" />
            <el-radio-button label="本年" value="this-year" />
          </el-radio-group>
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :shortcuts="shortcuts"
            size="large"
          />
        </div>
      </template>
      <template #default>
        <div class="card-content">
          <div class="left-chart">
            <v-chart :option="option" />
          </div>
          <div class="right-list">
            <div class="title">排行榜</div>
            <div class="list-item" v-for="item in rankList" :key="item.no">
              <span :class="item.no <= 3 ? 'high-light' : ''">{{ item.no }}</span>
              <span>{{ item.title }}</span>
              <span>{{ item.sales }}</span>
            </div>
          </div>
        </div>
      </template>
    </el-card>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getSaleData } from '@/api'

const activeIndex = ref('1')
const radio = ref('today')
const dateRange = ref('')
const option = ref({})
const saleData = ref({})
const rankList = ref([])
const shortcuts = [
  {
    text: '最近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '最近一个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: '最近三个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]
const renderChart = (v1, v2) => {
  option.value = {
    title: {
      text: '年度销售额',
      textStyle: {
        fontSize: 14,
      },
    },
    grid: {
      left: 40,
    },
    xAxis: {
      type: 'category',
      data: v1,
      // x轴的刻度对齐label标签
      axisTick: {
        alignWithLabel: true,
      },
    },
    yAxis: {
      type: 'value',
      // y轴的刻度线设置为虚线
      splitLine: {
        lineStyle: {
          type: 'dotted',
        },
      },
    },
    series: {
      type: 'bar',
      data: v2,
      barWidth: '40%',
      // item的颜色
      itemStyle: {
        color: 'skyblue',
      },
    },
  }
}
const handleSelect = index => {
  switch (index) {
    case '1':
      renderChart(saleData.value.saleFulleYearAxis, saleData.value.saleFulleYear)
      rankList.value = saleData.value.saleRank
      break
    case '2':
      renderChart(saleData.value.visitFullYeadAxis, saleData.value.visitFullYear)
      rankList.value = saleData.value.visitRank
      break
  }
}
onMounted(async () => {
  saleData.value = await getSaleData()
  renderChart(saleData.value.saleFulleYearAxis, saleData.value.saleFulleYear)
  rankList.value = saleData.value.saleRank
})
</script>

<style lang="scss" scoped>
.second-com {
  position: relative;
  margin-top: 20px;
  :deep(.el-card__header) {
    padding: 0;
    border-bottom: none;
    .el-menu {
      padding-left: 50px;
    }
    .right {
      position: absolute;
      top: 11px;
      right: 2%;
      font-size: 0;
      .el-radio-group {
        margin-right: 20px;
      }
    }
  }
  .card-content {
    display: flex;
    .left-chart {
      flex: 7;
      height: 434px;
    }
    .right-list {
      flex: 3;
      .title {
        margin-bottom: 10px;
        font-size: 14px;
        font-weight: 600;
      }
      .list-item {
        margin: 20px 0;
        display: flex;
        align-items: center;
        gap: 20px;
        span {
          font-size: 14px;
          color: #464545;
          &:first-child {
            width: 20px;
            height: 20px;
            border-radius: 10px;
            text-align: center;
            line-height: 20px;
          }
          &:nth-child(2) {
            flex: 1;
          }
          &.high-light {
            background-color: #09b3f7;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
