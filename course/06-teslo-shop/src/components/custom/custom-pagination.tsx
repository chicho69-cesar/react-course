import { ChevronLeft, ChevronRight } from "lucide-react"
import { useSearchParams } from "react-router"
import { Button } from "../ui/button"

interface CustomPaginationProps {
  totalPages: number
}

export default function CustomPagination({ totalPages }: CustomPaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  const queryPage = searchParams.get("page") || "1"
  const page = isNaN(Number(queryPage)) ? 1 : Number(queryPage)

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return

    searchParams.set("page", newPage.toString())
    setSearchParams(searchParams)
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
        Anteriores
      </Button>

      {Array.from({ length: totalPages }).map((_, index) => (
        <Button
          key={index}
          variant={page === index + 1 ? 'default' : 'outline'}
          size="sm"
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        Siguientes
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
