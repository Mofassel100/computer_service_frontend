import type { MenuProps } from "antd";
import {
  ProfileOutlined,
  TableOutlined,
  AppstoreOutlined,
  ScheduleOutlined,
  ThunderboltOutlined,
  CreditCardOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { USER_ROLE } from "./role";
export const sidebarItems = (role: string) => {
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: "Profile",
      key: "profile",
      icon: < ProfileOutlined/>,
      children: [
        {
          label: <Link href={`/${role}`}>Account Profile</Link>,
          key: `/${role}/profile`,
        },
        {
          label: <Link href={`/${role}/change-password`}>Change Password</Link>,
          key: `/${role}/change-password`,
        },
      ],
    },
  ];

  const commonAdminSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/${role}/manage-user`}>Manage Students</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-student`,
    },
   
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
    {
      label: "Manage User",
      key: "manage-academic",
      icon: <TableOutlined />,
      children: [
        {
          label: <Link href={`/${role}/create`}>create User</Link>,
          key: `/${role}/user/create`,
        },
        {
          label: <Link href={`/${role}/user`}>User</Link>,
          key: `/${role}/user`,
        },
        {
          label: <Link href={`/${role}/user/edit`}>Semesters</Link>,
          key: `/${role}/user/edit`,
        },
      ],
    },
    {
      label: "Manage Service",
      key: "manage-booking",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/service`}>Service </Link>,
          key: `/${role}/service`,
        },
        {
          label: <Link href={`/${role}/create`}>Service Create</Link>,
          key: `/${role}/create`,
        },
        {
          label: <Link href={`/${role}/service/edite`}>Booking Status</Link>,
          key: `/${role}/service/edite`,
        },
      
        
        
     
      ],
    },
    {
      label: "Manage content",
      key: "manage-booking",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/creat`}>create</Link>,
          key: `/${role}/create`,
        },
        {
          label: <Link href={`/${role}/content`}>Content</Link>,
          key: `/${role}/contents`,
        },
        {
          label: <Link href={`/${role}/edit`}>Content Update</Link>,
          key: `/${role}/edit`,
        },
        
        
     
      ],
    },
    {
      label: "Manage Booking",
      key: "manage-booking",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/booking-history`}>Booking History</Link>,
          key: `/${role}/booking-history`,
        },
        {
          label: <Link href={`/${role}/booing-status`}>Booking Status</Link>,
          key: `/${role}/booking-status`,
        },
        
        
     
      ],
    },
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
    {
      label:"Manage Admin",
      icon: <TableOutlined />,
      key: `/${role}/admin`,
      children:[
        {
          label: <Link href={`/${role}/create`}>Admin Create</Link>,
          key: `/${role}/create`,
        },
      ]
    },
   
    {
      label: "Management",
      key: "management",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/department`}>Department</Link>,
          key: `/${role}/department`,
        },
      ],
    },
  ];
  const UserSidebare: MenuProps["items"] = [
    {
      label: "Manage Profile",
      key: "manage-profile",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/edite`}>Booking History</Link>,
          key: `/${role}/booking-history`,
        },
        {
          label: <Link href={`/${role}/booing-status`}>Booking Status</Link>,
          key: `/${role}/booking-status`,
        },
        
        
     
      ],
    },
   
    
   
    {
      label: "Manage Booking",
      key: "management",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/booking`}>Booking</Link>,
          key: `/${role}/booking`,
        },
      ],
    },
  ];

 
 

  if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else if (role === USER_ROLE.User) return UserSidebare;

  else {
    return defaultSidebarItems;
  }
};
