import { Card, Text, Badge, Button, Image, Anchor } from "@mantine/core";
import { IconShoppingCart } from '@tabler/icons';
import image from '../assets/images/product.png';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import axios from "axios";

export default function ProductCard({ data }) {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const addToCartHandler = () => {
    axios
      .post("http://localhost:4000/users/addtocart", {
        userId: currentUser.id,
        productId: data.product.id,
        quantity: 1
      })
      .then((res) => {
        navigate("/cart");
      })
      .catch((err) => {
        console.log(err);
      });
  };
   console.log(data)
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      {data && typeof data === "object" ? (
        <Anchor component={Link} to={`/product/${data.product.id}`}>
          <Card.Section>
            <Image src={data.product.image} height={160} alt="image" />
          </Card.Section>

          <Text size="sm" weight={700} mt="sm">
            {data.product.brand}
          </Text>

          <Text size="sm" color="dimmed" mt="xs">
            {data.product.name}
          </Text>

          <Badge color="blue" variant="light" mt="sm">
            {data.product.price.low}{" "}DA
          </Badge>
        </Anchor>
      ) : (
        "..."
      )}
      <Button
        onClick={addToCartHandler}
        disabled={!currentUser}
        leftIcon={<IconShoppingCart />}
        variant="outline"
        fullWidth
        mt="md"
        radius="md"
      >
        Add to cart
      </Button>
    </Card>
  );
}
