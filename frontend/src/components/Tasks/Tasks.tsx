import type { Task, TaskList } from '@task-manager/shared-library';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

export interface Props {
    /**
     * Unique ID for the component
     */
    id?: string;

    /**
     *  Tasks list name
     */
    name: TaskList['name'];

    /**
     * Task list items
     */
    tasks: TaskList['tasks'];

    /**
     *  On button click callback
     */
    onButtonClick?: (taskId: Task['id']) => void;

    /**
     * Allows to pass testid string for testing purposes
     */
    'data-testid'?: string;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Title = styled.h1`
    text-align: center;
`;

const ProgressIndicator = styled.progress`
    width: 100%;
`;

const TasksList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    list-style: none;
    margin: 0;
    padding: 0;
`;

const Task = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    border-radius: 1rem;
    border: 1px dashed #335a6f;

    &:nth-child(even) {
        background-color: #e6e6e6;
    }
`;

const TaskButton = styled.button`
    display: inline-block;
    font-weight: 700;
    font-size: 1rem;
    line-height: 1.5rem;
    cursor: pointer;
    color: #528b7b;
    background-color: #ffffff;
    border-radius: 100rem;
    border: 2px solid #528b7b;
    padding: 0.375rem 1.25rem;

    &:hover {
        color: #ffffff;
        background-color: #528b7b;
    }

    &:active {
        border: 2px solid #ffffff;
        box-shadow: 0px 0px 0px 2px #528b7b;
    }
`;

const Tasks = ({ 'data-testid': dataTestId, ...props }: Props) => {
    const [initialListLength, setInitialListLength] = useState(0);

    // Store initial size of tasks array into local state
    useEffect(() => {
        setInitialListLength(props.tasks.length);
    }, []);

    return (
        <Container id={props.id} data-testid={dataTestId}>
            <Title>{props.name}</Title>
            <ProgressIndicator
                value={
                    initialListLength > 0
                        ? (initialListLength - props.tasks.length) / initialListLength
                        : initialListLength
                }
            />
            <TasksList>
                {props.tasks.map(task => (
                    <Task key={task.id}>
                        {task.name}
                        <TaskButton onClick={() => props.onButtonClick?.(task.id)}>
                            Complete Task
                        </TaskButton>
                    </Task>
                ))}
            </TasksList>
        </Container>
    );
};

/** @component */
export default Tasks;
