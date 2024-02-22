import PropTypes from 'prop-types';

export function ItemLabel({ children, label, required, style }) {
  return (
    <div style={{ width: '100%', ...style }}>
      <div
        style={{
          marginBottom: '0.25rem',
          gap: '0.25rem',
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        {label} {required ? <span style={{ color: 'red' }}>*</span> : null}
      </div>
      {children}
    </div>
  );
}

ItemLabel.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  children: PropTypes.node.isRequired,
  required: PropTypes.bool,
  style: PropTypes.object,
};

ItemLabel.defaultProps = {
  required: false,
  style: {},
};
