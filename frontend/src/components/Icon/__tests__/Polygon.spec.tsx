import { render } from '@testing-library/react';
import type { Icon } from '../../../types/icon';
import Polygon from '../Polygon';

describe('Polygon', () => {
    const testData: Required<Icon> = {
        size: '3.5rem',
        color: '#ff0000',
        'data-testid': 'polygonIcon-testid',
    };

    describe('Renders Default', () => {
        const { container } = render(<Polygon />);

        expect(container).toMatchSnapshot();
        expect(container.querySelector('svg > polygon')).toBeInTheDocument();
    });

    describe('Props testing', () => {
        it('Default', () => {
            const { container } = render(<Polygon />);

            expect(container.querySelector('svg')).toHaveAttribute('width', '1.5rem');
            expect(container.querySelector('svg')).toHaveAttribute('height', '1.5rem');
            expect(container.querySelector('svg')).toHaveAttribute('fill', 'currentColor');
        });

        it('Size', () => {
            const { container } = render(<Polygon size={testData.size} />);

            expect(container).toMatchSnapshot();
            expect(container.querySelector('svg')).toHaveAttribute('width', testData.size);
            expect(container.querySelector('svg')).toHaveAttribute('height', testData.size);
        });

        it('Color', () => {
            const { container } = render(<Polygon color={testData.color} />);

            expect(container).toMatchSnapshot();
            expect(container.querySelector('svg')).toHaveAttribute('fill', testData.color);
        });

        it('Data-testid', () => {
            const { getByTestId } = render(<Polygon data-testid={testData['data-testid']} />);

            expect(getByTestId(testData['data-testid'])).toBeInTheDocument();
        });
    });
});
