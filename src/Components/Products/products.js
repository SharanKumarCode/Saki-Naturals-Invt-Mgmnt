import React from 'react';
import { useSelector, useDispatch} from 'react-redux';

import './products.scss';
import editIcon from '../../../assets/edit_icon.png';
import productImg from '../../../assets/Products/soap_1.jpg';

const productDummydata = {
        productID: 659843,
        group: "Cream",
        name: "Honey",
        description: "Honey Flavoured Hair Cream 5ml",
        price: 30,
        instock: 100,
        image: "../../../assets/Products/hair_cream.jpg"
    }
        

const ProductsCard = (product) => {
    return (
                    <tr className='product-row'>
                        <td className='product-card-id column-1'>
                            {product.productID}
                        </td>
                        <td className='product-card-group column-2'>
                            {product.group}
                        </td>
                        <td className='product-card-name column-3'>
                            {product.name}
                        </td>
                        <td className='product-card-description column-4'>
                            {product.description}
                        </td>
                        <td className='product-card-netprice column-5'>
                            &#8377; {product.price}
                        </td>
                        <td className='product-card-stock column-6'>
                            {product.instock} pcs
                        </td>
                        <td className='product-card-image column-7' style={{ backgroundImage: `url(${productImg})` }}>
                        </td>
                        <td className='product-card-edit column-8'>
                            <img className='edit-icon-img' src={editIcon} alt="edit icon" />
                        </td>
                    </tr>
    )
}


export default function Products(){

    //Selector function to select data from store
    const products = useSelector(state=>state.products.products);
    const dispatch = useDispatch();

    const onAddProductsHandler = () => {
        dispatch({type:"product/addProduct", payload:productDummydata});
    }

    return (
        <>  
            {/* Button to add produts */}
            <button onClick={()=>onAddProductsHandler()}>
                + &emsp; &emsp; ADD PRODUCTS
            </button>
            <table>
                <thead>
                    <tr className='product-header'>
                        <th className='column-1'>
                            Product - ID
                        </th>
                        <th className='column-2'>
                            Group
                        </th>
                        <th>
                            Name
                        </th>
                        <th>
                            Description
                        </th>
                        <th className='column-5'>
                            Net Price
                        </th>
                        <th className='column-6'>
                            In-Stock
                        </th>
                        <th>
                            Images
                        </th>
                        <th className='column-8'>
                        </th>
                    </tr>
                </thead>                
                <tbody>
                    {
                        products.map((prod)=>{
                            return(<ProductsCard {...prod} key={prod.productID} />)
                        })
                    }
                </tbody>                
            </table>
        </>
    )
}