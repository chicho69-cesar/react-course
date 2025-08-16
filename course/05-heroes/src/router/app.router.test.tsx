import { render, screen } from "@testing-library/react"
import {
  createMemoryRouter,
  Outlet,
  RouterProvider,
  useParams,
} from "react-router"
import { describe, expect, test, vi } from "vitest"
import { appRouter } from "./app.router"

vi.mock("../heroes/layouts/heroes-layout.tsx", () => ({
  HeroesLayout: () => (
    <div data-testid="heroes-layout">
      <Outlet />
    </div>
  ),
}))

vi.mock("../heroes/pages/home/home-page.tsx", () => ({
  HomePage: () => <div data-testid="home-page"></div>,
}))

vi.mock("../heroes/pages/hero/hero-page.tsx", () => ({
  HeroPage: () => {
    const { id = "" } = useParams()
    return <div data-testid="hero-page">HeroPage - {id}</div>
  },
}))

vi.mock("../heroes/pages/search/search-page.tsx", () => ({
  default: () => <div data-testid="search-page"></div>,
}))

describe("appRouter", () => {
  test("Should be configured as expected", () => {
    expect(appRouter.routes).toMatchSnapshot()
  })

  test("Should render home page at root path", () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ["/"],
    })

    render(<RouterProvider router={router} />)
    expect(screen.getByTestId("home-page")).toBeDefined()
  })

  test("Should render hero page at /heroes/:idSlug path", () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ["/heroes/superman"],
    })

    render(<RouterProvider router={router} />)
    expect(screen.getByTestId("hero-page").innerHTML).toContain("superman")
  })

  test("Should render search page at /search path", async () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ["/search"],
    })

    render(<RouterProvider router={router} />)
    expect(await screen.findByTestId("search-page")).toBeDefined()
  })

  test("Should redirect to home page for unknown routes", () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ["/otra-pagina-rara"],
    })

    render(<RouterProvider router={router} />)
    expect(screen.getByTestId("home-page")).toBeDefined()
  })
})
