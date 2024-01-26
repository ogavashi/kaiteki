import PropTypes from 'prop-types';

export const ActionPanel = ({ scheme }) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <div>
        {scheme.actions?.map(({ id, component: Component, ...props }) => {
          return <Component key={id} {...props} />;
        })}
      </div>
    </div>
  );
};

ActionPanel.propTypes = {
  scheme: PropTypes.shape({
    actions: PropTypes.array,
  }),
};
