import type { Icon } from '../../types/icon';

const Rectangle = ({
    size = '1.5rem',
    color = 'currentColor',
    'data-testid': dataTestId,
}: Icon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={color}
        width={size}
        height={size}
        data-testid={dataTestId}
    >
        <rect width={24} height={24} />
    </svg>
);

export default Rectangle;
