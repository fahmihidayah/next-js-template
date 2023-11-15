import { Avatar, Button, Center, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { ReactEventHandler } from "react";

 interface IProps {
    action : () => void
}

export default function LoggedInEndMenu({action} : IProps) {

    return <>
        <Menu>
            <MenuButton
                as={Button}
                rounded={'full'}
                variant={'Link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                />
            </MenuButton>
            <MenuList alignItems={'center'}>
                <br />
                <Center>
                    <Avatar
                        size={'2xl'}
                        src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                </Center>
                <br />
                <Center>
                    <p>Username</p>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem>Profile</MenuItem>
                <MenuItem onClick={(e : any) => {
                     e.preventDefault();
                     action()
                }}>
                Logout
                </MenuItem>
            </MenuList>
        </Menu>
    </>
}