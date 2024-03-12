import { Pie as APie } from '@ant-design/plots';
import PropTypes from 'prop-types';

export const Pie = ({ stats }) => {
  const config = {
    data: [
      { type: 'Прибуток', value: stats.totalEarn },
      { type: 'Витрати', value: stats.totalSpend },
    ],
    angleField: 'value',
    colorField: 'type',
    label: {
      text: 'type',
      style: {
        fontWeight: 'bold',
      },
      formatter: (_, datum) => {
        return `${datum.type}: ${(
          (datum.value / (stats.totalEarn + stats.totalSpend)) *
          100
        ).toFixed(2)}%`;
      },
    },
    tooltip: (v) => {
      return `${v.type}: ${new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'UAH',
      }).format(v.value)}`;
    },
    legend: {
      color: {
        title: false,
        position: 'right',
        rowPadding: 5,
      },
    },
  };
  return <APie {...config} />;
};

Pie.propTypes = {
  stats: PropTypes.shape({ totalEarn: PropTypes.number, totalSpend: PropTypes.number }),
};
