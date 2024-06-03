<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';
  import { modeCurrent } from '@skeletonlabs/skeleton';

  import type { ChartTemplate } from "../../routes/dashboard/metric.dto";

  export let dataChart : ChartTemplate;

  let chart : Chart;
  let canvas : any;
  function dataSetsGenerator(dataChart : ChartTemplate) : any{
    if(dataChart.type === 'line') {
      return {
        label : dataChart.title,
        data : dataChart.data,
        fill : true,
        backgroundColor: ['rgba(232, 80, 47,0.1)'],
        borderColor: ['rgba(232, 80, 47,1)'],
        borderWidth: 2
      }
    }
    return {
      label : dataChart.title,
      data : dataChart.data,
      borderColor: [   
      'rgba(232, 80, 47, 1)', // couleur primaire 500
      'rgba(254, 225, 199, 1)', // couleur secondaire 500
      'rgba(46, 14, 2, 1)', // couleur tertiaire 500
      'rgba(119, 151, 172, 1)', // couleur succès 500
      'rgba(102, 99, 112, 1)', // couleur avertissement 500
      'rgba(12, 12, 12, 1)', // couleur erreur 500
      'rgba(39, 39, 42, 1)' // couleur surface 500],
      ],
      backgroundColor: dataChart.color ? dataChart.color : [
      'rgba(232, 80, 47, 0.9)', // couleur primaire 500
      'rgba(254, 225, 199, 0.9)', // couleur secondaire 500
      'rgba(46, 14, 2, 0.9)', // couleur tertiaire 500
      'rgba(119, 151, 172, 0.9)', // couleur succès 500
      'rgba(102, 99, 112, 0.9)', // couleur avertissement 500
      'rgba(12, 12, 12, 0.9)', // couleur erreur 500
      'rgba(39, 39, 42, 0.9)' // couleur surface 500
      ],
    }
  }

  onMount(() => {
    chart = new Chart(canvas, {
      type : dataChart.type,
      data : {
        labels : dataChart.labels,
        datasets : [dataSetsGenerator(dataChart)]
      },
      options : {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: dataChart.type == 'doughnut' ? 'right' : 'top',
            labels: {
              color: modeCurrent ? 'white' : 'black',
              font: {
                size: 14,
                family: "'system-ui', 'arial', 'sans-serif'",
                weight: 'bold'
              },
            }
          }
        },
        scales: dataChart.type != 'line' ? {} : {
          y: {
            beginAtZero: true,
            ticks: {
              color: modeCurrent ? 'white' : 'black',
            }
          },
          x: {
            ticks: {
              color: modeCurrent ? 'white' : 'black',
            }
          }
        }
      }
    });
  });
</script>
<canvas bind:this={canvas}></canvas>