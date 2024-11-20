import useAxios from "./ApiServise";

export const loginUser = (userData) => {
  return useAxios.post("auth/login", userData);
};
export const logOutUser = () => {
  return useAxios.post("logout");
};

export const registerUser = (userData) => {
  return useAxios.post("logout", userData);
};

export const folderList = (path) => {
  return useAxios.post("folders/list", { path });
};
export const createFolder = (path) => {
  return useAxios.post("folders/create", { path });
};
export const addFiles = (data, progressEvent) => {
  return useAxios.post("files/upload", data, {
    onUploadProgress: progressEvent,
  });
};
// export const addFiles = (data,path,) => {
//     return useAxios.post('files/upload',data,{onUploadProgress:(event=>{
//         console.log("Sdbsdbdsbsdbsd",Math.round((100 * event.loaded) / event.total));
//     })});

// }

export const deleteFiles = (path) => {
  return useAxios.delete(`/files/remove`, { params: path });
};
export const profile = () => {
  return useAxios.get("profile");
};
export const categories = ({ level, filterData }) => {
  return useAxios.get(
    `categories?level=${level}${filterData ? `&search=${filterData}` : ""}`
  );
};
export const categoriesDelete = ({ id }) => {
  return useAxios.delete(`/categories/${id}`);
};

export const suggestTag = (tag) => {
  return useAxios.get(`/data/tags/${tag}`);
};
export const allCategory = (s) => {
  return useAxios.get(`/data/categories?search=${s ? s : ""}`);
};

export const addCategory = (data) => {
  return useAxios.post(`/categories`, data);
};
export const editCategory = (id, data) => {
  return useAxios.put(`/categories/${id}`, data);
};
export const categoriesPriorityUpdate = (body) => {
  return useAxios.patch(`/actions/update/priority`, body);
};
export const allBrands = () => {
  return useAxios.get(`/data/brands`);
};
export const brands = ({ filterData }) => {
  return useAxios.get(`/brands${filterData ? `?search=${filterData}` : ""}`);
};

export const searchBrands = (filterData) => {
  return useAxios.get(`/data/brands?search=${`${filterData}`}`);
  // return useAxios.get("/data/brands");
};

export const brandSingle = (id) => {
  return useAxios.get(`/brands/${id} `);
};
export const addBrand = (data) => {
  return useAxios.post(`/brands`, data);
};

export const editBrand = (id, data) => {
  return useAxios.put(`/brands/${id}`, data);
};
export const attributes = ({ filterData, category_ids }) => {
  return useAxios.get(
    `/attributes${
      filterData
        ? `?search=${filterData}${
            category_ids ? `&&category_ids[]=${category_ids}` : ""
          }`
        : category_ids
        ? `?category_ids[]=${category_ids}`
        : ""
    }`
  );
};
export const attributesSearch = (s) => {
  return useAxios.get(`/data/attributes?search=${s}`);
};

export const attributesDelete = ({ id }) => {
  return useAxios.delete(`/attributes/${id}`);
};
export const addAttributes = (data) => {
  return useAxios.post(`/attributes`, data);
};
export const singleAttribute = (id) => {
  return useAxios.get(`/attributes/${id}`);
};
export const updateAttribute = ({ id, body }) => {
  return useAxios.put(`/attributes/${id}`, body);
};
export const brandsDelete = ({ id }) => {
  return useAxios.delete(`/brands/${id}`);
};
export const categoriesFilterData = ({ filterData }) => {
  return useAxios.get(
    `/data/categories${filterData ? `?search=${filterData}` : ""}`
  );
};
export const productsFilterData = ({ filterData }) => {
  return useAxios.get(
    `/data/products${filterData ? `?search=${filterData}` : ""}`
  );
};
export const blogsFilterData = ({ filterData }) => {
  return useAxios.get(
    `/data/blogs${filterData ? `?search=${filterData}` : ""}`
  );
};
export const brandsFilterData = ({ filterData }) => {
  return useAxios.get(
    `/data/brands${filterData ? `?search=${filterData}` : ""}`
  );
};
export const attributesFilterData = ({ filterData }) => {
  return useAxios.get(
    `/data/attributes${filterData ? `?search=${filterData}` : ""}`
  );
};
export const featuresFilterData = ({ filterData }) => {
  return useAxios.get(
    `/data/features${filterData ? `?search=${filterData}` : ""}`
  );
};
export const colors = ({ filterData }) => {
  return useAxios.get(`/colors${filterData ? `?search=${filterData}` : ""}`);
};
export const colorsDelete = ({ id }) => {
  return useAxios.delete(`/colors/${id}`);
};
export const addColor = (data) => {
  return useAxios.post(`/colors`, data);
};
export const editColor = ({ id, body }) => {
  return useAxios.put(`/colors/${id}`, body);
};
export const singleColor = (id) => {
  return useAxios.get(`/colors/${id}`);
};
export const guarantees = ({ filterData }) => {
  return useAxios.get(
    `/guarantees${filterData ? `?search=${filterData}` : ""}`
  );
};
export const guaranteesDelete = ({ id }) => {
  return useAxios.delete(`/guarantees/${id}`);
};
export const addGuarantee = (data) => {
  return useAxios.post(`/guarantees`, data);
};
export const singleGuarantee = (id) => {
  return useAxios.get(`/guarantees/${id}`);
};
export const uodateGuarantee = ({ id, body }) => {
  return useAxios.put(`/guarantees/${id}`, body);
};
export const feature = ({ filterData }) => {
  return useAxios.get(`/features${filterData ? `?search=${filterData}` : ""}`);
};
export const featureDelete = ({ id }) => {
  return useAxios.delete(`/features/${id}`);
};
export const addFeature = (data) => {
  return useAxios.post(`/features`, data);
};
export const singleFeature = (id) => {
  return useAxios.get(`/features/${id}`);
};
export const uodateFeature = ({ id, body }) => {
  return useAxios.put(`/features/${id}`, body);
};

export const products = ({
  filterData,
  category_ids,
  brand_ids,
  attribute_ids,
  feature_ids,
}) => {
  let queryArray = [];
  if (filterData) {
    queryArray.push(`search=${filterData}`);
  }
  if (category_ids) {
    queryArray.push(`category_ids[]=${category_ids}`);
  }
  if (brand_ids) {
    queryArray.push(`brand_ids[]=${brand_ids}`);
  }
  if (attribute_ids) {
    queryArray.push(`attribute_ids[]=${attribute_ids}`);
  }
  if (feature_ids) {
    queryArray.push(`feature_ids[]=${feature_ids}`);
  }
  queryArray = queryArray.join("&");

  return useAxios.get(`/products${queryArray === "" ? "" : `?${queryArray}`}`);
};
export const productsItems = ({
  filterData,
  category_ids,
  brand_ids,
  attribute_ids,
  feature_ids,
}) => {
  let queryArray = [];
  if (filterData) {
    queryArray.push(`search=${filterData}`);
  }
  if (category_ids) {
    queryArray.push(`category_ids[]=${category_ids}`);
  }
  if (brand_ids) {
    queryArray.push(`brand_ids[]=${brand_ids}`);
  }
  if (attribute_ids) {
    queryArray.push(`attribute_ids[]=${attribute_ids}`);
  }
  if (feature_ids) {
    queryArray.push(`feature_ids[]=${feature_ids}`);
  }
  queryArray = queryArray.join("&");

  return useAxios.get(
    `/products/items${queryArray === "" ? "" : `?${queryArray}`}`
  );
};
export const productsExport = ({
  filterData,
  category_ids,
  brand_ids,
  attribute_ids,
  feature_ids,
}) => {
  let queryArray = [];
  if (filterData) {
    queryArray.push(`search=${filterData}`);
  }
  if (category_ids) {
    queryArray.push(`category_ids[]=${category_ids}`);
  }
  if (brand_ids) {
    queryArray.push(`brand_ids[]=${brand_ids}`);
  }
  if (attribute_ids) {
    queryArray.push(`attribute_ids[]=${attribute_ids}`);
  }
  if (feature_ids) {
    queryArray.push(`feature_ids[]=${feature_ids}`);
  }
  queryArray = queryArray.join("&");

  return useAxios.get(
    `/products/export/xlsx${queryArray === "" ? "" : `?${queryArray}`}`,
    {
      responseType: "arraybuffer",
    }
  );
  // .then((response) => {
  //   var blob = new Blob([response.data], {
  //     type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  //   });
  //   FileSaver.saveAs(blob, "fixi.xlsx");
  // });
};
export const productsDelete = ({ id }) => {
  return useAxios.delete(`/products/${id}`);
};

export const addProducts = (data) => {
  let refactoredData = { ...data };
  if (data?.relatives) {
    refactoredData.relative_ids =
      data.relatives?.map((related) => related?.id) || null;
    delete refactoredData.relatives;
  }
  if (data?.blogs) {
    refactoredData.blog_ids = data.blogs?.map((blog) => blog?.id) || null;
    delete refactoredData.blogs;
  }
  if (data?.brand_id) {
    refactoredData.brand_id = data?.brand_id?.id || null;
  }
  if (data?.media?.gallery) {
    refactoredData.gallery_ids =
      data?.media?.gallery?.map((gallery) => gallery?.id) || null;
    delete refactoredData.media;
  }
  if (data.status !== "PUBLISHING") {
    delete refactoredData.publish_at;
  }
  return useAxios.post(`/products`, refactoredData);
};

export const editProduct = ({ data, product_id }) => {
  if (data.relatives) {
    data.relative_ids = data.relatives?.map((related) => related?.id) || null;
    delete data.relatives;
  }
  if (data.blogs) {
    data.blog_ids = data.blogs?.map((blog) => blog?.id) || null;
    delete data.blogs;
  }
  if (data.brand_id) {
    data.brand_id = data?.brand_id?.id || null;
  }
  if (data.media.gallery) {
    data.gallery_ids =
      data?.media.gallery?.map((gallery) => gallery?.id) || null;
    delete data.media;
  }
  if (data.status !== "PUBLISHING") {
    delete data.publish_at;
  }
  return useAxios.put(`/products/${product_id}`, data);
};
export const draftProduct = (id) => {
  return useAxios.patch(`/products/${id}/draft`);
};
export const duplicateProduct = (id) => {
  return useAxios.get(`/products/${id}/duplicate`);
};
export const getSingleProduct = (id) => {
  return useAxios.get(`/products/${id}`);
};

export const searchBlogData = (s) => {
  return useAxios.get(`/data/blogs?search=${s}`);
};
export const colorsFilterData = ({ filterData }) => {
  return useAxios.get(
    `/data/colors${filterData ? `?search=${filterData}` : ""}`
  );
};
export const guaranteesFilterData = ({ filterData }) => {
  return useAxios.get(
    `/data/guarantees${filterData ? `?search=${filterData}` : ""}`
  );
};
export const productsPriceChange = (body) => {
  return useAxios.put(`/products/items/batch-change`, body);
};
export const usersStatistics = () => {
  return useAxios.get(`/users/statistics`);
};
export const users = ({ filterData, is_buyer, sort }) => {
  let queryArray = [];
  if (is_buyer) {
    queryArray.push(`is_buyer=${is_buyer}`);
  } else {
    queryArray.push(`is_buyer=`);
  }
  if (filterData) {
    queryArray.push(`search=${filterData}`);
  }
  if (sort) {
    queryArray.push(`sort=${sort}`);
  }
  queryArray = queryArray.join("&");

  return useAxios.get(`/users${queryArray === "" ? "" : `?${queryArray}`}`);
};
export const usersExport = ({ filterData, is_buyer }) => {
  let queryArray = [];
  if (is_buyer) {
    queryArray.push(`is_buyer=${is_buyer}`);
  } else {
    queryArray.push(`is_buyer=`);
  }
  if (filterData) {
    queryArray.push(`search=${filterData}`);
  }
  queryArray = queryArray.join("&");

  return useAxios.get(
    `/users/export/xlsx${queryArray === "" ? "" : `?${queryArray}`}`,
    {
      responseType: "arraybuffer",
    }
  );
};
export const blockUser = (id) => {
  return useAxios.patch(`/users/${id}/deactivate`);
};
export const singleUser = (id) => {
  return useAxios.get(`/users/${id}`);
};
export const editUser = (id, data) => {
  return useAxios.put(`/users/${id}`, data);
};
export const transactions = (id) => {
  return useAxios.get(`/transactions`, { user_id: id });
};
export const stockNotifications = (id) => {
  return useAxios.get(`/stock-notifications`, { user_id: id });
};
export const wishlists = (id) => {
  return useAxios.get(`/wishlists`, { user_id: id });
};
export const notifications = (id) => {
  return useAxios.get(`/notifications`, { user_id: id });
};
export const comments = (id) => {
  return useAxios.get(`/comments`, { user_id: id });
};
export const pointHistories = (id) => {
  return useAxios.get(`/point-histories`, { user_id: id });
};
export const orders = (id) => {
  return useAxios.get(`/orders`, { user_id: id });
};
export const singleComment = (id) => {
  return useAxios.get(`/comments/${id}`);
};
export const singleQuestion = (id) => {
  return useAxios.get(`/questions/${id}`);
};
export const singleAnswer = (id) => {
  return useAxios.get(`/answers/${id}`);
};
export const editComment = (id, body) => {
  return useAxios.put(`/comments/${id}`, body);
};
export const approveComment = (id) => {
  return useAxios.patch(`/comments/${id}/approve`);
};
export const approveQuestion = (id) => {
  return useAxios.patch(`/questions/${id}/approve`);
};
export const approveAnswer = (id) => {
  return useAxios.patch(`/answers/${id}/approve`);
};
export const editQuestion = (id, data) => {
  return useAxios.patch(`/questions/${id}`, data);
};
export const editAnswer = (id, data) => {
  return useAxios.patch(`/answers/${id}`, data);
};
export const rejectComment = (id, body) => {
  return useAxios.patch(`/comments/${id}/reject`, body);
};
export const rejectQuestion = (id, body) => {
  return useAxios.patch(`/questions/${id}/reject`, body);
};
export const rejectAnswer = (id, body) => {
  return useAxios.patch(`/answers/${id}/reject`, body);
};
export const postNotifications = (body) => {
  return useAxios.post(`/notifications`, body);
};
export const getSettings = () => {
  return useAxios.get(`/settings`);
};
export const sendSettingsData = (data) => {
  return useAxios.patch(`/settings`, data);
};
export const getSettingsSelectBoxOptionData = (path) => {
  return useAxios.get(path);
};
export const coupons = ({ filterData }) => {
  let queryArray = [];
  if (filterData) {
    queryArray.push(`search=${filterData}`);
  }
  queryArray = queryArray.join("&");

  return useAxios.get(`/coupons${queryArray === "" ? "" : `?${queryArray}`}`);
};
export const activateCoupon = (id) => {
  return useAxios.patch(`/coupons/${id}/activate`);
};
export const deactivateCoupon = (id) => {
  return useAxios.patch(`/coupons/${id}/deactivate`);
};
export const duplicateCoupon = ({ id, number }) => {
  return useAxios.post(`/coupons/${id}/duplicate`, { number });
};

export const couponsExport = ({ filterData }) => {
  let queryArray = [];
  if (filterData) {
    queryArray.push(`search=${filterData}`);
  }
  queryArray = queryArray.join("&");

  return useAxios.get(
    `/coupons/export/xlsx${queryArray === "" ? "" : `?${queryArray}`}`,
    {
      responseType: "arraybuffer",
    }
  );
};
export const postCoupon = (body) => {
  return useAxios.post(`/coupons`, body);
};
export const singleCoupon = (id) => {
  return useAxios.get(`/coupons/${id}`);
};
export const editCoupon = ({ id, body }) => {
  return useAxios.put(`/coupons/${id}`, body);
};
export const getComments = (data) => {
  return useAxios.get(
    `/comments?status=${data?.status}&user_id=${data?.user_id}&page=${
      data?.page
    }&per_page=${10}`
  );
};

export const getQuestions = (data) => {
  return useAxios.get(
    `/questions?status=${data?.status}&user_id=${data?.user_id}&page=${
      data?.page
    }&per_page=${10}`
  );
};
export const getAnswers = (data) => {
  return useAxios.get(
    `/answers?status=${data?.status}&user_id=${data?.user_id}&page=${
      data?.page
    }&per_page=${10}`
  );
};
export const admins = ({ filterData, status }) => {
  let queryArray = [];
  if (filterData) {
    queryArray.push(`search=${filterData}`);
  }
  if (status) {
    queryArray.push(`status=${status}`);
  }
  queryArray = queryArray.join("&");

  return useAxios.get(`/admins${queryArray === "" ? "" : `?${queryArray}`}`);
};
export const blockAdmin = ({ id }) => {
  return useAxios.patch(`/admins/${id}/deactivate`);
};
export const activeAdmin = ({ id }) => {
  return useAxios.patch(`/admins/${id}/activate`);
};
export const addAdmin = (data) => {
  return useAxios.post(`/admins`, data);
};
export const editAdmin = (id, data) => {
  return useAxios.put(`/admins/${id}`, data);
};
export const singleAdmin = (id) => {
  return useAxios.get(`/admins/${id}`);
};
export const singleAdminPassword = (id, data) => {
  return useAxios.patch(`/admins/${id}`, data);
};
export const roles = ({ filterData }) => {
  let queryArray = [];
  if (filterData) {
    queryArray.push(`search=${filterData}`);
  }
  queryArray = queryArray.join("&");

  return useAxios.get(`/roles${queryArray === "" ? "" : `?${queryArray}`}`);
};
export const deleteRole = ({ id }) => {
  return useAxios.delete(`/roles/${id}`);
};
export const departments = ({ filterData }) => {
  let queryArray = [];
  if (filterData) {
    queryArray.push(`search=${filterData}`);
  }
  queryArray = queryArray.join("&");

  return useAxios.get(
    `/departments${queryArray === "" ? "" : `?${queryArray}`}`
  );
};
export const deleteDepartments = ({ id }) => {
  return useAxios.delete(`/departments/${id}`);
};
export const dataPermissions = () => {
  return useAxios.get(`/data/permissions`);
};
export const addRole = (data) => {
  return useAxios.post(`/roles`, data);
};
export const singleRole = (id) => {
  return useAxios.get(`/roles/${id}`);
};
export const editRole = (id, data) => {
  return useAxios.put(`/roles/${id}`, data);
};
export const addDepartment = (data) => {
  return useAxios.post(`/departments`, data);
};
export const singleDepartment = (id) => {
  return useAxios.get(`/departments/${id}`);
};
export const editDepartment = (id, data) => {
  return useAxios.put(`/departments/${id}`, data);
};
export const dataRole = () => {
  return useAxios.get(`/data/roles`);
};
export const logsCausers = () => {
  return useAxios.get(`/logs/causers`);
};
export const logsType = () => {
  return useAxios.get(`/logs/types`);
};
export const logsAction = () => {
  return useAxios.get(`/logs/actions`);
};
export const postCausers = ({ causersItem, filterData }) => {
  return useAxios.post(`/logs/causers/search`, {
    causer: causersItem,
    search: filterData || null,
  });
};
export const logs = ({
  datePickerData,
  usersTypeItem,
  usersItem,
  causersTypeItem,
  actionItem,
}) => {
  let queryArray = [];
  if (datePickerData) {
    queryArray.push(`created_at=${datePickerData}`);
  }
  if (usersTypeItem) {
    queryArray.push(`causer_type=${usersTypeItem}`);
  }
  if (usersItem) {
    queryArray.push(`causer_id=${usersItem}`);
  }
  if (causersTypeItem) {
    queryArray.push(`type=${causersTypeItem}`);
  }
  if (actionItem) {
    queryArray.push(`action=${actionItem}`);
  }
  queryArray = queryArray.join("&");

  return useAxios.get(`/logs${queryArray === "" ? "" : `?${queryArray}`}`);
};
export const blogs = ({ search, status, category_id }) => {
  let queryArray = [];
  if (search) {
    queryArray.push(`search=${search}`);
  }
  if (status) {
    queryArray.push(`status=${status}`);
  }
  if (category_id) {
    queryArray.push(`category_id=${category_id}`);
  }
  queryArray = queryArray.join("&");

  return useAxios.get(`/blogs${queryArray === "" ? "" : `?${queryArray}`}`);
};
export const blogsDelete = ({ id }) => {
  return useAxios.delete(`/blogs/${id}`);
};
export const addBlog = (data) => {
  return useAxios.post(`/blogs`, data);
};
export const blogsCats = ({}) => {
  return useAxios.get(`/blog-categories`);
};
export const getPermission = () => {
  return useAxios.get(`/data/permissions`);
};
export const getTickets = (data) => {
  return useAxios.get(
    `/tickets?status=${data?.status}&department_id=${
      data?.department_id
    }&page=${data?.page}&per_page=${10}`
  );
};
export const getSingleTicket = (id) => {
  return useAxios.get(`/tickets/${id}`);
};
export const answerTicket = (id, data) => {
  return useAxios.post(`/tickets/${id}/answer`, data);
};
export const closeTicket = (id, data) => {
  return useAxios.patch(`/tickets/${id}/close`, data);
};

export const getDepartments = () => {
  return useAxios.get(`/departments`);
};
export const singleBlog = (id) => {
  return useAxios.get(`/blogs/${id}`);
};
export const editBlog = ({ id, data }) => {
  return useAxios.put(`/blogs/${id}`, data);
};
export const addBlogCategory = (data) => {
  return useAxios.post(`/blog-categories`, data);
};
export const editBlogCats = ({ id, data }) => {
  return useAxios.put(`/blog-categories/${id}`, data);
};
export const singleBlogCat = (id) => {
  return useAxios.get(`/blog-categories/${id}`);
};
export const blogsCatsDelete = ({ id }) => {
  return useAxios.delete(`/blog-categories/${id}`);
};
