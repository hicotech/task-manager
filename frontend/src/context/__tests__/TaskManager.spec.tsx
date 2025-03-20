import { Task, TaskList } from '@task-manager/shared-library';
import { within } from '@testing-library/dom';
import { fireEvent, render } from '@testing-library/react';
import { TaskManager, useTasksManager } from '../TaskManager';
import { completeTask, setTasks } from '../actions/tasksManager';

describe('Task Manager', () => {
    const testData: TaskList['tasks'] = [
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
        {
            id: 'task-4',
            name: 'Task Rectangle 2',
            type: 'rectangle',
        },
        {
            id: 'task-5',
            name: 'Task Polygon 2',
            type: 'polygon',
        },
    ];

    const TestComponent = () => {
        const { state, dispatch } = useTasksManager();

        const mockFetchData = () => {
            dispatch(setTasks(testData.slice(0, 3)));
        };

        const mockFetchAdditionalData = () => {
            dispatch(setTasks(testData.slice(3, 5)));
        };

        const mockOnCompleteTask = (taskId: Task['id']) => {
            dispatch(completeTask(taskId));
        };

        return (
            <>
                <button onClick={mockFetchData} data-testid="fetchData" />
                <button onClick={mockFetchAdditionalData} data-testid="fetchAdditionalData" />
                <button onClick={() => mockOnCompleteTask('task-1')} data-testid="completeTask-1" />
                <button onClick={() => mockOnCompleteTask('task-2')} data-testid="completeTask-2" />
                <button onClick={() => mockOnCompleteTask('task-3')} data-testid="completeTask-3" />
                <ul data-testid="tasks">
                    {state.tasks.map(task => (
                        <li key={task.id}>
                            <span>{task.id}</span>
                            <span>{task.name}</span>
                            <span>{task.type}</span>
                        </li>
                    ))}
                </ul>
                <ul data-testid="completed">
                    {state.completed.map(task => (
                        <li key={task.id}>
                            <span>{task.id}</span>
                            <span>{task.name}</span>
                            <span>{task.type}</span>
                        </li>
                    ))}
                </ul>
            </>
        );
    };

    it('Provides Default', () => {
        const { getByTestId } = render(
            <TaskManager>
                <TestComponent />
            </TaskManager>
        );

        expect(within(getByTestId('tasks')).queryAllByRole('listitem')).toHaveLength(0);
        expect(within(getByTestId('completed')).queryAllByRole('listitem')).toHaveLength(0);
    });

    describe('Dispatch', () => {
        it('Set Tasks', () => {
            const { getByTestId } = render(
                <TaskManager>
                    <TestComponent />
                </TaskManager>
            );

            fireEvent.click(getByTestId('fetchData'));

            expect(within(getByTestId('tasks')).queryAllByRole('listitem')).toHaveLength(3);
            expect(within(getByTestId('completed')).queryAllByRole('listitem')).toHaveLength(0);
        });

        it('Complete Task', () => {
            const { getByTestId } = render(
                <TaskManager>
                    <TestComponent />
                </TaskManager>
            );

            fireEvent.click(getByTestId('fetchData'));
            fireEvent.click(getByTestId('completeTask-1'));

            expect(within(getByTestId('tasks')).queryAllByRole('listitem')).toHaveLength(2);
            expect(within(getByTestId('completed')).queryAllByRole('listitem')).toHaveLength(1);
        });
    });

    describe('Functionality testing', () => {
        it('Move correct Task from Tasks list to Completed list', () => {
            const { getByTestId } = render(
                <TaskManager>
                    <TestComponent />
                </TaskManager>
            );

            fireEvent.click(getByTestId('fetchData'));
            fireEvent.click(getByTestId('completeTask-2'));

            expect(within(getByTestId('tasks')).queryByText('task-1')).toBeInTheDocument();
            expect(within(getByTestId('tasks')).queryByText('task-2')).not.toBeInTheDocument();
            expect(within(getByTestId('tasks')).queryByText('task-3')).toBeInTheDocument();

            expect(within(getByTestId('completed')).queryByText('task-1')).not.toBeInTheDocument();
            expect(within(getByTestId('completed')).queryByText('task-2')).toBeInTheDocument();
            expect(within(getByTestId('completed')).queryByText('task-3')).not.toBeInTheDocument();
        });

        it('Retain items in Tasks list after second Set Tasks dispatch', () => {
            const { getByTestId } = render(
                <TaskManager>
                    <TestComponent />
                </TaskManager>
            );

            fireEvent.click(getByTestId('fetchData'));

            expect(within(getByTestId('tasks')).queryAllByRole('listitem')).toHaveLength(3);
            expect(within(getByTestId('completed')).queryAllByRole('listitem')).toHaveLength(0);

            fireEvent.click(getByTestId('completeTask-1'));

            expect(within(getByTestId('tasks')).queryAllByRole('listitem')).toHaveLength(2);
            expect(within(getByTestId('completed')).queryAllByRole('listitem')).toHaveLength(1);

            fireEvent.click(getByTestId('fetchAdditionalData'));

            expect(within(getByTestId('tasks')).queryAllByRole('listitem')).toHaveLength(4);
            expect(within(getByTestId('completed')).queryAllByRole('listitem')).toHaveLength(1);
        });

        it('Retain items in Completed list after second Set Tasks dispatch', () => {
            const { getByTestId } = render(
                <TaskManager>
                    <TestComponent />
                </TaskManager>
            );

            fireEvent.click(getByTestId('fetchData'));

            expect(within(getByTestId('tasks')).queryAllByRole('listitem')).toHaveLength(3);
            expect(within(getByTestId('completed')).queryAllByRole('listitem')).toHaveLength(0);

            fireEvent.click(getByTestId('completeTask-1'));
            fireEvent.click(getByTestId('completeTask-2'));
            fireEvent.click(getByTestId('completeTask-3'));

            expect(within(getByTestId('tasks')).queryAllByRole('listitem')).toHaveLength(0);
            expect(within(getByTestId('completed')).queryAllByRole('listitem')).toHaveLength(3);

            fireEvent.click(getByTestId('fetchData'));

            expect(within(getByTestId('tasks')).queryAllByRole('listitem')).toHaveLength(3);
            expect(within(getByTestId('completed')).queryAllByRole('listitem')).toHaveLength(3);
        });
    });
});
