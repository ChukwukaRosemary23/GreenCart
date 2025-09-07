import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'
import { useNavigate } from 'react-router-dom'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'
import Banner from '../assets/Banner2.jpg'
// import HorizontalBanner from '../components/HorizontalBanner'
import PromoPopup from '../components/PromoPopup'

const Home = () => {
  const loadingCategory = useSelector(state => state.product.loadingCategory)
  const categoryData = useSelector(state => state.product.allCategory)
  const subCategoryData = useSelector(state => state.product.allSubCategory)
  const navigate = useNavigate()

  const handleRedirectProductListpage = (id, cat) => {
    const subcategory = subCategoryData.find(sub => {
      const filterData = sub.category.some(c => c._id == id)
      return filterData ? true : null
    })

    if (subcategory) {
      const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(
        subcategory.name
      )}-${subcategory._id}`
      navigate(url)
    }
  }

  return (
    <section className='bg-white'>
      {/* Promo Popup */}
      <PromoPopup />

      {/* New Banner */}
      <div className='container mx-auto px-2 my-4'>
        <img
          src={Banner}
          alt='Main Promotional Banner'
          className='w-full rounded-lg shadow-md object-cover'
        />
      </div>

      {/* Old Horizontal Banner (optional) */}
      {/*
      <div className='container mx-auto px-2 my-4'>
        <HorizontalBanner />
      </div>
      */}

      {/* Category grid */}
      <div className='container mx-auto px-4 my-6 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2'>
        {loadingCategory ? (
          new Array(12).fill(null).map((_, index) => (
            <div
              key={index + 'loadingcategory'}
              className='bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse'
            >
              <div className='bg-blue-100 min-h-24 rounded'></div>
              <div className='bg-blue-100 h-8 rounded'></div>
            </div>
          ))
        ) : (
          categoryData.map(cat => (
            <div
              key={cat._id + 'displayCategory'}
              className='w-full h-full cursor-pointer'
              onClick={() => handleRedirectProductListpage(cat._id, cat.name)}
            >
              <div>
                <img
                  src={cat.image}
                  alt={cat.name}
                  className='w-full h-full object-scale-down hover:scale-105 transition-transform duration-200'
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Display category products */}
      {categoryData?.map(c => (
        <CategoryWiseProductDisplay
          key={c?._id + 'CategorywiseProduct'}
          id={c?._id}
          name={c?.name}
        />
      ))}
    </section>
  )
}

export default Home
