import { Box, useTheme } from '@mui/material'
import { TCountProductType, TCountRevenue } from 'src/views/pages/dashboard'
import { Bar, Line } from 'react-chartjs-2'
import 'chart.js/auto'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
interface TProps {
  data: TCountRevenue[]
}
const CardCountRevenue = (props: TProps) => {
  // Props
  const { data } = props
  const theme = useTheme()
  const { t } = useTranslation()

  const labelsMemo = useMemo(() => {
    return data?.map(item => `${item.month}/${item.year}`)
  }, [data])
  const dataMemo = useMemo(() => {
    return data?.map((item, index) => {
      return item?.total
    })
  }, [data])

  const dataSets = [
    {
      label: `${t('Doanh số')}`,
      backgroundColor: [
        'rgba(255, 99, 132, 0.4)',
        'rgba(255, 159, 64, 0.4)',
        'rgba(255, 205, 86, 0.4)',
        'rgba(75, 192, 192, 0.4)',
        'rgba(54, 162, 235, 0.4)',
        'rgba(153, 102, 255, 0.4)',
        'rgba(201, 203, 207, 0.4)'
      ],
      data: dataMemo,
      borderColor: [
        'rgba(45, 26, 84, 0.4)',
        'rgba(201, 203, 207, 0.4)'
      ]
    }
  ]

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        padding: '20px',
        height: '400px',
        width: '100%',
        borderRadius: '15px',
        mt: 4,
        canvas: {
          width: '100% !important'
        }
      }}
    >
      <Line
        data={{
          labels: labelsMemo,
          datasets: dataSets
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: true, text: 'Doanh số năm nay' }
          }
        }}
      />
    </Box>
  )
}
export default CardCountRevenue
