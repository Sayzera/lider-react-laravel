import React, { useRef } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { getElementAtEvent, Line } from 'react-chartjs-2'
import PropTypes from 'prop-types'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Tahmini Teslimat Süreleri',
    },
  },
}

export default function LineChart({ chartData }) {
  let tarihLabel = chartData?.devamEdenSiparislerHaftalik?.map((item) => item.tarih)
  let teslimatSayisi = chartData?.devamEdenSiparislerHaftalik?.map((item) => item.count)

  const labels = tarihLabel

  const data = {
    labels,
    datasets: [
      {
        label: 'Teslimat Sayısı',
        data: teslimatSayisi,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }
  const chartRef = useRef()
  const onClick = (event) => {
    let data = getElementAtEvent(chartRef.current, event)
    console.log(tarihLabel[data[0].index])
  }

  return <Line options={options} data={data} ref={chartRef} onClick={onClick} />
}

LineChart.propTypes = {
  chartData: PropTypes.array,
}
