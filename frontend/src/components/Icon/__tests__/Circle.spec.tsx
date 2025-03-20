import { render } from '@testing-library/react';
import type { Icon } from '../../../types/icon';
import Circle from '../Circle';

describe('Circle', () => {
    const testData: Required<Icon> = {
        size: '3.5rem',
        color: '#ff0000',
        'data-testid': 'circleIcon-testid',
    };

    describe('Renders Default', () => {
        const { container } = render(<Circle />);

        expect(container).toMatchSnapshot();
        expect(container.querySelector('svg > circle')).toBeInTheDocument();
    });

    describe('Props testing', () => {
        it('Default', () => {
            const { container } = render(<Circle />);

            expect(container.querySelector('svg')).toHaveAttribute('width', '1.5rem');
            expect(container.querySelector('svg')).toHaveAttribute('height', '1.5rem');
            expect(container.querySelector('svg')).toHaveAttribute('fill', 'currentColor');
        });

        it('Size', () => {
            const { container } = render(<Circle size={testData.size} />);

            expect(container).toMatchSnapshot();
            expect(container.querySelector('svg')).toHaveAttribute('width', testData.size);
            expect(container.querySelector('svg')).toHaveAttribute('height', testData.size);
        });

        it('Color', () => {
            const { container } = render(<Circle color={testData.color} />);

            expect(container).toMatchSnapshot();
            expect(container.querySelector('svg')).toHaveAttribute('fill', testData.color);
        });

        it('Data-testid', () => {
            const { getByTestId } = render(<Circle data-testid={testData['data-testid']} />);

            expect(getByTestId(testData['data-testid'])).toBeInTheDocument();
        });
    });
});
