import { Button, Container, Group, Text } from "@mantine/core";
import {
  FeaturesSection,
  HeroHeader,
  ProductsCarousel,
  ProductsGrid,
} from "../components/_index";
import { useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const HomePage = () => {
  const [products, setProducts] = useState(null);
  const [highestRatedProducts, setHighestRatedProducts] = useState([]);
  const [similarProducts, setSimilarRatedProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const fetchProducts = async () => {
    try {
      const result = await axios.get("http://localhost:4000/products/some/15");
      setProducts(result.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchHighestRateProducts = useCallback(async () => {
    try {
      const result = await axios.post(
        "http://localhost:4000/products/highest_rated"
      );
      setHighestRatedProducts(result.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  const fetchSimilarProducts = useCallback(async () => {
    try {
      const result = await axios.get(
        "http://localhost:4000/products/similar/" + currentUser.id
      );
      setSimilarRatedProducts(
        result.data.map((product) => {
          return {
            product: product
          }
        })
      );
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [currentUser]);

  const fetchPopularProducts = useCallback(async () => {
    try {
      const result = await axios.get(
        "http://localhost:4000/products/region/" + currentUser.region
      );
      setPopularProducts( result.data.map((product) => {
        return {
          product: product
        }
      }));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [currentUser]);

  useEffect(() => {

    if (currentUser){
    fetchHighestRateProducts();

    fetchSimilarProducts();

    fetchPopularProducts();}

    fetchProducts()
  }, [currentUser, fetchHighestRateProducts, fetchPopularProducts, fetchSimilarProducts]);

  return (
    <Container size={"xl"} p={0}>
      <HeroHeader />
      { currentUser ? 
      (<><ProductsCarousel
          section={"highest rated"}
          products={highestRatedProducts} /><ProductsCarousel
            section={"similar products you purchased"}
            products={similarProducts} /><ProductsCarousel
            section={"Popular products in your region"}
            products={popularProducts} /></>): <></>}
     <ProductsCarousel
        section={"More Products"}
        products={products}
      />
      <FeaturesSection title="Téchnologies utilisées" description="" />
      <Container>
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24284.630134035654!2d35.508281992852674!3d33.89379128541138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f16fd58af6ed7%3A0x9d2a1bd20d8a0d0d!2sBeirut%2C%20Lebanon!5e0!3m2!1sen!2s!4v1674415749002!5m2!1sen!2s"
          width="100%"
          height="350"
          style={{ border: "1px solid black" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Container>
    </Container>
  );
};

export default HomePage;

// Path: src\pages\Home.jsx
