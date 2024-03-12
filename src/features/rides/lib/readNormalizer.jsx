import { ROUTES } from '@features/navigation';
import { Link, generatePath } from 'react-router-dom';

export const readNormalizer = (rawData) => {
  return [
    {
      key: 1,
      label: 'З',
      children: <p>{rawData.from}</p>,
    },
    {
      key: 2,
      label: 'До',
      children: <p>{rawData.to}</p>,
    },
    {
      key: 3,
      label: 'Дистанція',
      children: <p>{rawData.distance}</p>,
    },
    {
      key: 3,
      label: 'Компанія',
      children: <p>{rawData.companyName}</p>,
    },
    {
      key: 4,
      label: 'Водій',
      children: rawData.driver && (
        <Link
          to={generatePath(ROUTES.DRIVERS.children.READ_DRIVER.path, { id: rawData.driver._id })}
        >
          <p>{rawData.driver.fullName}</p>
        </Link>
      ),
    },
    {
      key: 5,
      label: 'Тягач',
      children: (
        <Link
          to={generatePath(ROUTES.VEHICLES.children.TRUCKS.children.READ_TRUCK.path, {
            id: rawData.track._id,
          })}
        >
          <p>{rawData.track.trackNumber}</p>
        </Link>
      ),
    },
    {
      key: 6,
      label: 'Причеп',
      children: (
        <Link
          to={generatePath(ROUTES.VEHICLES.children.TRAILERS.children.READ_TRAILER.path, {
            id: rawData.trailer._id,
          })}
        >
          <p>{rawData.trailer.trailerNumber}</p>
        </Link>
      ),
    },
    {
      key: 7,
      label: 'Ціна',
      children: <p>{rawData.price} ₴</p>,
    },
    {
      key: 8,
      label: 'Статус',
      children: <p>{rawData.status}</p>,
    },
  ];
};
