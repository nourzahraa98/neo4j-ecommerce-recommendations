import { Box, Grid, Group, Title } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const ProductsGrid = ({ text, ProductsNumber, useRecommandation }) => {
  const [products, setProducts] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const url = useRecommandation && currentUser ? `http://localhost:4000/products/recommandations/${currentUser.id}` : `http://localhost:4000/products/some/${ProductsNumber}`;

  const fetchProducts = useCallback(async () => {
    try {
      const result = await axios.get(url);
      setProducts(result.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [url]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    console.log(products);
  }, [products]);


  return (
    <Box sx={(theme) => ({
      margin: 10,
      [theme.fn.smallerThan("sm")]: {
        margin: 0,
      },
      marginBottom: theme.spacing.xl * 3,
    })}>
      <Group mb={20}>
        <Title ml={10} order={2}>
          {text}
        </Title>
      </Group>
      {products.length > 0 ? (
        <Grid gutter={5} m={0} p={0}>
          {products.map((element, index) => (
            <Grid.Col key={index} span={6} xs={6} sm={4} lg={3}>
              <ProductCard data={element} />
            </Grid.Col>
          ))}
        </Grid>
      ) : (
        <Grid gutter={5} m={0} p={0}>
          {Array.from({ length: ProductsNumber }, (_, index) => (
            <Grid.Col key={index} span={6} xs={6} sm={4} lg={3}>
              <ProductCardSkeleton />
            </Grid.Col>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ProductsGrid;
