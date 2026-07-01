import { Search } from "lucide-react";

export function SearchBar({ defaultValue }: { defaultValue?: string }) {
  return (
    <form action="/tools" method="GET" role="search" className="relative w-full">
      <Search
        size={18}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-foreground-faint"
        aria-hidden="true"
      />
      <label htmlFor="tool-search" className="sr-only">
        Search AI tools
      </label>
      <input
        id="tool-search"
        type="text"
        name="q"
        defaultValue={defaultValue}
        placeholder="Search AI tools..."
        className="w-full rounded-md border border-border bg-surface py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-foreground-faint focus:border-accent focus:outline-none"
      />
    </form>
  );
}