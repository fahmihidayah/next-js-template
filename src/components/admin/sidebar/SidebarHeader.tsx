'use client'
import { Box, Drawer, DrawerContent, useColorModeValue, useDisclosure } from "@chakra-ui/react"
import SidebarContent, { LinkItemProps } from "./SidebarContent"
import { ReactNode } from "react"
import AdminNavbar from "./AdminNavbar"

interface SidebarWithHeaderProps {
    children : ReactNode
    linkItems : Array<LinkItemProps>
}

export default function SidebarWithHeader({linkItems, children } : SidebarWithHeaderProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent linkItems={linkItems} onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent linkItems={linkItems} onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <AdminNavbar onOpen={onOpen} />
      {/* <Navbar></Navbar> */}
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  )
}