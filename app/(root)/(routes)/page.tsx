import { Categories } from '@/components/categories'
import { Companions } from '@/components/companions'
import { SearchInput } from '@/components/search-input'
import prismadb from '@/lib/prismadb'

interface RootPageProps {
  searchParams: {
    categoryId: string
    name: string
  }
}

const RootPage = async ({ searchParams }: RootPageProps) => {
  const companions = await prismadb.companion.findMany({
    where: {
      categoryId: searchParams.categoryId,
      name: {
        search: searchParams.name,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    // Count the number of messages
    include: {
      _count: {
        select: {
          messages: true,
        },
      },
    },
  })
  const categories = await prismadb.category.findMany()
  console.log('categories', categories)
  return (
    <div className="h-full space-y-2 p-4">
      <SearchInput />
      <Categories data={categories} />
      <Companions data={companions} />
    </div>
  )
}

export default RootPage
