import PropTypes from 'prop-types';

// utils
import createAlert from 'shared/utils/createAlert';

CustomAlert.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  minWidth: PropTypes.number,
};

export default function CustomAlert({
  message,
  type,
  minWidth = undefined,
  maxWidth = undefined,
}) {
  const alertStyle = createAlert(type);

  return (
    <span
      css={`
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 4px 12px;
        border-radius: 4px;
        background-color: ${alertStyle.backgroundColor};
        color: ${alertStyle.color};
        border: ${alertStyle.border};
        min-width: ${minWidth === undefined ? 'unset' : `${minWidth}px`};
        max-width: ${maxWidth === undefined ? 'unset' : `${maxWidth}px`};
      `}
    >
      {message}
    </span>
  );
}
