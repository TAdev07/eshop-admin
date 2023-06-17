export const VIcon = ({
  name = 'home',
  color = 'currentColor',
  size = '1em',
  ...rest
}) => {
  return (
    <span {...rest} role="img" className="anticon">
      <svg width={size} height={size} fill={color}>
        <use xlinkHref={`/symbol-defs.svg#icon-${name}`} />
      </svg>
    </span>
  );
};
