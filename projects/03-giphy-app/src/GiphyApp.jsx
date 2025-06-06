import { useState } from "react"
import { AddCategory } from "./components/AddCategory"
import { GiftGrid } from "./components/GiftGrid"

function GiphyApp() {
  const [categories, setCategories] = useState(['Dragon Ball'])

  const onAddCategory = (newCategory) => {
    if (categories.includes(newCategory)) return
    setCategories([newCategory, ...categories])
  }

  return (
    <>
      <h1>
        Giphy App!
      </h1>

      <AddCategory onNewCategory={onAddCategory} />

      {categories.map((category) => (
        <GiftGrid
          key={category}
          category={category}
        />
      ))}
    </>
  )
}

export default GiphyApp
