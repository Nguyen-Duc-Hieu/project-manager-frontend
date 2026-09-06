import { motion } from "framer-motion"

function AcceptToggle({ isAccepted, onToggle, disabled = false }) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor="acceptToggle" className="font-semibold">Duyệt</label>
            <button
                id="acceptToggle"
                type="button"
                onClick={() => !disabled && onToggle?.(!isAccepted)}
                disabled={disabled}
                className={`
                    w-16 h-8 rounded-full border border-gray-300 transition-colors duration-300 px-0.5 flex items-center
                    ${isAccepted ? "bg-green-500" : "bg-gray-300"}
                    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                `}
            >
                <motion.span
                    className="w-7 h-7 rounded-full bg-white shadow-md pointer-events-none"
                    initial={{ x: isAccepted ? 31 : 0 }}
                    animate={{ x: isAccepted ? 31 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                </motion.span>

            </button>
        </div>  
    )
}

export default AcceptToggle