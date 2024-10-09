<template>
  <section class="third-com">
    <div class="left">
      <el-card shadow="hover">
        <template #header>
          <h2 class="css-2">关键词搜索</h2>
        </template>
        <template #default>
          <div class="card-content">
            <div class="charts">
              <div class="left-chart">
                <div class="title">搜索用户量</div>
                <div class="value">{{ userNum }}</div>
                <v-chart :option="userOption"></v-chart>
              </div>
              <div class="right-chart">
                <div class="title">搜索量</div>
                <div class="value">{{ searchNum }}</div>
                <v-chart :option="searchOption"></v-chart>
              </div>
            </div>
            <div class="table">
              <el-table :data="pageData">
                <el-table-column label="排名" prop="rank" width="60"></el-table-column>
                <el-table-column label="关键词" prop="keyWord" align="center"></el-table-column>
                <el-table-column
                  label="总搜索量"
                  prop="totalSearch"
                  align="center"
                ></el-table-column>
                <el-table-column
                  label="搜索用户数"
                  prop="totalUser"
                  align="center"
                ></el-table-column>
              </el-table>
              <el-pagination
                background
                layout="prev, pager, next"
                :page-size="6"
                :total="tableData.length"
                v-model:current-page="currentPage"
              />
            </div>
          </div>
        </template>
      </el-card>
    </div>
    <div class="right">
      <el-card shadow="hover">
        <template #header>
          <h2 class="css-2">分类销售排行</h2>
          <el-radio-group v-model="pieDataType" size="large" @change="handleChange">
            <el-radio-button label="品类" value="category"></el-radio-button>
            <el-radio-button label="商品" value="product"></el-radio-button>
          </el-radio-group>
        </template>
        <template #default>
          <v-chart :option="pieOption"></v-chart>
        </template>
      </el-card>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getKeyWordsData, getCategoryData } from '@/api'
const tableData = ref([])
const pieData = ref({})
const userOption = ref({})
const searchOption = ref({})
const currentPage = ref(1)
const pieOption = ref({})
const pieDataType = ref('category')

const userNum = computed(() => tableData.value.reduce((acc, cur) => acc + cur.totalUser, 0))
const searchNum = computed(() => tableData.value.reduce((acc, cur) => acc + cur.totalSearch, 0))
const pageData = computed(() =>
  tableData.value.slice((currentPage.value - 1) * 6, currentPage.value * 6)
)

const renderLineChart = (option, data) => {
  option.value = {
    xAxis: {
      show: false,
      type: 'category',
      boundaryGap: false,
    },

    yAxis: {
      show: false,
    },
    grid: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    series: [
      {
        type: 'line',
        smooth: true,
        showSymbol: false,
        areaStyle: {
          color: 'skyblue',
        },
        data: data,
      },
    ],
  }
}
const renderPieChart = (option, data) => {
  const _data = data.map(item => ({
    ...item,
    name: item.title + '|' + item.value,
  }))
  const total = data.reduce((acc, cur) => acc + cur.value, 0)
  option.value = {
    title: [
      {
        text: '品类分布',
        textStyle: {
          fontSize: 14,
          color: '#666',
        },
      },
      {
        text: '累计订单量',
        subtext: total,
        textAlign: 'center',
        x: '40%',
        y: '45%',
        textStyle: {
          fontSize: 14,
          color: '#999',
        },
        subtextStyle: {
          fontSize: 28,
          color: '#333',
        },
      },
    ],
    tooltip: {
      formatter(params) {
        // console.log(params)
        // seriesName要求series中必须有name属性
        const res = `
          ${params.seriesName}<br>
          ${params.marker} ${params.data.title} <br>
          ${params.marker} 销售额: ${params.data.value} <br>
        `
        return res
      },
    },
    legend: {
      // legend要求series的data数组中对象必须有name属性
      orient: 'vertical',
      left: '80%',
      top: 'top',
      textStyle: {
        color: '#888',
      },
    },
    series: {
      type: 'pie',
      name: '品类分布',
      data: _data,
      radius: ['45%', '60%'], // 饼图的半径[内半径，外半径]
      center: ['40%', '50%'], // 饼图的中心坐标
      label: {
        position: 'outside',
        formatter(params) {
          // console.log(params)
          return params.data.title
        },
      },
      itemStyle: {
        borderWidth: 8,
        borderColor: '#fff',
      },
    },
  }
}
const handleChange = value => {
  switch (value) {
    case 'category':
      renderPieChart(pieOption, pieData.value.data1)
      break
    case 'product':
      renderPieChart(pieOption, pieData.value.data2)
      break
  }
}
onMounted(async () => {
  tableData.value = await getKeyWordsData()
  pieData.value = await getCategoryData()
  const userData = computed(() =>
    tableData.value
      .map(item => item.totalUser)
      .slice(0, 10)
      .reverse()
  )
  const searchData = computed(() =>
    tableData.value
      .map(item => item.totalSearch)
      .slice(0, 10)
      .reverse()
  )
  renderLineChart(userOption, userData.value)
  renderLineChart(searchOption, searchData.value)
  renderPieChart(pieOption, pieData.value.data1)
})
</script>

<style lang="scss" scoped>
.third-com {
  display: flex;
  gap: 20px;
  margin-top: 20px;
  .left {
    flex: 1;
    .css-2 {
      font-weight: 600;
    }
    .card-content {
      padding: 20px;
      .charts {
        display: flex;
        gap: 20px;
        .left-chart,
        .right-chart {
          flex: 1;
          .title {
            font-size: 14px;
            color: #727171;
          }
          .value {
            font-size: 20px;
            font-weight: 600;
            margin-top: 10px;
          }
          .echarts {
            height: 50px;
          }
        }
      }
      .table {
        .el-pagination {
          margin-top: 16px;
          display: flex;
          justify-content: end;
        }
      }
    }
  }
  .right {
    flex: 1;
    :deep(.el-card__header) {
      position: relative;
      .css-2 {
        font-weight: 600;
      }
      .el-radio-group {
        position: absolute;
        top: 6px;
        right: 20px;
      }
    }
    :deep(.el-card__body) {
      height: 500.6px;
    }
  }
}
</style>
