import PropTypes from 'prop-types';

export const ActionPanel = ({ scheme, selectedRows }) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        {scheme.actions?.map(({ id, component: Component, ...props }) => {
          return <Component key={id} selectedRows={selectedRows} {...props} />;
        })}
      </div>
    </div>
  );
};

ActionPanel.propTypes = {
  selectedRows: PropTypes.arrayOf(PropTypes.number),
  scheme: PropTypes.shape({
    actions: PropTypes.array,
  }),
};
