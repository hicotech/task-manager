import type { Icon } from '../../types/icon';

const Circle = ({ size = '1.5rem', color = 'currentColor', 'data-testid': dataTestId }: Icon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={color}
        width={size}
        height={size}
        data-testid={dataTestId}
    >
        <circle cx={12} cy={12} r={12} />
    </svg>
);

export default Circle;
