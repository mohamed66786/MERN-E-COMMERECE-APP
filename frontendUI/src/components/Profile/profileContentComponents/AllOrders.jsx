// import { useEffect } from "react"; 
import { AiOutlineArrowRight } from "react-icons/ai";
// import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {DataGrid} from "@mui/x-data-grid";
// import {Button} from "@material-ui/core";
// import { getAllOrdersOfUser } from "../../../redux/actions/order.js";


const AllOrders = () => {
  // const { user } = useSelector((state) => state.user);
  // const { orders } = useSelector((state) => state.order);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAllOrdersOfUser(user._id));
  // }, []);

  const orders=[
    {
      _id:"923583jkthebq1",
      orderItems:[
        {name:"iphone 14 pro Max"},
      ],
      totalPrice:127,
      orderStatus:"processing",
    }
  ]


  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      // cellClassName: (params) => {
      //   return params.getValue(params.id, "status") === "Delivered"
      //     ? "greenColor"
      //     : "redColor";
      // },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <button>
                <AiOutlineArrowRight size={20} />
              </button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};
export default AllOrders;