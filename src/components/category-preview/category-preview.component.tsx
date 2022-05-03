import { FC } from "react";

import {
  CategoryPreviewContainer,
  Title,
  Preview,
} from "./category-preview.styles";
import ProductCard from "../product-card/product-card.component";

import Spinner from "../spinner/spinner.component";

import { selectCategoriesIsLoading } from "../../store/categories/category.selector";

import { useSelector } from "react-redux";
import { Fragment } from "react";

import { CategoryItem } from "../../store/categories/category.types";

type CategoryPreviewProps = {
  title: string;
  products: CategoryItem[];
};

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {
  const isLoading = useSelector(selectCategoriesIsLoading);

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryPreviewContainer>
          <h2>
            <Title to={title}>{title.toUpperCase()}</Title>
          </h2>
          <Preview>
            {products
              .filter((_, idx) => idx < 4)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </Preview>
        </CategoryPreviewContainer>
      )}
    </Fragment>
  );
};
export default CategoryPreview;
