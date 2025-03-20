import type { Icon } from '../../types/icon';

const Polygon = ({ size = '1.5rem', color = 'currentColor', 'data-testid': dataTestId }: Icon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={color}
        width={size}
        height={size}
        data-testid={dataTestId}
    >
        <polygon points="12,0 24,8 19,24 4,24 0,8"></polygon>
    </svg>
);

export default Polygon;
