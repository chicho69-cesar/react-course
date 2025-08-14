import { CustomBreadcrumbs } from "@/components/custom/custom-breadcrumbs"
import { CustomJumbotron } from "@/components/custom/custom-jumbotron"
import { searchHeroesAction } from "@/heroes/actions/search-heroes.action"
import HeroGrid from "@/heroes/components/hero-grid"
import HeroStats from "@/heroes/components/hero-stats"
import SearchControls from "@/heroes/components/search-controls"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router"

export default function SearchPage() {
  const [searchParams] = useSearchParams()

  const name = searchParams.get("name") ?? undefined
  const strength = searchParams.get("strength") ?? undefined

  const { data: heroes = [] } = useQuery({
    queryKey: ["search", { name, strength }],
    queryFn: () => searchHeroesAction({ name, strength }),
    staleTime: 1000 * 60 * 5,
  })

  return (
    <>
      <CustomJumbotron
        title="Búsqueda de SuperHéroes"
        description="Descubre, explora y administra super héroes y villanos"
      />

      <CustomBreadcrumbs currentPage="Buscador de héroes" />

      <HeroStats />
      <SearchControls />
      <HeroGrid heroes={heroes} />
    </>
  )
}
