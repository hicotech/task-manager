import type { MouseEvent } from 'react';
import { styled } from 'styled-components';

export interface Props {
    /**
     * Unique ID for the component
     */
    id?: string;

    /**
     *  On button click callback
     */
    onRequestTasks?: (e: MouseEvent<HTMLElement>) => void;

    /**
     * Allows to pass testid string for testing purposes
     */
    'data-testid'?: string;
}

const Container = styled.div`
    display: flex;
    align-items: center;
`;

const RequestTasksButton = styled.button`
    display: inline-block;
    font-weight: 700;
    font-size: 1rem;
    line-height: 1.5rem;
    cursor: pointer;
    color: #52778b;
    background-color: transparent;
    border-radius: 100rem;
    border: 2px solid #52778b;
    padding: 0.375rem 1.25rem;

    &:hover {
        color: #ffffff;
        background-color: #52778b;
    }

    &:active {
        border: 2px solid #ffffff;
        box-shadow: 0px 0px 0px 2px #52778b;
    }
`;

const EmptyState = ({ 'data-testid': dataTestId, ...props }: Props) => {
    return (
        <Container id={props.id} data-testid={dataTestId}>
            <RequestTasksButton onClick={props.onRequestTasks}>Requests Tasks</RequestTasksButton>
        </Container>
    );
};

/** @component */
export default EmptyState;
