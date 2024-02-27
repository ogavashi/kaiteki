import PropTypes from 'prop-types';
import { Filters } from '../Filters';

export const ActionPanel = ({ scheme, selectedRows, handleRefresh }) => {
  return (
    <div
      style={{
        marginBottom: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        gap: '1rem',
      }}
    >
      <form>
        <Filters filters={scheme.filters} handleRefresh={handleRefresh} />
      </form>
      <div style={{ display: 'flex', gap: '1rem' }}>
        {scheme.actions?.map(({ id, component: Component, ...props }) => {
          return (
            <Component
              key={id}
              selectedRows={selectedRows}
              handleRefresh={handleRefresh}
              {...props}
            />
          );
        })}
      </div>
    </div>
  );
};

ActionPanel.propTypes = {
  selectedRows: PropTypes.arrayOf(PropTypes.number),
  scheme: PropTypes.shape({
    actions: PropTypes.array,
    filters: PropTypes.array,
  }),
  handleRefresh: PropTypes.func,
};
