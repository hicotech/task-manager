import { fireEvent, render } from '@testing-library/react';
import type { Props as TasksProps } from '../Tasks';
import Tasks from '../Tasks';

describe('Tasks', () => {
    const testData: Required<TasksProps> = {
        id: 'tasks-id',
        name: 'tasks-name',
        tasks: [
            {
                id: 'task-1',
                name: 'Task Circle',
                type: 'circle',
            },
            {
                id: 'task-2',
                name: 'Task Rectangle',
                type: 'rectangle',
            },
            {
                id: 'task-3',
                name: 'Task Polygon',
                type: 'polygon',
            },
        ],
        onButtonClick: jest.fn(),
        'data-testid': 'tasks-testid',
    };

    describe('Renders Default', () => {
        it('Render list name', () => {
            const { container, getByText, getByRole } = render(
                <Tasks name={testData.name} tasks={testData.tasks} />
            );

            expect(container).toMatchSnapshot();

            expect(getByRole('heading')).toBeInTheDocument();
            expect(getByText(testData.name)).toBeInTheDocument();
        });

        it('Render progress bar', () => {
            const { getByRole } = render(<Tasks name={testData.name} tasks={testData.tasks} />);

            expect(getByRole('progressbar')).toBeInTheDocument();
        });

        it('Render three tasks', () => {
            const { container, getByText, getAllByRole, getByRole } = render(
                <Tasks name={testData.name} tasks={testData.tasks} />
            );

            expect(container).toMatchSnapshot();

            expect(getByRole('list')).toBeInTheDocument();
            expect(getAllByRole('listitem').length).toEqual(3);
            expect(getByText(testData.tasks[0].name)).toBeInTheDocument();
            expect(getByText(testData.tasks[1].name)).toBeInTheDocument();
            expect(getByText(testData.tasks[2].name)).toBeInTheDocument();
        });

        it('Render two tasks', () => {
            const { container, getByText, queryByText, getAllByRole, getByRole } = render(
                <Tasks name={testData.name} tasks={testData.tasks.slice(0, 2)} />
            );

            expect(container).toMatchSnapshot();

            expect(getByRole('list')).toBeInTheDocument();
            expect(getAllByRole('listitem').length).toEqual(2);
            expect(getByText(testData.tasks[0].name)).toBeInTheDocument();
            expect(getByText(testData.tasks[1].name)).toBeInTheDocument();
            expect(queryByText(testData.tasks[2].name)).not.toBeInTheDocument();
        });

        it('Render one task', () => {
            const { container, getByText, queryByText, getAllByRole, getByRole } = render(
                <Tasks name={testData.name} tasks={testData.tasks.slice(0, 1)} />
            );

            expect(container).toMatchSnapshot();

            expect(getByRole('list')).toBeInTheDocument();
            expect(getAllByRole('listitem').length).toEqual(1);
            expect(getByText(testData.tasks[0].name)).toBeInTheDocument();
            expect(queryByText(testData.tasks[1].name)).not.toBeInTheDocument();
            expect(queryByText(testData.tasks[2].name)).not.toBeInTheDocument();
        });
    });

    describe('Functionality testing', () => {
        it('Call onClick callback when button is clicked', () => {
            const handleClick = testData.onButtonClick;

            const { getByRole } = render(
                <Tasks
                    name={testData.name}
                    tasks={testData.tasks.slice(0, 1)}
                    onButtonClick={handleClick}
                />
            );

            fireEvent.click(getByRole('button'));
            expect(handleClick).toHaveBeenCalledTimes(1);
            expect(handleClick).toHaveBeenCalledWith(testData.tasks[0].id);
        });

        it('Call correct onClick callback when button is clicked', () => {
            const handleClick = jest.fn();

            const { getAllByRole } = render(
                <Tasks name={testData.name} tasks={testData.tasks} onButtonClick={handleClick} />
            );

            fireEvent.click(getAllByRole('button')[1]);
            expect(handleClick).toHaveBeenCalledTimes(1);
            expect(handleClick).toHaveBeenCalledWith(testData.tasks[1].id);
        });

        it('Update progress indicator correctly', () => {
            const { getByRole, rerender } = render(
                <Tasks name={testData.name} tasks={testData.tasks} />
            );

            expect(getByRole('progressbar')).toHaveAttribute('value', '0');

            // Simulate removal of Task from tasks list
            rerender(<Tasks name={testData.name} tasks={testData.tasks.slice(1)} />);
            expect(getByRole('progressbar')).toHaveAttribute('value', '0.3333333333333333');
        });
    });

    /**
     * Tests for name, tasks and onButtonClick are skipped as they would duplicate tests from "Functionality testing" section
     */
    describe('Props testing', () => {
        it('Id', () => {
            const { getByTestId } = render(
                <Tasks
                    name={testData.name}
                    tasks={testData.tasks}
                    id={testData.id}
                    data-testid={testData['data-testid']}
                />
            );

            expect(getByTestId(testData['data-testid'])).toHaveAttribute('id', testData.id);
        });

        it('Data-testid', () => {
            const { getByTestId } = render(
                <Tasks
                    name={testData.name}
                    tasks={testData.tasks}
                    data-testid={testData['data-testid']}
                />
            );

            expect(getByTestId(testData['data-testid'])).toBeInTheDocument();
        });
    });
});
