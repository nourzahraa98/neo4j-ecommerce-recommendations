import {
  ActionIcon,
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Grid,
  Group,
  Image,
  Text,
  Title,
  TextInput,
  Radio,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { notifications } from '@mantine/notifications';
import { IconCheck, IconTrash, IconX} from "@tabler/icons";
import { AuthContext } from "../context/AuthContext";
import { useCallback, useContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { modals } from "@mantine/modals";
import { API_BASE_URL } from "../constants";

const CartPage = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState([]);
  const [shippingAddress, setShippingAddress] = useState(0);

  const getproducts = useCallback(async () => {
    axios
      .get(`${API_BASE_URL}/users/cart/${currentUser.id}`)
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentUser.id]);

  const fetchUserShippingAddress = useCallback(async () => {
    try {
      const result = await axios.get(
        `${API_BASE_URL}/users/shipping-address/${currentUser.id}`
      );

      setAddress(result.data);
      setShippingAddress(result.data[0].id);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [currentUser.id]);

  useEffect(() => {
    getproducts();
    fetchUserShippingAddress();
  }, [fetchUserShippingAddress, getproducts]);



  const orderHandler = () => {
    axios
      .post(`${API_BASE_URL}/orders/checkout`, { userId: currentUser.id,shippingAddressId : shippingAddress })
      .then((res) => {
        notifications.show({
          title: 'Order Placed Successfully',
         icon: <IconCheck />,
         withBorder : true,
       
      
        })
        navigate("/");
      })
      .catch((err) => {
       
        console.log(err);
      });
  };

  const openConfirmModal = () =>
    modals.open({
      title: "Select Shipping Address",
      size: "lg",

      children: (
        <>
          <Group position="right" mb={24}>
            <Button
              onClick={() => {
                navigate("/settings/add-shipping-info");
                modals.closeAll();
              }}
            >
              Add New Address
            </Button>
          </Group>
          {address ?
          (<Grid spacing="sm">
            {address.map((i, index) => (
              <Grid.Col
                my={"sm"}
                key={i.id}
                sx={(theme) => ({
                  borderRadius: theme.radius.md,
                  border: "1px solid #25262B",
                  cursor: "pointer",
                  background:
                    i.id === shippingAddress
                      ? theme.colorScheme == "light"
                        ? "#cfcfcf"
                        : "#25262B"
                      : "transparent",
                })}
                p={"md"}
                onClick={() => {
                  setShippingAddress(i.id);
                  modals.closeAll();
                  notifications.show({
                    title: 'Address Selected Successfully',
                   icon: <IconCheck />,
                   withBorder : true,
                 
                
                  })
                }}
              >
                <Text weight={600} size={"sm"} color={""}>
                  {i.name}
                </Text>
                <Text weight={400} size={"sm"} color={"dimmed"}>
                  {i.address +
                    " " +
                    i.city +
                    " " +
                    i.country +
                    "- " +
                    i.zipcode}
                </Text>
              </Grid.Col>
            ))}
          </Grid>) : <></>}
        </>
      ),
    });

  return (
    <Container size={"lg"}>
      <Center>
        <Title mb={"xl"} transform="uppercase">
          Product Cart
        </Title>
      </Center>
      <Grid gutter={"xl"}>
        <Grid.Col
          sm={12}
          md={8}
          px={20}
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[1],
            borderRadius: theme.radius.md,
          })}
        >
          <Grid
            my={10}
            columns={24}
            sx={(theme) => ({
              [theme.fn.smallerThan("md")]: {
                display: "none",
              },
            })}
          >
            <Grid.Col span={12}>
              <Center>
                <Text weight={700}>PRODUCT</Text>
              </Center>
            </Grid.Col>
            <Grid.Col span={3}>
              <Center>
                <Text weight={700}></Text>
              </Center>
            </Grid.Col>
            <Grid.Col span={1}>
              <Center>
                <Text weight={700}></Text>
              </Center>
            </Grid.Col>
            <Grid.Col span={6}>
              <Center>
                <Text weight={700}>PRICE</Text>
              </Center>
            </Grid.Col>
          </Grid>
          <Divider
            sx={(theme) => ({
              [theme.fn.smallerThan("md")]: {
                display: "none",
              },
            })}
          />
          {cart &&
            cart.map((product, index) => (
              <div key={index}>
                <CartProduct product={product} />
                <Divider />
              </div>
            ))}
          {cart && cart.length === 0 && (
            <Box
              sx={(theme) => ({
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[1],
                borderRadius: theme.radius.md,
                padding: theme.spacing.md,
              })}
            >
              <Center>
                <Text size={"xl"} weight={700}>
                  Your cart is empty
                </Text>
              </Center>
            </Box>
          )}
        </Grid.Col>
        <Grid.Col
          sm={12}
          md={4}
          sx={(theme) => ({
            padding: 0,
            paddingLeft: theme.spacing.md,
            [theme.fn.smallerThan("md")]: {
              paddingLeft: 0,
            },
          })}
        >
          <Box
            sx={(theme) => ({
              borderRadius: theme.radius.md,
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[6]
                  : theme.colors.gray[1],
            })}
          >
            <Box
              sx={(theme) => ({
                paddingTop: theme.spacing.md,
                paddingLeft: theme.spacing.md,
                paddingRight: theme.spacing.md,
                [theme.fn.smallerThan("md")]: {
                  marginTop: theme.spacing.md,
                },
              })}
            >
              <Title order={2} mb={25}>
                Cart Total
              </Title>
              <Text size={"sm"} transform="uppercase" color="dimmed">
                Subtotal :{" "}
                {cart.reduce(
                  (acc, product) => acc + parseFloat(product.price.low),
                  0
                )}
                DA
              </Text>
              <Text size={"sm"} color="dimmed" transform="uppercase">
                Total Items :{" "}
                {cart.reduce(
                  (acc, product) => acc + parseFloat(product.quantity.low),
                  0
                )}
              </Text>

              <Divider my={20} />
              <Text size={"md"} weight={500}>
                Total :{" "}
                {cart.reduce(
                  (acc, product) => acc + parseFloat(product.price.low),
                  0
                )}
                DA
              </Text>
            </Box>
            <Group position="apart" p={"md"}>
              <Button
                onClick={openConfirmModal}
                disabled={cart.length === 0}
                mt={30}
              >
                SELECT ADDRESS
              </Button>
              <Button
                onClick={orderHandler}
                disabled={cart.length === 0}
                mt={30}
              >
                CHECKOUT
              </Button>
            </Group>
          </Box>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

function CartProduct({ product }) {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const showWhenMd = (theme) => ({
    display: "none",
    [theme.fn.smallerThan("md")]: {
      display: "block",
    },
  });
  const { currentUser } = useContext(AuthContext);


  const deleteItem = async (id) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/users/cart/${id}`
      );

    } catch (error) {
      console.error(error); // Handle the error
    }
  };
  console.log(product.cartId)
  return (
    <Box
      color={theme.colorScheme === "dark" ? "white" : "black"}
      
    >
      <Grid
        my={10}
        sx={(theme) => ({
          borderRadius: theme.radius.md,
          "&:hover": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[0],
          },
        })}
      >
        <Grid.Col span={9}>
          <Group spacing="sm">
            <Group
              sx={(theme) => ({
                [theme.fn.smallerThan("xs")]: {
                  flexDirection: "row-reverse",
                },
              })}
            >
              <Tooltip label="Delete this product">
                <ActionIcon variant="outline" onClick={() => {
                    deleteItem(product.cartId)
                    navigate(0);
                     notifications.show({
                      title: 'Item Deleted Successfully',
                      message: product.name,
                      icon: <IconCheck />,
                      withBorder : true,
                   
                  
                    })
                  }}>
                  <IconTrash size={18} color="red"  />{" "}
                </ActionIcon>
              </Tooltip>
              <Anchor component={Link}
      to={`/product/${product.id}`}>
              <Image
                width={70}
                height={70}
                radius={"md"}
                src={product.image}
                alt={product.name}
              />
              </Anchor>
            </Group>
            <Box
              sx={(theme) => ({
                marginLeft: theme.spacing.xs,
                [theme.fn.smallerThan("sm")]: {
                  marginLeft: 0,
                },
              })}
            >
              <Text weight={500}>{product.brand + " " + product.cpu}</Text>
              <Text size="sm">{product.cpu + " " + product.gpu}</Text>
            </Box>
          </Group>
        </Grid.Col>
        <Grid.Col
          span={3}
          sx={(theme) => ({
            marginTop: 20,
            [theme.fn.smallerThan("md")]: {
              marginTop: "0",
            },
          })}
        >
          <Grid>
            <Grid.Col xs={12} md={3}>
              <Group position="center">
                <Text weight={700} sx={showWhenMd}>
                  PRICE:
                </Text>
                <Text weight={700} size={'sm'}>
                
                {product.price.low}{" "}DA  </Text>
              </Group>
            </Grid.Col>
            <Grid.Col xs={12} md={4}>
              <Grid py={5}></Grid>
            </Grid.Col>
            <Grid.Col xs={12} md={3}>
              <Group position="center">
                <Text weight={700} sx={showWhenMd}>
                  TOTAL:
                </Text>
                {product.quantity.low}
              </Group>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </Box>
  );
}

export default CartPage;
