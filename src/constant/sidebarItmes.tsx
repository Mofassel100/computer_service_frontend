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
          label: <Link href={`/${role}s/profile`}>Account Profile</Link>,
          key: `/${role}s/profile`,
        },
        {
          label: (
            <Link href={`/${role}s/change-password`}>Change Password</Link>
          ),
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
          label: (
            <Link href={`/${role}s/category/create`}>Create Category</Link>
          ),
          key: `/${role}s/category/create`,
        },
        {
          label: (
            <Link href={`/${role}s/category/all-category`}>All Category</Link>
          ),
          key: `/${role}/category/all-category`,
        },
      ],
    },

    {
      label: "Manage User",
      key: "manage-user",
      icon: <UsergroupAddOutlined />,
      children: [
        {
          label: <Link href={`/${role}s/user/create`}>create User</Link>,
          key: `/${role}s/user/create`,
        },
        {
          label: <Link href={`/${role}s/user/all-user`}>All User</Link>,
          key: `/${role}s/user/all-user`,
        },
      ],
    },
    {
      label: "Manage Service",
      key: "manage-service",
      icon: <CustomerServiceOutlined />,
      children: [
        {
          label: <Link href={`/${role}s/service/create`}>Service Create</Link>,
          key: `/${role}s/service/create`,
        },
        {
          label: (
            <Link href={`/${role}s/service/all-service`}>All Service</Link>
          ),
          key: `/${role}s/service/all-service`,
        },
      ],
    },
    {
      label: "Manage content",
      key: "manage-content",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}s/content/create`}>Content create</Link>,
          key: `/${role}s/content/create`,
        },
        {
          label: (
            <Link href={`/${role}s/content/all-content`}>Contentn All</Link>
          ),
          key: `/${role}s/content/all-content`,
        },
      ],
    },
    {
      label: "Manage Booking",
      key: "manage-booking",
      icon: <BookOutlined />,
      children: [
        {
          label: (
            <Link href={`/${role}s/booking/history`}>Booking History</Link>
          ),
          key: `/${role}s/booking/history`,
        },
        {
          label: (
            <Link href={`/${role}s/booking/all-booking`}>Booking Status</Link>
          ),
          key: `/${role}s/booking/all-booking`,
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
          label: <Link href={`/${role}`}>Account Profile</Link>,
          key: `/${role}/profile`,
        },
        {
          label: <Link href={`/${role}/change-password`}>Change Password</Link>,
          key: `/${role}/change-password`,
        },
      ],
    },
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
