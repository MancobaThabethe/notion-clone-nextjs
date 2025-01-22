import { ArrowLeftCircleIcon, ArrowUpCircleIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="">
      <div className="flex space-x-2 items-center animate-pulse hover:text-black">
        <ArrowLeftCircleIcon className="hidden md:inline h-12 w-12" /><ArrowUpCircleIcon className="md:hidden h-12 w-12" />
        <h1 className="font-bold text-lg">Get started creating a new Document</h1>
      </div>
    </main>
  );
}
