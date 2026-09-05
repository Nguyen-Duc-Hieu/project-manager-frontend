import StarRating from "./StarRating"

export default function DifficultyRating({ difficulty, onDifficultyChange, disabled, error }) {
    return (
        <div className="flex flex-col gap-2">
            <div className="font-semibold">Độ khó</div>
            <StarRating
                rating={difficulty}
                onRatingChange={onDifficultyChange}
                disabled={disabled}
            />
            {error && (
                <div className="font-semibold text-red-500 text-sm">
                    Error: {error}
                </div>
            )}

        </div>
        
    )
}