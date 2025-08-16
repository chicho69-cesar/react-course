import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render, screen, waitFor } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import { beforeEach, describe, expect, test, vi } from "vitest"
import { searchHeroesAction } from "../../actions/search-heroes.action"
import type { Hero } from "../../types/hero.interface"
import SearchPage from "./search-page"

vi.mock("../../actions/search-heroes.action.ts")
const mockSearchHeroesAction = vi.mocked(searchHeroesAction)

vi.mock("../../../components/custom/custom-jumbotron.tsx", () => ({
  CustomJumbotron: () => <div data-testid="custom-jumbotron"></div>,
}))

vi.mock("../../components/search-controls.tsx", () => ({
  SearchControls: () => <div data-testid="search-controls"></div>,
}))

vi.mock("../../components/hero-grid.tsx", () => ({
  HeroGrid: ({ heroes }: { heroes: Hero[] }) => (
    <div data-testid="hero-grid">
      {heroes.map((hero) => (
        <div key={hero.id}>{hero.name}</div>
      ))}
    </div>
  ),
}))

const queryClient = new QueryClient()

const renderSearchPage = (initialEntries: string[] = ["/"]) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <QueryClientProvider client={queryClient}>
        <SearchPage />
      </QueryClientProvider>
    </MemoryRouter>
  )
}

describe("SearchPage", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test("Should render SearchPage with default values", () => {
    const { container } = renderSearchPage()

    expect(mockSearchHeroesAction).toHaveBeenCalledWith({
      name: undefined,
      strength: undefined,
    })

    expect(container).toMatchSnapshot()
  })

  test("Should call search action with name parameter", () => {
    const { container } = renderSearchPage(["/search?name=superman"])

    expect(mockSearchHeroesAction).toHaveBeenCalledWith({
      name: "superman",
      strength: undefined,
    })

    expect(container).toMatchSnapshot()
  })

  test("Should call search action with strength parameter", () => {
    const { container } = renderSearchPage(["/search?strength=6"])

    expect(mockSearchHeroesAction).toHaveBeenCalledWith({
      name: undefined,
      strength: "6",
    })

    expect(container).toMatchSnapshot()
  })

  test("Should call search action with strength and name parameters", () => {
    const { container } = renderSearchPage(["/search?strength=8&name=batman"])

    expect(mockSearchHeroesAction).toHaveBeenCalledWith({
      name: "batman",
      strength: "8",
    })

    expect(container).toMatchSnapshot()
  })

  test("Should render HeroGrid with search results", async () => {
    const mockHeroes = [
      { id: "1", name: "Clark Kent" } as unknown as Hero,
      { id: "2", name: "Bruce Wayne" } as unknown as Hero,
    ]

    mockSearchHeroesAction.mockResolvedValue(mockHeroes)

    renderSearchPage()

    await waitFor(() => {
      expect(screen.getByText("Clark Kent")).toBeDefined()
      expect(screen.getByText("Bruce Wayne")).toBeDefined()
    })
  })
})
