import React, { useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import { Order } from "../../models/Order";
import { OrderItem } from "../../models/OrderItem";
import Paginator from "../../components/Paginator";
import { Link } from "react-router-dom";

const hide = {
  maxHeight: 0,
  transition: "600ms ease-in",
};

const show = {
  maxHeight: "150px",
  transition: "600ms ease-out",
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`orders?page=${page}`);
      setOrders(data.data);
      setLastPage(data.meta.last_page);
    })();
  }, [page]);

  const select = (id: number) => {
    setSelected(selected !== id ? id : 0);
  };

  const handleExport = async () => {
    const { data } = await axios.post(`export`, {}, { responseType: "blob" });
    const blob = new Blob([data], { type: "text/csv" });
    const url = window.URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.download = "orders.csv";
    link.click();
  };

  return (
    <Wrapper>
      <div className="pt-4 pb-4">
        <a
          href="#"
          onClick={handleExport}
          type="button"
          className="btn btn-secondary"
        >
          Export
        </a>
      </div>
      <div className="table-responsive">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o: Order) => {
              return (
                <>
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{o.name}</td>
                    <td>{o.email}</td>
                    <td>{o.total}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => select(o.id)}
                        className="btn btn-outline-secondary"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={5}>
                      <div
                        className="overflow-hidden"
                        style={selected === o.id ? show : hide}
                      >
                        <table className="table table-sm">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Title</th>
                              <th>Price</th>
                              <th>Quantity</th>
                            </tr>
                          </thead>
                          <tbody>
                            {o.order_items.map((item: OrderItem) => {
                              return (
                                <tr>
                                  <td>{item.id}</td>
                                  <td>{item.product_title}</td>
                                  <td>{item.price}</td>
                                  <td>{item.quantity}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>

        <Paginator page={page} lastPage={lastPage} pageChanged={setPage} />
      </div>
    </Wrapper>
  );
};

export default Orders;
