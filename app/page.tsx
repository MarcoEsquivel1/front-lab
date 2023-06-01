import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex flex-col min-h-full items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <p
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
          >
            By{' '}
            <span className="flex text-xl font-bold text-gray-900 dark:text-gray-100 lg:text-3xl">
              Marco Esquivel
            </span>
          </p>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <span className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl px-8 py-32 space-y-8 text-center text-black lg:px-0 lg:text-left">
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-center lg:text-6xl lg:text-left">
            <span className="inline-block">Laboratorio Periodo 3</span>
          </h1>
        </span>  
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-1 lg:text-center">
        <a
          href="/facturas"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Go to{' Crud'}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Crea, Actualiza Elimina registros de .
          </p>
        </a>
      </div>
    </main>
  )
}
