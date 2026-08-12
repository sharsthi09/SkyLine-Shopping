import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis
} from "recharts";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import classNames from "classnames";
import { CalendarDays } from "lucide-react";
import { FaHeart } from "react-icons/fa";
import { PiHandbagSimpleFill } from "react-icons/pi";
import { FaBagShopping } from "react-icons/fa6";
import { TbCurrencyDollar } from "react-icons/tb";

const statCards = [
  {
    title: "Save Products",
    value: "50.8K",
    change: "+28.4%",
    icon: <FaHeart className="text-[#CB3CFF] text-lg mt-1" />
  },
  {
    title: "Stock Products",
    value: "23.6K",
    change: "-12.6%",
    icon: <PiHandbagSimpleFill className="text-[#CB3CFF] text-lg mt-1" />
  },
  {
    title: "Sale Products",
    value: "756",
    change: "+3.1%",
    icon: <FaBagShopping className="text-[#CB3CFF] text-lg mt-1" />
  },
  {
    title: "Average Revenue",
    value: "2.3K",
    change: "+11.3%",
    icon: <TbCurrencyDollar className="text-[#CB3CFF] text-lg mt-1" />
  }
];

const radialData = [
  { name: "Organic", value: 80, fill: "#DF42FF" },
  { name: "Social", value: 60, fill: "#00D5FF" },
  { name: "Direct", value: 90, fill: "#0E48FE" }
];

const barData = [
  { name: "Jan", current: 40, subs: 20, newCust: 10 },
  { name: "Feb", current: 70, subs: 10, newCust: 20 },
  { name: "Mar", current: 60, subs: 15, newCust: 25 },
  { name: "Apr", current: 50, subs: 15, newCust: 20 },
  { name: "May", current: 30, subs: 10, newCust: 10 },
  { name: "Jun", current: 60, subs: 10, newCust: 30 }
];

const lineData = [
  { name: "Jan1", value: 0 },
  { name: "Jan8", value: 100 },
  { name: "Jan16", value: 100 },
  { name: "Jan24", value: 300 },
  { name: "Jan31", value: 150 },
  { name: "Feb8", value: 180 },
  { name: "Feb16", value: 160 },
  { name: "Feb24", value: 80 }
];

const orders = [
  {
    id: "#1526",
    client: "Emma Grace",
    email: "wow@emmagrace.com",
    date: "Jan 12, 2024",
    status: "Delivered",
    country: "Australia",
    total: "$6,729.82"
  },
  {
    id: "#1525",
    client: "Ava Rose",
    email: "me@avarose.com",
    date: "Jan 09, 2024",
    status: "Canceled",
    country: "Canada",
    total: "$784.94"
  },
  {
    id: "#1524",
    client: "Olivia Jane",
    email: "info@oliviajane.com",
    date: "Jan 06, 2024",
    status: "Pending",
    country: "Singapur",
    total: "$1,247.86"
  },
  {
    id: "#1523",
    client: "Mason Alexander",
    email: "myinfo@alexander.com",
    date: "Jan 03, 2024",
    status: "Delivered",
    country: "United States",
    total: "$304.89"
  },
  {
    id: "#1522",
    client: "Samuel David",
    email: "me@samualdavid.com",
    date: "Jan 01, 2024",
    status: "Pending",
    country: "Japan",
    total: "$2,209.76"
  },
  {
    id: "#1521",
    client: "Henry Joseph",
    email: "contact@henryjoseph.com",
    date: "Dec 28, 2023",
    status: "Delivered",
    country: "North Korea",
    total: "$5,245.68"
  }
];

export default function Dashboard() {
  return (
    <div className="bg-[#0e132a] min-h-screen text-white p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <Card className="bg-[#121936] hover:bg-[#2a3c82] transition duration-200">
            <CardContent className="p-4 bg-[#0B1739] hover:bg-[#182852] rounded-2xl">
              <div className="text-md text-[#AEB9E1] flex justify-between">
                <span className="flex gap-2">{card.icon} {card.title}</span>
                <span className="text-md text-white">⋮</span>
              </div>
              <div className="flex gap-3">
                <div className="text-3xl font-bold mt-2">{card.value}</div>
                <div className="text-[#14AF54] text-xs pt-1 mt-3 bg-[#14AF54] rounded-sm bg-opacity-20 px-3 border border-[#14AF54]">{card.change}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-[#121936]">
          <CardContent className="p-4 bg-[#0B1739] rounded-2xl">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[#AEB9E1]">Website Visitors</span>
              <Button variant="secondary" className="bg-[#1c2541] text-white text-sm">Export ↓</Button>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <RadialBarChart
                innerRadius="70%"
                outerRadius="100%"
                data={radialData}
                startAngle={180}
                endAngle={-180}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                <RadialBar dataKey="value" cornerRadius={10} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="flex justify-between text-sm mt-4">
              <div>
                <span className="text-[#DF42FF] mr-1">● </span><span className="text-[#AEB9E1]">Organic</span>
                <span className="ml-20">80%</span></div>
              <div>
                <span className="text-[#00D5FF] mr-1">●</span><span className="text-[#AEB9E1]"> Social</span>
                <span className="ml-20">60%</span></div>
              <div>
                <span className="text-[#0E48FE] mr-1">●</span><span className="text-[#AEB9E1]"> Direct</span>
                <span className="ml-20">90%</span></div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#121936]">
          <CardContent className="p-4 bg-[#0B1739]">
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-sm text-[#AEAAB6]">Revenue by customer type</div>
                <div className="flex gap-3">
                  <div className="text-3xl font-bold mt-2">$240.8k</div>
                  <div className="text-[#14AF54] text-xs pt-1 mt-3 bg-[#14AF54] rounded-sm bg-opacity-20 px-3 border border-[#14AF54]">+14.8%</div>
                </div>
              </div>
              <Button className="bg-[#1c2541] text-white text-sm"><CalendarDays size={16} /> Jan 2024</Button>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData}>
                <XAxis dataKey="name" stroke="#8793b9" />
                <YAxis stroke="#8793b9" />
                <Tooltip />
                <Legend />
                <Bar dataKey="current" fill="#DF42FF" />
                <Bar dataKey="subs" fill="#00D5FF" />
                <Bar dataKey="newCust" fill="#0E48FE" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-[#121936]">
          <CardContent className="p-4 bg-[#0B1739]">
            <div className="text-[#FFFFFF] mb-4">Products</div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <div>
                  <div className="text-xs">Products</div>
                </div>
                <div className="text-xs">Price</div>
              </div>
              <div className="flex justify-between">
                <div>
                  <div>iPhone 14 Pro Max</div>
                  <div className="text-sm text-[#8AB9E1]">524 in stock</div>
                </div>
                <div className="font-bold">$1,099.00</div>
              </div>
              <div className="flex justify-between">
                <div>
                  <div>Apple Watch S8</div>
                  <div className="text-sm text-[#8AB9E1]">320 in stock</div>
                </div>
                <div className="font-bold">$799.00</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#121936]">
          <CardContent className="p-4 bg-[#0B1739]">
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-sm text-[#AEAAB6]">Completed tasks over time</div>
                <div className="flex gap-3">
                  <div className="text-3xl font-bold mt-2">257</div>
                  <div className="text-[#14AF54] text-xs pt-1 mt-3 bg-[#14AF54] rounded-sm bg-opacity-20 px-3 border border-[#14AF54]">16.8%</div>
                </div>
              </div>
              <Button className="bg-[#1c2541] text-white text-sm"><CalendarDays size={16} /> Jan 2024</Button>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={lineData}>
                <XAxis dataKey="name" stroke="#8793b9" />
                <YAxis stroke="#8793b9" />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#121936]">
        <CardContent className="p-4 bg-[#0B1739]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[#FFFFF3] text-lg">Orders Status</h2>
            <div className="flex justify-end w-[400px] gap-2 h-[30px]">
              <Input placeholder="Search for..." className="bg-[#1c2541] text-white text-sm w-[200px]" />
              <Button className="bg-gradient-to-r from-[#CB3CFF] to-[#7F25FB] hover:from-purple-600 hover:to-pink-600 text-white text-xs">Create order</Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-white/60">
                <tr className="py-5">
                  <th className="text-left">Order</th>
                  <th className="text-left">Client</th>
                  <th className="text-left">Date</th>
                  <th className="text-left">Status</th>
                  <th className="text-left">Country</th>
                  <th className="text-left">Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr className="border-t border-white/10 hover:bg-[#1b254b] transition p-6">
                    <td>{order.id}</td>
                    <td>{order.client}<div className="text-xs text-white/40">{order.email}</div></td>
                    <td>{order.date}</td>
                    <td>
                      <span className={`text-xs px-2 py-1 rounded-full ${order.status === "Delivered"
                          ? "bg-green-800 text-green-300"
                          : order.status === "Pending"
                            ? "bg-yellow-800 text-yellow-300"
                            : "bg-red-800 text-red-300"
                        }`}>
                        {order.status}
                      </span>
                    </td>
                    <td>{order.country}</td>
                    <td>{order.total}</td>
                    <td>✏️ 🗑️</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


export function Card({ className, children }) {
  return (
    <div
      className={classNames(
        "rounded-2xl bg-[#0c1120] text-white shadow-md transition-all duration-300 hover:shadow-xl",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardContent({ className, children }) {
  return (
    <div className={classNames("p-4", className)}>
      {children}
    </div>
  );
}

export function Button({ className, children, ...props }) {
  return (
    <button
      className={classNames(
        "w-[100px] px-3 py-2 bg-[#0A1330] text-white rounded-xl transition-colors flex gap-2",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Input({ className, ...props }) {
  return (
    <input
      className={classNames(
        "w-full rounded-xl bg-[#1c1f2e] text-white border border-gray-700 px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500",
        className
      )}
      {...props}
    />
  );
}