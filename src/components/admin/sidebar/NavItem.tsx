'use client'
import { Box, Flex, FlexProps, Icon } from "@chakra-ui/react"
import Link from "next/link"
import { IconType } from "react-icons"

interface NavItemProps extends FlexProps {
    icon: IconType
    children: React.ReactNode
}

export default function NavItem({ icon, children, ...rest }: NavItemProps) {
    return (
        <Box
            style={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}>
            <Flex
                align="center"
                p="3"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'blue.400',
                    color: 'white',
                }}
                {...rest}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                
                {children}
                
            </Flex>
        </Box>
    )
}