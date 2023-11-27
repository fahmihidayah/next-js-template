'use client'
import ConfirmationModal from "@/components/modal";
import { useAuth } from "@/hooks/useAuth";
import { User } from "@/types/auth/user";
import { Avatar, Box, Flex, FlexProps, HStack, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, VStack, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi'

interface MobileProps extends FlexProps {

  onOpen?: () => void
}

export interface EndMenuWithUserProps extends FlexProps {

}

export function EndMenuWithUser({... rest} : EndMenuWithUserProps) {

  const { isOpen, onOpen: onOpenDisclosure, onClose: onCloseDisclosure } = useDisclosure()

  const router = useRouter();

  const user = useAuth();
  return <>

    <Flex
      width={{
        base: "0%",
        sm: "100%",
        lg: "0%",
        md: "0%"
      }}
      justifyContent={{
        sm: "center"
      }}
      {... rest}
    >
      <Image src={"/vercel.svg"} alt="logo" width={100} height={100}></Image>
    </Flex>

    <HStack spacing={{ base: '0', md: '6' }}>
      {/* <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} /> */}
      <Flex alignItems={'center'}>
        <Menu>
          <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
            <HStack>
              <Avatar
                size={'sm'}
                src={
                  'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                }
              />
              <VStack
                display={{ base: 'none', md: 'flex' }}
                alignItems="flex-start"
                spacing="1px"
                ml="2">
                <Text fontSize="sm">{user.user?.email}</Text>
              </VStack>
              <Box display={{ base: 'none', md: 'flex' }}>
                <FiChevronDown />
              </Box>
            </HStack>
          </MenuButton>
          <MenuList
            bg={useColorModeValue('white', 'gray.900')}
            borderColor={useColorModeValue('gray.200', 'gray.700')}>
            <MenuItem>Profile</MenuItem>
            <MenuDivider />
            <MenuItem onClick={() => onOpenDisclosure()}>Sign out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </HStack>
    <ConfirmationModal
        onClose={onCloseDisclosure}
        isOpen={isOpen} title={"Confirmation"}
        message={`Do you want to log out?`}
        action={() => {
          user.logoutAction()
          router.push("/home")
        }}
      ></ConfirmationModal>
  </>
}

export default function AdminNavbar({ onOpen, ...rest }: MobileProps) {

  return (
    <>
      <Flex
        px={{ base: 4, md: 4 }}
        alignItems="center"
        bg={useColorModeValue('white', 'gray.900')}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
        justifyContent={{ base: 'space-between', md: 'flex-end' }}
        {...rest}>
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={() => {
            onOpen?.()
          }}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />

      <EndMenuWithUser ></EndMenuWithUser>
      </Flex>
      
    </>
  )
}