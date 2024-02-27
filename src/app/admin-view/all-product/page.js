import CommonListing from "@/components/CommonListing/CommonListing";
import { getAllAdminProducts } from "@/services/product";


const AdminAllProduct = async() => {

  const allAdminProducts = await getAllAdminProducts()
  // console.log(allAdminProducts);

  return (
    <CommonListing data={allAdminProducts && allAdminProducts.data} />
  );
};

export default AdminAllProduct;