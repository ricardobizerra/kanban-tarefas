"use client";
import { useQuery } from "@apollo/client";
import { GET_TASKS } from "../../graphql/queries";
import { Task } from "@prisma/client";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const taskStatusNames: {
  [key: string]: string
} = {
  "TO_DO": "Para Fazer",
  "IN_PROGRESS": "Em Progresso",
  "DONE": "Feito"
};

const taskStatusColors: {
  [key: string]: string
} = {
  "TO_DO": "bg-red-500",
  "IN_PROGRESS": "bg-green-800",
  "DONE": "bg-violet-500"
};

export default function Home() {
  const tasksByStatus: {
    [key: string]: Task[]
  } = {
    "TO_DO": [],
    "IN_PROGRESS": [],
    "DONE": []
  };

  const { 
    data, 
    loading, 
    error 
  } = useQuery(GET_TASKS);

  if (loading) {
		return (
			<p className="text-white flex items-center justify-center">
				Loading...
			</p>
		);
  }

	if (error) {
		return (
			<p className="text-white flex items-center justify-center">
				Oops! Something went wrong...
			</p>
		);
  }
  
  const tasks: Task[] = data?.tasks;

  for (const task of tasks) {
    tasksByStatus[task.status].push(task);
    console.log(tasksByStatus[task.status].length)
  }

  return (
    <div className="flex justify-evenly">
      {
        // organize tasks by status. each status will have its card, with the title being the status and the content being Cards with task title and description
        Object.entries(tasksByStatus).map(([status, tasks]) => {
          return (
            <Card key={status} className="w-1/4">
              <CardHeader>
                <CardTitle
                  className={`${taskStatusColors[status]} text-white w-fit pt-1 pb-1 pl-2 pr-2 rounded`}
                >
                  {taskStatusNames[status]}
                </CardTitle>
                <CardDescription>
                  {tasks.length} tasks
                </CardDescription>
              </CardHeader>
              <CardDescription className="flex flex-col p-6 gap-4">
                {
                  tasks.map((task) => {
                    if (task.status === status) return (
                      <Card key={task.id}>
                        <CardHeader>
                          <CardTitle className="text-base">
                            {task.title}
                          </CardTitle>
                          <CardDescription>
                            {task.description}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    )
                  })
                }
              </CardDescription>
            </Card>
          )
        })
      }
    </div>
  )
}
