<template>
  <div class="main-container">
    <div class="box">
      <BarChart />
    </div>
    <div class="box">
      <BarChart />
    </div>
    <div class="box">
      <BarChart />
    </div>
    <div class="box">
      <TopTen />
    </div>
    <div class="box">
      <v-btn color="primary">Hello, world!</v-btn>
    </div>
    <div class="box">
      <HalfDoughnut />
    </div>
  </div>
</template>

<script>
import BarChart from './components/BarChart.vue'
import TopTen from './components/TopTen.vue'
import HalfDoughnut from './components/HalfDoughnut.vue';

export default {
  name: 'App',
  components: { BarChart, TopTen, HalfDoughnut },
  data: () => ({
    //
  }),
}
</script>

<style scoped>
.main-container {
  /* width: 100%; */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border: solid 1px #ff0000;
}

.box {
  background-color: #ffffff;
  display: flex;
  width: 400px;
  /* height: 400px; */
  margin: 10px;
  box-sizing: border-box;
  border: solid 1px #ff0000;
}

@media (max-width: 768px) {
  .box {
    width: calc(50% - 20px);
  }
}

@media (max-width: 480px) {
  .box {
    width: calc(100% - 20px);
  }
}
</style>
