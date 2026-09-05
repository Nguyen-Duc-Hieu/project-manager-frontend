import { motion } from "framer-motion"

export default function AcceptToggle({ isAccepted, onToggle, disabled = false }) {
    console.log("AcceptToggle rendered with isAccepted:", isAccepted, "disabled:", disabled);
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor="acceptToggle" className="font-semibold">Duyệt</label>
            <button
                id="acceptToggle"
                type="button"
                onClick={() => !disabled && onToggle?.(!isAccepted)}
                disabled={disabled}
                className={`
                    w-16 h-8 rounded-full border border-gray-300 transition-colors duration-300
                    ${isAccepted ? "bg-green-500" : "bg-gray-300"}
                    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                `}
            >
                <motion.span
                    className={`
                        block w-7 h-7 rounded-full bg-white shadow-md
                        ${isAccepted ? "ms-auto" : "ms-0"}
                    `}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    layout
                >
                </motion.span>

            </button>
        </div>
    )
}