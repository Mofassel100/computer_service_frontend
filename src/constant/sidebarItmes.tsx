import type { MenuProps } from "antd";
import {
  ProfileOutlined,
  TableOutlined,
  AppstoreOutlined,
  UsergroupAddOutlined,
  BookOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { USER_ROLE } from "./role";
export const sidebarItems = (role: string, email: string, id: string) => {
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: "Profile",
      key: "profile",
      icon: <ProfileOutlined />,
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
    {
      label: "Profile",
      key: "profile",
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/${role}/profile`}>Account Profile</Link>,
          key: `/${role}/profile`,
        },
        {
          label: <Link href={`/${role}/change-password`}>Change Password</Link>,
          key: `/${role}/change-password`,
        },
      ],
    },
    {
      label: "Manage Category",
      key: "manage-category",
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/${role}/category/create`}>Create Category</Link>,
          key: `/${role}/category/create`,
        },
        {
          label: (
            <Link href={`/${role}/category/allcategory`}>All Category</Link>
          ),
          key: `/${role}/category/allcategory`,
        },
      ],
    },

    {
      label: "Manage User",
      key: "manage-user",
      icon: <UsergroupAddOutlined />,
      children: [
        {
          label: <Link href={`/${role}/user/create`}>create User</Link>,
          key: `/${role}/user/create`,
        },
        {
          label: <Link href={`/${role}/user/all-user`}>All User</Link>,
          key: `/${role}/user/all-user`,
        },
      ],
    },
    {
      label: "Manage Service",
      key: "manage-service",
      icon: <CustomerServiceOutlined />,
      children: [
        {
          label: <Link href={`/${role}/service/create`}>Service Create</Link>,
          key: `/${role}/service/create`,
        },
        {
          label: <Link href={`/${role}/service/all-service`}>All Service</Link>,
          key: `/${role}/service/all-service`,
        },
      ],
    },
    {
      label: "Manage content",
      key: "manage-content",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/content/create`}>Content create</Link>,
          key: `/${role}/content/create`,
        },
        {
          label: (
            <Link href={`/${role}/content/all-content`}>Contentn All</Link>
          ),
          key: `/${role}/content/all-content`,
        },
      ],
    },
    {
      label: "Manage Booking",
      key: "manage-booking",
      icon: <BookOutlined />,
      children: [
        {
          label: <Link href={`/${role}/booking/history`}>Booking History</Link>,
          key: `/${role}/booking/history`,
        },
        {
          label: (
            <Link href={`/${role}/booking/all-booking`}>Booking Status</Link>
          ),
          key: `/${role}/booking/all-booking`,
        },
      ],
    },
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    {
      label: "Profile",
      key: "profile",
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/${role}/profile`}>Account Profile</Link>,
          key: `/${role}/profile`,
        },
        {
          label: <Link href={`/${role}/change-password`}>Change Password</Link>,
          key: `/${role}/change-password`,
        },
      ],
    },

    {
      label: "Manage Admin",
      icon: <TableOutlined />,
      key: `manage-amin`,
      children: [
        {
          label: <Link href={`/${role}/admin-create`}>Admin Create</Link>,
          key: `/${role}/admin-create`,
        },

        {
          label: <Link href={`/${role}/admin`}>Admin All</Link>,
          key: `/${role}/admin`,
        },
      ],
    },
  ];
  const UserSidebare: MenuProps["items"] = [
    {
      label: "Profile",
      key: "profile",
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/${role}/profile`}>Account Profile</Link>,
          key: `/${role}/profile`,
        },
        {
          label: <Link href={`/${role}/change-password`}>Change Password</Link>,
          key: `/${role}/change-password`,
        },
      ],
    },
    {
      label: "Manage Booking",
      key: "manage-booking",
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
