import { render } from '@testing-library/react';
import type { Props as CompletedTasksProps } from '../CompletedTasks';
import CompletedTasks from '../CompletedTasks';

describe('Completed Tasks', () => {
    const testData: Required<CompletedTasksProps> & {
        name: string;
        noTasks: string;
    } = {
        id: 'completedTasks-id',
        name: 'Completed Tasks',
        noTasks: 'No Completed Tasks!',
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
        'data-testid': 'completedTasks-testid',
    };

    describe('Renders Default', () => {
        it('Render list name', () => {
            const { container, getByText, getByRole } = render(
                <CompletedTasks tasks={testData.tasks} />
            );

            expect(container).toMatchSnapshot();

            expect(getByRole('heading')).toBeInTheDocument();
            expect(getByText(testData.name)).toBeInTheDocument();
        });

        it('Render three tasks', () => {
            const { container, getByText } = render(<CompletedTasks tasks={testData.tasks} />);

            expect(container).toMatchSnapshot();

            expect(getByText(testData.tasks[0].name)).toBeInTheDocument();
            expect(getByText(testData.tasks[1].name)).toBeInTheDocument();
            expect(getByText(testData.tasks[2].name)).toBeInTheDocument();
        });

        it('Render two tasks', () => {
            const { container, getByText, queryByText } = render(
                <CompletedTasks tasks={testData.tasks.slice(0, 2)} />
            );

            expect(container).toMatchSnapshot();

            expect(getByText(testData.tasks[0].name)).toBeInTheDocument();
            expect(getByText(testData.tasks[1].name)).toBeInTheDocument();
            expect(queryByText(testData.tasks[2].name)).not.toBeInTheDocument();
        });

        it('Render one task', () => {
            const { container, getByText, queryByText } = render(
                <CompletedTasks tasks={testData.tasks.slice(0, 1)} />
            );

            expect(container).toMatchSnapshot();

            expect(getByText(testData.tasks[0].name)).toBeInTheDocument();
            expect(queryByText(testData.tasks[1].name)).not.toBeInTheDocument();
            expect(queryByText(testData.tasks[2].name)).not.toBeInTheDocument();
        });

        it('Render no tasks', () => {
            const { container, getByText, queryByText } = render(
                <CompletedTasks tasks={testData.tasks.slice(3)} />
            );

            expect(container).toMatchSnapshot();

            expect(getByText(testData.noTasks)).toBeInTheDocument();

            expect(queryByText(testData.name)).not.toBeInTheDocument();
            expect(queryByText(testData.tasks[0].name)).not.toBeInTheDocument();
            expect(queryByText(testData.tasks[1].name)).not.toBeInTheDocument();
            expect(queryByText(testData.tasks[2].name)).not.toBeInTheDocument();
        });
    });

    describe('Renders correct icons', () => {
        it('Render circle icon', () => {
            const { container, getByTestId } = render(
                <CompletedTasks tasks={testData.tasks.slice(0, 1)} />
            );

            expect(container).toMatchSnapshot();

            expect(getByTestId('icon-circle')).toBeInTheDocument();
        });

        it('Render rectangle icon', () => {
            const { container, getByTestId } = render(
                <CompletedTasks tasks={testData.tasks.slice(1, 2)} />
            );

            expect(container).toMatchSnapshot();

            expect(getByTestId('icon-rectangle')).toBeInTheDocument();
        });

        it('Render polygon icon', () => {
            const { container, getByTestId } = render(
                <CompletedTasks tasks={testData.tasks.slice(2, 3)} />
            );

            expect(container).toMatchSnapshot();

            expect(getByTestId('icon-polygon')).toBeInTheDocument();
        });
    });

    /**
     * Test tasks is skipped as it would duplicate tests from "Renders Default" section
     */
    describe('Props testing', () => {
        it('Id', () => {
            const { getByTestId } = render(
                <CompletedTasks
                    tasks={testData.tasks}
                    id={testData.id}
                    data-testid={testData['data-testid']}
                />
            );

            expect(getByTestId(testData['data-testid'])).toHaveAttribute('id', testData.id);
        });

        it('Data-testid', () => {
            const { getByTestId } = render(
                <CompletedTasks tasks={testData.tasks} data-testid={testData['data-testid']} />
            );

            expect(getByTestId(testData['data-testid'])).toBeInTheDocument();
        });
    });
});
