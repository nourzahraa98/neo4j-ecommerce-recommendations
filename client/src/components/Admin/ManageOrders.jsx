import {
  ActionIcon,
  Avatar,
  Container,
  createStyles,
  Group,
  ScrollArea,
  Table,
  Box,
  Title,
  Grid,
  Button,
  Text,
  Select,
  Popover,
  Image,
} from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons";
import profuctImage from "../../assets/images/product-2.jpg";
import { IconCaretDown, IconTrash } from "@tabler/icons";
import { useState, useContext, useEffect, useCallback } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../constants";
import { Link, useNavigate } from "react-router-dom";
const useStyles = createStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing.md,
  },
  icon: {
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[2],
    },
  },
  headerTable: {
    zIndex: "10",
    position: "sticky",
    top: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
  nowraptext: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

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

export default function ManageOrders() {
  const navigate = useNavigate();

  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const [orders, setOrders] = useState([]);

  const fetchOrders = useCallback(async () => {
    try {
      const result = await axios.get(`${API_BASE_URL}/orders`);

      setOrders(result.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  const updateOrderStatus = async (data) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/orders/status`, data);
      navigate(0);
    } catch (error) {
      console.error(error); // Handle the error
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <Container>
      <Group position="apart" className={classes.header}>
        <Group>
          <Title size="h3" transform="uppercase">
            Manage Orders
          </Title>
        </Group>
      </Group>
      <ScrollArea
        sx={{ height: "70vh" }}
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
                        Customer
                      </Text>
                      <Text
                        weight={"bold"}
                        color={"dimmed"}
                        size="xs"
                        transform="uppercase"
                      >
                        {i.user.name}
                      </Text>
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
                <Select
                  w={"40%"}
                  color="dimmed"
                  transform="uppercase"
                  p={"md"}
                  defaultValue={i.status}
                  disabled={i.status == "CANCELED" ? true : false}
                  onChange={(e) => {
                    updateOrderStatus(
                        {
                            order: i.order.id,
                            product: i.product.id,
                            status: e,
                          }
                    )
                  }}
                  data={[
                    {
                      value: "WAITING FOR CONFIRMATION",
                      label: "WAITING FOR CONFIRMATION",
                    },
                    { value: "ORDER CONFIRMED", label: "ORDER CONFIRMED" },
                    { value: "SHIPPED", label: "SHIPPED" },
                    { value: "DELIVERED", label: "DELIVERED" },
                    { value: "CANCELED", label: "CANCELED" },
                  ]}
                />

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
                </Group>
              </Box>
            </Grid.Col>
          ))}
        </Grid>
      </ScrollArea>
    </Container>
  );
}

const data = [
  {
    productName: "MacBook ait M2",
    username: "mouayed-01",
    email: "m_keziz@estin.dz",
    fullname: "keziz mouayed",
    shippingAddress: "khenchela ouled-rechache",
    phoneNumber: "07 99 02 85 74",
  },
  {
    productName: "MacBook ait M2",
    username: "mouayed-01",
    email: "m_keziz@estin.dz",
    fullname: "keziz mouayed",
    shippingAddress: "khenchela ouled-rechache",
    phoneNumber: "07 99 02 85 74",
  },
  {
    productName: "MacBook ait M2",
    username: "mouayed-01",
    email: "m_keziz@estin.dz",
    fullname: "keziz mouayed",
    shippingAddress: "khenchela ouled-rechache",
    phoneNumber: "07 99 02 85 74",
  },
  {
    productName: "MacBook ait M2",
    username: "mouayed-01",
    email: "m_keziz@estin.dz",
    fullname: "keziz mouayed",
    shippingAddress: "khenchela ouled-rechache",
    phoneNumber: "07 99 02 85 74",
  },
  {
    productName: "MacBook ait M2",
    username: "mouayed-01",
    email: "m_keziz@estin.dz",
    fullname: "keziz mouayed",
    shippingAddress: "khenchela ouled-rechache",
    phoneNumber: "07 99 02 85 74",
  },
  {
    productName: "MacBook ait M2",
    username: "mouayed-01",
    email: "m_keziz@estin.dz",
    fullname: "keziz mouayed",
    shippingAddress: "khenchela ouled-rechache",
    phoneNumber: "07 99 02 85 74",
  },
  {
    productName: "MacBook ait M2",
    username: "mouayed-01",
    email: "m_keziz@estin.dz",
    fullname: "keziz mouayed",
    shippingAddress: "khenchela ouled-rechache",
    phoneNumber: "07 99 02 85 74",
  },
  {
    productName: "MacBook ait M2",
    username: "mouayed-01",
    email: "m_keziz@estin.dz",
    fullname: "keziz mouayed",
    shippingAddress: "khenchela ouled-rechache",
    phoneNumber: "07 99 02 85 74",
  },
];
