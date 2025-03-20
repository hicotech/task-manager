import { fireEvent, render } from '@testing-library/react';
import type { Props as EmptyStateProps } from '../EmptyState';
import EmptyState from '../EmptyState';

describe('Empty State', () => {
    const testData: Required<EmptyStateProps> = {
        id: 'emptyState-id',
        onRequestTasks: jest.fn(),
        'data-testid': 'emptyState-testid',
    };

    it('Renders Default', () => {
        const { container, getByRole } = render(<EmptyState />);

        expect(container).toMatchSnapshot();

        expect(getByRole('button')).toBeInTheDocument();
    });

    describe('Functionality testing', () => {
        it('Call onClick callback when button is clicked', () => {
            const handleClick = testData.onRequestTasks;

            const { getByRole } = render(<EmptyState onRequestTasks={handleClick} />);

            fireEvent.click(getByRole('button'));
            expect(handleClick).toHaveBeenCalledTimes(1);
        });
    });

    /**
     * Test for onRequestTasks is skipped as it would duplicate tests from "Functionality testing" section
     */
    describe('Props testing', () => {
        it('Id', () => {
            const { getByTestId } = render(
                <EmptyState id={testData.id} data-testid={testData['data-testid']} />
            );

            expect(getByTestId(testData['data-testid'])).toHaveAttribute('id', testData.id);
        });

        it('Data-testid', () => {
            const { getByTestId } = render(<EmptyState data-testid={testData['data-testid']} />);

            expect(getByTestId(testData['data-testid'])).toBeInTheDocument();
        });
    });
});
