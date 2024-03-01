import { ItemLabel } from '@components';
import PropTypes from 'prop-types';

export const Form = ({ formSchema, data, handleChange, isLoading, errors }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'auto',
        gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))',
        gap: '0.5rem',
        maxHeight: '40.5rem',
        overflowY: 'auto',
        marginRight: '-1rem',
        paddingRight: '1rem',
      }}
    >
      {formSchema.map(({ id, component: Component, label, ...props }) => {
        return (
          <ItemLabel key={id} label={label}>
            <Component
              id={id}
              {...props}
              data={data}
              errors={errors}
              onChange={handleChange}
              disabled={isLoading}
            />
          </ItemLabel>
        );
      })}
    </div>
  );
};

Form.propTypes = {
  formSchema: PropTypes.arrayOf(PropTypes.shape({})),
  data: PropTypes.object,
  handleChange: PropTypes.func,
  isLoading: PropTypes.bool,
  errors: PropTypes.object,
};
