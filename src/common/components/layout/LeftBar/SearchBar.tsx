import { LuSearch } from 'react-icons/lu';

export const SearchBar = () => (
  <form
    action="/posts"
    className="border-background-alt bg-surface my-2 mb-3 flex items-center rounded-full border px-5 py-3 shadow-sm not-lg:hidden"
  >
    <LuSearch className="text-foreground-muted mr-2 size-5" />
    <input
      name="q"
      placeholder="Buscar..."
      required
      className="w-full outline-none"
    />
  </form>
);
