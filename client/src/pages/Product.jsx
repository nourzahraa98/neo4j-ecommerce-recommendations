import { Container, Box, Title, Group, Badge } from "@mantine/core";
import {
  ProductsGrid,
  ProductDetails,
  ProductDetailsSkeleton,
} from "../components/_index";
import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      const result = await axios.get(`http://localhost:4000/products/${id}`);
      console.log(result.data)
      setProduct(result.data); // Assuming the product data is nested under the "product" key
    } catch (error) {
      console.log("Error:", error);
      // Handle the error, such as displaying an error message or fallback data
    }
  }, [id]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);


  return (
    <Container size="xl">
      {product ? (
        <Badge color="cyan" size="xs" mt={4} ml={10}>
          {product.product ? product.product.category : null}
        </Badge>
      ) : (
        <></>
      )}
      <Group mb={20}>
        <Title ml={10} order={2} transform="uppercase">
          Product Details
        </Title>
      </Group>

      {product ? (
        <ProductDetails data={product} />
      ) : (
        <ProductDetailsSkeleton />
      )}
      <Box mt={70} m={0} p={0}>
        <ProductsGrid
          text="RECOMMENDATIONS"
          useRecommandation={false}
          ProductsNumber={4}
        />
      </Box>
    </Container>
  );
};

export default ProductPage;
