import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Checkbox,
  InputBase,
  Anchor,
  Select,
  Stack,
  Container,
  Textarea,
  NumberInput,
} from "@mantine/core";
import InputMask from "react-input-mask";

import { notifications } from "@mantine/notifications";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactFlagsSelect from "react-flags-select";
import { IconCheck, IconX } from "@tabler/icons";
import { API_BASE_URL } from "../../constants";

const AddProduct = () => {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      image: "",
      name: "",
      screen_type: "",
      screen_size: "",
      ram_frequency: "",
      ram_type: "",
      description: "", //
      cpu: "",
      disk_size: "",
      screen_resolution: "",
      gpu: "",
      ram_size: "",
      price: "",
      disk_type: "",
      screen_refresh_rate: "",
      category: "",
      brand: "",
    },
  });

  const submit = async (form) => {
      await axios.post(`${API_BASE_URL}/products`,{form}).then((response) => {
        notifications.show({
            title: 'Product Added Successfully',
            icon : <IconCheck/>,
            withBorder:true
        })
      })
  }

  return (
    <Container size={800} mt={70} mb={100}>
      <Paper radius="md" p="xl" withBorder>
        <Text
          size="xl"
          weight={900}
          transform="uppercase"
          align="center"
          mb={"lg"}
        >
          Add Product
        </Text>

        <form onSubmit={form.onSubmit((form) => {submit(form)})}>
          <Stack mb={"xl"}>
            <Group position="apart" w={"100%"} mb={"lg"}>
              <TextInput
                required
                {...form.getInputProps("name")}
                label="Product Name"
                placeholder="Lenovo "
                w={"45%"}
              />

              <TextInput
                required
                label="Category"
                placeholder="Gaming Laptop"
                {...form.getInputProps("category")}
                w={"45%"}
              />
            </Group>
            <Group position="apart" w={"100%"} mb={"lg"}>
              <NumberInput
                required
                {...form.getInputProps("price")}
                label="Price"
                placeholder="123 "
                w={"45%"}
              />

              <TextInput
                required
                label="Brand"
                placeholder="Razer"
                {...form.getInputProps("brand")}
                w={"45%"}
              />
            </Group>
            <TextInput
                required
                label="Image"
                placeholder="Paste Product Image Link"
                {...form.getInputProps("image")}
              
              />
            <Textarea
            required
            label="Description"
          
            {...form.getInputProps("description")}
            />
            <Group position="apart" w={"100%"} mb={"lg"}>
              <TextInput
                required
                {...form.getInputProps("cpu")}
                label="CPU"
                placeholder="Intel Core i5-10600K"
                w={"45%"}
              />

              <TextInput
                required
                label="GPU"
                placeholder="AMD Radeon RX 580"
                {...form.getInputProps("gpu")}
                w={"45%"}
              />
            </Group>
           

            <Group w={"100%"} mb={"lg"} position="apart">
              <TextInput
                required
                {...form.getInputProps("ram_frequency")}
                label="Ram Frequency"
                placeholder="4400MHz"
                data={[]}
                size="xs"
              />

              <Select
                required
                label="Ram Type"
                placeholder="DDR4"
                {...form.getInputProps("ram_type")}
                data={ramType}
                size="xs"
              />
              <Select
                required
                label="Ram Size"
                placeholder="4GB"
                {...form.getInputProps("ram_size")}
                data={ramSize}
                size="xs"
              />
            </Group>
            <Group w={"100%"} mb={"lg"} position="apart">
              <Select
                required
                {...form.getInputProps("screen_size")}
                label="Screen Size"
                placeholder="15.6 inches"
                size="xs"
                data={screenSizes}
              />

              <Select
                required
                label="Screen Type"
                placeholder="TN"
                {...form.getInputProps("screen_type")}
                data={screenTypes}
                size="xs"
              />
              <Select
                required
                label="Screen Resolution"
                placeholder="1024 x 600"
                {...form.getInputProps("screen_resolution")}
                data={screenResolutions}
                size="xs"
              />
            </Group>

            <Group w={"100%"} mb={"lg"} position="apart">
              <Select
                required
                {...form.getInputProps("screen_refresh_rate")}
                label="Refresh Rate"
                placeholder="144Hz"
                size="xs"
                data={screenRefreshRates}
              />

              <Select
                required
                label="Disk Type"
                placeholder="HDD"
                {...form.getInputProps("disk_type")}
                data={diskTypes}
                size="xs"
              />
              <Select
                required
                label="Disk Size"
                placeholder="1TB"
                {...form.getInputProps("disk_size")}
                data={diskSizes}
                size="xs"
              />
            </Group>

            <></>
          </Stack>

          <Group position="apart" mt="xl">
            <div></div>
            <Button type="submit" >Sumbit Product</Button>
          </Group>
        </form>
        {/* <Text align="center">{errorLoginOrRegister}</Text> */}
      </Paper>
    </Container>
  );
};

export default AddProduct;


const screenTypes = [
    {
      value: "LCD",
      label: "LCD",
    },
    {
      value: "LED",
      label: "LED",
    },
    {
      value: "OLED",
      label: "OLED",
    },
    {
      value: "IPS",
      label: "IPS",
    },
    {
      value: "AMOLED",
      label: "AMOLED",
    },
    {
      value: "Retina",
      label: "Retina",
    },
    {
      value: "TFT",
      label: "TFT",
    },
    // Add more screen types as needed
  ];
  

  const screenSizes = [
    {
      value: "13.3 inches",
      label: "13.3 inches",
    },
    {
      value: "14 inches",
      label: "14 inches",
    },
    {
      value: "15.6 inches",
      label: "15.6 inches",
    },
    {
      value: "17.3 inches",
      label: "17.3 inches",
    },
    {
      value: "12 inches",
      label: "12 inches",
    },
    {
      value: "11.6 inches",
      label: "11.6 inches",
    },
    {
      value: "13 inches",
      label: "13 inches",
    },
    {
      value: "15 inches",
      label: "15 inches",
    },
    {
      value: "16 inches",
      label: "16 inches",
    },
    {
      value: "18 inches",
      label: "18 inches",
    },
    {
      value: "20 inches",
      label: "20 inches",
    },
    // Add more screen sizes as needed
  ];
  

  const screenResolutions = [
    {
      value: "1024 x 600",
      label: "1024 x 600",
    },
    {
      value: "1024 x 768",
      label: "1024 x 768",
    },
    {
      value: "1280 x 800",
      label: "1280 x 800",
    },
    {
      value: "1440 x 900",
      label: "1440 x 900",
    },
    {
      value: "1680 x 1050",
      label: "1680 x 1050",
    },
    {
      value: "1920 x 1200",
      label: "1920 x 1200",
    },
    {
      value: "2560 x 1600",
      label: "2560 x 1600",
    },
    {
      value: "3440 x 1440",
      label: "3440 x 1440",
    },
    {
      value: "5120 x 2160",
      label: "5120 x 2160",
    },
    // Add more screen resolutions as needed
  ];
  
  const ramSize =[
    {
      value: "2GB",
      label: "2GB",
    },
    {
      value: "4GB",
      label: "4GB",
    },
    {
      value: "8GB",
      label: "8GB",
    },
    {
      value: "16GB",
      label: "16GB",
    },
    {
      value: "32GB",
      label: "32GB",
    },
    {
      value: "64GB",
      label: "64GB",
    },
    {
      value: "128GB",
      label: "128GB",
    },
    {
      value: "256GB",
      label: "256GB",
    },
    // Add more RAM sizes as needed
  ]

const ramType= [
    {
      value: "DDR",
      label: "DDR",
    },
    {
      value: "DDR2",
      label: "DDR2",
    },
    {
      value: "DDR2 SDRAM",
      label: "DDR2 SDRAM",
    },
    {
      value: "DDR3",
      label: "DDR3",
    },
    {
      value: "DDR3 SDRAM",
      label: "DDR3 SDRAM",
    },
    {
      value: "DDR4",
      label: "DDR4",
    },
    {
      value: "DDR4 SDRAM",
      label: "DDR4 SDRAM",
    },
    {
      value: "DDR5",
      label: "DDR5",
    },
    {
      value: "SDRAM",
      label: "SDRAM",
    },
    {
      value: "SRAM",
      label: "SRAM",
    },
    // Add more RAM types as needed
  ]

  const screenRefreshRates = [
    {
      value: "60 Hz",
      label: "60 Hz",
    },
    {
      value: "75 Hz",
      label: "75 Hz",
    },
    {
      value: "90 Hz",
      label: "90 Hz",
    },
    {
      value: "120 Hz",
      label: "120 Hz",
    },
    {
      value: "144 Hz",
      label: "144 Hz",
    },
    {
      value: "165 Hz",
      label: "165 Hz",
    },
    {
      value: "240 Hz",
      label: "240 Hz",
    },
    {
      value: "360 Hz",
      label: "360 Hz",
    },
    // Add more screen refresh rates as needed
  ];
  

  const diskTypes = [
    {
      value: "HDD",
      label: "HDD (Hard Disk Drive)",
    },
    {
      value: "SSD",
      label: "SSD (Solid State Drive)",
    },
    {
      value: "eMMC",
      label: "eMMC (Embedded MultiMediaCard)",
    },
    {
      value: "NVMe",
      label: "NVMe (Non-Volatile Memory Express)",
    },
    // Add more disk types as needed
  ];
  

  const diskSizes= [  { value: "128GB", label: "128GB" },  { value: "256GB", label: "256GB" },  { value: "512GB", label: "512GB" },  { value: "1TB", label: "1TB" },  { value: "2TB", label: "2TB" },  { value: "4TB", label: "4TB" },  { value: "8TB", label: "8TB" },  { value: "16TB", label: "16TB" },  { value: "32TB", label: "32TB" },  { value: "64TB", label: "64TB" },  { value: "128TB", label: "128TB" }]
