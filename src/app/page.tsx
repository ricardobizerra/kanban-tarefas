"use client";
import { useQuery } from "@apollo/client";
import { GET_TASKS } from "../../graphql/queries";
import { Task } from "@prisma/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Droppable, Draggable, DragDropContext } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";

interface TaskByStatusInterface {
  [key: string]: Task[]
}

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
  const [tasksByStatus, setTasksByStatus] = useState<TaskByStatusInterface>({
    "TO_DO": [],
    "IN_PROGRESS": [],
    "DONE": []
  });

  const { 
    data, 
    loading, 
    error 
  } = useQuery(GET_TASKS);

  useEffect(() => {
    if (data) {
      const tasks: Task[] = data.tasks;
      const updatedTasksByStatus: TaskByStatusInterface = {
        "TO_DO": [],
        "IN_PROGRESS": [],
        "DONE": []
      };

      for (const task of tasks) {
        updatedTasksByStatus[task.status].push(task);
      }

      setTasksByStatus(updatedTasksByStatus);
    }
  }, [data]);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
        return;
    }

    const task = tasksByStatus[source.droppableId].find(task => task.id === draggableId);

    if (task) {
      updateTasks(task, destination.droppableId);
    }
  }

  const updateTasks = (task: Task, status: string) => {
    const newTaskState = { ...tasksByStatus };
    const oldStatus = task.status;

    newTaskState[oldStatus] = newTaskState[oldStatus].filter(taskAnalised => taskAnalised.id !== task.id);
    newTaskState[status].push(task);

    setTasksByStatus(newTaskState);
  }

  return (
    <div className="flex justify-evenly">
      <DragDropContext
        onDragEnd={onDragEnd}
      >
        {
          // organize tasks by status. each status will have its card, with the title being the status and the content being Cards with task title and description
          Object.entries(tasksByStatus).map(([status, tasks]) => {
            return (
              <Card
                key={status}
                className="w-1/4"
              >
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
                <Droppable
                  droppableId={status}
                >
                  {
                    (provided, snapshot) => (
                      <CardContent
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex flex-col p-6 gap-4 ${snapshot.isDraggingOver ? 'bg-slate-900' : ''}`}
                      >
                        {
                          tasks.map((task, index) => {
                            return (
                              <Draggable
                                draggableId={task.id}
                                index={index}
                                key={task.id}
                              >
                                {
                                  (provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        ...provided.draggableProps.style,
                                      }}
                                    >
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
                                    </div>
                                  )
                                }
                              </Draggable>
                            )
                          })
                        }
                        {provided.placeholder}
                      </CardContent>
                    )
                  }
                </Droppable>
              </Card>
            )
          })
        }
      </DragDropContext>
    </div>
  )
}
