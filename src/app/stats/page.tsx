"use client"
import { useQuery } from "@apollo/client";
import { GET_TASKS } from "../../../graphql/queries";
import { Task } from "@prisma/client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface TaskGraphQLInterface {
    id: string;
    title: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    concludedAt: string;
}

export default function Stats() {
    const { data } = useQuery(GET_TASKS);
    const [doneTasksByDay, setDoneTasksByDay] = useState<{
        [key: string]: number
    }>({});

    useEffect(() => {

        if (!data) return;

        const tasks: TaskGraphQLInterface[] = data.tasks;

        const accDoneTasksByDay: {
            [key: string]: number
        } = tasks.reduce((acc: {
            [key: string]: number
        }, task: TaskGraphQLInterface) => {

            if (task.concludedAt === null) return acc;

            const date = new Date(parseInt(task.concludedAt)).toLocaleDateString('pt-BR');
            acc[date] = (acc[date] || 0) + 1;
            return acc;

        }, {});

        const sortedDoneTasksByDay = Object.fromEntries(
            Object.entries(accDoneTasksByDay).sort(([dateA], [dateB]) => {
                const dateAValue = new Date(dateA).getTime();
                const dateBValue = new Date(dateB).getTime();
                return dateAValue - dateBValue;
            })
        );

        setDoneTasksByDay(sortedDoneTasksByDay);

    }, [data]);

    return (
        <div className="flex justify-between">
            <div className="flex justify-center items-center p-6 w-[49%] border border-slate-800 rounded-lg hover:bg-slate-800 hover:ease-in-out hover:duration-300">
                <Chart
                    options={{
                        labels: ["Para Fazer", "Em Progresso", "Feito"],
                        colors: ["#EF4444", "#10B981", "#8B5CF6"],
                        chart: {
                            foreColor: "#fff",
                        }
                    }}
                    series={[
                                data?.tasks.filter((task: Task) => task.status === "TO_DO").length,
                                data?.tasks.filter((task: Task) => task.status === "IN_PROGRESS").length,
                                data?.tasks.filter((task: Task) => task.status === "DONE").length
                            ]}
                    type="pie"
                    width="500"
                    height="500"
                />
            </div>

            <div className="flex justify-center items-center p-6 w-[49%] border border-slate-800 rounded-lg hover:bg-slate-800 hover:ease-in-out hover:duration-300">
                <Chart
                    options={{
                        xaxis: {
                            categories: Object.keys(doneTasksByDay),
                        },
                    }}
                    series={[
                        {
                            data: Object.values(doneTasksByDay),
                        },
                    ]}
                    type="line"
                    width="500"
                    height="500"
                />
            </div>
        </div>
    )
}