import React from "react";
import OrderForm from "../../components/OrderForm/OrderForm";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../../store/actions/ordersActions";

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
         <h2 className="customer-order__title">Оформление заказа</h2>
         <div className="customer-order__location">
            Главная —{" "}
            <span className="customer-order__location-page">
               Оформление заказа
            </span>
         </div>
         <OrderForm error={errors} onSubmit={addOrderData} />
      </div>
   );
};

export default AddOrderProduct;
