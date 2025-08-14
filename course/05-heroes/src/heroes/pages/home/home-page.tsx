import { useMemo } from "react"
import { useSearchParams } from "react-router"

import { CustomBreadcrumbs } from "@/components/custom/custom-breadcrumbs"
import { CustomJumbotron } from "@/components/custom/custom-jumbotron"
import { CustomPagination } from "@/components/custom/custom-pagination"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HeroGrid from "@/heroes/components/hero-grid"
import HeroStats from "@/heroes/components/hero-stats"
import useFavorites from "@/heroes/context/favorites/use-favorites"
import useHeroSummary from "@/heroes/hooks/use-hero-summary"
import usePaginatedHero from "@/heroes/hooks/use-paginated-hero"

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { favoriteCount, favorites } = useFavorites()

  const activeTab = searchParams.get("tab") ?? "all"
  const page = searchParams.get("page") ?? "1"
  const limit = searchParams.get("limit") ?? "6"
  const category = searchParams.get("category") ?? "all"

  const selectedTab = useMemo(() => {
    const validTabs = ["all", "favorites", "heroes", "villains"]
    return validTabs.includes(activeTab) ? activeTab : "all"
  }, [activeTab])

  const { data: heroesResponse } = usePaginatedHero(+page, +limit, category)
  const { data: summary } = useHeroSummary()

  return (
    <>
      <>
        <CustomJumbotron
          title="Universo de SuperHéroes"
          description="Descubre, explora y administra super héroes y villanos"
        />

        <CustomBreadcrumbs currentPage="Super Héroes" />

        <HeroStats />

        <Tabs value={selectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              value="all"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set('tab', 'all');
                  prev.set('category', 'all');
                  prev.set('page', '1');
                  return prev;
                })
              }
            >
              All Characters ({summary?.totalHeroes})
            </TabsTrigger>

            <TabsTrigger
              value="favorites"
              className="flex items-center gap-2"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set('tab', 'favorites');
                  return prev;
                })
              }
            >
              Favorites ({favoriteCount})
            </TabsTrigger>

            <TabsTrigger
              value="heroes"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set('tab', 'heroes');
                  prev.set('category', 'hero');
                  prev.set('page', '1');
                  return prev;
                })
              }
            >
              Heroes ({summary?.heroCount})
            </TabsTrigger>

            <TabsTrigger
              value="villains"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set('tab', 'villains');
                  prev.set('category', 'villain');
                  prev.set('page', '1');
                  return prev;
                })
              }
            >
              Villains ({summary?.villainCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>

          <TabsContent value="favorites">
            <HeroGrid heroes={favorites} />
          </TabsContent>

          <TabsContent value="heroes">
            <h1>Héroes</h1>
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>

          <TabsContent value="villains">
            <h1>Villanos</h1>
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
        </Tabs>

        {selectedTab !== 'favorites' && (
          <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
        )}
      </>
    </>
  )
}
