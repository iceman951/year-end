<template>

  <v-toolbar class="navbar">
    <v-spacer></v-spacer>
    <v-toolbar-title>รายงานผลการปิดบัญชีประจำปี 2566</v-toolbar-title>
    <v-spacer></v-spacer>
  </v-toolbar>

  <div class="main-container">
    <div class="box">
      <div id="divisionChartId">
        <apexchart type="bar" height="500" width="435" :options="divisionChartOptions" :series="divisionSeries">
        </apexchart>
      </div>
    </div>
    <div class="box">
      <div id="provChartId">
        <apexchart type="bar" height="500" width="435" :options="provChartOptions" :series="provSeries"></apexchart>
      </div>
    </div>
    <div class="box">
      <div id="provChartId">
        <apexchart type="bar" height="500" width="435" :options="branchChartOptions" :series="branchSeries"></apexchart>
      </div>
    </div>
    <div class="box" style="display: block; padding: 3%">
      <h4 class="text-left">ฝ่ายกิจการสาขา</h4>
      <v-select label="Select" v-model="selectedDivision" :items="sname_divs"></v-select>
      <h4 class="text-left">สนจ.</h4>
      <v-select label="Select" v-model="selectedProv" :items="prov_names"></v-select>
    </div>
    <div class="box">
      <TopTen />
    </div>
    <div class="box" style="justify-content: center">
      <v-card title="จำนวนสาขาที่ปิดบัญชี">
        <apexchart type="donut" :options="semiDonutchartOptions" :series="semiDonutSeries"></apexchart>
        <div style="margin: 2%;">
          <p>ปิดบัญชีแล้วจำนวน {{ list_close_branch.length }} สาขา</p>
          <p>ยังไม่ปิดบัญชีจำนวน {{ list_open_branch.length }} สาขา</p>
          <p style="opacity: 0;">_____________________________________________________</p>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import TopTen from './components/TopTen.vue'
import VueApexCharts from 'apexcharts'

export default {
  name: 'App',
  components: { TopTen, VueApexCharts, },
  data: () => ({

    semiDonutSeries: [1, 1],
    semiDonutchartOptions: {
      chart: {
        type: 'donut',
      },
      labels: ['ปิดแล้ว', 'ยังไม่ปิด'],
      colors: ['#42b883', '#E91E63'],
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10
        }
      },
      grid: {
        padding: {
          bottom: -80
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },

    // labels ========================
    //initial from api
    top10: [],
    sname_divs: [],

    baac_division: [],
    baac_prov: [],
    baac_branch: [],
    list_close_branch: [],
    list_open_branch: [],

    // provice
    prov_codes: [],
    prov_names: [],

    // branch
    branch_codes: [],
    branch_names: [],

    // dropdownList ====================
    selectedDivision: null,
    selectedProv: null,

    // ===============================
    // bar chart ฝ่าย
    divisionChartOptions: null,
    divisionSeries: [],

    // bar chart สนจ
    provChartOptions: null,
    provSeries: [],

    // bar chart สาขา
    branchChartOptions: null,
    branchSeries: [],

  }),
  methods: {
    async fetchBaacDivision() {
      await fetch(`http://localhost:3000/api/baac_division`)
        .then(response => response.json())
        .then(data => {
          this.sname_divs = data.map(item => item.sname_div);
          this.baac_division = data;
        });
    },
    async fetchBaacProv(id_div) {
      await fetch(`http://localhost:3000/api/baac_prov/${id_div}`)
        .then(response => response.json())
        .then(data => {
          this.prov_codes = data.map(item => item.prov_code);
          this.prov_names = data.map(item => item.prov_name);
          this.baac_prov = data;
        });
    },
    async fetchBaacBranch(prov_code) {
      await fetch(`http://localhost:3000/api/baac_branch/${prov_code}`)
        .then(response => response.json())
        .then(data => {
          this.branch_codes = data.map(item => item.branch_code);
          this.branch_names = data.map(item => item.brn_name);
          this.baac_branch = data;
        });
    },
    async fetchBranchListByCloseStatus(status) {
      await fetch(`http://localhost:3000/api/branch/close/${status}`)
        .then(response => response.json())
        .then(data => {
          if (status === '1') {
            this.list_close_branch = data;
            this.semiDonutSeries[0] = this.list_close_branch.length;
            // this.semiDonutchartOptions.labels[0] = `ปิดแล้ว ${this.list_close_branch.length} สาขา`;
          } else if (status === '0') {
            this.list_open_branch = data;
            this.semiDonutSeries[1] = this.list_open_branch.length;
            // this.semiDonutchartOptions.labels[1] = `ยังไม่ปิด ${this.list_open_branch.length} สาขา`;
          }
        });
    },
    updateProvChart() {
      this.provChartOptions = {
        colors: ['#42b883', '#E91E63'],
        chart: {
          type: 'bar',
          height: 435,
          stacked: true,
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              total: {
                enabled: true,
                offsetX: 0,
                style: {
                  fontSize: '13px',
                  fontWeight: 900,
                }
              }
            }
          },
        },
        stroke: {
          width: 1,
          colors: ['#fff']
        },
        title: {
          text: 'สำนักงานจังหวัด'
        },
        xaxis: {
          categories: this.prov_names,
          labels: {
            formatter: val => {
              return val
            }
          }
        },
        yaxis: {
          title: {
            text: undefined
          },
        },
        tooltip: {
          y: {
            formatter: val => {
              return val
            }
          }
        },
        fill: {
          opacity: 1
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
          offsetX: 40
        }
      }
      this.provSeries = [{
        name: 'ปิดแล้ว',
        data: this.baac_prov.map(item => item.close_branch),
      }, {
        name: 'ยังไม่ปิด',
        data: this.baac_prov.map(item => item.total - item.close_branch),
      }];
    },
    updateBranch() {
      this.branchChartOptions = {
        colors: ['#42b883', '#E91E63'],
        chart: {
          type: 'bar',
          height: 435,
          stacked: true,
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              enabled: false,
              total: {
                enabled: false,
                offsetX: 0,
                style: {
                  fontSize: '13px',
                  fontWeight: 900,
                }
              }
            }
          },
        },
        stroke: {
          width: 1,
          colors: ['#fff']
        },
        title: {
          text: 'สาขา'
        },
        xaxis: {
          categories: this.branch_names,
          labels: {
            show: false,
          }
        },
        yaxis: {
          title: {
            text: undefined
          },
        },
        tooltip: {
          y: {
            formatter: val => {
              return val
            }
          }
        },
        fill: {
          opacity: 1
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
          offsetX: 40
        }
      }
      this.branchSeries = [{
        name: 'ปิดแล้ว',
        data: this.baac_branch.map(item => item.status == "YES" ? 1 : 0),
      }, {
        name: 'ยังไม่ปิด',
        data: this.baac_branch.map(item => item.status == "NO" ? 1 : 0),
      }];
    }
  },
  async created() {

    // division chart
    await this.fetchBaacDivision();
    await this.fetchBranchListByCloseStatus("1");
    await this.fetchBranchListByCloseStatus("0");

    this.divisionChartOptions = {
      colors: ['#42b883', '#E91E63'],
      chart: {
        type: 'bar',
        height: 435,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            total: {
              enabled: true,
              offsetX: 0,
              style: {
                fontSize: '13px',
                fontWeight: 900,
              }
            }
          }
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      title: {
        text: 'ฝ่ายกิจการสาขา'
      },
      xaxis: {
        categories: this.sname_divs,
        labels: {
          formatter: val => {
            return val
          }
        }
      },
      yaxis: {
        title: {
          text: undefined
        },
      },
      tooltip: {
        y: {
          formatter: val => {
            return val
          }
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40
      }
    }
    this.divisionSeries = [{
      name: 'ปิดแล้ว',
      data: this.baac_division.map(item => item.close_branch),
    }, {
      name: 'ยังไม่ปิด',
      data: this.baac_division.map(item => item.total_branch - item.close_branch),
    }];

    this.provChartOptions = {
      colors: ['#42b883', '#E91E63'],
      chart: {
        type: 'bar',
        height: 435,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            total: {
              enabled: true,
              offsetX: 0,
              style: {
                fontSize: '13px',
                fontWeight: 900,
              }
            }
          }
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      title: {
        text: 'สนจ.'
      },
      xaxis: {
        categories: [],
        labels: {
          formatter: val => {
            return val
          }
        }
      },
      yaxis: {
        title: {
          text: undefined
        },
      },
      tooltip: {
        y: {
          formatter: val => {
            return val
          }
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40
      }
    }
    this.provSeries = [{
      name: 'ปิดแล้ว',
      data: [],
    }, {
      name: 'ยังไม่ปิด',
      data: [],
    }];

    this.branchChartOptions = {
      colors: ['#42b883', '#E91E63'],
      chart: {
        type: 'bar',
        height: 435,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            total: {
              enabled: true,
              offsetX: 0,
              style: {
                fontSize: '13px',
                fontWeight: 900,
              }
            }
          }
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      title: {
        text: 'สาขา'
      },
      xaxis: {
        categories: [],
        labels: {
          formatter: val => {
            return val
          }
        }
      },
      yaxis: {
        title: {
          text: undefined
        },
      },
      tooltip: {
        y: {
          formatter: val => {
            return val
          }
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40
      }
    }
    this.branchSeries = [{
      name: 'ปิดแล้ว',
      data: [],
    }, {
      name: 'ยังไม่ปิด',
      data: [],
    }];


  },
  watch: {
    async selectedDivision(newValue) {
      if (newValue) {
        // find id_div from sname_div
        const id_div = this.baac_division.find(item => item.sname_div === newValue).id_div;
        await this.fetchBaacProv(id_div);
        this.selectedProv = null;
        await this.updateProvChart();
        this.branchSeries = []
        this.branchChartOptions = {
          colors: ['#42b883', '#E91E63'],
          chart: {
            type: 'bar',
            height: 435,
            stacked: true,
          },
          plotOptions: {
            bar: {
              horizontal: true,
              dataLabels: {
                enabled: false,
                total: {
                  enabled: false,
                  offsetX: 0,
                  style: {
                    fontSize: '13px',
                    fontWeight: 900,
                  }
                }
              }
            },
          },
          stroke: {
            width: 1,
            colors: ['#fff']
          },
          title: {
            text: 'สาขา'
          },
          xaxis: {
            categories: [],
            // labels: {
            //   show: false,
            // }
          },
          yaxis: {
            title: {
              text: undefined
            },
          },
          tooltip: {
            y: {
              formatter: val => {
                return val
              }
            }
          },
          fill: {
            opacity: 1
          },
          legend: {
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 40
          }
        }

      }
    },
    async selectedProv(newValue) {
      if (newValue) {
        const prov_code = this.baac_prov.find(item => item.prov_name === newValue).prov_code;
        await this.fetchBaacBranch(prov_code);
        await this.updateBranch();
      }
    }
  }
}

</script>

<style scoped>
.navbar {
  background: linear-gradient(to top, #0ba360 0%, #3cba92 100%);
}

.main-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.box {
  background-color: #ffffff;
  display: flex;
  width: 31%;
  margin: 10px;
  box-sizing: border-box;
  /* justify-content: center; */
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
