import CommonDetails from "@/components/CommonDetails/CommonDetails";
import { productById } from "@/services/product";


const ProductDetails = async({params}) => {
  const productDetailsData = await productById(params.details);
  // console.log(productDetailsData);

  return (
    <CommonDetails item={productDetailsData && productDetailsData.data} />
  );
};

export default ProductDetails;