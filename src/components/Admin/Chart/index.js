import React, { useRef } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie, getElementAtEvent } from 'react-chartjs-2'

import PropTypes from 'prop-types'
ChartJS.register(ArcElement, Tooltip, Legend)

export function AdminChart({ chartData }) {
  console.log('seqwe', chartData)

  function getSum(total, num, parabirimi) {
    if (num.teslimat_para_birimi == parabirimi) {
      return total + Math.round(num.teslimat_ucreti)
    } else {
      return total
    }
  }

  let tl = chartData?.devamEdenSevkiyatlar?.reduce((total, num) => getSum(total, num, 'TL'), 0)
  let eur = chartData?.devamEdenSevkiyatlar?.reduce((total, num) => getSum(total, num, 'EUR'), 0)
  let usd = chartData?.devamEdenSevkiyatlar?.reduce((total, num) => getSum(total, num, 'USD'), 0)

  console.log(tl, eur, usd)

  const data = {
    labels: ['TL', 'EUR', 'USD'],
    datasets: [
      {
        label: '# of Votes',
        data: [tl, eur, usd],
        backgroundColor: ['#ff0000', '#008000', '#0000ff'],
        borderColor: ['#ffffff', '#ffffff', '#ffffff'],
        borderWidth: 1,
      },
    ],
  }
  const chartRef = useRef()
  const onClick = (event) => {
    let data = getElementAtEvent(chartRef.current, event)
    console.log(data[0].index)
  }
  return <Pie ref={chartRef} data={data} onClick={onClick} />
}

AdminChart.propTypes = {
  chartData: PropTypes.array,
}
