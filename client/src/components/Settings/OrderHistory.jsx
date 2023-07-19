import {
  Box,
  Title,
  createStyles,
  Grid,
  Group,
  Button,
  Text,
  Popover,
  ScrollArea,
  Image,
} from "@mantine/core";
import { IconCaretDown, IconTrash } from "@tabler/icons";
import { useState, useContext, useEffect, useCallback } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { API_BASE_URL } from "../../constants";
import { Link, useNavigate } from "react-router-dom";
const useStyles = createStyles((theme) => {
  return {
    viewElement: {
      width: "70%",

      [theme.fn.smallerThan("md")]: {
        width: "85%",
      },
    },
  };
});

const parseDate = (neo4jDateTime) => {
  const { year, month, day, hour, minute, second, nanosecond } = neo4jDateTime;

  const date = new Date(
    year.low,
    month.low - 1, // neo4j dates start at 1, js dates start at 0
    day.low,
    hour.low,
    minute.low
  );

  return date.toLocaleString();
};

const OrderHistory = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);

  const fetchUserShippingAddress = useCallback(async () => {
    try {
      const result = await axios.get(
        `${API_BASE_URL}/orders/user/${currentUser.id}`
      );

      setOrders(result.data);
      console.log(result.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [currentUser.id]);

  useEffect(() => {
    fetchUserShippingAddress();
  }, [fetchUserShippingAddress]);

  const cancelOrder = async (data) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/orders/status`, data);
      navigate(0);
    } catch (error) {
      console.error(error); // Handle the error
    }
  };

  return (
    <Box className={classes.viewElement}>
      <Group position="center" className={classes.header} my={24}>
        <Title size="h2" transform="uppercase">
          Order History
        </Title>
      </Group>
      <ScrollArea
        sx={{ height: "80vh" }}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Grid mb={"md"}>
          {orders.map((i, index) => (
            <Grid.Col key={index} p={"sm"}>
              <Box
                sx={(theme) => ({
                  borderRadius: theme.radius.md,

                  backgroundColor:
                    theme.colorScheme === "dark" ? "#25262B" : "#e4e4e4",
                })}
                pb={"md"}
              >
                <Group
                  p={"md"}
                  position="apart"
                  sx={(theme) => ({
                    backgroundColor:
                      theme.colorScheme === "dark" ? "#202022" : "#c3c3c3",
                  })}
                >
                  <Grid>
                    <Grid.Col>
                      <Text weight={"bold"} size="sm" transform="uppercase">
                        Order Placed
                      </Text>
                      <Text
                        weight={"bold"}
                        color={"dimmed"}
                        size="xs"
                        transform="uppercase"
                      >
                        {parseDate(i.order.date)}{" "}
                      </Text>
                    </Grid.Col>
                  </Grid>
                  <Grid px={5}>
                    <Grid.Col>
                      <Text weight={"bold"} size="sm" transform="uppercase">
                        Price
                      </Text>
                      <Text
                        weight={"bold"}
                        color={"dimmed"}
                        size="xs"
                        transform="uppercase"
                      >
                        {i.product.price.low} DA
                      </Text>
                    </Grid.Col>
                  </Grid>
                  <Grid px={5}>
                    <Grid.Col>
                      <Text weight={"bold"} size="sm" transform="uppercase">
                        Shipped to
                      </Text>
                      <Popover
                        width={300}
                        position="bottom"
                        withArrow
                        shadow="md"
                      >
                        <Popover.Target>
                          <Group>
                            <Text
                              weight={"bold"}
                              color={"dimmed"}
                              size="xs"
                              transform="uppercase"
                              sx={{ cursor: "pointer" }}
                            >
                              {i.address.name}{" "}
                            </Text>
                            <IconCaretDown size={16} />{" "}
                          </Group>
                        </Popover.Target>
                        <Popover.Dropdown>
                          <Text weight={"bold"} px={"sm"} size={14}>
                            {i.address.name}
                          </Text>
                          <Text weight={"bold"} size={14} px="sm">
                            {i.address.address}
                          </Text>
                          <Group px={"sm"}>
                            <Text weight={"bold"} size={14}>
                              {i.address.city}
                              {","}
                            </Text>
                            <Text weight={"bold"} size={14}>
                              {i.address.country}
                            </Text>
                          </Group>
                          <Text weight={"bold"} size={14} px={"sm"}>
                            {i.address.zipcode}
                          </Text>
                        </Popover.Dropdown>
                      </Popover>
                    </Grid.Col>
                  </Grid>

                  <Grid px={5}>
                    <Grid.Col>
                      <Text weight={"bold"} size="sm" transform="uppercase">
                        Order ID
                      </Text>
                      <Text
                        weight={"bold"}
                        color={"dimmed"}
                        size="xs"
                        transform="uppercase"
                      >
                        {i.order.id}
                      </Text>
                    </Grid.Col>
                  </Grid>
                </Group>
                <Text
                  weight={"bold"}
                  size="md"
                  color="dimmed"
                  transform="uppercase"
                  p={"md"}
                >
                  {i.status}
                </Text>
                <Group pl={"md"} position="apart">
                  <Group>
                    <Image
                      width={70}
                      height={70}
                      radius={"md"}
                      src={i.product.image}
                      alt={i.product.name}
                    />
                    <Box
                      sx={(theme) => ({
                        marginLeft: theme.spacing.xs,
                        [theme.fn.smallerThan("sm")]: {
                          marginLeft: 0,
                        },
                      })}
                    >
                      <Text weight={"bold"} size="sm" transform="uppercase">
                        {i.product.brand + " " + i.product.cpu}
                      </Text>
                      <Text weight={"bold"} color={"dimmed"} size="xs">
                        {i.product.cpu + " " + i.product.gpu}
                      </Text>
                    </Box>
                  </Group>

                  <Box px="md">
                    <Box p={'xs'}>
                      <Button
                        weight={"bold"}
                        size="xs"
                        transform="uppercase"
                       fullWidth
                        variant="outline"

                        onClick={() => navigate(`/product/${i.product.id}`)}
                      >
                        <Text weight={"bold"} size="xs" transform="uppercase">View Product</Text> 
                      </Button>
                    </Box>
                    {i.status != "CANCELED" ? (
                      <Box p={'xs'}>
                        {i.status == "DELIVERED" ? (
                          <Button
                            weight={"bold"}
                            size="xs"
                            fullWidth
                            color="teal"
                            transform="uppercase"
                            variant="outline"
                            disabled = {i.rating.length > 0 ? true : false}
                            onClick={() => navigate(`/rate-product?product=${i.product.id}&order=${i.order.id}`)}
                            
                          >
                            <Text weight={"bold"} size="xs" transform="uppercase"> Rate The Product</Text>
                          </Button>
                        ) : (
                          <Button
                            weight={"bold"}
                            size="xs"
                            color="teal"
                            transform="uppercase"
                           
                            variant="outline"
                            onClick={() => {
                              cancelOrder({
                                order: i.order.id,
                                product: i.product.id,
                                status: "CANCELED",
                              });
                            }}
                          >
                           <Text weight={"bold"} size="xs" transform="uppercase">Cancel Order</Text>  
                          </Button>
                        )}
                      </Box>
                    ) : (
                      <Grid.Col></Grid.Col>
                    )}
                  </Box>
                </Group>
              </Box>
            </Grid.Col>
          ))}
        </Grid>
      </ScrollArea>
    </Box>
  );
};

export default OrderHistory;
