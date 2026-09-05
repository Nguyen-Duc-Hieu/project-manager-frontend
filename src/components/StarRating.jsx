import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRotateLeft, faStar } from "@fortawesome/free-solid-svg-icons"

export default function StarRating({ rating, onRatingChange, disabled }) {
    const ratingOps = [1, 2, 3, 4, 5]

    return (
        <div className="flex gap-1">
            {ratingOps.map((value) => (
                <button
                    key={value}
                    type="button"
                    onClick={() => !disabled && onRatingChange?.(value)}
                    className={`
                        ${(value <= rating) ? "text-yellow-400" : "text-gray-300"}
                        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                    `}
                    disabled={disabled}
                >
                    <FontAwesomeIcon icon={faStar} />
                </button>
            ))}

            {!disabled && (
                <button
                    type="button"
                    className="ms-auto"
                    onClick={() => onRatingChange(0)}
                >
                    <FontAwesomeIcon icon={faRotateLeft} />
                </button>
            )}
        </div>
    )
}