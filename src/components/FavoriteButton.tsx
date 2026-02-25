interface FavoriteButtonProps {
  professionalId: string;
  isFavorite: boolean;
  onToggle: (id: string) => void;
  className?: string;
}

export default function FavoriteButton({
  professionalId,
  isFavorite,
  onToggle,
  className = '',
}: FavoriteButtonProps) {
  return (
    <button
      onClick={() => onToggle(professionalId)}
      className={`p-2 rounded-full transition-all duration-200 ${
        isFavorite
          ? 'bg-red-100 text-red-600 hover:bg-red-200'
          : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'
      } ${className}`}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      type="button"
    >
      <svg
        className="w-5 h-5"
        fill={isFavorite ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
}
