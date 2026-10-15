import { useState } from "react";
import type { Order, Screen } from "./types";
import { orders } from "./data";
import { Login } from "./screens/Login";
import { Home } from "./screens/Home";
import { SearchOrder } from "./screens/SearchOrder";
import { OrderDetails } from "./screens/OrderDetails";
import { StatePage } from "./screens/StatePage";
import { Purchases } from "./screens/Purchases";
import { More } from "./screens/More";
import { PickupForm } from "./screens/PickupForm";

export default function App() {
  const [screen, setScreen] = useState<Screen>("login");
  const go = (next: Screen) => { setScreen(next); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const [selectedOrder, setSelectedOrder] = useState<Order>(orders[0]);
  const openOrder = (order: Order) => { setSelectedOrder(order); go(order.pending ? "pending" : "order"); };

  if (screen === "login") return <Login go={go} />;
  if (screen === "home") return <Home go={go} openOrder={openOrder} />;
  if (screen === "search") return <SearchOrder go={go} openOrder={openOrder} />;
  if (screen === "order") return <OrderDetails order={selectedOrder} go={go} />;
  if (screen === "purchases") return <Purchases go={go} openOrder={openOrder} />;
  if (screen === "more") return <More go={go} />;
  if (screen === "third-party" || screen === "partial" || screen === "cancel") return <PickupForm type={screen} order={selectedOrder} go={go} />;
  if (screen === "pending") return <StatePage type={screen} order={selectedOrder} go={go} />;
  return <StatePage type={screen} order={selectedOrder} go={go} />;
}