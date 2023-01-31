import React from "react";
import OrderForm from "../../components/OrderForm/OrderForm";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../../store/actions/ordersActions";
import {Link} from "react-router-dom";

const AddOrderProduct = () => {
   const errors = useSelector((state) => state.orders.createError);
   const products = useSelector((state) => state.cart.products);
   const dispatch = useDispatch();

   const addOrderData = async (customerData) => {
      const order = products.map((product) => ({
         product: product._id,
         quantity: product.quantity,
      }));
      const orderObj = { ...customerData, order };
      await dispatch(addOrder(orderObj));
   };
   
   return (
      <div className="customer-order">
         <h2 className="title">Оформление заказа</h2>
         <div className="location">
            <Link to="/">Главная</Link><span>—</span>
            <Link to="/cart"> Корзина</Link><span>—</span>
            <p className="location__page">Оформление заказа</p>
         </div>
         <OrderForm error={errors} onSubmit={addOrderData} />
      </div>
   );

};

export default AddOrderProduct;
