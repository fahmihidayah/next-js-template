'use client'
import { Box, BoxProps, CloseButton, Flex, FlexProps, Text, useColorModeValue } from "@chakra-ui/react";


import { IconType } from 'react-icons'
import Link from "next/link";
import NavItem from "./NavItem";
import Image from "next/image";

export interface LinkItemProps {
  name: string;
  icon: IconType;
  link : string;
}

export interface SidebarProps extends BoxProps{
    linkItems : Array<LinkItemProps>
    onClose : () => void

}

export default function SidebarContent({onClose, linkItems, ... rest} : SidebarProps) {
    return (
        <Box
          transition="3s ease"
          bg={useColorModeValue('white', 'gray.900')}
          borderRight="1px"
          borderRightColor={useColorModeValue('gray.200', 'gray.700')}
          w={{ base: 'full', md: 60 }}
          pos="fixed"
          h="full"
          {...rest}>
          <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
            <Image src={"/vercel.svg"} alt="logo" width={100} height={100}></Image>
            <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
          </Flex>
          {linkItems.map((link) => (
            
            <Link href={link.link}>
            <NavItem key={link.name} icon={link.icon} >
              
              {link.name}
            </NavItem>
            </Link>
          ))}
        </Box>
      )
    }