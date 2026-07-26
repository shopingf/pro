var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_vite = require("vite");
var app = (0, import_express.default)();
var PORT = 3e3;
var ORDERS_FILE = import_path.default.join(process.cwd(), "orders.json");
app.use(import_express.default.json());
function getOrders() {
  try {
    if (!import_fs.default.existsSync(ORDERS_FILE)) {
      import_fs.default.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2), "utf-8");
      return [];
    }
    const data = import_fs.default.readFileSync(ORDERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading orders.json:", err);
    return [];
  }
}
function saveOrders(orders) {
  try {
    import_fs.default.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing to orders.json:", err);
  }
}
app.get("/api/orders", (req, res) => {
  const orders = getOrders();
  res.json({ success: true, count: orders.length, orders });
});
app.post("/api/orders", (req, res) => {
  const newOrder = req.body;
  if (!newOrder || !newOrder.fullname && !newOrder.orderId) {
    return res.status(400).json({ success: false, message: "\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0637\u0644\u0628 \u063A\u064A\u0631 \u0645\u0643\u062A\u0645\u0644\u0629" });
  }
  const orders = getOrders();
  const existingIndex = orders.findIndex((o) => o.orderId === newOrder.orderId);
  if (existingIndex !== -1) {
    orders[existingIndex] = {
      status: orders[existingIndex].status || "\u0642\u064A\u062F \u0627\u0644\u062A\u0623\u0643\u064A\u062F",
      ...newOrder
    };
  } else {
    const orderWithTimestamp = {
      status: newOrder.status || "\u0642\u064A\u062F \u0627\u0644\u062A\u0623\u0643\u064A\u062F",
      ...newOrder,
      createdAt: newOrder.createdAt || (/* @__PURE__ */ new Date()).toISOString()
    };
    orders.unshift(orderWithTimestamp);
  }
  saveOrders(orders);
  res.status(201).json({
    success: true,
    message: "\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A orders.json",
    totalOrders: orders.length
  });
});
app.patch("/api/orders/:id", (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  let orders = getOrders();
  const index = orders.findIndex((o) => o.orderId === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: "\u0627\u0644\u0637\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
  }
  orders[index] = { ...orders[index], ...updates };
  saveOrders(orders);
  res.json({ success: true, message: "\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D", order: orders[index] });
});
app.delete("/api/orders/:id", (req, res) => {
  const { id } = req.params;
  let orders = getOrders();
  const initialLength = orders.length;
  orders = orders.filter((o) => o.orderId !== id);
  if (orders.length === initialLength) {
    return res.status(404).json({ success: false, message: "\u0627\u0644\u0637\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
  }
  saveOrders(orders);
  res.json({ success: true, message: "\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0637\u0644\u0628 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A", remaining: orders.length });
});
app.delete("/api/orders", (req, res) => {
  saveOrders([]);
  res.json({ success: true, message: "\u062A\u0645 \u0625\u0641\u0631\u0627\u063A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A orders.json \u0628\u0646\u062C\u0627\u062D" });
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
