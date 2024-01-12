"use client";
import { PlusIcon, BarChartIcon, ChevronLeftIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();

    return (
        <header className="flex justify-between items-center pb-6">
            <div className="flex gap-2">
                <h1 className="font-bold text-xl">
                    Kanban
                </h1>
                <p className="text-lg">
                    Organize suas tarefas de um jeito fácil
                </p>
            </div>

            <div className="flex items-center">
                <Button 
                    className="flex items-center rounded-lg"
                >
                    {
                        pathname === '/' && (
                            <>
                                <PlusIcon className="mr-2 h-4 w-4" /> Adicionar tarefa
                            </>
                        )
                    }
                </Button>

                <Button 
                    className="ml-2 flex items-center rounded-lg"
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