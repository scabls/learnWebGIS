<template>
  <table>
    <caption>
      购物车
    </caption>
    <thead>
      <tr>
        <th></th>
        <th>书籍名称</th>
        <th>出版日期</th>
        <th>价格</th>
        <th>购买数量</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(book, index) in books" :key="book.id">
        <td>{{ index + 1 }}</td>
        <td>{{ book.name }}</td>
        <td>{{ book.date }}</td>
        <td>{{ showPrice(book.price) }}</td>
        <td>
          <button :disabled="book.number == 1" @click="book.number--">-</button>{{ book.number }}
          <button @click="book.number++">+</button>
        </td>
        <td><button @click="books.splice(index, 1)">移除</button></td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="6" v-if="books.length != 0">总价格: {{ totalPrice }}</td>
        <td colspan="6" v-else class="empty">购物车中没有商品</td>
      </tr>
    </tfoot>
  </table>
</template>
<script setup>
import { ref, computed } from 'vue'
const books = ref([
  {
    id: 1,
    name: '算法导论',
    date: '2006-9',
    price: 85,
    number: 1,
  },
  {
    id: 2,
    name: 'Unix编程艺术',
    date: '2006-2',
    price: 59,
    number: 1,
  },
  {
    id: 3,
    name: '编程珠玑',
    date: '2008-10',
    price: 36,
    number: 1,
  },
])
const showPrice = computed(() => price => '￥' + price.toFixed(2))
const totalPrice = computed(
  () => '￥' + books.value.reduce((total, book) => total + book.price * book.number, 0).toFixed(2)
)
</script>

<style>
table {
  margin: 50px auto;
  border: 1px solid #ccc;
  border-collapse: collapse;
  color: #333;
}
table caption {
  font-size: 1.2rem;
  font-weight: bold;
}
table thead {
  background-color: #eee;
  color: #666;
}
table th,
table td {
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
}
table button {
  padding: 0.2rem 0.4rem;
}
table tfoot tr {
  text-align: right;
}
table tfoot tr .empty {
  text-align: left;
}
</style>
