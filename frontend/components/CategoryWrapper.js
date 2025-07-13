// app/components/CategoryWrapper.js
import Category from '@/components/Category';

const CategoryWrapper = async () => {
  const res = await fetch(`${base_api_url}/api/category/all`, {
    next: { revalidate: 5 }
  });
  const { categories } = await res.json();

  return <Category categories={categories} />;
};

export default CategoryWrapper;