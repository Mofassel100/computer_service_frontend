import { useAllcategorysQuery } from "@/redux/api/categoryApi";

type ACDepartmentFieldProps = {
  name: string;
  label?: string;
};

export const Category = () => {
  const { data, isLoading } = useAllcategorysQuery({
    limit: 100,
    page: 1,
  });
  const Catagorys = data?.allcategorys;
  const categoryData = Catagorys?.map((category: any) => {
    return {
      label: category?.title,
      key: category?.id,
    };
  });

  return { categoryData };
};

export default Category;
