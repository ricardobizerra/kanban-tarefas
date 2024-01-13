"use client";
import { PlusIcon, BarChartIcon, ChevronLeftIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import NewTask from "@/components/NewTask";

export default function Header() {
    const pathname = usePathname();

    return (
        <header className="flex justify-between items-center pb-6 phone:flex-col phone:gap-4">
            <div className="flex gap-2 phone:flex-col phone:text-center phone:gap-0">
                <h1 className="font-bold text-xl phone:text-base">
                    Kanban
                </h1>
                <p className="text-lg phone:text-sm">
                    Organize suas tarefas de um jeito fácil
                </p>
            </div>

            <div className="flex items-center phone:flex-col">
                {
                    pathname === '/' && (
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button 
                                    className="flex items-center rounded-lg"
                                >
                                    <PlusIcon className="mr-2 h-4 w-4" /> Adicionar tarefa
                                </Button>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                                <NewTask />
                            </AlertDialogContent>
                        </AlertDialog>
                    )
                }

                <Button 
                    className="ml-2 flex items-center rounded-lg phone:ml-0 phone:mt-2"
                    variant="secondary"
                    asChild
                >
                    {
                        pathname === '/stats' ? (
                            <Link href="/">
                                <ChevronLeftIcon className="mr-2 h-4 w-4" /> Voltar ao kanban 
                            </Link>
                        ) : (
                            <Link href="/stats">
                                <BarChartIcon className="mr-2 h-4 w-4 text-white" /> Ver estatísticas 
                            </Link>
                        )
                    }
                </Button>
            </div>
        </header>
    )
}