import { fireEvent, render, screen } from "@testing-library/react"
import type { PropsWithChildren } from "react"
import { MemoryRouter } from "react-router"
import { describe, expect, test, vi } from "vitest"

import { CustomPagination } from "./custom-pagination"

vi.mock("../ui/button.tsx", () => ({
  Button: ({ children, ...props }: PropsWithChildren) => (
    <button {...props}>{children}</button>
  ),
}))

const renderWithRouter = (
  component: React.ReactElement,
  initialEntries?: string[]
) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>{component}</MemoryRouter>
  )
}

describe("CustomPagination", () => {
  test("Should render component with default values", () => {
    renderWithRouter(<CustomPagination totalPages={6} />)

    expect(screen.getByText("Anteriores")).toBeDefined()
    expect(screen.getByText("Siguientes")).toBeDefined()

    expect(screen.getByText("1")).toBeDefined()
    expect(screen.getByText("2")).toBeDefined()
    expect(screen.getByText("3")).toBeDefined()
    expect(screen.getByText("4")).toBeDefined()
    expect(screen.getByText("5")).toBeDefined()
    expect(screen.getByText("6")).toBeDefined()
  })

  test("Should disabled previous button when page is 1", () => {
    renderWithRouter(<CustomPagination totalPages={5} />)
    const previousButton = screen.getByText("Anteriores")
    expect(previousButton.getAttributeNames()).toContain("disabled")
  })

  test("Should disabled next button when we are in the last page", () => {
    renderWithRouter(<CustomPagination totalPages={5} />, ["/?page=5"])
    const nextButton = screen.getByText("Siguientes")
    expect(nextButton.getAttributeNames()).toContain("disabled")
  })

  test("Should disabled button 3 when we are in page 3", () => {
    renderWithRouter(<CustomPagination totalPages={10} />, ["/?page=3"])

    const button2 = screen.getByText("2")
    const button3 = screen.getByText("3")

    expect(button2.getAttribute("variant")).toBe("outline")
    expect(button3.getAttribute("variant")).toBe("default")
  })

  test("Should change page when click on number button", () => {
    renderWithRouter(<CustomPagination totalPages={5} />, ["/?page=3"])

    const button2 = screen.getByText("2")
    const button3 = screen.getByText("3")

    expect(button2.getAttribute("variant")).toBe("outline")
    expect(button3.getAttribute("variant")).toBe("default")

    fireEvent.click(button2)

    expect(button2.getAttribute("variant")).toBe("default")
    expect(button3.getAttribute("variant")).toBe("outline")
  })
})
