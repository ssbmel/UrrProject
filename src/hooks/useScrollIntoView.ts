import { RefObject, useEffect } from "react"

interface scrollIntoViewProps {
    scrollRef : RefObject<HTMLDivElement> | null
}

const useScrollIntoView = ({scrollRef}:scrollIntoViewProps) => {
        if (scrollRef?.current) {
          scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        }
}

export default useScrollIntoView