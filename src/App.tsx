import { useState } from "react";
import type { Screen } from "./types";
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
  if (screen === "login") return <Login go={go} />;
  if (screen === "home") return <Home go={go} />;
  if (screen === "search") return <SearchOrder go={go} />;
  if (screen === "order") return <OrderDetails go={go} />;
  if (screen === "purchases") return <Purchases go={go} />;
  if (screen === "more") return <More go={go} />;
  if (screen === "third-party" || screen === "partial" || screen === "cancel") return <PickupForm type={screen} go={go} />;
  return <StatePage type={screen} go={go} />;
}