import React from "react";
import { Routes, Route } from "react-router-dom";
import Media from "../pages/media/media";
import ForgetPassword from "../pages/auth/ForgetPassword";
import Login from "../pages/auth/Login";
import PrivateRoute from "./PrivateRoute";
import MediaSingle from "../pages/media/media_single";
import Home from "../pages/Home";
import Categories from "../pages/products/Categories";
import AddCategories from "../pages/products/AddCategories";
import EditCategory from "../pages/products/EditCategory";
import Tooltip from "../components/elements/Tooltip";
import Brand from "../pages/products/Brand";
import AddBrand from "../pages/products/AddBrand";
import EditBrand from "../pages/products/EditBrand";
import Attributes from "../pages/products/Attributes";
import AddAttribute from "../pages/products/AddAttribute";
import AddProductContainer from "../pages/products/addproduct/AddProductContainer";
import Colors from "../pages/products/Colors";
import AddColor from "../pages/products/AddColor";
import EditColor from "../pages/products/EditColor";
import EditAttribute from "../pages/products/EditAttribute";
import Guarantee from "../pages/products/Guarantee";
import AddGuarantee from "../pages/products/AddGuarantee";
import EditGuarantee from "../pages/products/EditGuarantee";
import Feature from "../pages/products/Feature";
import AddFeature from "../pages/products/AddFeature";
import EditFeature from "../pages/products/EditFeature";
import AllProducts from "../pages/products/AllProducts";
import EditProductContainer from "../pages/products/addproduct/EditProductContainer";
import ChangePrice from "../pages/store/ChangePrice";
import UsersOverview from "../pages/users/usersOverview";
import UsersList from "../pages/users/usersList";
import SingleUser from "../pages/users/singleUser";
import Settings from "../pages/settings/Settings";
import StoreSettings from "../pages/store/storeSettings";
import AdminManage from "../pages/admin/managment/adminManage";
import AddAdmin from "../pages/admin/managment/addAdmin";
import EditAdmin from "../pages/admin/managment/editAdmin";
import AdminRoles from "../pages/admin/roles/adminRoles";
import AdminDepartment from "../pages/admin/department/adminDepartment";
import Comments from "../pages/comments/Comments";
import Question from "../pages/comments/Question";
import Answers from "../pages/comments/Answers";
import AddRoles from "../pages/admin/roles/addRoles";
import EditRoles from "../pages/admin/roles/editRoles";
import AddDepartment from "../pages/admin/department/addDepartment";
import EditDepartment from "../pages/admin/department/editDepartment";
import AdminLog from "../pages/admin/log/adminLog";
import Pages from "../pages/pages/pages";
import BlogsPage from "../pages/blog/blogsPage";
import BlogPageAdd from "../pages/blog/blogPageAdd";
import BlogsPageCats from "../pages/blog/blogsPageCats";
import Tickets from "../pages/Tickets/Tickets";
import ShowTicket from "../pages/Tickets/ShowTicket";
import BlogPageEdit from "../pages/blog/blogPageEdit";
import BlogCategoryAdd from "../pages/blog/blogCategoryAdd";
import BlogCategoryEdit from "../pages/blog/blogCategoryEdit";

function RouteSystem() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute path="/">
            <Home />
          </PrivateRoute>
        }
      />
      <Route path="login" element={<Login />} />
      <Route
        path="forget_password"
        element={
          <PrivateRoute path="forget_password">
            <ForgetPassword />
          </PrivateRoute>
        }
      />
      <Route
        path="media"
        element={
          <PrivateRoute path="main">
            <Media />
          </PrivateRoute>
        }
      />
      <Route
        path="media/files/:path"
        element={
          <PrivateRoute path="files">
            <MediaSingle />
          </PrivateRoute>
        }
      />
      <Route
        path="all-products"
        element={
          <PrivateRoute path="all-products">
            <AllProducts />
          </PrivateRoute>
        }
      />
      <Route
        path="categories"
        element={
          <PrivateRoute path="categories">
            <Categories />
          </PrivateRoute>
        }
      />
      <Route
        path="categories/add"
        element={
          <PrivateRoute path="categories/add">
            <AddCategories />
          </PrivateRoute>
        }
      />
      <Route
        path="categories/edit"
        element={
          <PrivateRoute path="categories/edit">
            <EditCategory />
          </PrivateRoute>
        }
      />
      <Route
        path="brand"
        element={
          <PrivateRoute path="brand:show">
            <Brand />
          </PrivateRoute>
        }
      />
      <Route
        path="brand/add"
        element={
          <PrivateRoute path="brand:store">
            <AddBrand />
          </PrivateRoute>
        }
      />
      <Route
        path="brand/edit"
        element={
          <PrivateRoute path="brand/edit">
            <EditBrand />
          </PrivateRoute>
        }
      />
      <Route
        path="attributes"
        element={
          <PrivateRoute path="attributes">
            <Attributes />
          </PrivateRoute>
        }
      />
      <Route
        path="attributes/add"
        element={
          <PrivateRoute path="attributes/add">
            <AddAttribute />
          </PrivateRoute>
        }
      />
      <Route
        path="attributes/:id"
        element={
          <PrivateRoute path="attributes/:id">
            <EditAttribute />
          </PrivateRoute>
        }
      />
      <Route
        path="colors"
        element={
          <PrivateRoute path="colors">
            <Colors />
          </PrivateRoute>
        }
      />
      <Route
        path="colors/add"
        element={
          <PrivateRoute path="colors/add">
            <AddColor />
          </PrivateRoute>
        }
      />
      <Route
        path="colors/:id"
        element={
          <PrivateRoute path="color/:id">
            <EditColor />
          </PrivateRoute>
        }
      />
      <Route
        path="guarantees"
        element={
          <PrivateRoute path="guarantees">
            <Guarantee />
          </PrivateRoute>
        }
      />
      <Route
        path="guarantees/add"
        element={
          <PrivateRoute path="guarantees/add">
            <AddGuarantee />
          </PrivateRoute>
        }
      />
      <Route
        path="guarantees/:id"
        element={
          <PrivateRoute path="guarantees/:id">
            <EditGuarantee />
          </PrivateRoute>
        }
      />
      <Route
        path="feature"
        element={
          <PrivateRoute path="feature">
            <Feature />
          </PrivateRoute>
        }
      />
      <Route
        path="feature/add"
        element={
          <PrivateRoute path="feature/add">
            <AddFeature />
          </PrivateRoute>
        }
      />
      <Route
        path="feature/:id"
        element={
          <PrivateRoute path="feature/:id">
            <EditFeature />
          </PrivateRoute>
        }
      />
      <Route
        path="attributes/add"
        element={
          <PrivateRoute path="attributes/add">
            <AddAttribute />
          </PrivateRoute>
        }
      />
      <Route
        path="attributes"
        element={
          <PrivateRoute path="attributes">
            <Attributes />
          </PrivateRoute>
        }
      />
      <Route
        path="products/add"
        element={
          <PrivateRoute path="products/add">
            <AddProductContainer />
          </PrivateRoute>
        }
      />
      <Route
        path="price-change"
        element={
          <PrivateRoute path="price-change">
            <ChangePrice />
          </PrivateRoute>
        }
      />
      <Route
        path="price-change"
        element={
          <PrivateRoute path="price-change">
            <ChangePrice />
          </PrivateRoute>
        }
      />
      <Route
        path="products/edit/:id"
        element={
          <PrivateRoute path="products/edit">
            <EditProductContainer />
          </PrivateRoute>
        }
      />
      <Route
        path="users/overview"
        element={
          <PrivateRoute path="users/overview">
            <UsersOverview />
          </PrivateRoute>
        }
      />
      <Route
        path="users/list"
        element={
          <PrivateRoute path="users/list">
            <UsersList />
          </PrivateRoute>
        }
      />
      <Route
        path="users/list/:id"
        element={
          <PrivateRoute path="users/list/:id">
            <SingleUser />
          </PrivateRoute>
        }
      />
      <Route
        path="products/edit/:id"
        element={
          <PrivateRoute path="products/edit">
            <EditProductContainer />
          </PrivateRoute>
        }
      />
      <Route
        path="settings"
        element={
          <PrivateRoute path="settings">
            <Settings />
          </PrivateRoute>
        }
      />
      <Route
        path="comments"
        element={
          <PrivateRoute path="comments">
            <Comments />
          </PrivateRoute>
        }
      />{" "}
      <Route
        path="comments/questions"
        element={
          <PrivateRoute path="questions">
            <Question />
          </PrivateRoute>
        }
      />
      <Route
        path="comments/answers"
        element={
          <PrivateRoute path="questions">
            <Answers />
          </PrivateRoute>
        }
      />
      <Route
        path="store-setting"
        element={
          <PrivateRoute path="store-setting">
            <StoreSettings />
          </PrivateRoute>
        }
      />
      <Route
        path="admin/management"
        element={
          <PrivateRoute path="admin/management">
            <AdminManage />
          </PrivateRoute>
        }
      />
      <Route
        path="admin/management/add"
        element={
          <PrivateRoute path="admin/management/add">
            <AddAdmin />
          </PrivateRoute>
        }
      />
      <Route
        path="admin/management/edit/:id"
        element={
          <PrivateRoute path="admin/management/edit/:id">
            <EditAdmin />
          </PrivateRoute>
        }
      />
      <Route
        path="admin/roles"
        element={
          <PrivateRoute path="admin/roles">
            <AdminRoles />
          </PrivateRoute>
        }
      />
      <Route
        path="admin/department"
        element={
          <PrivateRoute path="admin/department">
            <AdminDepartment />
          </PrivateRoute>
        }
      />
      <Route
        path="admin/department/add"
        element={
          <PrivateRoute path="admin/department/add">
            <AddDepartment />
          </PrivateRoute>
        }
      />
      <Route
        path="admin/department/edit/:id"
        element={
          <PrivateRoute path="admin/department/edit/:id">
            <EditDepartment />
          </PrivateRoute>
        }
      />
      <Route
        path="admin/roles/add"
        element={
          <PrivateRoute path="admin/roles/add">
            <AddRoles />
          </PrivateRoute>
        }
      />
      <Route
        path="admin/roles/edit/:id"
        element={
          <PrivateRoute path="admin/roles/edit/:id">
            <EditRoles />
          </PrivateRoute>
        }
      />
      <Route
        path="admin/logs"
        element={
          <PrivateRoute path="admin/logs">
            <AdminLog />
          </PrivateRoute>
        }
      />
      <Route
        path="pages"
        element={
          <PrivateRoute path="pages">
            <Pages />
          </PrivateRoute>
        }
      />
      <Route
        path="blog/page"
        element={
          <PrivateRoute path="blog/page">
            <BlogsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="blog/page/cats"
        element={
          <PrivateRoute path="blog/page/cats">
            <BlogsPageCats />
          </PrivateRoute>
        }
      />
      <Route
        path="blog/page/add"
        element={
          <PrivateRoute path="blog/page/add">
            <BlogPageAdd />
          </PrivateRoute>
        }
      />
      <Route
        path="tickets"
        element={
          <PrivateRoute path="tickets">
            <Tickets />
          </PrivateRoute>
        }
      />{" "}
      <Route
        path="tickets/:id"
        element={
          <PrivateRoute path="tickets">
            <ShowTicket />
          </PrivateRoute>
        }
      />
      <Route
        path="blog/page/:id"
        element={
          <PrivateRoute path="blog/page/:id">
            <BlogPageEdit />
          </PrivateRoute>
        }
      />
      <Route
        path="blog/page/cats/add"
        element={
          <PrivateRoute path="blog/page/cats/add">
            <BlogCategoryAdd />
          </PrivateRoute>
        }
      />
      <Route
        path="blog/page/cats/:id"
        element={
          <PrivateRoute path="blog/page/cats/:id">
            <BlogCategoryEdit />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default RouteSystem;
