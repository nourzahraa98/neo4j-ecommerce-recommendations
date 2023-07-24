import {
  Accordion,
  createStyles,
  Grid,
  Text,
  Skeleton,
  Box,
  ScrollArea,
  Rating,
  Group,
} from "@mantine/core";
import { useState } from "react";
const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
  },
}));

const description =
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque corporis nisi incidunt exercitationem doloremque qui iure nobis eligendi reiciendis similique possimus ipsum error ad commodi voluptatem dolores rerum, laudantium iusto!";

export default function ProductCollapse({ isSkeleton, data }) {
  const { classes } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  return (
    <Box className={classes.wrapper}>
      <Accordion>
        <Accordion.Item className={classes.item} value="reset-password">
          <Accordion.Control>
            {isSkeleton ? (
              <Skeleton height={20} width={"45%"} />
            ) : (
              "Description"
            )}
          </Accordion.Control>
          <Accordion.Panel>
            {isSkeleton ? (
              <>
                <Skeleton height={13} width={"100%"} mb={10} />
                <Skeleton height={13} width={"45%"} />
              </>
            ) : (
              data.product.description
            )}
          </Accordion.Panel>
        </Accordion.Item>
        {data ? (
          <>
            <Accordion.Item className={classes.item} value="another-account">
              <Accordion.Control>
                {isSkeleton ? (
                  <Skeleton height={20} width={"25%"} />
                ) : (
                  `Reviews (${data.ratings ? data.ratings.length : 0})`
                )}
              </Accordion.Control>
              <Accordion.Panel>
                {isSkeleton ? (
                  <>
                    <Skeleton height={13} width={"100%"} mb={10} />
                    <Skeleton height={13} width={"45%"} />
                  </>
                ) : (
                  <ScrollArea
                    sx={{ height: "40vh" }}
                    onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
                  >
                    <c>
                      {data.ratings.map((ratings, index) => (
                        <Grid.Col key={index}>
                          <Box
                            sx={(theme) => ({
                              borderRadius: theme.radius.md,

                              backgroundColor:
                                theme.colorScheme === "dark"
                                  ? "#25262B"
                                  : "#e4e4e4",
                            })}
                            p={"md"}
                          >
                            <Text>{ratings.feedback}</Text>
                            <Group position="right">
                              {" "}
                              <Rating
                                value={Number(ratings.rating.low)}
                                readOnly
                              />
                            </Group>
                            <Group position="right">
                              {" "}
                              <Text
                                color="dimmed"
                                size={'sm'}
                              >{ratings.user ? ratings.user.name : "Anonymous"}</Text>
                            </Group>
                          </Box>
                        </Grid.Col>
                      ))}
                    </c>
                  </ScrollArea>
                )}
              </Accordion.Panel>
            </Accordion.Item>
          </>
        ) : (
          <></>
        )}
      </Accordion>
    </Box>
  );
}
