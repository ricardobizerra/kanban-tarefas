import { Context } from "@/pages/api/graphql";

export const resolvers = {
    Query: {
        tasks: async (_parent: any, _args: any, { prisma }: Context) => {
            return await prisma.task.findMany();
        },
        task: async (_parent: any, { id }: any, { prisma }: Context) => {
            return await prisma.task.findUnique({ where: { id } });
        }
    },
    Mutations: {
        createTask: async (_parent: any, { title, description }: any, { prisma }: Context) => {
            return await prisma.task.create({
                data: {
                    title,
                    description,
                }
            });
        },
        updateTask: async (_parent: any, { id, status, concludedAt }: any, { prisma }: Context) => {
            return await prisma.task.update({
                where: { id },
                data: {
                    status,
                    concludedAt
                }
            });
        }
    }
}