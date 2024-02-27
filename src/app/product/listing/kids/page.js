import CommonListing from '@/components/CommonListing/CommonListing';
import { productByCategory } from '@/services/product';


const KidsAllProducts = async() => {
  const getAllProducts = await productByCategory("kids");

  return (
    <CommonListing data={getAllProducts && getAllProducts.data} />
  );
};

export default KidsAllProducts;