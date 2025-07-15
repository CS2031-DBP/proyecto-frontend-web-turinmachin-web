import { LuSparkles } from 'react-icons/lu';

export interface Props {
  pending: boolean;
  suggestions: string[];
  onSelect: (tag: string) => void;
}

export const TagSuggestionList = ({
  pending,
  suggestions,
  onSelect,
}: Props) => {
  if (pending) {
    return <p className="text-ai mt-2 mb-4">Creando sugerencias...</p>;
  }
  if (suggestions.length === 0) return null;

  return (
    <div className="mt-2 mb-4">
      <div className="text-ai-start mb-1 flex items-center gap-1 bg-clip-text text-sm font-medium">
        <LuSparkles className="h-4 w-4" />
        Sugerencias:
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((tag) => (
          <button
            key={tag}
            onClick={() => onSelect(tag)}
            title="Haz clic para agregar este tag"
            className="from-ai-start/80 to-ai-end/80 hover:bg-special rounded-full bg-gradient-to-br px-3 py-1 text-sm font-semibold transition"
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
};
