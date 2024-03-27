<template>
  <!-- <Bar id="my-chart-id" :options="chartOptions" :data="chartData" /> -->
  <div class="container">
    <Bar v-if="loaded" :data="chartData" />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
const api = 'http://localhost:3000/api/baac_division'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data: () => ({
    loaded: false,
    chartData: null
  }),
  async mounted() {
    this.loaded = false
    this.fetchData();
    // this.intervalId = setInterval(this.fetchData, 1 * 1 * 1000); // 5 minutes in milliseconds

    try {
      const resData = await fetch(api).then(response => response.json());

      // Transform the data
      const labels = resData.map(item => item.sname_div);
      // TODO: Change this to the correct data
      const data = resData.map(item => item.total_branch);

      this.chartData = {
        labels,
        datasets: [
          {
            label: 'ร้อยละของสนจ.ที่ปิดบัญชี',
            data,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
          },
        ],
      };

      this.loaded = true;
    } catch (e) {
      console.error(e)
    }
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
  methods: {
    async fetchData() {
      this.loaded = false;

      try {
        const resData = await fetch(api).then(response => response.json());

        // Transform the data
        const labels = resData.map(item => item.sname_div);
        const data = resData.map(item => item.total_branch);

        this.chartData = {
          labels,
          datasets: [
            {
              label: 'ร้อยละของสนจ.ที่ปิดบัญชี',
              data,
              backgroundColor: 'rgba(54, 162, 235, 0.5)', // Example background color
            },
          ],
        };

        this.loaded = true;
      } catch (e) {
        console.error(e);
      }
    },
  },

}
</script>