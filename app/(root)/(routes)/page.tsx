import { Categories } from '@/components/categories'
import { SearchInput } from '@/components/search-input'
import prismadb from '@/lib/prismadb'

const RootPage = async () => {
  const categories = await prismadb.category.findMany()
  console.log('categories', categories)
  return (
    <div className="h-full space-y-2 p-4">
      <SearchInput />
      <Categories data={categories} />
    </div>
  )
}

export default RootPage
