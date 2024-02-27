"use client"

import { useRouter } from "next/navigation";

const ProductTile = ({item}) => {

  const router = useRouter()

  return (
    <div onClick={()=> router.push(`/product/${item._id}`)}>
      <div className="overflow-hidden aspect-w-1 aspect-h-1 h-52">
      <img
          src={item.imageUrl}
          alt="Product image"
          className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
        />
      </div>
      {item.onSale === "yes" ? (
        <div className="absolute top-0 m-2 rounded-full bg-[#C70039]">
          <p className="rounded-full  p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
            Sale
          </p>
        </div>
      ) : null}
      <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
        <div className="mb-2 flex">
          <p className={`mr-3 text-sm font-semibold ${ item.onSale === "yes" ? 
          "line-through" : "" }`} 
          >
            {`$ ${item.price}`}
          </p>
        </div>
        <h3 className="md-2 text-gray-400 text-sm">{item.name}</h3>
      </div>
    </div>
  );
};

export default ProductTile;