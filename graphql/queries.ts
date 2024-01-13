import { gql } from "@apollo/client";

export const GET_TASKS = gql`
    query Tasks {
        tasks {
            id
            title
            description
            status
            createdAt
            updatedAt
            concludedAt
            star
        }
    }
`;

export const GET_TASK = gql`
    query Task ($id: ID!) {
        task(id: $id) {
            id
            title
            description
            status
            createdAt
            updatedAt
            concludedAt
            star
        }
    }
`;