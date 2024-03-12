import { PAGE_KEYS } from '@constants';
import { Pie } from '@features/stats';
import { ApiService } from '@services';
import { DatePicker, Empty, Spin, Statistic } from 'antd';
import dayjs from 'dayjs';
import { useCallback, useEffect, useMemo, useState } from 'react';
import CountUp from 'react-countup';

export function Stats() {
  const api = useMemo(() => ApiService[PAGE_KEYS.STATS].read, []);

  const [currentFilter, setCurrentFilter] = useState(dayjs());
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = useCallback((value) => {
    setCurrentFilter(value);
  }, []);

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    try {
      const stringified = currentFilter.toISOString();

      const newStats = await api({ month: stringified });

      if (!Object.keys(newStats).length) {
        setStats(null);

        return;
      }

      setStats(newStats);
    } catch (error) {
      console.warn(error);
    } finally {
      setIsLoading(false);
    }
  }, [api, currentFilter]);

  useEffect(() => {
    if (currentFilter) {
      fetchStats();
    }
  }, [currentFilter, fetchStats]);

  const formatter = (value) => <CountUp end={value} separator=',' suffix='₴' />;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <DatePicker onChange={handleChange} picker='month' value={currentFilter} />
        {!isLoading && stats && (
          <Statistic title='Чистий прибуток' value={stats?.profit} formatter={formatter} />
        )}
      </div>
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '4rem',
          }}
        >
          <Spin />
        </div>
      ) : stats ? (
        <Pie stats={stats} />
      ) : (
        <Empty description={<p>Немає статистика за обраний місяць</p>} />
      )}
    </div>
  );
}
