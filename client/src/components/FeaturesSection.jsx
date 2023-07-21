import {
  ThemeIcon,
  Text,
  Title,
  Container,
  SimpleGrid,
  useMantineTheme,
  createStyles,
  Group,
} from "@mantine/core";
import {
  IconGauge,
  IconCookie,
  IconUser,
  IconMessage,
  IconMessage2,
  IconLock,
} from "@tabler/icons";

export const MOCKDATA = [
  {
    icon: IconGauge,
    title: "Neo4j :",
    description: `Is an open source graph database management system that allows storing, managing and querying data in the form of graphs.

            `,
  },
  {
    icon: IconUser,
    title: "Express ",
    description: `Is a Node.js framework for building web and API applications. It provides an interface to manage HTTP routes and requests, facilitates session and cookie management, and allows the integration of middleware to add additional functionality.`,
  },
  {
    icon: IconCookie,
    title: "React ",
    description: `Is an open source JavaScript library for building user interfaces. It allows building web applications using reusable components and offers features such as state management and real-time user interface updating.`,
  },
  {
    icon: IconLock,
    title: "Node.js ",
    description: `Is an open-source JavaScript runtime environment that allows building server-side applications using JavaScript. It allows the use of JavaScript libraries for file access, database management and network communication.`,
  },
  {
    icon: IconMessage2,
    title: "Emotion ",
    description: `Is a JavaScript library for managing CSS styles in React applications. It allows to define styles using JSX components and manage them dynamically depending on the state of the application.`,
  },
  {
    icon: IconMessage,
    title: "Axios ",
    description: `Is a JavaScript library for HTTP requests. It allows to handle requests and responses asynchronously and to handle errors. It can be used for communications with REST APIs.`,
  },
];

export function Feature({ icon: Icon, title, description }) {
  const theme = useMantineTheme();
  return (
    <div>
      <Group>
        <ThemeIcon variant="light" size={40} radius={40}>
          <Icon size={20} stroke={1.5} />
        </ThemeIcon>
        <Text style={{ marginTop: "12px", marginBottom: '7px' } } transform="uppercase" weight={800}>
          {title}
        </Text>
      </Group>
      <Text size="sm" color="dimmed" style={{ lineHeight: 1.6 }}>
        {description}
      </Text>
    </div>
  );
}

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    marginBottom: theme.spacing.md,
    textAlign: "center",

    [theme.fn.smallerThan("sm")]: {
      fontSize: 28,
      textAlign: "left",
    },
  },

  description: {
    textAlign: "center",

    [theme.fn.smallerThan("sm")]: {
      textAlign: "left",
    },
  },
}));

export default function FeaturesSection({
  title,
  description,
  data = MOCKDATA,
}) {
  const { classes, theme } = useStyles();
  const features = data.map((feature, index) => (
    <Feature {...feature} key={index} />
  ));

  return (
    <Container className={classes.wrapper} py={"xl"}>
      <Title className={classes.title}>Technologies used</Title>

      <Container size={560} p={0}>
        <Text size="sm" className={classes.description}>
          {description}
        </Text>
      </Container>

      <SimpleGrid
        mt={60}
        cols={3}
        spacing={"md"}
        breakpoints={[
          { maxWidth: 980, cols: 2, spacing: "xl" },
          { maxWidth: 755, cols: 1, spacing: "xl" },
        ]}
      >
        {features}
      </SimpleGrid>
    </Container>
  );
}
