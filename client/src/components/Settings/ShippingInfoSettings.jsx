import { ActionIcon, Box,Title, Button, createStyles, Grid, Group, NativeSelect, Text, TextInput,useMantineColorScheme } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons";
import { useState } from "react";
import ReactFlagsSelect from "react-flags-select";


const useStyles = createStyles((theme) => {
    return {
        viewElement: {
            width: "70%",
           
            [theme.fn.smallerThan("md")]: {
                width: "85%",
            },
        },
        header: {
            paddingBottom: theme.spacing.md,
            marginBottom: theme.spacing.md * 15,
        },
        icon: {
            '&:hover': {
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
            },
        },

        shippingSettings: {
            padding: "20px",
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
            borderRadius: theme.radius.md,
        },

        label: {
            color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
            fontSize: theme.fontSizes.xs,
            fontWeight: 400,
        },
        data: {
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
            fontSize: theme.fontSizes.sm,
            fontWeight: 500,
        },
    };
});

export default function ShippingInfoSettings(props) {
    const { colorScheme } = useMantineColorScheme();
    const [selected, setSelected] = useState("IN");
    const onSelect = (code) => setSelected(code);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [wilaya, setWilaya] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [shippingAddress, setShippingAddress] = useState("");

    const { classes } = useStyles();

    return (
        <Box className={classes.viewElement}>
            <Group position="left" className={classes.header}>
                <Group>
                   

                    <Title size="h3" transform="uppercase">Change Shipping Informations</Title>
                </Group>
            </Group>
            <Box className={classes.shippingSettings}>
                <Box mb="xl" mt="sm">
                    <Grid>
                        <Grid.Col span={12} xs={6}>
                            <Text className={classes.label} size="xs">First Name</Text>
                            <TextInput onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                        </Grid.Col>
                        <Grid.Col span={12} xs={6}>
                            <Text className={classes.label} size="xs">Last Name</Text>
                            <TextInput onChange={(e) => setLastName(e.target.value)} value={lastName} />
                        </Grid.Col>
                    </Grid>
                    <Grid mb={"xs"}>
                        <Grid.Col span={12} xs={6}>
                            <Text className={classes.label} size="xs">Country</Text>
                            <ReactFlagsSelect
                    selected={selected}
                    onSelect={onSelect}
                    showSelectedLabel={true}
                    showSecondarySelectedLabel={true}
                    selectedSize={16}
                    showOptionLabel={true}
                    showSecondaryOptionLabel={true}
                    optionsSize={16}
                    placeholder={""}
                    searchable={false}
                    searchPlaceholder={""}
                    alignOptionsToRight={false}
                    fullWidth={true}
                    disabled={false}
                    className={colorScheme == "dark" ? "country-select" : ""}
                  />
                        </Grid.Col>
                        <Grid.Col span={12} xs={6}>
                            <Text className={classes.label} size="xs">Zip Code</Text>
                            <TextInput onChange={(e) => setZipCode(e.target.value)} value={zipCode} />
                        </Grid.Col>
                    </Grid>
                    <Text className={classes.label} size="xs">Shipping Address</Text>
                    <TextInput onChange={(e) => setShippingAddress(e.target.value)} value={shippingAddress} />
                    <Group position="right" mt={"xl"} >
                        <Button>Save Address</Button>
                    </Group>
                </Box>
            </Box>
        </Box>
    );
}



