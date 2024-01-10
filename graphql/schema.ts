export const typeDefs = `#graphql
    type Task {
        id: ID!
        title: String!
        description: String!
        status: String!
        createdAt: String!
        updatedAt: String!
        concludedAt: String
    }

    type Query {
        tasks: [Task!]!
        task(id: ID!): Task!
    }

    type Mutation {
        createTask(title: String!, description: String!): Task!
        updateTask(id: ID!, status: String!, concludedAt: DateTime): Task!
    }
`