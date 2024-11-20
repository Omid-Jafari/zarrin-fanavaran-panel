import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DashboardIcon from "../../../public/images/icons/dashboardIcon";
import HeadPhoneIcon from "../../../public/images/icons/headPhoneIcon";
import MessageIcon from "../../../public/images/icons/messageIcon";
import NoteIcon from "../../../public/images/icons/noteIcon";
import Person2Icon from "../../../public/images/icons/person2Icon";
import SettingIcon from "../../../public/images/icons/settingIcon";
import ShopIcon from "../../../public/images/icons/shopIcon";
import ShoppingcartIcon from "../../../public/images/icons/shoppingcartIcon";
import RulerAndPenIcon from "../../../public/images/icons/ruler&penIcon";
import VideoPlayIcon from "../../../public/images/icons/videoPlayIcon";
import ScreenMirroringIcon from "../../../public/images/icons/screenMirroring";

// import dashboard from '../../assets/images/icons/setting-3.png'

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [items, setItems] = useState([
    {
      menu: "داشبورد",
      subshow: false,
      link: "/dashboard",
      submenu: [],
      icon(pathnamin) {
        return (
          <DashboardIcon
            className={`mr-2  group-hover:fill-blacklead ${
              this.subshow ||
              pathnamin.replace("/", "").includes(this?.link.replace("/", ""))
                ? "fill-blacklead"
                : "fill-white"
            }`}
          />
        );
      },
    },
    {
      menu: "فروشگاه",
      subshow: false,
      link: "/shop",
      submenu: [
        { menu: "در یک نگاه", link: "#" },
        { menu: "فروش ها", link: "#" },
        { menu: "اعمال تغییرات قیمت", link: "/price-change" },
        { menu: "تنظیمات فروشگاه", link: "/store-setting" },
      ],
      icon(pathnamin) {
        return (
          <ShopIcon
            className={`mr-2  group-hover:fill-blacklead ${
              this.subshow ||
              pathnamin.replace("/", "").includes(this?.link.replace("/", ""))
                ? "fill-blacklead"
                : "fill-white"
            }`}
          />
        );
      },
    },
    {
      menu: "محصولات",
      link: "#",
      subshow: false,
      submenu: [
        { menu: "همه محصولات", link: "/all-products" },
        { menu: "افزودن محصول جدید", link: "/products/add" },
        { menu: "دسته‌بندی‌ها", link: "/categories" },
        { menu: "ویژگی های محصول", link: "/attributes" },
        { menu: "رنگ‌ها", link: "/colors" },
        { menu: "فروش ویژه", link: "#" },
        { menu: "گارانتی ها", link: "/guarantees" },
        { menu: "برند", link: "/brand" },
        { menu: "ویژگی های عمومی", link: "/feature" },
      ],
      icon(pathnamin) {
        return (
          <ShoppingcartIcon
            className={`mr-2  group-hover:fill-blacklead ${
              this.subshow ||
              pathnamin.replace("/", "").includes(this?.link.replace("/", ""))
                ? "fill-blacklead"
                : "fill-white"
            }`}
          />
        );
      },
    },
    {
      menu: "کامنت‌ها",
      link: "/comments",
      subshow: false,
      submenu: [],
      icon(pathnamin) {
        return (
          <MessageIcon
            className={`mr-2  group-hover:fill-blacklead ${
              this.subshow ||
              pathnamin.replace("/", "").includes(this?.link.replace("/", ""))
                ? "fill-blacklead"
                : "fill-white"
            }`}
          />
        );
      },
    },
    {
      menu: "صفحات",
      link: "/pages",
      subshow: false,
      submenu: [],
      icon(pathnamin) {
        return (
          <NoteIcon
            className={`mr-2  group-hover:fill-blacklead ${
              this.subshow ||
              pathnamin.replace("/", "").includes(this?.link.replace("/", ""))
                ? "fill-blacklead"
                : "fill-white"
            }`}
          />
        );
      },
    },
    {
      menu: "کاربران",
      link: "#",
      subshow: false,
      submenu: [
        { menu: "در یک نگاه", link: "/users/overview" },
        { menu: "لیست کاربران", link: "/users/list" },
      ],
      icon(pathnamin) {
        return (
          <Person2Icon
            className={`mr-2  group-hover:fill-blacklead ${
              this.subshow ||
              pathnamin.replace("/", "").includes(this?.link.replace("/", ""))
                ? "fill-blacklead"
                : "fill-white"
            }`}
          />
        );
      },
    },
    {
      menu: "تنظیمات",
      link: "/settings",
      subshow: false,
      submenu: [],
      icon(pathnamin) {
        return (
          <SettingIcon
            className={`mr-2  group-hover:fill-blacklead ${
              this.subshow ||
              pathnamin.replace("/", "").includes(this?.link.replace("/", ""))
                ? "fill-blacklead"
                : "fill-white"
            }`}
          />
        );
      },
    },
    {
      menu: "پشتیبانی",
      link: "/tickets",
      subshow: false,
      submenu: [],
      icon(pathnamin) {
        return (
          <HeadPhoneIcon
            className={`mr-2  group-hover:fill-blacklead ${
              this.subshow ||
              pathnamin.replace("/", "").includes(this?.link.replace("/", ""))
                ? "fill-blacklead"
                : "fill-white"
            }`}
          />
        );
      },
    },
    {
      menu: "ابزار ها",
      link: "#",
      subshow: false,
      submenu: [],
      icon(pathnamin) {
        return (
          <RulerAndPenIcon
            className={`mr-2  group-hover:fill-blacklead ${
              this.subshow ||
              pathnamin.replace("/", "").includes(this?.link.replace("/", ""))
                ? "fill-blacklead"
                : "fill-white"
            }`}
          />
        );
      },
    },
    {
      menu: "شیوه نمایش",
      link: "#",
      subshow: false,
      submenu: [],
      icon(pathnamin) {
        return (
          <ScreenMirroringIcon
            className={`mr-2  group-hover:fill-blacklead ${
              this.subshow ||
              pathnamin.replace("/", "").includes(this?.link.replace("/", ""))
                ? "fill-blacklead"
                : "fill-white"
            }`}
          />
        );
      },
    },
    {
      menu: "مدیا",
      link: "/media",
      subshow: false,
      submenu: [],
      icon(pathnamin) {
        return (
          <VideoPlayIcon
            className={`mr-2  group-hover:fill-blacklead ${
              this.subshow ||
              pathnamin.replace("/", "").includes(this?.link.replace("/", ""))
                ? "fill-blacklead"
                : "fill-white"
            }`}
          />
        );
      },
    },
    {
      menu: "ادمین ها",
      subshow: false,
      link: "#",
      submenu: [
        { menu: "مدیریت ادمین ها", link: "/admin/management" },
        { menu: "نقش ها و دسترسی ها", link: "/admin/roles" },
        { menu: "دپارتمان ها", link: "/admin/department" },
        { menu: "لاگ ها", link: "/admin/logs" },
      ],
      icon(pathnamin) {
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className={`mr-2  group-hover:fill-blacklead ${
              this.subshow ||
              pathnamin.replace("/", "").includes(this?.link.replace("/", ""))
                ? "fill-blacklead"
                : "fill-white"
            }`}
          >
            <path d="M11.9999 22.7592C10.9099 22.7592 9.82992 22.4392 8.97992 21.8092L4.6799 18.5992C3.5399 17.7492 2.6499 15.9792 2.6499 14.5592V7.12922C2.6499 5.58922 3.77992 3.94921 5.22992 3.40921L10.2199 1.53922C11.2099 1.16922 12.7699 1.16922 13.7599 1.53922L18.7599 3.40921C20.2099 3.94921 21.3399 5.58922 21.3399 7.12922V14.5592C21.3399 15.9792 20.4499 17.7492 19.3099 18.5992L15.0099 21.8092C14.1699 22.4392 13.0899 22.7592 11.9999 22.7592ZM10.7499 2.93921L5.75992 4.80921C4.89992 5.12921 4.1499 6.20922 4.1499 7.12922V14.5592C4.1499 15.5092 4.81992 16.8392 5.56992 17.3992L9.8699 20.6092C11.0199 21.4692 12.9699 21.4692 14.1199 20.6092L18.4199 17.3992C19.1799 16.8292 19.8399 15.4992 19.8399 14.5592V7.12922C19.8399 6.21922 19.0899 5.13921 18.2299 4.80921L13.2399 2.93921C12.5799 2.68921 11.4199 2.68921 10.7499 2.93921Z" />
            <path d="M11.9999 11.6702C11.9799 11.6702 11.9599 11.6702 11.9299 11.6702C10.4799 11.6302 9.41992 10.5202 9.41992 9.17017C9.41992 7.79017 10.5499 6.66016 11.9299 6.66016C13.3099 6.66016 14.4399 7.79017 14.4399 9.17017C14.4299 10.5302 13.3699 11.6301 12.0199 11.6801C12.0099 11.6701 12.0099 11.6702 11.9999 11.6702ZM11.9299 8.16016C11.3699 8.16016 10.9199 8.61017 10.9199 9.17017C10.9199 9.72017 11.3499 10.1601 11.8899 10.1801C11.8899 10.1801 11.9399 10.1801 11.9999 10.1801C12.5299 10.1501 12.9399 9.71017 12.9399 9.17017C12.9499 8.61017 12.4899 8.16016 11.9299 8.16016Z" />
            <path d="M11.9998 17.3509C11.1398 17.3509 10.2698 17.1209 9.59982 16.6709C8.92982 16.2309 8.5498 15.581 8.5498 14.891C8.5498 14.201 8.92982 13.5509 9.59982 13.1009C10.9498 12.2009 13.0598 12.2109 14.3998 13.1009C15.0698 13.5409 15.4498 14.1909 15.4498 14.8809C15.4498 15.5709 15.0698 16.2209 14.3998 16.6709C13.7298 17.1209 12.8598 17.3509 11.9998 17.3509ZM10.4298 14.3409C10.1798 14.5009 10.0398 14.7009 10.0498 14.8809C10.0498 15.0609 10.1898 15.2609 10.4298 15.4209C11.2698 15.9809 12.7298 15.9809 13.5698 15.4209C13.8198 15.2609 13.9598 15.0609 13.9598 14.8809C13.9598 14.7009 13.8198 14.5009 13.5798 14.3409C12.7398 13.7909 11.2698 13.7909 10.4298 14.3409Z" />
          </svg>
        );
      },
    },
    {
      menu: "بلاگ",
      subshow: false,
      link: "/blog/page",
      submenu: [],
      icon(pathnamin) {
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className={`mr-2  group-hover:fill-blacklead ${
              this.subshow ||
              pathnamin.replace("/", "").includes(this?.link.replace("/", ""))
                ? "fill-blacklead"
                : "fill-white"
            }`}
          >
            <path d="M15 18.75H9C6.58 18.75 5.25 17.42 5.25 15V9C5.25 6.58 6.58 5.25 9 5.25H13C15.42 5.25 16.75 6.58 16.75 9V10C16.75 10.14 16.86 10.25 17 10.25C17.96 10.25 18.75 11.04 18.75 12V15C18.75 17.42 17.42 18.75 15 18.75ZM9 6.75C7.42 6.75 6.75 7.42 6.75 9V15C6.75 16.58 7.42 17.25 9 17.25H15C16.58 17.25 17.25 16.58 17.25 15V12C17.25 11.86 17.14 11.75 17 11.75C16.04 11.75 15.25 10.96 15.25 10V9C15.25 7.42 14.58 6.75 13 6.75H9Z" />
            <path d="M12 10.75H10C9.59 10.75 9.25 10.41 9.25 10C9.25 9.59 9.59 9.25 10 9.25H12C12.41 9.25 12.75 9.59 12.75 10C12.75 10.41 12.41 10.75 12 10.75Z" />
            <path d="M14 14.75H10C9.59 14.75 9.25 14.41 9.25 14C9.25 13.59 9.59 13.25 10 13.25H14C14.41 13.25 14.75 13.59 14.75 14C14.75 14.41 14.41 14.75 14 14.75Z" />
            <path d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z" />
          </svg>
        );
      },
    },
  ]);

  let itemSliceTest = items.slice();
  console.log("itemSliceTest", itemSliceTest);
  // this one make submenu stay opened if its in one of its submenu pages onrefreshes
  useEffect(() => {
    let indexOfItem = 0;
    for (let item of items) {
      indexOfItem++;
      for (let submenu of item?.submenu) {
        if (
          pathname.replace("/", "").includes(submenu?.link.replace("/", ""))
        ) {
          console.log("first", indexOfItem);
          // [...prev, (prev[indexOfItem - 1].subshow = true)].slice(0, -1)
          setItems((prev) =>
            prev?.map((sItem, index) => {
              if (indexOfItem - 1 === index) {
                return { ...sItem, subshow: true };
              } else {
                return { ...sItem, subshow: false };
              }
            })
          );
          return;
        }
      }
    }
  }, []);

  const navigateToMenu = (item) => {
    navigate(item?.link);
    setItems((prev) =>
      prev.map((sidebarItem) => {
        return { ...sidebarItem, subshow: false };
      })
    );
  };
  const showSubMenu = (item, index) => {
    navigate(item?.submenu[0]?.link);
    setItems((prev) =>
      prev.map((sidebarItem, i) => {
        if (i === index) {
          return { ...sidebarItem, subshow: true };
        } else {
          return { ...sidebarItem, subshow: false };
        }
      })
    );
  };
  let maxHeight = window?.innerHeight - 68;

  return (
    <div
      className="sticky top-[66px] w-full bg-blacklead flex items-start h-full font-KalamehMed font-medium overflow-y-scroll hide-scrollbar"
      style={{ maxHeight: maxHeight }}
    >
      <div className="w-full">
        {console.log("items", items)}
        {items.map((item, index) => (
          <div className="pr-2.5 py-0.5 w-full flex flex-col">
            {item?.submenu?.length === 0 ? (
              <button
                onClick={() => navigateToMenu(item)}
                className={`flex pl-2 h-11 items-center hover:bg-white group rounded-r-lg transition duration-[400ms] outline-none ${
                  pathname
                    .replace("/", "")
                    .includes(item?.link.replace("/", ""))
                    ? "bg-white hover:bg-[#BBDEE1] transition duration-[400ms] font-KalamehSemi font-semibold"
                    : ""
                }`}
              >
                {item?.icon(pathname)}
                <span
                  className={` group-hover:text-blacklead pr-2  ${
                    pathname
                      .replace("/", "")
                      .includes(item?.link.replace("/", ""))
                      ? "text-blacklead"
                      : "text-white"
                  }`}
                >
                  {item?.menu}
                </span>
              </button>
            ) : (
              <button
                onClick={() => showSubMenu(item, index)}
                className={`flex pl-2 h-11 items-center w-full hover:bg-white group rounded-r-lg transition duration-[400ms] outline-none ${
                  item?.subshow
                    ? "bg-white hover:bg-[#BBDEE1] transition duration-[400ms]  font-KalamehSemi font-semibold"
                    : ""
                }`}
              >
                {item?.icon(pathname)}
                <span
                  className={` group-hover:text-blacklead pr-2  ${
                    item?.subshow ? "text-blacklead" : "text-white"
                  }`}
                >
                  {item?.menu}
                </span>
              </button>
            )}

            <div
              className={`pr-4 w-full ${
                item?.subshow
                  ? "max-h-[28rem] overflow-hidden transition-all ease-linear duration-[400ms]"
                  : "max-h-0 overflow-hidden transition-all ease-linear duration-[400ms]"
              }`}
            >
              <div className="flex flex-col w-full border-r border-cyann-700 pr-2 mt-2">
                {item?.submenu?.map((submenuItem) => (
                  <Link
                    to={submenuItem?.link}
                    className={`flex my-0.5 h-11 items-center pr-2 pl-[1.14rem] rounded-r-lg hover:bg-cyann hover:text-white w-full transition duration-[400ms] ${
                      pathname
                        .replace("/", "")
                        .includes(submenuItem?.link.replace("/", ""))
                        ? " text-white bg-cyann hover:bg-opacity-70 transition duration-[400ms]"
                        : "text-cyann-700"
                    }  `}
                  >
                    {submenuItem?.menu}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
