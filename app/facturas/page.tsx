import { Table } from "../../components";

export default function FacturasPage() {
    return (
        <main className="flex flex-col min-h-full items-center justify-center p-24">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                    <p className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0">
                        <span className="flex text-xl font-bold text-gray-900 dark:text-gray-100 lg:text-3xl">
                            Facturas
                        </span>
                    </p>
                </div>
            </div>
            <Table />
        </main>   
    )
};
