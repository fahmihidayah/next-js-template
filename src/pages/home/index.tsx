import Navbar from "@/components/navbar/Navbar";
import { Container, Heading, Text } from "@chakra-ui/react";

export default function Home() {
    return <>
        <Navbar></Navbar>
        <Container >
            <Heading size={"2xl"} mt="20" textAlign={"center"}>Welcome to real project</Heading>
        </Container>
    </>
}