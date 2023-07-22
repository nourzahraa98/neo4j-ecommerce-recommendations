import { Carousel } from "@mantine/carousel";
import { Title, Box, Group, Button } from "@mantine/core";
import { useMediaQuery, useToggle } from "@mantine/hooks";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useEffect, useState ,useContext} from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const ProductsCarousel = ({ section,products }) => {
  
     
  const is_sm = useMediaQuery("(min-width: 768px)");

  return (
    <Box 
      sx={(theme) => ({
        margin: 10,
        //align children to the center
        [theme.fn.smallerThan("sm")]: {
          margin: 0,
          marginBottom: theme.spacing.xl * 3,
        },
        marginBottom: theme.spacing.xl * 3,
      })}
    >
      {products && products.length > 0 && (
        <>
          <Group my={20}>
            <Title ml={10} order={2} transform="uppercase">
              {section}
            </Title>
          </Group>
          <Carousel
            withControls={is_sm}
            slideSize="19.5%"
            slideGap={20}
            mb={'xl'}
            loop
            breakpoints={[
              { maxWidth: "lg", slideSize: "25%" },
              { maxWidth: "md", slideSize: "33.33333%" },
              { maxWidth: "sm", slideSize: "50%" },
              { maxWidth: "xs", slideSize: "75%" },
            ]}
            align={is_sm ? "start" : "center"}
          >
            {products.map((element, index) => (
              <Carousel.Slide key={index}>
                <ProductCard index={index} data={element} />
              </Carousel.Slide>
            ))}
          </Carousel>
        </>
      )}
    </Box>
  );
};

export default ProductsCarousel;



// CALL {MATCH(u:User{id:"id1"})-[:PLACED_ORDER]->(o:Order)-[i:INCLUDES]->(p:Product)  WHERE i.rating>=3.5 RETURN  COLLECT (DISTINCT p.category) AS categories ,COLLECT (DISTINCT p.brand) AS brands  , u AS u1 } MATCH(u2:User)-[PLACED_ORDER]->(o2:Order)-[i2:INCLUDES]->(p2:Product)                           WHERE (i2.rating)>=3.5 RETURN DISTINCT  p2

// ---------------------------------------------------

// recommending highly rated products:
// MATCH (u:User) WHERE NOT EXISTS ((u)-[:PLACED_ORDER]->(:Order)) WITH u  MATCH(o)-[i:INCLUDES]->(p:Product) WHERE toFloat(i.rating)>=3.5 RETURN p


// -------------------------------------------------------------------
// recommending popular in region:// here you have to add variable 'userRegion' instead of "Beirut" on first column
// MATCH(u:User{region:"Beirut"}) WHERE NOT EXISTS ((u)-[:PLACED_ORDER]->(:Order)) WITH u.region as r  MATCH (u1:User{id:r})-[:PLACED_ORDER]->(o)-[i:INCLUDES]->(p:Product) WHERE toFloat(i.rating)>=3.5   RETURN DISTINCT p