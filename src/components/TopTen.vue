<template>
  <div class="top-10-container">
    <h2>Leaderboard</h2>
    <ul class="rank-list">
      <li v-for="item in top10" :key="item.brn_code">
        {{ item.brn_name }} - {{ item.prv }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Styles for the top 10 ranks component */
.top-10-container {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.rank-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.rank-list li {
  margin-bottom: 5px;
  font-weight: bold;
}
</style>

<script>
const api = 'http://localhost:3000/api/top10'
export default {
  name: 'Topten',
  // components: { Topten },
  data() {
    return {
      top10: [],
    };
  },
  async mounted() {
    // Fetch the data from the API
    await fetch(api)
      .then(response => {
        return response.json();
      }).then(data => {
        this.top10 = data;
      });
  },
};
</script>