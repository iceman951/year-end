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
  data() {
    return {
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
        labels: ['Data 1', 'Data 2'],
        datasets: [
          {
            label: 'My Dataset',
            data: [44, 55],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1, // Adjust border width as needed
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
