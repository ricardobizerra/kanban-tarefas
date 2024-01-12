import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
    mutation CreateTask($title: String!, $description: String!) {
        createTask(title: $title, description: $description) {
            id
            title
            description
            createdAt
            updatedAt
            status
            concludedAt
        }
    }
`;

export const UPDATE_TASK_STATUS = gql`
    mutation UpdateTaskStatus($id: ID!, $status: String!, $concludedAt: String) {
        updateTask(id: $id, status: $status, concludedAt: $concludedAt) {
            id
            status
            concludedAt
        }
    }
`;