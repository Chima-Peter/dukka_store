import CategoryUI from "@/components/category/category_ui";
import { Metadata } from "next";

type Props = {
  params: Promise<{ subcategory: string }>
}


export const generateMetadata = async (
  { params }: Props,
): Promise<Metadata> => {
  const subcategory = (await (params)).subcategory;
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


const SubCategoryPage = async (
  { params }: Props
) => {
  const subcategory = (await params).subcategory;
  const decodedSubCategory = decodeURIComponent(subcategory);
  
  return (
    <CategoryUI subCategory={decodedSubCategory} />
  )
}

export default SubCategoryPage