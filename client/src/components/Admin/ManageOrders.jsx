import { ActionIcon, Avatar, Container, createStyles, Group, ScrollArea, Table } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons";
import profuctImage from '../../assets/images/product-2.jpg'
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

    scrolled: {
        boxShadow: theme.shadows.sm,
    },
    nowraptext: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    }
}));

const parseDate = (neo4jDateTime) => {
    const { year, month, day, hour, minute, second, nanosecond } = neo4jDateTime;
  
    const date = new Date(
      year.low,
      month.low - 1, // neo4j dates start at 1, js dates start at 0
      day.low,
      hour.low,
      minute.low,
     
    );
  
    return date.toLocaleString();
  };

export default function ManageOrders() {

    const { classes, cx } = useStyles();
    const [scrolled, setScrolled] = useState(false);
    const [orders, setOrders] = useState([]);
    const fetchUserShippingAddress = useCallback(async () => {
      try {
        const result = await axios.get(
          `${API_BASE_URL}/orders`
        );
  
        setOrders(result.data);
        console.log(result.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }, []);
  
    useEffect(() => {
      fetchUserShippingAddress();
    }, [fetchUserShippingAddress]);
  

    const rows = data.map((row, _index) => (
        <tr key={_index}>
            <td><Avatar src={profuctImage} size="lg" radius={"sm"} color={"primary"} /></td>
            <td>{row.productName}</td>
            <td>{row.username}</td>
            <td>{row.email}</td>
            <td>{row.fullname}</td>
            <td>{row.phoneNumber}</td>
            <td>{row.shippingAddress}</td>
        </tr>
    ));

    return (
        <Container >
            <Group position="apart" className={classes.header}>
                <Group>
                    <ActionIcon className={classes.icon} radius="xl">
                        <IconChevronLeft size={24} />
                    </ActionIcon>
                    <h2>Manage Orders</h2>
                </Group>
            </Group>
            <ScrollArea sx={{ height: "70vh" }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
                <Table sx={{ minWidth: 700 }}>
                    <thead className={cx(classes.headerTable, { [classes.scrolled]: scrolled })}>
                        <tr>
                            <th >PRODUCT</th>
                            <th>PRODUCT-NAME</th>
                            <th>USERNAME</th>
                            <th>EMAIL</th>
                            <th>FULL-NAME</th>
                            <th>PHONE-NUMBER</th>
                            <th>SHIPPING-ADDRESS</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </ScrollArea>
        </Container >
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

]
