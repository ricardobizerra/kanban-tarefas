import { gql } from "@apollo/client";

export const GET_TASKS = gql`
    query {
        tasks {
            id
            title
            description
            status
            createdAt
            updatedAt
            concludedAt
        }
    }
`;

export const GET_TASK = gql`
    query ($id: ID!) {
        task(id: $id) {
            id
            title
            description
            status
            createdAt
            updatedAt
            concludedAt
        }
    }
`;