import { ActionIcon,Tooltip, Image, Button, Container, createStyles, Group, ScrollArea, Title,Box,Grid,Text,Rating} from "@mantine/core";
import { IconEdit,IconTrash } from "@tabler/icons";
import { useState,useCallback,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../constants";

const useStyles = createStyles((theme) => ({
    header: {
        paddingBottom: theme.spacing.md,
    },
    icon: {
        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
        },
    },
    headerTable: {
        zIndex: "10",
        position: 'sticky',
        top: 0,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        transition: 'box-shadow 150ms ease',

        '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
                }`,
        },
    },
    center: {
        textAlign: "center",
    },

    scrolled: {
        boxShadow: theme.shadows.sm,
    },
}));

export default function ManageProducts() {
    const { classes, cx } = useStyles();
    const [scrolled, setScrolled] = useState(false);
    const [products,setProducts] = useState([]);

    const fetchProducts = useCallback(async () => {
        try {
          const result = await axios.get(`${API_BASE_URL}/products`);
    
          setProducts(result.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }, []);

      useEffect(() => {
        fetchProducts();
      },[fetchProducts])


    return (
        <Container>
        <Group position="apart" className={classes.header}>
        
            <Title size="h3" transform="uppercase">
              Manage Products
            </Title>
            <Button
          onClick={() => {
            navigate("/settings/add-shipping-info");
          }}
        >
          Add New Product
        </Button>
        
        </Group>
        <ScrollArea
          sx={{ height: "70vh" }}
          onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
        >
          <Grid mb={"md"}>
            {products.map((i, index) => (
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
                    <Grid px={5}>
                      <Grid.Col>
                        <Text weight={"bold"} size="sm" transform="uppercase">
                          Product ID
                        </Text>
                        <Text
                          weight={"bold"}
                          color={"dimmed"}
                          size="xs"
                          transform="uppercase"
                        >
                          {i.product.id}
                        </Text>
                      </Grid.Col>
                    </Grid>
                    <Grid>
                      <Grid.Col>
                        <Text weight={"bold"} size="sm" transform="uppercase">
                          Total Orders
                        </Text>
                        <Text
                          weight={"bold"}
                          color={"dimmed"}
                          size="xs"
                          transform="uppercase"
                        >
                          {i.orders.low}
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
                          Rating
                         </Text>
                         <Rating value={i.averageRating.low}  readOnly />

                      </Grid.Col>
                    </Grid>
                    <Grid px={5}>
                      <Grid.Col>
                        <Text weight={"bold"} size="sm" transform="uppercase">
                          category
                        </Text>
                        <Text
                          weight={"bold"}
                          color={"dimmed"}
                          size="xs"
                          transform="uppercase"
                        >
                          {i.product.category}
                        </Text>
                      </Grid.Col>
                    </Grid>
                    <Grid px={5}>
                      <Group>
                      <Tooltip label="Edit">
                      <ActionIcon
                    
                    onClick={() => {}}
                  >
                    <IconEdit size={24} />
                  </ActionIcon></Tooltip>
                  <Tooltip label="Delete">
                   <ActionIcon
                    
                    onClick={() => {}}
                  >
                    <IconTrash size={24} />
                  </ActionIcon></Tooltip>
                      </Group>
                    </Grid>
                    
                  </Group>
                 
  
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
        NAME: "Apple MacBook Air M2",
        CPU: "Apple M2",
        RAM: "16GB",
        STORAGE: "512GB",
        COUNT_IN_STOCK: 10,
        PRICE: "200 000DA",
    },
    {
        NAME: "Apple MacBook Air M2",
        CPU: "Apple M2",
        RAM: "16GB",
        STORAGE: "512GB",
        COUNT_IN_STOCK: 10,
        PRICE: "200 000DA",
    },
    {
        NAME: "Apple MacBook Air M2",
        CPU: "Apple M2",
        RAM: "16GB",
        STORAGE: "512GB",
        COUNT_IN_STOCK: 10,
        PRICE: "200 000DA",
    },
    {
        NAME: "Apple MacBook Air M2",
        CPU: "Apple M2",
        RAM: "16GB",
        STORAGE: "512GB",
        COUNT_IN_STOCK: 10,
        PRICE: "200 000DA",
    },
    {
        NAME: "Apple MacBook Air M2",
        CPU: "Apple M2",
        RAM: "16GB",
        STORAGE: "512GB",
        COUNT_IN_STOCK: 10,
        PRICE: "200 000DA",
    },
    {
        NAME: "Apple MacBook Air M2",
        CPU: "Apple M2",
        RAM: "16GB",
        STORAGE: "512GB",
        COUNT_IN_STOCK: 10,
        PRICE: "200 000DA",
    },
    {
        NAME: "Apple MacBook Air M2",
        CPU: "Apple M2",
        RAM: "16GB",
        STORAGE: "512GB",
        COUNT_IN_STOCK: 10,
        PRICE: "200 000DA",
    },
    {
        NAME: "Apple MacBook Air M2",
        CPU: "Apple M2",
        RAM: "16GB",
        STORAGE: "512GB",
        COUNT_IN_STOCK: 10,
        PRICE: "200 000DA",
    },
    {
        NAME: "Apple MacBook Air M2",
        CPU: "Apple M2",
        RAM: "16GB",
        STORAGE: "512GB",
        COUNT_IN_STOCK: 10,
        PRICE: "200 000DA",
    },
    {
        NAME: "Apple MacBook Air M2",
        CPU: "Apple M2",
        RAM: "16GB",
        STORAGE: "512GB",
        COUNT_IN_STOCK: 10,
        PRICE: "200 000DA",
    },
    {
        NAME: "Apple MacBook Air M2",
        CPU: "Apple M2",
        RAM: "16GB",
        STORAGE: "512GB",
        COUNT_IN_STOCK: 10,
        PRICE: "200 000DA",
    },
    {
        NAME: "Apple MacBook Air M2",
        CPU: "Apple M2",
        RAM: "16GB",
        STORAGE: "512GB",
        COUNT_IN_STOCK: 10,
        PRICE: "200 000DA",
    },
    {
        NAME: "Apple MacBook Air M2",
        CPU: "Apple M2",
        RAM: "16GB",
        STORAGE: "512GB",
        COUNT_IN_STOCK: 10,
        PRICE: "200 000DA",
    },
    {
        NAME: "Apple MacBook Air M2",
        CPU: "Apple M2",
        RAM: "16GB",
        STORAGE: "512GB",
        COUNT_IN_STOCK: 10,
        PRICE: "200 000DA",
    },
    {
        NAME: "Apple MacBook Air M2",
        CPU: "Apple M2",
        RAM: "16GB",
        STORAGE: "512GB",
        COUNT_IN_STOCK: 10,
        PRICE: "200 000DA",
    },
    {
        NAME: "Apple MacBook Air M2",
        CPU: "Apple M2",
        RAM: "16GB",
        STORAGE: "512GB",
        COUNT_IN_STOCK: 10,
        PRICE: "200 000DA",
    },
    {
        NAME: "Apple MacBook Air M2",
        CPU: "Apple M2",
        RAM: "16GB",
        STORAGE: "512GB",
        COUNT_IN_STOCK: 10,
        PRICE: "200 000DA",
    },
    {
        NAME: "Apple MacBook Air M2",
        CPU: "Apple M2",
        RAM: "16GB",
        STORAGE: "512GB",
        COUNT_IN_STOCK: 10,
        PRICE: "200 000DA",
    },



]

