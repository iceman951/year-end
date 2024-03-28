<template>
  <div class="top-10-container">
    <h3>ผลการปิดงานประจำวัน 10 อันดับแรก</h3>
    <ul class="rank-list">
      
      <p v-if="top10.length === 0" style="margin: 5%; color: brown;">
        ยังไม่มีสาขาที่ปิดบัญชีในวันนี้
      </p>
      <li v-for="(item, index) in top10" :key="item.brn_code">
        {{ index + 1 }}. {{ item.brn_name }} - {{ item.prv }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Styles for the top 10 ranks component */
.top-10-container {
  /* border: 1px solid #ddd; */
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
  margin-top: 2px;
  margin-bottom: 5px;
  font-size: 14px;
}
</style>

<script>
// const api = `${import.meta.env.VITE_API_URL}/api/top10`
export default {
  name: 'Topten',
  data() {
    return {
      top10: [],
    };
  },
  async mounted() {
    // Fetch the data from the API
    await fetch(`/api/top10`)
      .then(response => {
        return response.json();
      }).then(data => {
        this.top10 = data;
      });
  },
};
</script>