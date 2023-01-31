import axiosApi from "../../axiosApi";
import { historyPush } from "./historyActions";
import {
   addOrderFailure,
   addOrderRequest,
   addOrderSuccess,
   changeStatusFailure,
   changeStatusRequest,
   changeStatusSuccess,
   getOrdersFailure,
   getOrdersRequest,
   getOrdersSuccess,
} from "../slices/ordersSlice";
import { clearCart } from "../slices/cartSlice";
import { addNotification } from "./notifierActions";

export const addOrder = (orderData) => {
   return async (dispatch) => {
      try {
         dispatch(addOrderRequest());
         await axiosApi.post("/orders", orderData);
         dispatch(addOrderSuccess());

         dispatch(clearCart());
         dispatch(historyPush("/order-place/success"));
         
      } catch (e) {
         if (e.response && e.response.data) {
            dispatch(addOrderFailure(e.response.data));
         } else {
            dispatch(addOrderFailure({ global: "No internet" }));
         }
      }
   };
};

export const getOrders = (page) => {
   return async (dispatch) => {
      try {
         dispatch(getOrdersRequest());

         let response;

         if (page) {
            response = await axiosApi(`/orders` + page);
         } else {
            response = await axiosApi(`/orders`);
         }

         dispatch(getOrdersSuccess(response.data));
      } catch (e) {
         if (e.response && e.response.data) {
            dispatch(getOrdersFailure(e.response.data));
         } else {
            dispatch(getOrdersFailure({ global: "No internet" }));
         }
      }
   };
};

export const changeStatus = (id, status) => {
   return async (dispatch) => {
      try {
         dispatch(changeStatusRequest());
         const response = await axiosApi.put(`/orders/${id}/changeStatus`, {
            status,
         });
         dispatch(changeStatusSuccess(response.data));
         dispatch(addNotification("Статус успешно изменен.", "success"));
      } catch (e) {
         if (e.response && e.response.data) {
            dispatch(changeStatusFailure(e.response.data));
            dispatch(addNotification(e.response.data.message, "error"));
         } else {
            dispatch(changeStatusFailure({ global: "No internet" }));
            dispatch(addNotification("Что то пошло не так.", "error"));
         }
      }
   };
};
