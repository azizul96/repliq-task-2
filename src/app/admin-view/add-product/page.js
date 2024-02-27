"use client"

import InputComponent from "@/components/FormElements/InputComponent/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent/SelectComponent";
import TileComponent from "@/components/FormElements/TileComponent/TileComponent";
import ComponentLevelLoader from "@/components/Loader/ComponentLevel";
import { GlobalContext } from "@/context";
import { addNewProduct, updateAProduct } from "@/services/product";
import { AvailableSizes, adminAddProductFormControls, firebaseConfig, firebaseStorageUrl } from "@/utils";
import {initializeApp} from 'firebase/app'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStorageUrl);

const createUniqueFileName = (getFile)=>{
  const timeStamp = Date.now()
  const randomStringValue = Math.random().toString(36).substring(2, 12);

  return `${getFile.name}-${timeStamp}-${randomStringValue}`;
};

async function helperForUPloadingImageToFirebase(file){
  const getFileName = createUniqueFileName(file)
  const storageReference = ref(storage, `ecommerce/${getFileName}`);
  const uploadImage = uploadBytesResumable(storageReference, file);

  return new Promise((resolve, reject) => {
    uploadImage.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref)
          .then((downloadUrl) => resolve(downloadUrl))
          .catch((error) => reject(error));
      }
    );
  });
}

const initialFormData = {
  name: "",
  price: 0,
  description: "",
  category: "men",
  sizes: [],
  deliveryInfo: "",
  onSale: "no",
  imageUrl: "",
  priceDrop: 0,

}


const AdminAddProduct = () => {

  const [formData, setFormData] = useState(initialFormData)
  const {componentLevelLoader, setComponentLevelLoader, currentUpdatedProduct, setCurrentUpdatedProduct} = useContext(GlobalContext)

  
  const router = useRouter();

  useEffect(()=>{
    if(currentUpdatedProduct !== null) setFormData(currentUpdatedProduct)
  },[])
  const handleImage = async(event)=>{
    console.log(event.target.files);
    const extractImageUrl = await helperForUPloadingImageToFirebase(event.target.files[0])

    console.log(extractImageUrl);

    if(extractImageUrl !== ''){
      setFormData({
        ...formData,
        imageUrl: extractImageUrl
      })
    }
  }
  const handleTileClick = (getCurrentItem)=>{
    console.log(getCurrentItem);

    let cpySizes = [...formData.sizes];
    const index = cpySizes.findIndex((item) => item.id === getCurrentItem.id);

    if (index === -1) {
      cpySizes.push(getCurrentItem);
    } else {
      cpySizes = cpySizes.filter((item) => item.id !== getCurrentItem.id);
    }
    setFormData({
      ...formData,
      sizes: cpySizes,
    });

  }

  const handleAddProduct = async()=>{
    setComponentLevelLoader({ loading: true, id: "" });
    const res = currentUpdatedProduct !== null ? 
    await updateAProduct(formData) : await addNewProduct(formData)
    console.log(res);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: "top-right",
      });

      setFormData(initialFormData);
      setCurrentUpdatedProduct(null)
      setTimeout(() => {
        router.push("/admin-view/all-product");
      }, 1000);
    } else {
      toast.error(res.message, {
        position: "top-right",
      });
      setComponentLevelLoader({ loading: false, id: "" });
      setFormData(initialFormData);
    }
  }

  console.log(formData);

  return (
    <div className="w-full mt-5 mr-0 mb-0 ml-0 relative">
      <div className="flex flex-col justify-start items-start p-10 bg-white shadow-2xl rounded-xl relative ">
        <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">

          <input  
          accept="image/*"
          max="1000000"
          type="file"
          onChange={handleImage}
          />

          <div className=" flex gap-2 flex-col">
            <label>Available Size</label>
            <TileComponent 
            selected={formData.sizes}
            onClick={handleTileClick}
            data={AvailableSizes} 
            />
          </div>
          {
            adminAddProductFormControls.map(controlItem => 
              controlItem.componentType=== 'input' ?
              <InputComponent
              type={controlItem.type}
              placeholder={controlItem.placeholder}
              label={controlItem.label}
              value={formData[controlItem.id]}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    [controlItem.id]: event.target.value,
                  });
                }}
              /> 
              :
              controlItem.componentType=== 'select' ? 
              <SelectComponent
              label={controlItem.label}
              option={controlItem.options}
              value={formData[controlItem.id]}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    [controlItem.id]: event.target.value,
                  });
                }}
              />
              : null) 
          }
          <button
          onClick={handleAddProduct}
          className="inline-flex w-full items-center justify-center bg-[#C70039] px-6 py-3 text-white text-lg uppercase font-medium tracking-wide rounded-sm"
          >
            {
              componentLevelLoader && componentLevelLoader.loading ?
              <ComponentLevelLoader 
              text={currentUpdatedProduct !== null ? "Updating Product" : "Adding Product"}
              color={'#ffffff'}
              loading={componentLevelLoader && componentLevelLoader.loading}
              /> : currentUpdatedProduct !== null ? ( "Update Product" ) 
              : (  "Add Product" )
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAddProduct;