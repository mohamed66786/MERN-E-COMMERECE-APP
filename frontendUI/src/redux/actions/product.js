import axios from "axios";
import { server } from "../../backendServer";

export const createProduct = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "productCreateRequest",
    });
    const config = { headers: { "Content-Type": "multipart/form-data" } }; // the type of the request that will be sent
    // call backend to create the product
    const { data } = await axios.post(
      `${server}/product/create-product`,
      newForm,
    );
    dispatch({
      type: "productCreateSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
       type: "productCreateFail",
        payload: error.response.data.message,
       });
  }
};
