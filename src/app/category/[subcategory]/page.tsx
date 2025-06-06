import CategoryUI from "@/components/category/category_ui";

export async function generateMetadata({ params }: { params: { subcategory: string } }) {
  const { subcategory } = await params
  const category = decodeURIComponent(subcategory);
  // Ensure the category is sanitized and formatted correctly

  const title = `${category} - Melch`;
  const description = `Explore top ${category} products tailored to your needs on Melch.`;

  return {
    title,
    description,
    keywords: `Melch, ${category}, products, shop by category`,
    robots: "index, follow",
    openGraph: {
      title,
      description,
      url: `https://melch.com/category/${category}`,
      siteName: "Melch",
      images: [
        {
          url: `https://melch.com/og-images/${category}.jpg`, // Optional: category-based OG image
          width: 1200,
          height: 630,
          alt: `${category} category on Melch`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

const SubCategoryPage = ({ params }: { params: { subcategory: string } }) => {
  const { subcategory } = params;
  const decodedSubCategory = decodeURIComponent(subcategory);
  
  return (
    <CategoryUI subCategory={decodedSubCategory} />
  )
}

export default SubCategoryPage