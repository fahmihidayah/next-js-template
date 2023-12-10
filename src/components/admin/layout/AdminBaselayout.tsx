import { Flex, Heading } from "@chakra-ui/react";
import SidebarWithHeader from "../sidebar/SidebarHeader";
import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiMenu,
    FiBell,
    FiUser,
    FiChevronDown,
    FiTag,
    FiPackage,
} from 'react-icons/fi'
import React from "react";
import LoadingIndicator from "@/components/loadingIndicator/LoadingIndicator";


export interface AdminBaseLayoutProps {
    children: React.ReactNode;
    isLoading?: boolean 
}

export default function AdminBaseLayout({ children, isLoading}: AdminBaseLayoutProps) {
    return <>
        <SidebarWithHeader linkItems={[

            { name: 'Home', icon: FiHome, link: "/admin" },
            { name: 'Users', icon: FiUser, link: "/admin/users" },
            { name: 'Categories', icon: FiTag, link: "/admin/categories" },
            { name: 'Posts', icon: FiPackage, link: "/admin/posts" },
            { name: 'Settings', icon: FiSettings, link: "/admin/settings" },
        ]}>
            {children}

        </SidebarWithHeader>
        {isLoading && <LoadingIndicator></LoadingIndicator>}
    </>
}