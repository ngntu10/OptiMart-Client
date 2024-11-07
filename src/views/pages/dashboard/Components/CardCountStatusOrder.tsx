import { Box, useTheme } from '@mui/material'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useMemo, useState } from 'react'
import { Pie, PolarArea } from 'react-chartjs-2'
import { useTranslation } from 'react-i18next'
import { STATUS_ORDER_PRODUCT } from 'src/configs/orderProduct'
import { OBJECT_TYPE_USER } from 'src/configs/user'
import { hexToRGBA } from 'src/utils/hex-to-rgba'
interface TProps {
  data: Record<number, number>
}
const CardCountOrderStatus = (props: TProps) => {
  const { data } = props
  const [mapObject] = useState(() => STATUS_ORDER_PRODUCT)
  const { t } = useTranslation()
  const theme = useTheme()
  const labelMemo = useMemo(() => {
    if (data) {
      return Object?.keys(data)?.map(key => {
        return `${t((mapObject as any)?.[key]?.label)}`
      })
    }
    return []
  }, [data])
  const valueMemo = useMemo(() => {
    if (data) {
      return Object?.keys(data)?.map(key => {
        return (data as any)?.[key]
      })
    }
    return []
  }, [data])
  const dataChart = {
    labels: labelMemo,
    datasets: [
      {
        label: `${t('Số lượng')}`,
        data: valueMemo,
        backgroundColor: [
          'rgba(255, 99, 132, 0.4)',
          'rgba(255, 159, 64, 0.4)',
          'rgba(255, 205, 86, 0.4)',
          'rgba(75, 192, 192, 0.4)',
          'rgba(54, 162, 235, 0.4)',
          'rgba(153, 102, 255, 0.4)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 0.4)',
          'rgba(255, 159, 64, 0.4)',
          'rgba(255, 205, 86, 0.4)',
          'rgba(75, 192, 192, 0.4)',
          'rgba(54, 162, 235, 0.4)',
          'rgba(153, 102, 255, 0.4)'
        ],
        borderWidth: 1
      }
    ]
  }
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        padding: '20px',
        height: '400px',
        width: '100%',
        borderRadius: '15px',
        canvas: {
          width: '100% !important'
        }
      }}
    >
      <PolarArea
        data={dataChart}
        options={{
          plugins: {
            title: { display: true, text: `${t('Count_order_by_status')}` }
          },
          scales: {
            r: {
              pointLabels: {
                display: true,
                centerPointLabels: true,
                font: {
                  size: 12
                }
              }
            }
          }
        }}
      />
    </Box>
  )
}
export default CardCountOrderStatus
