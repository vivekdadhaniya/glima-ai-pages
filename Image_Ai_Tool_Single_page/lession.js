import type { ComponentType } from "react"
import { useEffect, useRef, useState } from "react"
import { createStore } from "https://framer.com/m/framer/store.js@^1.0.0"
import { motion, AnimatePresence } from "framer-motion"
import { addPropertyControls, ControlType } from "framer" // Import Property Controls


export function withMyAwesomeOverride(Component): ComponentType {
    // ... your override logic here ...
    return (props) => {
        return <Component {...props} />
    }
}
// --- STORE DEFINITION ---
const useStore = createStore({
    activeTags: [], // Array to hold the IDs/labels of active tags
})

// --- usePagination hook implementation ---
function usePagination() {
    const [pagination, setPagination] = useState({ currentPage: 1 })

    function setPage(newPage) {
        setPagination({ currentPage: newPage })
    }

    return [pagination, setPage]
}

// --- OVERRIDE FOR TAG BUTTONS ---
export function withActiveTag(Component): ComponentType {
    return (props) => {
        const [store, setStore] = useStore()
        const label = props.label || ""
        const isActive = store.activeTags.includes(label)

        return (
            <Component
                {...props}
                variant={isActive ? "Active" : "Inactive"}
                onClick={() => {
                    if (!label) {
                        console.warn("Tag button is missing a 'label' prop.")
                        return
                    }
                    if (isActive) {
                        setStore({
                            activeTags: store.activeTags.filter(
                                (item) => item !== label
                            ),
                        })
                    } else {
                        setStore({
                            activeTags: [...store.activeTags, label],
                        })
                    }
                }}
            />
        )
    }
}

addPropertyControls(withActiveTag, {
    label: {
        title: "Tag Label",
        type: ControlType.String,
        defaultValue: "myTag",
        description: "The unique identifier for this tag (used for filtering)",
    },
})

// --- OVERRIDE FOR CLEAR FILTERS BUTTON ---
export function withClearFilters(Component): ComponentType {
    return (props) => {
        const [store, setStore] = useStore()
        const isVisible = store.activeTags.length > 0
        return (
            <AnimatePresence initial={false}>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, x: 20, display: "none" }}
                        animate={{ opacity: 1, x: 0, display: "" }}
                        exit={{ opacity: 0, x: 20, display: "none" }}
                    >
                        <Component
                            {...props}
                            onClick={() => setStore({ activeTags: [] })}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        )
    }
}

// --- FILTERABLE ITEM WITH PAGINATION ---
export function withPaginatedFiltering(Component) {
    return (props) => {
        const [pagination] = usePagination()
        const [store] = useStore()
        const ref = useRef(null)

        const tagsString = props.tags || ""
        const tags = tagsString
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)

        const isMatched =
            store.activeTags.length === 0 ||
            tags.some((tag) => store.activeTags.includes(tag))

        const matchedCards = Array.from(
            document.querySelectorAll("[data-filtered='true']")
        )

        let myIndex = -1
        if (ref.current) {
            const visibleCards = matchedCards.filter(
                (el) => el.getAttribute("data-filtered") === "true"
            )
            myIndex = visibleCards.indexOf(ref.current)
        }

        const start = (pagination.currentPage - 1) * 9
        const end = start + 9

        const shouldDisplay = isMatched && myIndex >= start && myIndex < end

        useEffect(() => {
            if (ref.current && ref.current.parentElement) {
                ref.current.parentElement.style.display = shouldDisplay
                    ? "block"
                    : "none"
            }
        }, [shouldDisplay])

        return (
            <div
                ref={ref}
                data-card-id
                data-filtered={isMatched ? "true" : "false"}
            >
                <Component {...props} />
            </div>
        )
    }
}

// --- PAGINATION CONTROLS COMPONENT ---
export const PaginationControls = () => {
    const [pagination, setPagination] = usePagination()

    const visibleCards = document.querySelectorAll("[data-filtered='true']")
    const totalPages = Math.ceil(visibleCards.length / 9)

    const handlePrev = () => {
        if (pagination.currentPage > 1) {
            setPagination({ currentPage: pagination.currentPage - 1 })
        }
    }

    const handleNext = () => {
        if (pagination.currentPage < totalPages) {
            setPagination({ currentPage: pagination.currentPage + 1 })
        }
    }

    if (totalPages <= 1) return null

    return (
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <button
                onClick={handlePrev}
                disabled={pagination.currentPage === 1}
            >
                Prev
            </button>
            <span>
                Page {pagination.currentPage} / {totalPages}
            </span>
            <button
                onClick={handleNext}
                disabled={pagination.currentPage === totalPages}
            >
                Next
            </button>
        </div>
    )
}

// --- OVERRIDE FOR FILTERABLE ITEMS (e.g., Lessons, Cards) ---
export function withLessonFiltering(Component): ComponentType {
    return (props) => {
        const [store] = useStore()
        const ref = useRef<HTMLDivElement>(null)

        const tagsString = props.tags || ""
        const tags = tagsString
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)

        const isVisible =
            store.activeTags.length === 0 ||
            tags.some((t) => store.activeTags.includes(t))

        useEffect(() => {
            if (ref.current && ref.current.parentElement) {
                ref.current.parentElement.style.display = isVisible
                    ? "block"
                    : "none"
            }
        }, [isVisible])

        return (
            <div ref={ref}>
                <Component {...props} />
            </div>
        )
    }
}

addPropertyControls(withLessonFiltering, {
    tags: {
        title: "Tags",
        type: ControlType.String,
        defaultValue: "tag1, tag2",
        description: "Comma-separated list of tags for this item",
    },
})
