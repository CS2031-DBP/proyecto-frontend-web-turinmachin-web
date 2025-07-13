import { LuSparkles } from 'react-icons/lu';

interface Props {
  suggestions: string[];
  onSelect: (tag: string) => void;
}

export const TagSuggestionList = ({ suggestions, onSelect }: Props) => {
  if (suggestions.length === 0) return null;

  return (
    <div className="mt-2">
      <div className="text-foreground-muted mb-1 flex items-center gap-1 text-sm font-medium">
        <LuSparkles className="h-4 w-4" />
        Sugerencias:
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((tag) => (
          <button
            key={tag}
            onClick={() => onSelect(tag)}
            title="Haz clic para agregar este tag"
            className="bg-background-alt hover:bg-special rounded-full px-3 py-1 text-sm transition"
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
};
