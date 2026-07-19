import {
    Package,
    Star,
    Boxes,
    CheckCircle
} from "lucide-react";

import { Product } from "../types/product.types";
import { getTotalStock } from "../utils/product.utils";

interface Props{
    products: Product[];
}

export default function ProductStats({
    products
}:Props){

    const totalProducts=products.length;

    const activeProducts=
        products.filter(
            p=>p.status==="ACTIVE"
        ).length;

    const featuredProducts=
        products.filter(
            p=>p.isFeatured
        ).length;

    const totalStock=
        products.reduce(
            (sum,product)=>
                sum+
                getTotalStock(product),
            0
        );

    const cards=[
        {
            title:"Products",
            value:totalProducts,
            icon:Package,
        },
        {
            title:"Active",
            value:activeProducts,
            icon:CheckCircle,
        },
        {
            title:"Featured",
            value:featuredProducts,
            icon:Star,
        },
        {
            title:"Stock",
            value:totalStock,
            icon:Boxes,
        },
    ];

    return(
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

            {cards.map((card)=>{

                const Icon=card.icon;

                return(

                    <div
                        key={card.title}
                        className="rounded-xl border bg-white p-6 shadow-sm"
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    {card.title}
                                </p>

                                <h2 className="mt-2 text-3xl font-bold">
                                    {card.value}
                                </h2>

                            </div>

                            <Icon
                                size={28}
                                className="text-gray-400"
                            />

                        </div>

                    </div>

                );

            })}

        </div>
    );
}