<template>
  <div class="doughnut-chart-container">
    <h3>Donut Chart</h3>
    <Bar width="380" type="doughnut" :options="chartOptions" :data="chartData" />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend); // Register necessary Chart.js components

export default {
  name: 'DoughnutChart', // Descriptive component name
  components: { Bar },
  methods: {
    async fetchBranchListByCloseStatus(status) {
      await fetch(`http://localhost:3000/api/branch/close/${status}`)
        .then(response => response.json())
        .then(data => {
          if (status === '1') {
            this.list_close_branch = data;
            this.count_list_close_branch = this.list_close_branch.length;
            console.log('ice', this.count_list_close_branch)
          } else if (status === '0') {
            this.list_open_branch = data;
            this.count_list_open_branch = this.list_open_branch.length;
            console.log('ice No', this.count_list_open_branch)
          }
        });
    },
  },
  async mounted() {
    await this.fetchBranchListByCloseStatus("1")
    await this.fetchBranchListByCloseStatus("0");

  },
  async created() {
    console.log("created")
    await this.fetchBranchListByCloseStatus("1")
    await this.fetchBranchListByCloseStatus("0");
  },
  data() {

    return {
      list_open_branch: [],
      list_close_branch: [],
      count_list_open_branch: 0,
      count_list_close_branch: 0,
      chartOptions: {
        responsive: false, // Ensure responsiveness across devices
        maintainAspectRatio: false, // Prevent unwanted stretching
        circumference: 180,
        rotation: -90,
        aspectRatio: 2,
        plugins: {
          legend: {
            display: true, // Display the legend
            position: 'bottom', // Place legend at the bottom
          },
        },
      },
      chartData: {
        labels: ['จำนวนสาขาที่ปิดบัญชี', 'จำนวนสาขาที่ยังไม่ปิดบัญชี'],
        datasets: [
          {
            label: 'My Dataset',
            data: [50, ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
    };
  },
};
</script>

<style scoped>
.doughnut-chart-container {
  text-align: center;
  /* Center the chart and heading */
}
</style>
