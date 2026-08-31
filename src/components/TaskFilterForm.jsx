import { motion } from 'framer-motion'
import { useState } from 'react'

export default function TaskFilterForm({ filterData, setFilterData, onClose }) {
    const [filter, setFilter] = useState(filterData)

    const handleFilterChange = (e) => {
        const { name, value, checked } = e.target;
        setFilter(prevFilter => {

            if (checked) {
                if (value === "all") {
                    const allValues = name === "duedate" ? ["overdue", "upcoming"] : ["low", "medium", "high"];
                    return {
                        ...prevFilter,
                        [name]: allValues
                    }
                }
                return {
                    ...prevFilter,
                    [name]: [...prevFilter[name], value]
                }
            } else {
                if (value === "all") {
                    return {
                        ...prevFilter,
                        [name]: []
                    }
                }
                return {
                    ...prevFilter,
                    [name]: prevFilter[name].filter(v => v !== value)
                }
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setFilterData(filter)
    }

    return (
        <motion.form
            className="border border-gray-300 rounded-2xl p-4 overflow-hidden bg-amber-50"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onSubmit={handleSubmit}
        >
            <div className="flex gap-8">
                <div className="flex flex-col gap-2">
                    <label className="flex gap-2 items-center">
                        <input
                            type="checkbox" 
                            name="duedate"
                            value="all"
                            checked={filter.duedate.includes("overdue") && filter.duedate.includes("upcoming")} 
                            onChange={handleFilterChange}
                        />
                        <strong className="text-xl">Duedate</strong>
                    </label>
                    
                
                    <label className="flex gap-2 items-center">
                        <input
                            type="checkbox" 
                            name="duedate"
                            value="overdue"
                            checked={filter.duedate.includes("overdue")} 
                            onChange={handleFilterChange} 
                        />
                        Overdue
                    </label>

                    <label className="flex gap-2 items-center">
                        <input 
                            type="checkbox" 
                            name="duedate"
                            value="upcoming"
                            checked={filter.duedate.includes("upcoming")} 
                            onChange={handleFilterChange} 
                        />
                        Upcoming
                    </label>
                </div>

                <div className="flex flex-col gap-2">
                    
                    <label className="flex gap-2 items-center">
                        <input
                            type="checkbox" 
                            name="priority"
                            value="all"
                            checked={filter.priority.includes("high") && filter.priority.includes("medium") && filter.priority.includes("low")} 
                            onChange={handleFilterChange} 
                        />
                        <strong className="text-xl">Priority</strong>
                    </label>
                
                    <label className="flex gap-2 items-center">
                        <input
                            type="checkbox" 
                            name="priority"
                            value="high"
                            checked={filter.priority.includes("high")} 
                            onChange={handleFilterChange} 
                        />
                        High
                    </label>

                    <label className="flex gap-2 items-center">
                        <input 
                            type="checkbox" 
                            name="priority"
                            value="medium"
                            checked={filter.priority.includes("medium")} 
                            onChange={handleFilterChange} 
                        />
                        Medium
                    </label>

                    <label className="flex gap-2 items-center">
                        <input 
                            type="checkbox" 
                            name="priority"
                            value="low"
                            checked={filter.priority.includes("low")} 
                            onChange={handleFilterChange} 
                        />
                        Low
                    </label>
                </div>
            </div>


            <div className="flex justify-end gap-2 mt-8">
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="bg-blue-300 p-2 rounded-xl hover:bg-blue-500"
                >
                    Apply
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className="bg-gray-300 p-2 rounded-xl hover:bg-gray-500"
                >
                    Cancel
                </button>
            </div>
            
            
        </motion.form>
    )
}