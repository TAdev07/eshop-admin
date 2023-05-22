import {
  AiOutlineBgColors,
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from 'react-icons/ai';
import { BiCategoryAlt } from 'react-icons/bi';
import { FaBloggerB, FaClipboardList } from 'react-icons/fa';
import { ImBlog } from 'react-icons/im';
import { RiCouponLine } from 'react-icons/ri';
import { SiBrandfolder } from 'react-icons/si';

export const menu = [
  {
    key: '',
    icon: <AiOutlineDashboard className="fs-4" />,
    label: 'Dashboard',
  },
  {
    key: 'customers',
    icon: <AiOutlineUser className="fs-4" />,
    label: 'Customers',
  },
  {
    key: 'Catalog',
    icon: <AiOutlineShoppingCart className="fs-4" />,
    label: 'Catalog',
    children: [
      {
        key: 'product',
        icon: <AiOutlineShoppingCart className="fs-4" />,
        label: 'Add Product',
      },
      {
        key: 'list-product',
        icon: <AiOutlineShoppingCart className="fs-4" />,
        label: 'Product List',
      },
      {
        key: 'brand',
        icon: <SiBrandfolder className="fs-4" />,
        label: 'Brand',
      },
      {
        key: 'list-brand',
        icon: <SiBrandfolder className="fs-4" />,
        label: 'Brand List ',
      },
      {
        key: 'category',
        icon: <BiCategoryAlt className="fs-4" />,
        label: 'Category',
      },
      {
        key: 'list-category',
        icon: <BiCategoryAlt className="fs-4" />,
        label: 'Category List',
      },
      {
        key: 'color',
        icon: <AiOutlineBgColors className="fs-4" />,
        label: 'Color',
      },
      {
        key: 'list-color',
        icon: <AiOutlineBgColors className="fs-4" />,
        label: 'Color List',
      },
    ],
  },
  {
    key: 'orders',
    icon: <FaClipboardList className="fs-4" />,
    label: 'Orders',
  },
  {
    key: 'marketing',
    icon: <RiCouponLine className="fs-4" />,
    label: 'Marketing',
    children: [
      {
        key: 'coupon',
        icon: <ImBlog className="fs-4" />,
        label: 'Add Coupon',
      },
      {
        key: 'coupon-list',
        icon: <RiCouponLine className="fs-4" />,
        label: 'Coupon List',
      },
    ],
  },
  {
    key: 'blogs',
    icon: <FaBloggerB className="fs-4" />,
    label: 'Blogs',
    children: [
      {
        key: 'blog',
        icon: <ImBlog className="fs-4" />,
        label: 'Add Blog',
      },
      {
        key: 'blog-list',
        icon: <FaBloggerB className="fs-4" />,
        label: 'Blog List',
      },
      {
        key: 'blog-category',
        icon: <ImBlog className="fs-4" />,
        label: 'Add Blog Category',
      },
      {
        key: 'blog-category-list',
        icon: <FaBloggerB className="fs-4" />,
        label: 'Blog Category List',
      },
    ],
  },
  {
    key: 'enquiries',
    icon: <FaClipboardList className="fs-4" />,
    label: 'Enquiries',
  },
];
