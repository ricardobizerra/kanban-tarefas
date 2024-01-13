"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";

import { AlertDialogAction, AlertDialogCancel, AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Form } from "@/components/ui/form";

import { CREATE_TASK } from "../../../graphql/mutation";
import { GET_TASKS } from "../../../graphql/queries";
import TextField from "../TextField";

const newTaskSchema = z.object({
    title: z.string(),
    description: z.string(),
});

export default function NewTask() {
    const newTaskForm = useForm<z.infer<typeof newTaskSchema>>({
        resolver: zodResolver(newTaskSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    })

    const [createTask] = useMutation(CREATE_TASK, {
        variables: {
            title: "",
            description: "",
        },
        refetchQueries: [{ query: GET_TASKS }]
    });
    
    function onSubmit(values: z.infer<typeof newTaskSchema>) {
        createTask({
            variables: {
                title: values.title,
                description: values.description,
            }
        });
    }

    return (
        <>
            <Form {...newTaskForm}>
                <form 
                    onSubmit={newTaskForm.handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                >
                    <AlertDialogHeader>
                        <TextField
                            form={newTaskForm}
                            name="title"
                            label="Título"
                            placeholder="Título da tarefa"
                            description="Dê um título para sua tarefa"
                        />

                        <TextField
                            form={newTaskForm}
                            name="description"
                            label="Descrição"
                            placeholder="Descrição da tarefa"
                            description="Dê uma descrição para sua tarefa"
                        />
                    </AlertDialogHeader>

                    <AlertDialogFooter className="mt-4">
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction type="submit">
                            Adicionar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </form>
            </Form>
        </>
    )
}