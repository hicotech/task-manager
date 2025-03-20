import { render } from '@testing-library/react';
import type { Icon } from '../../../types/icon';
import Rectangle from '../Rectangle';

describe('Rectangle', () => {
    const testData: Required<Icon> = {
        size: '3.5rem',
        color: '#ff0000',
        'data-testid': 'rectangleIcon-testid',
    };

    describe('Renders Default', () => {
        const { container } = render(<Rectangle />);

        expect(container).toMatchSnapshot();
        expect(container.querySelector('svg > rect')).toBeInTheDocument();
    });

    describe('Props testing', () => {
        it('Default', () => {
            const { container } = render(<Rectangle />);

            expect(container.querySelector('svg')).toHaveAttribute('width', '1.5rem');
            expect(container.querySelector('svg')).toHaveAttribute('height', '1.5rem');
            expect(container.querySelector('svg')).toHaveAttribute('fill', 'currentColor');
        });

        it('Size', () => {
            const { container } = render(<Rectangle size={testData.size} />);

            expect(container).toMatchSnapshot();
            expect(container.querySelector('svg')).toHaveAttribute('width', testData.size);
            expect(container.querySelector('svg')).toHaveAttribute('height', testData.size);
        });

        it('Color', () => {
            const { container } = render(<Rectangle color={testData.color} />);

            expect(container).toMatchSnapshot();
            expect(container.querySelector('svg')).toHaveAttribute('fill', testData.color);
        });

        it('Data-testid', () => {
            const { getByTestId } = render(<Rectangle data-testid={testData['data-testid']} />);

            expect(getByTestId(testData['data-testid'])).toBeInTheDocument();
        });
    });
});
