import { useEffect, useMemo, useState } from "react";

function Icon({ name, size = 18 }) {
  const paths = {
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10" />
        <path d="M9 20v-6h6v6" />
      </>
    ),
    box: (
      <>
        <path d="m4 7 8-4 8 4-8 4-8-4Z" />
        <path d="m4 7 8 4 8-4v10l-8 4-8-4V7Z" />
        <path d="M12 11v10" />
      </>
    ),
    archive: (
      <>
        <path d="M4 7h16v13H4z" />
        <path d="M3 3h18v4H3z" />
        <path d="M9 11h6" />
      </>
    ),
    suppliers: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20c0-4 2-7 6-7s6 3 6 7" />
        <path d="M16 4c3 0 5 2 5 5s-2 5-5 5" />
      </>
    ),
    trend: (
      <>
        <path d="M3 17 9 11l4 4 8-9" />
        <path d="M15 6h6v6" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a2 2 0 0 0 .4 2.2l.1.1-2.6 2.6-.1-.1a2 2 0 0 0-2.2-.4 2 2 0 0 0-1.2 1.8V21H10v-.2a2 2 0 0 0-1.2-1.8 2 2 0 0 0-2.2.4l-.1.1-2.6-2.6.1-.1A2 2 0 0 0 4.4 15a2 2 0 0 0-1.8-1.2H2v-3.6h.6A2 2 0 0 0 4.4 9a2 2 0 0 0-.4-2.2l-.1-.1 2.6-2.6.1.1A2 2 0 0 0 8.8 4 2 2 0 0 0 10 2.2V2h4v.2A2 2 0 0 0 15.2 4a2 2 0 0 0 2.2-.4l.1-.1 2.6 2.6-.1.1A2 2 0 0 0 19.6 9a2 2 0 0 0 1.8 1.2h.6v3.6h-.6A2 2 0 0 0 19.4 15Z" />
      </>
    ),
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    help: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M9.8 9a2.4 2.4 0 1 1 3.2 2.3c-.7.3-1 .8-1 1.7" />
        <path d="M12 17h.01" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    download: (
      <>
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 21h14" />
      </>
    ),
    sliders: (
      <>
        <path d="M4 6h16M4 12h16M4 18h16" />
        <circle cx="8" cy="6" r="2" />
        <circle cx="16" cy="12" r="2" />
        <circle cx="10" cy="18" r="2" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    more: (
      <>
        <circle cx="5" cy="12" r="1" fill="currentColor" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
        <circle cx="19" cy="12" r="1" fill="currentColor" />
      </>
    ),
    warning: (
      <>
        <path d="M12 3 2.8 20h18.4L12 3Z" />
        <path d="M12 9v5M12 17h.01" />
      </>
    ),
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    x: <path d="m6 6 12 12M18 6 6 18" />,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function Button({
  children,
  variant = "secondary",
  className = "",
  onClick,
  type = "button",
  disabled = false,
}) {
  return (
    <button
      type={type}
      className={`button ${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

const loadStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const stockStatus = (item) =>
  item.stock === 0 ? "Out of stock" : item.stock <= item.reorder ? "Low stock" : "In stock";

const money = (value) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

const COLORS = ["purple", "orange", "yellow", "blue", "green", "pink"];
const NAV = [
  { label: "Overview", icon: "home" },
  { label: "Inventory", icon: "box" },
  { label: "Purchase orders", icon: "archive" },
  { label: "Suppliers", icon: "suppliers" },
  { label: "Reports", icon: "trend" },
];

const PAGES = {
  Overview: {
    title: "Overview",
    description: "A live view of inventory health and purchasing activity.",
  },
  Inventory: {
    title: "Inventory",
    description: "Manage stock levels, pricing, and product availability.",
  },
  "Purchase orders": {
    title: "Purchase orders",
    description: "Order stock from suppliers and receive it into inventory.",
  },
  Suppliers: {
    title: "Suppliers",
    description: "Manage the partners that keep your inventory moving.",
  },
  Reports: {
    title: "Reports",
    description: "Understand inventory value and distribution by category.",
  },
  "Help & support": {
    title: "Help & support",
    description: "Guidance for setting up your inventory workflow.",
  },
  Settings: {
    title: "Settings",
    description: "Configure your inventory workspace.",
  },
};

export default function App() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("All items");
  const [page, setPage] = useState("Overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [products, setProducts] = useState(() => loadStorage("stockly-products", []));
  const [suppliers, setSuppliers] = useState(() => loadStorage("stockly-suppliers", []));
  const [orders, setOrders] = useState(() => loadStorage("stockly-orders", []));

  useEffect(() => {
    localStorage.setItem("stockly-products", JSON.stringify(products));
  }, [products]);
  useEffect(() => {
    localStorage.setItem("stockly-suppliers", JSON.stringify(suppliers));
  }, [suppliers]);
  useEffect(() => {
    localStorage.setItem("stockly-orders", JSON.stringify(orders));
  }, [orders]);

  const filtered = useMemo(
    () =>
      products.filter((item) => {
        const matches = `${item.name} ${item.id} ${item.category}`
          .toLowerCase()
          .includes(search.toLowerCase());
        const status = stockStatus(item);
        return (
          matches &&
          (tab === "All items" ||
            (tab === "Low stock" ? status === "Low stock" : status === "Out of stock"))
        );
      }),
    [products, search, tab]
  );

  const inventoryValue = products.reduce((sum, item) => sum + item.stock * item.price, 0);
  const totalUnits = products.reduce((sum, item) => sum + item.stock, 0);
  const lowStockCount = products.filter((item) => stockStatus(item) === "Low stock").length;
  const outOfStockCount = products.filter((item) => stockStatus(item) === "Out of stock").length;
  const openOrders = orders.filter((order) => order.status === "Ordered");

  const goTo = (nextPage) => {
    setPage(nextPage);
    setSidebarOpen(false);
    setSearch("");
  };

  const addProduct = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    if (!name) return;
    const category = String(data.get("category") || "Uncategorized");
    const product = {
      id: String(data.get("sku") || "").trim() || `SKU-${Date.now().toString().slice(-6)}`,
      name,
      category,
      stock: Math.max(0, Number(data.get("stock")) || 0),
      reorder: Math.max(0, Number(data.get("reorder")) || 0),
      price: Math.max(0, Number(data.get("price")) || 0),
      initials: name
        .split(/\s+/)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      color: COLORS[products.length % COLORS.length],
    };
    setProducts((current) => [product, ...current]);
    setModal(null);
    setPage("Inventory");
  };

  const addSupplier = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    if (!name) return;
    setSuppliers((current) => [
      {
        id: `SUP-${Date.now().toString().slice(-5)}`,
        name,
        contact: String(data.get("contact") || "").trim(),
        email: String(data.get("email") || "").trim(),
      },
      ...current,
    ]);
    setModal(null);
    setPage("Suppliers");
  };

  const addOrder = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const productId = String(data.get("productId") || "");
    const supplierId = String(data.get("supplierId") || "");
    if (!productId || !supplierId) return;
    setOrders((current) => [
      {
        id: `PO-${Date.now().toString().slice(-6)}`,
        productId,
        supplierId,
        quantity: Math.max(1, Number(data.get("quantity")) || 1),
        createdAt: new Date().toISOString(),
        status: "Ordered",
      },
      ...current,
    ]);
    setModal(null);
    setPage("Purchase orders");
  };

  const adjustStock = (id, delta) => {
    setProducts((current) =>
      current.map((item) =>
        item.id === id ? { ...item, stock: Math.max(0, item.stock + delta) } : item
      )
    );
  };

  const receiveOrder = (order) => {
    if (order.status === "Received") return;
    adjustStock(order.productId, order.quantity);
    setOrders((current) =>
      current.map((item) => (item.id === order.id ? { ...item, status: "Received" } : item))
    );
  };

  const exportCsv = () => {
    if (!products.length) return;
    const csv = [
      ["SKU", "Product", "Category", "Stock", "Reorder point", "Unit price", "Status"],
      ...products.map((item) => [
        item.id,
        item.name,
        item.category,
        item.stock,
        item.reorder,
        item.price,
        stockStatus(item),
      ]),
    ]
      .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
      .join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "inventory-report.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const clearWorkspace = () => {
    if (
      window.confirm(
        "Clear all products, suppliers, and purchase orders? This cannot be undone."
      )
    ) {
      setProducts([]);
      setSuppliers([]);
      setOrders([]);
    }
  };

  const emptyState = (title, copy, action) => (
    <div className="large-empty">
      <div className="empty-icon">
        <Icon name="box" size={22} />
      </div>
      <strong>{title}</strong>
      <span>{copy}</span>
      {action}
    </div>
  );

  const stats = (
    <section className="stat-grid" aria-label="Inventory summary">
      <article className="stat-card">
        <div className="stat-icon lavender">
          <Icon name="box" />
        </div>
        <div>
          <span>Total units</span>
          <strong>{totalUnits.toLocaleString()}</strong>
          <small className="muted-copy">
            {products.length} product{products.length === 1 ? "" : "s"}
          </small>
        </div>
      </article>
      <article className="stat-card">
        <div className="stat-icon mint">
          <Icon name="trend" />
        </div>
        <div>
          <span>Inventory value</span>
          <strong>{money(inventoryValue)}</strong>
          <small className="muted-copy">Based on current stock</small>
        </div>
      </article>
      <article className="stat-card">
        <div className="stat-icon amber">
          <Icon name="warning" />
        </div>
        <div>
          <span>Low stock</span>
          <strong>{lowStockCount}</strong>
          <small className="muted-copy">At or below reorder level</small>
        </div>
      </article>
      <article className="stat-card">
        <div className="stat-icon rose">
          <Icon name="archive" />
        </div>
        <div>
          <span>Open orders</span>
          <strong>{openOrders.length}</strong>
          <small className="muted-copy">{outOfStockCount} out of stock</small>
        </div>
      </article>
    </section>
  );

  const inventoryPage = (
    <>
      {stats}
      <section className="inventory-panel">
        <div className="panel-header">
          <div className="tabs">
            {["All items", "Low stock", "Out of stock"].map((label) => {
              const count =
                label === "All items"
                  ? products.length
                  : products.filter((item) => stockStatus(item) === label).length;
              return (
                <button
                  key={label}
                  className={tab === label ? "active" : ""}
                  onClick={() => setTab(label)}
                >
                  {label}
                  <span>{count}</span>
                </button>
              );
            })}
          </div>
          <div className="table-tools">
            <label className="table-search">
              <Icon name="search" size={17} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search inventory..."
              />
            </label>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Stock level</th>
                <th>Price</th>
                <th>Status</th>
                <th>Adjust</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const status = stockStatus(item);
                return (
                  <tr key={item.id}>
                    <td>
                      <div className="product-cell">
                        <div className={`product-thumb ${item.color}`}>{item.initials}</div>
                        <strong>{item.name}</strong>
                      </div>
                    </td>
                    <td className="sku">{item.id}</td>
                    <td>{item.category}</td>
                    <td>
                      <div className="stock-cell">
                        <span>
                          <strong>{item.stock}</strong> units · reorder at {item.reorder}
                        </span>
                        <div className="progress">
                          <i
                            className={
                              status === "Out of stock" ? "empty" : status === "Low stock" ? "low" : ""
                            }
                            style={{
                              width: `${Math.min(
                                (item.stock / Math.max(item.reorder * 2, 1)) * 100,
                                100
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="price">{money(item.price)}</td>
                    <td>
                      <span className={`status ${status.toLowerCase().replaceAll(" ", "-")}`}>
                        <i />
                        {status}
                      </span>
                    </td>
                    <td>
                      <div className="adjust-actions">
                        <Button onClick={() => adjustStock(item.id, -1)}>−</Button>
                        <span>{item.stock}</span>
                        <Button onClick={() => adjustStock(item.id, 1)}>+</Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7}>
                    {emptyState(
                      search ? "No matching items" : "Your inventory is empty",
                      search
                        ? "Try a different name, SKU, or category."
                        : "Add your first product to begin tracking stock.",
                      !search && (
                        <Button variant="primary" onClick={() => setModal("product")}>
                          <Icon name="plus" size={16} />
                          Add item
                        </Button>
                      )
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {products.length > 0 && (
          <div className="pagination">
            <span>
              Showing {filtered.length} of {products.length} items
            </span>
          </div>
        )}
      </section>
    </>
  );

  const overviewPage = (
    <>
      {stats}
      <div className="dashboard-grid">
        <section className="data-panel">
          <div className="section-heading">
            <div>
              <strong>Stock requiring attention</strong>
              <span>Items at or below their reorder point</span>
            </div>
            <Button onClick={() => goTo("Inventory")}>
              View inventory <Icon name="chevron" size={15} />
            </Button>
          </div>
          {products.filter((item) => stockStatus(item) !== "In stock").length === 0
            ? emptyState("No stock alerts", "Low and out-of-stock items will appear here.")
            : (
              <div className="compact-list">
                {products
                  .filter((item) => stockStatus(item) !== "In stock")
                  .slice(0, 5)
                  .map((item) => (
                    <div key={item.id}>
                      <div className={`product-thumb ${item.color}`}>{item.initials}</div>
                      <span>
                        <strong>{item.name}</strong>
                        <small>{item.id}</small>
                      </span>
                      <span
                        className={`status ${stockStatus(item).toLowerCase().replaceAll(" ", "-")}`}
                      >
                        <i />
                        {stockStatus(item)}
                      </span>
                    </div>
                  ))}
              </div>
            )}
        </section>
        <section className="data-panel">
          <div className="section-heading">
            <div>
              <strong>Purchase orders</strong>
              <span>Orders awaiting receipt</span>
            </div>
            <Button onClick={() => goTo("Purchase orders")}>
              View orders <Icon name="chevron" size={15} />
            </Button>
          </div>
          {openOrders.length === 0
            ? emptyState("No open orders", "New purchase orders will be tracked here.")
            : (
              <div className="compact-list">
                {openOrders.slice(0, 5).map((order) => (
                  <div key={order.id}>
                    <div className="order-icon">
                      <Icon name="archive" size={17} />
                    </div>
                    <span>
                      <strong>
                        {products.find((item) => item.id === order.productId)?.name ||
                          "Removed product"}
                      </strong>
                      <small>
                        {order.id} · {order.quantity} units
                      </small>
                    </span>
                    <span className="status low-stock">
                      <i />
                      Ordered
                    </span>
                  </div>
                ))}
              </div>
            )}
        </section>
      </div>
    </>
  );

  const ordersPage = (
    <section className="inventory-panel">
      <div className="section-heading padded">
        <div>
          <strong>Purchase orders</strong>
          <span>Receive an order to automatically increase product stock.</span>
        </div>
      </div>
      {orders.length === 0
        ? emptyState(
            "No purchase orders",
            "Create an order after adding at least one product and supplier.",
            <Button
              variant="primary"
              disabled={!products.length || !suppliers.length}
              onClick={() => setModal("order")}
            >
              <Icon name="plus" size={16} />
              Create order
            </Button>
          )
        : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Product</th>
                  <th>Supplier</th>
                  <th>Quantity</th>
                  <th>Created</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="sku">{order.id}</td>
                    <td className="price">
                      {products.find((item) => item.id === order.productId)?.name ||
                        "Removed product"}
                    </td>
                    <td>
                      {suppliers.find((item) => item.id === order.supplierId)?.name ||
                        "Removed supplier"}
                    </td>
                    <td>{order.quantity} units</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>
                      <span
                        className={`status ${order.status === "Received" ? "in-stock" : "low-stock"}`}
                      >
                        <i />
                        {order.status}
                      </span>
                    </td>
                    <td>
                      {order.status === "Ordered" && (
                        <Button variant="primary" onClick={() => receiveOrder(order)}>
                          Receive
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </section>
  );

  const suppliersPage = (
    <section className="inventory-panel">
      <div className="section-heading padded">
        <div>
          <strong>Supplier directory</strong>
          <span>Contacts available when creating purchase orders.</span>
        </div>
      </div>
      {suppliers.length === 0
        ? emptyState(
            "No suppliers yet",
            "Add a supplier to start creating purchase orders.",
            <Button variant="primary" onClick={() => setModal("supplier")}>
              <Icon name="plus" size={16} />
              Add supplier
            </Button>
          )
        : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Supplier</th>
                  <th>Supplier ID</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Orders</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((supplier) => (
                  <tr key={supplier.id}>
                    <td className="price">{supplier.name}</td>
                    <td className="sku">{supplier.id}</td>
                    <td>{supplier.contact || "—"}</td>
                    <td>{supplier.email || "—"}</td>
                    <td>{orders.filter((order) => order.supplierId === supplier.id).length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </section>
  );

  const categoryTotals = Object.entries(
    products.reduce((acc, item) => {
      acc[item.category] ??= { units: 0, value: 0 };
      acc[item.category].units += item.stock;
      acc[item.category].value += item.stock * item.price;
      return acc;
    }, {})
  );

  const reportsPage = (
    <>
      {stats}
      <section className="data-panel">
        <div className="section-heading">
          <div>
            <strong>Inventory by category</strong>
            <span>Live totals calculated from your current products.</span>
          </div>
        </div>
        {categoryTotals.length === 0
          ? emptyState("No report data", "Reports will populate as inventory items are added.")
          : (
            <div className="report-list">
              {categoryTotals.map(([category, totals]) => (
                <div key={category}>
                  <span>
                    <strong>{category}</strong>
                    <small>{totals.units} units</small>
                  </span>
                  <div className="report-bar">
                    <i
                      style={{
                        width: `${Math.max(5, (totals.units / Math.max(totalUnits, 1)) * 100)}%`,
                      }}
                    />
                  </div>
                  <strong>{money(totals.value)}</strong>
                </div>
              ))}
            </div>
          )}
      </section>
    </>
  );

  const helpPage = (
    <section className="data-panel">
      <div className="section-heading">
        <div>
          <strong>Inventory workflow</strong>
          <span>Follow these steps to keep stock accurate.</span>
        </div>
      </div>
      <div className="workflow-list">
        <div>
          <b>1</b>
          <span>
            <strong>Add inventory items</strong>
            <small>Record each product, its current quantity, price, and reorder point.</small>
          </span>
          <Button onClick={() => goTo("Inventory")}>Open inventory</Button>
        </div>
        <div>
          <b>2</b>
          <span>
            <strong>Add your suppliers</strong>
            <small>Create purchasing contacts before raising purchase orders.</small>
          </span>
          <Button onClick={() => goTo("Suppliers")}>Open suppliers</Button>
        </div>
        <div>
          <b>3</b>
          <span>
            <strong>Create and receive orders</strong>
            <small>Receiving an order automatically adds its quantity to product stock.</small>
          </span>
          <Button onClick={() => goTo("Purchase orders")}>Open orders</Button>
        </div>
        <div>
          <b>4</b>
          <span>
            <strong>Review reports</strong>
            <small>Monitor inventory value, category distribution, and reorder alerts.</small>
          </span>
          <Button onClick={() => goTo("Reports")}>Open reports</Button>
        </div>
      </div>
    </section>
  );

  const settingsPage = (
    <section className="data-panel">
      <div className="section-heading">
        <div>
          <strong>Workspace data</strong>
          <span>Your inventory data is saved locally in this browser.</span>
        </div>
      </div>
      <div className="settings-row">
        <div>
          <strong>Clear workspace</strong>
          <span>Remove all products, suppliers, and purchase orders from this device.</span>
        </div>
        <Button onClick={clearWorkspace}>Clear all data</Button>
      </div>
    </section>
  );

  const content =
    page === "Overview"
      ? overviewPage
      : page === "Inventory"
        ? inventoryPage
        : page === "Purchase orders"
          ? ordersPage
          : page === "Suppliers"
            ? suppliersPage
            : page === "Reports"
              ? reportsPage
              : page === "Help & support"
                ? helpPage
                : settingsPage;

  const primaryAction =
    page === "Inventory"
      ? { label: "Add item", modal: "product" }
      : page === "Suppliers"
        ? { label: "Add supplier", modal: "supplier" }
        : page === "Purchase orders"
          ? { label: "Create order", modal: "order" }
          : null;

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="brand-row">
          <div className="brand-mark">
            <Icon name="box" size={19} />
          </div>
          <span className="brand-name">Stockly</span>
          <Button variant="icon" className="sidebar-close" onClick={() => setSidebarOpen(false)}>
            <Icon name="x" />
          </Button>
        </div>
        <nav className="sidebar-nav" aria-label="Main navigation">
          <span className="nav-label">Workspace</span>
          {NAV.map((item) => (
            <button
              key={item.label}
              className={`nav-item ${page === item.label ? "active" : ""}`}
              onClick={() => goTo(item.label)}
            >
              <Icon name={item.icon} size={19} />
              <span>{item.label}</span>
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button
            className={`nav-item ${page === "Help & support" ? "active" : ""}`}
            onClick={() => goTo("Help & support")}
          >
            <Icon name="help" size={19} />
            <span>Help & support</span>
          </button>
          <button
            className={`nav-item ${page === "Settings" ? "active" : ""}`}
            onClick={() => goTo("Settings")}
          >
            <Icon name="settings" size={19} />
            <span>Settings</span>
          </button>
        </div>
      </aside>
      {sidebarOpen && <div className="sidebar-scrim" onClick={() => setSidebarOpen(false)} />}
      <main className="main">
        <header className="topbar">
          <Button variant="icon" className="menu-button" onClick={() => setSidebarOpen(true)}>
            <Icon name="menu" />
          </Button>
          <div className="global-search">
            <Icon name="search" size={17} />
            <input
              aria-label="Global search"
              value={search}
              onFocus={() => setPage("Inventory")}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search inventory..."
            />
            <kbd>⌘ K</kbd>
          </div>
          <div className="topbar-actions">
            <Button variant="icon">
              <Icon name="help" size={19} />
            </Button>
            <Button variant="icon" className="notification">
              <Icon name="bell" size={19} />
              <span />
            </Button>
          </div>
        </header>
        <div className="content">
          <div className="page-heading">
            <div>
              <span className="eyebrow">Operations</span>
              <div className="title">{PAGES[page].title}</div>
              <p>{PAGES[page].description}</p>
            </div>
            <div className="heading-actions">
              {page === "Reports" && (
                <Button disabled={!products.length} onClick={exportCsv}>
                  <Icon name="download" size={17} />
                  Export CSV
                </Button>
              )}
              {primaryAction && (
                <Button
                  variant="primary"
                  disabled={
                    primaryAction.modal === "order" && (!products.length || !suppliers.length)
                  }
                  onClick={() => setModal(primaryAction.modal)}
                >
                  <Icon name="plus" size={17} />
                  {primaryAction.label}
                </Button>
              )}
            </div>
          </div>
          {content}
        </div>
      </main>

      {modal && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={() => setModal(null)}
        >
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label={`Add ${modal}`}
            onMouseDown={(event) => event.stopPropagation()}
          >
            {modal === "product" && (
              <form onSubmit={addProduct}>
                <div className="modal-heading">
                  <div>
                    <div className="modal-title">Add inventory item</div>
                    <p>Start tracking a new product and its stock level.</p>
                  </div>
                  <Button variant="icon" onClick={() => setModal(null)}>
                    <Icon name="x" />
                  </Button>
                </div>
                <div className="form-grid">
                  <label className="field full">
                    <span>Product name</span>
                    <input name="name" placeholder="Product name" required autoFocus />
                  </label>
                  <label className="field">
                    <span>SKU</span>
                    <input name="sku" placeholder="Generated if blank" />
                  </label>
                  <label className="field">
                    <span>Category</span>
                    <input name="category" placeholder="Category" required />
                  </label>
                  <label className="field">
                    <span>Initial stock</span>
                    <input name="stock" type="number" min="0" defaultValue="0" required />
                  </label>
                  <label className="field">
                    <span>Reorder point</span>
                    <input name="reorder" type="number" min="0" defaultValue="0" required />
                  </label>
                  <label className="field full">
                    <span>Unit price</span>
                    <input
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      defaultValue="0"
                      required
                    />
                  </label>
                </div>
                <div className="modal-actions">
                  <Button onClick={() => setModal(null)}>Cancel</Button>
                  <Button type="submit" variant="primary">
                    Add item
                  </Button>
                </div>
              </form>
            )}
            {modal === "supplier" && (
              <form onSubmit={addSupplier}>
                <div className="modal-heading">
                  <div>
                    <div className="modal-title">Add supplier</div>
                    <p>Add a purchasing contact to your directory.</p>
                  </div>
                  <Button variant="icon" onClick={() => setModal(null)}>
                    <Icon name="x" />
                  </Button>
                </div>
                <div className="form-grid">
                  <label className="field full">
                    <span>Supplier name</span>
                    <input name="name" placeholder="Supplier name" required autoFocus />
                  </label>
                  <label className="field">
                    <span>Contact person</span>
                    <input name="contact" placeholder="Contact name" />
                  </label>
                  <label className="field">
                    <span>Email</span>
                    <input name="email" type="email" placeholder="Email address" />
                  </label>
                </div>
                <div className="modal-actions">
                  <Button onClick={() => setModal(null)}>Cancel</Button>
                  <Button type="submit" variant="primary">
                    Add supplier
                  </Button>
                </div>
              </form>
            )}
            {modal === "order" && (
              <form onSubmit={addOrder}>
                <div className="modal-heading">
                  <div>
                    <div className="modal-title">Create purchase order</div>
                    <p>Order inventory from an existing supplier.</p>
                  </div>
                  <Button variant="icon" onClick={() => setModal(null)}>
                    <Icon name="x" />
                  </Button>
                </div>
                <div className="form-grid">
                  <label className="field full">
                    <span>Product</span>
                    <select name="productId" required defaultValue="">
                      <option value="" disabled>
                        Select product
                      </option>
                      {products.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name} ({item.id})
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="field full">
                    <span>Supplier</span>
                    <select name="supplierId" required defaultValue="">
                      <option value="" disabled>
                        Select supplier
                      </option>
                      {suppliers.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="field full">
                    <span>Quantity</span>
                    <input name="quantity" type="number" min="1" defaultValue="1" required />
                  </label>
                </div>
                <div className="modal-actions">
                  <Button onClick={() => setModal(null)}>Cancel</Button>
                  <Button type="submit" variant="primary">
                    Create order
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
