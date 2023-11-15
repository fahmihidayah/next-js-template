import { Box, Spinner } from "@chakra-ui/react";

export default function LoadingIndicator() {
    return (

        <Box
            position="fixed"
            top="0"
            left="0"
            width="100%"
            height="100%"
            display="flex"
            backgroundColor="rgba(0, 0, 0, 0.5)" // Transparent background
            
            alignItems="center"
            justifyContent="center"
            zIndex="9999" // Ensure it's on top of other content
        >
            <Spinner size="xl" color="white" />
        </Box>
    )
}