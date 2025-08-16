import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { renderHook, waitFor } from "@testing-library/react"
import type { PropsWithChildren } from "react"
import { beforeEach, describe, expect, test, vi } from "vitest"

import { getHeroesByPageAction } from "../actions/get-heroes-by-page.action"
import usePaginatedHero from "./use-paginated-hero"

vi.mock("../actions/get-heroes-by-page.action.ts", () => ({
  getHeroesByPageAction: vi.fn(),
}))

const mockGetHeroesByPageAction = vi.mocked(getHeroesByPageAction)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const tanStackCustomProvider = () => {
  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe("usePaginatedHero", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    queryClient.clear()
  })

  test("Should return the initial state (isLoading)", () => {
    const { result } = renderHook(() => usePaginatedHero(1, 6), {
      wrapper: tanStackCustomProvider(),
    })

    expect(result.current.isLoading).toBe(true)
    expect(result.current.isError).toBe(false)
    expect(result.current.data).toBe(undefined)
    expect(result.current.data).toBeUndefined()
  })

  test("Should return success state with data when API call succeeds", async () => {
    const mockHeroesData = {
      total: 20,
      pages: 4,
      heroes: [],
    }

    mockGetHeroesByPageAction.mockResolvedValue(mockHeroesData)

    const { result } = renderHook(() => usePaginatedHero(1, 6), {
      wrapper: tanStackCustomProvider(),
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.status).toBe("success")
    expect(mockGetHeroesByPageAction).toHaveBeenCalled()
    expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(1, 6, "all")
  })

  test("Should call getHeroesByPageActions with arguments", async () => {
    const mockHeroesData = {
      total: 20,
      pages: 4,
      heroes: [],
    }

    mockGetHeroesByPageAction.mockResolvedValue(mockHeroesData)

    const { result } = renderHook(() => usePaginatedHero(2, 16, "heroesABC"), {
      wrapper: tanStackCustomProvider(),
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.status).toBe("success")
    expect(mockGetHeroesByPageAction).toHaveBeenCalled()
    expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(2, 16, "heroesABC")
  })
})
