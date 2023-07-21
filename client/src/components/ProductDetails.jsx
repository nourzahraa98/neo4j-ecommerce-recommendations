import { Carousel } from "@mantine/carousel";
import {
  Grid,
  Image,
  Anchor,
  Breadcrumbs,
  Badge,
  Title,
  Group,
  Button,
  Col,
  ActionIcon,
  Tooltip,
  Card,
  Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconHeart, IconShoppingCart, IconReplace } from "@tabler/icons";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import productImage from "../assets/images/product-2.jpg";
import { ProductCollapse, ProductDetailsSkeleton } from "./_index";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const unwantedFields = [
  "name",
  "category",
  "price",
  "description",
  "brand",
  "id",
  "image",
];

const ProductDetails = ({ data }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const is_md = useMediaQuery("(min-width: 1200px)");
  const isMobile = useMediaQuery('(max-width: 755px)');
  const span = isMobile ? 12 : 4;
  const [isLoading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const addToCartHandeler = () => {
    setLoading(true);
    axios
      .post("http://localhost:4000/users/addtocart", {
        userId: currentUser.id,
        productId: data.product.id,
        quantity: 1,
      })
      .then((res) => {
        setLoading(false);
        navigate("/cart");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };



 
let items = []
 
   items = [
    { title: "DIGITAL-EASY", href: `/product/${data.product.id}` },
    { title: data.product.brand, href: `/product/${data.product.id}` },
    { title: data.product.cpu, href: `/product/${data.product.id}` },
  ].map((item, index) => (
    <Anchor
      href={item.href}
      key={index}
      sx={(theme) => ({
        fontSize: theme.fontSizes.xl,
        [theme.fn.smallerThan("xs")]: {
          fontSize: theme.fontSizes.sm,
        },
      })}
    >
      {item.title}
    </Anchor>
  ));

  return (
    <>
      {data  ? (
        <Grid p={0} m={0}>
          {is_md ? <ProductGallery image={data.product.image} /> : null}

          <Grid.Col sm={12} lg={6}>
            <Breadcrumbs
              sx={(theme) => ({
                maxWidth: "100vw",
                overflow: "hidden",
                marginBottom: theme.spacing.xl * 2,
              })}
            >
              {items}
            </Breadcrumbs>
            {!is_md ? <ProductGallery image={data.product.image} /> : null}

            <Title mb={20} weight={400} order={2}>
              {data.product.brand + " " + data.product.cpu}
            </Title>
            <Badge size="xl" variant="outline">
              {data.product.price.low} {"DA"}
            </Badge>
            <Grid my={10} px={isMobile ? 20 :10}  >
              {Object.keys(data.product).map((key, index) => {
                if (!unwantedFields.includes(key)) {
                  return (
                    <Col span={span}   key={index}>
                      <Card shadow="lg" p="md" radius="md" h={90} w={!isMobile ? 190 : 250} sx={(theme) => ({
                        backgroundColor: theme.colorScheme == 'dark' ?theme.colors.dark : '#d1d1d1'
                      })

                      }>
                        <Text weight={500} size="sm"  transform="uppercase" align="center">
                          {key.replace("_" , " ")}
                        </Text>
                        <Text weight={900} size="xs" align="center">
                            
                          { data.product[key]}
                        </Text>
                        
                      </Card>
                    </Col>
                  );
                }
              })}
            </Grid>
            <Group position="start" mt={20}>
              <Button
                disabled={!currentUser}
                onClick={() => {
                  addToCartHandeler();
                }}
                loading={isLoading}
                leftIcon={<IconShoppingCart />}
                variant="default"
                radius="md"
                size="lg"
              >
                Add to cart
              </Button>

              <Tooltip
                label={isLiked ? "Unlike this product" : "Like this product"}
              >
                <ActionIcon
                  onClick={() => setIsLiked(!isLiked)}
                  size="xl"
                  radius="xl"
                  variant="transparent"
                >
                  {isLiked ? <IconHeart fill="red" /> : <IconHeart />}
                </ActionIcon>
              </Tooltip>

              <Tooltip label="Add to compare">
                <ActionIcon size="xl" radius="xl" variant="transparent">
                  <IconReplace size={25} />
                </ActionIcon>
              </Tooltip>
            </Group>
            <ProductCollapse data={data} isSkeleton={data ? false : true} />
          </Grid.Col>
        </Grid>
      ) : (
        "..."
      )}
    </>
  );
};

function ProductGallery({image}) {
  const is_sm = useMediaQuery("(min-width: 768px)");

  return (
    <Grid.Col sm={12} lg={6}>
      <Image radius={"md"} mb={10} src={image} alt="ProductImage" />

      <Carousel
        withControls={is_sm}
        slideGap="xs"
        mt={0}
        mx="auto"
        align="center"
        slideSize="33.3333333%"
        slidesToScroll={1}
        loop
        draggable={true}
        controlsOffset="xs"
        onNextSlide={() => console.log("Next slide")}
        onPreviousSlide={() => console.log("Prev slide")}
      >
        {[1, 2, 3, 4, 5].map((_, index) => (
          <Carousel.Slide key={index}>
            <Image
              radius={"md"}
              src={image}
              alt={`ProductImage${index}`}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Grid.Col>
  );
}

export default ProductDetails;
