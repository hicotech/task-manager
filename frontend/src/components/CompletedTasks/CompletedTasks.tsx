import { TaskList } from '@task-manager/shared-library';
import styled from 'styled-components';
import Circle from '../Icon/Circle';
import Polygon from '../Icon/Polygon';
import Rectangle from '../Icon/Rectangle';

export interface Props {
    /**
     * Unique ID for the component
     */
    id?: string;

    /**
     * Array of completed Tasks
     */
    tasks: TaskList['tasks'];

    /**
     * Allows to pass testid string for testing purposes
     */
    'data-testid'?: string;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
`;

const Title = styled.h1`
    text-align: center;
`;

const TasksList = styled.ul`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.5rem;
    list-style: none;
    margin: 0;
    padding: 0;
`;

const Task = styled.li`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px dashed #335a6f;
`;

const CompletedTasks = ({ 'data-testid': dataTestId, ...props }: Props) => {
    // Similarly to Tasks component and depending on the use case, title value could be passed as prop
    const title = Boolean(props.tasks.length) ? 'Completed Tasks' : 'No Completed Tasks!';

    return (
        <Container id={props.id} data-testid={dataTestId}>
            <Title>{title}</Title>
            {Boolean(props.tasks.length) && (
                <TasksList>
                    {props.tasks.map(task => (
                        <Task key={task.id} id={task.id}>
                            {task.type === 'circle' && (
                                <Circle color="#82baa4" data-testid="icon-circle" />
                            )}
                            {task.type === 'rectangle' && (
                                <Rectangle color="#6491a9" data-testid="icon-rectangle" />
                            )}
                            {task.type === 'polygon' && (
                                <Polygon color="#bac1c4" data-testid="icon-polygon" />
                            )}
                            {task.name}
                        </Task>
                    ))}
                </TasksList>
            )}
        </Container>
    );
};

/** @component */
export default CompletedTasks;
