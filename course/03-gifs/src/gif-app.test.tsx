import { render } from "@testing-library/react"
import { describe, expect, test } from "vitest"
import GifApp from "./gif-app"

describe("GifApp", () => {
  test("Should render component properly", () => {
    const { container } = render(<GifApp />)
    expect(container).toMatchSnapshot()
  })
})
