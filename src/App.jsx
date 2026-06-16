import { useMemo, useState } from "react";

const appSchema = {
  "type": "multi-screen-app",
  "title": "demo app",
  "entry": "login",
  "flow": {
    "login": "dashboard"
  },
  "screens": {
    "login": {
      "type": "auth",
      "title": "Admin Login",
      "blocks": [
        {
          "version": 1,
          "variant": "default",
          "importance": "secondary",
          "hiddenOnMobile": false,
          "hiddenOnTablet": false,
          "type": "input",
          "field": "email",
          "placeholder": "Admin Email",
          "inputType": "email",
          "id": "5e1d1fa0-5366-4735-ab8f-13391a54eb78"
        },
        {
          "version": 1,
          "variant": "default",
          "importance": "secondary",
          "hiddenOnMobile": false,
          "hiddenOnTablet": false,
          "type": "input",
          "field": "password",
          "placeholder": "Password",
          "inputType": "password",
          "id": "f7976a16-799c-47c2-ac64-7f7af1175520"
        },
        {
          "version": 1,
          "variant": "default",
          "importance": "secondary",
          "hiddenOnMobile": false,
          "hiddenOnTablet": false,
          "widthMode": "auto",
          "maxWidth": "",
          "height": "48px",
          "backgroundColor": "#7C3AED",
          "textColor": "#FFFFFF",
          "borderRadius": "12px",
          "padding": "12px 24px",
          "fontSize": "16px",
          "fontWeight": "600",
          "alignment": "left",
          "type": "button",
          "label": "Login to Dashboard",
          "action": "go-to-screen",
          "targetScreen": "dashboard",
          "id": "a7c196ec-b41e-42f3-8f56-b2b89361c749"
        }
      ]
    },
    "dashboard": {
      "type": "dashboard",
      "title": "Admin Dashboard",
      "blocks": [
        {
          "version": 1,
          "variant": "default",
          "importance": "secondary",
          "hiddenOnMobile": false,
          "hiddenOnTablet": false,
          "type": "row",
          "gap": 16,
          "justify": "start",
          "align": "center",
          "wrap": true,
          "children": [
            {
              "version": 1,
              "variant": "default",
              "importance": "secondary",
              "hiddenOnMobile": false,
              "hiddenOnTablet": false,
              "maxWidth": "",
              "height": "auto",
              "backgroundColor": "#1E293B",
              "textColor": "#FFFFFF",
              "borderRadius": "16px",
              "shadow": true,
              "padding": "24px",
              "type": "card",
              "title": "Total Users",
              "value": "10,245",
              "targetScreen": "",
              "id": "8c268654-4e9c-4a92-83d1-17a3ad1fc783"
            },
            {
              "version": 1,
              "variant": "default",
              "importance": "secondary",
              "hiddenOnMobile": false,
              "hiddenOnTablet": false,
              "maxWidth": "",
              "height": "auto",
              "backgroundColor": "#1E293B",
              "textColor": "#FFFFFF",
              "borderRadius": "16px",
              "shadow": true,
              "padding": "24px",
              "type": "card",
              "title": "Active Subscriptions",
              "value": "8,124",
              "targetScreen": "",
              "id": "098b3ecf-8059-452f-8301-f8913fef4a16"
            },
            {
              "version": 1,
              "variant": "default",
              "importance": "secondary",
              "hiddenOnMobile": false,
              "hiddenOnTablet": false,
              "maxWidth": "",
              "height": "auto",
              "backgroundColor": "#1E293B",
              "textColor": "#FFFFFF",
              "borderRadius": "16px",
              "shadow": true,
              "padding": "24px",
              "type": "card",
              "title": "Monthly Revenue",
              "value": "$45,200",
              "targetScreen": "",
              "id": "ab300d43-70f1-4759-b21a-304ed9681a38"
            }
          ],
          "id": "a82f5f7b-6b18-4f29-b7b1-e14e67394d0e"
        },
        {
          "version": 1,
          "variant": "default",
          "importance": "secondary",
          "hiddenOnMobile": false,
          "hiddenOnTablet": false,
          "type": "grid",
          "title": "Grid",
          "columns": 2,
          "gap": 24,
          "children": [
            {
              "version": 1,
              "variant": "default",
              "importance": "secondary",
              "hiddenOnMobile": false,
              "hiddenOnTablet": false,
              "type": "chart",
              "title": "User Growth",
              "id": "908aca60-7a70-4790-a756-6abae8a76835"
            },
            {
              "version": 1,
              "variant": "default",
              "importance": "secondary",
              "hiddenOnMobile": false,
              "hiddenOnTablet": false,
              "type": "chart",
              "title": "Revenue Trends",
              "id": "269ca573-ddc8-4f2d-a4d1-3cd41db9caf6"
            }
          ],
          "id": "9bf060c5-50b5-4f14-80aa-7ef2daf019de"
        },
        {
          "version": 1,
          "variant": "default",
          "importance": "secondary",
          "hiddenOnMobile": false,
          "hiddenOnTablet": false,
          "type": "table",
          "title": "Recent Customers",
          "id": "3ec7e4ea-2476-4502-bb98-2fb54ca59c67"
        }
      ]
    }
  },
  "navigation": [],
  "theme": {
    "primaryColor": "#7c3aed",
    "secondaryColor": "#06b6d4",
    "backgroundColor": "#0f172a",
    "surfaceColor": "#1e293b",
    "textColor": "#ffffff",
    "borderRadius": "12px",
    "fontFamily": "Inter",
    "spacing": "normal"
  },
  "components": []
};

const supportedBlockTypes = new Set([
  "hero",
  "banner",
  "card",
  "product-card",
  "button",
  "input",
  "table",
  "chart",
  "container",
  "row",
  "column",
  "grid",
  "spacer",
  "divider",
  "features",
  "cta"
]);

function getScreenKeys(schema) {
  return Object.keys(schema.screens || {});
}

function getInitialScreen(schema) {
  const screenKeys = getScreenKeys(schema);
  if (schema.entry && schema.screens?.[schema.entry]) return schema.entry;
  return screenKeys[0] || "home";
}

function getText(value, fallback = "") {
  return value === undefined || value === null || value === "" ? fallback : value;
}

function toCssSize(value, fallback = undefined) {
  if (value === undefined || value === null || value === "") return fallback;
  return typeof value === "number" ? value + "px" : value;
}

function getSurfaceStyle(block = {}) {
  return {
    backgroundColor: block.backgroundColor || undefined,
    color: block.textColor || undefined,
    borderRadius: block.borderRadius || undefined,
    padding: toCssSize(block.padding),
    margin: toCssSize(block.margin),
    height: toCssSize(block.height),
    maxWidth: block.maxWidth || undefined,
  };
}

function getLayoutStyle(block = {}) {
  return {
    ...getSurfaceStyle(block),
    "--gap": toCssSize(block.gap, "16px"),
  };
}

function getJustify(value) {
  if (value === "center") return "center";
  if (value === "end") return "flex-end";
  if (value === "between") return "space-between";
  return "flex-start";
}

function getAlign(value) {
  if (value === "start") return "flex-start";
  if (value === "end") return "flex-end";
  if (value === "stretch") return "stretch";
  return "center";
}

function getBlockTarget(block, currentScreen) {
  if (block.targetScreen && appSchema.screens?.[block.targetScreen]) {
    return block.targetScreen;
  }

  if (block.action === "next-screen") {
    const nextScreen = appSchema.flow?.[currentScreen];
    return nextScreen && appSchema.screens?.[nextScreen] ? nextScreen : null;
  }

  if (block.actions?.onClick?.type === "navigate") {
    const target = block.actions.onClick.target;
    return target && appSchema.screens?.[target] ? target : null;
  }

  return null;
}

function navigateTo(target, setCurrentScreen) {
  if (!target || !appSchema.screens?.[target]) return;
  setCurrentScreen(target);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function RenderChildren({ blocks = [], currentScreen, setCurrentScreen }) {
  if (!blocks.length) return null;

  return blocks.map((block, index) => (
    <RenderBlock
      key={block.id || block.type + "-" + index}
      block={block}
      currentScreen={currentScreen}
      setCurrentScreen={setCurrentScreen}
    />
  ));
}

function HeroBlock({ block, currentScreen, setCurrentScreen }) {
  const target = getBlockTarget(block, currentScreen);

  return (
    <section className={"hero hero-" + getText(block.variant, "default")} style={getSurfaceStyle(block)}>
      <div>
        <h1>{getText(block.title, "Hero Title")}</h1>
        <p>{getText(block.subtitle, "Hero subtitle")}</p>
        <div className="hero-actions">
          <button type="button" onClick={() => navigateTo(target, setCurrentScreen)}>
            {getText(block.buttonLabel, "Get Started")}
          </button>
        </div>
      </div>
    </section>
  );
}

function BannerBlock({ block }) {
  return (
    <section className="banner" style={getSurfaceStyle(block)}>
      <h2>{getText(block.title, "Banner")}</h2>
      <p>{getText(block.subtitle, "Limited time offer")}</p>
    </section>
  );
}

function CardBlock({ block }) {
  return (
    <article className="card" style={getSurfaceStyle(block)}>
      <h3>{getText(block.title, "Card title")}</h3>
      <p>{getText(block.value, "")}</p>
    </article>
  );
}

function ProductCardBlock({ block, currentScreen, setCurrentScreen }) {
  const target = getBlockTarget(block, currentScreen);
  const metaParts = String(getText(block.price, "$99")).split("|").map((part) => part.trim()).filter(Boolean);
  const primaryMeta = metaParts[0] || "$99";
  const secondaryMeta = metaParts.slice(1).join(" | ");

  return (
    <article className="product-card" style={getSurfaceStyle(block)}>
      <div className="product-media">
        {block.image ? (
          <img src={block.image} alt={getText(block.name, "Product")} />
        ) : (
          <span>{String(primaryMeta).startsWith("$") ? "Product" : "Video"}</span>
        )}
      </div>
      <h3>{getText(block.name, "Product")}</h3>
      <div className="product-meta">
        <span>{primaryMeta}</span>
        {secondaryMeta ? <small>{secondaryMeta}</small> : null}
      </div>
      <button type="button" onClick={() => navigateTo(target, setCurrentScreen)}>
        {String(primaryMeta).startsWith("$") ? "View Product" : "Watch"}
      </button>
    </article>
  );
}

function ButtonBlock({ block, currentScreen, setCurrentScreen }) {
  const target = getBlockTarget(block, currentScreen);
  const style = {
    backgroundColor: block.backgroundColor || undefined,
    color: block.textColor || undefined,
    borderRadius: block.borderRadius || undefined,
    padding: toCssSize(block.padding),
    height: toCssSize(block.height),
    fontSize: toCssSize(block.fontSize),
    fontWeight: block.fontWeight || undefined,
    width: block.widthMode === "full" ? "100%" : "auto",
    maxWidth: block.maxWidth || undefined,
  };

  return (
    <button className="button" type="button" style={style} onClick={() => navigateTo(target, setCurrentScreen)}>
      {getText(block.label, "Button")}
    </button>
  );
}

function InputBlock({ block }) {
  return (
    <input
      className="input"
      type={getText(block.inputType, "text")}
      placeholder={getText(block.placeholder, block.field || "Input")}
      aria-label={getText(block.placeholder, block.field || "Input")}
    />
  );
}

function TableBlock({ block }) {
  const rows = block.rows || [
    ["Customer", "Status", "Amount"],
    ["Alex Morgan", "Paid", "$129"],
    ["Sam Taylor", "Pending", "$89"],
  ];

  return (
    <section className="table-card" style={getSurfaceStyle(block)}>
      <h3>{getText(block.title, "Table")}</h3>
      <div className="table-scroll">
        <table>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) =>
                  rowIndex === 0 ? (
                    <th key={cellIndex}>{cell}</th>
                  ) : (
                    <td key={cellIndex}>{cell}</td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ChartBlock({ block }) {
  return (
    <section className="chart-card" style={getSurfaceStyle(block)}>
      <h3>{getText(block.title, "Chart")}</h3>
      <div className="chart-bars">
        {[45, 70, 56, 88, 64].map((height, index) => (
          <span key={index} style={{ height: height + "%" }} />
        ))}
      </div>
    </section>
  );
}

function ContainerBlock({ block, currentScreen, setCurrentScreen }) {
  return (
    <section className="layout-container" style={getLayoutStyle(block)}>
      <RenderChildren blocks={block.children} currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
    </section>
  );
}

function RowBlock({ block, currentScreen, setCurrentScreen }) {
  const style = {
    ...getLayoutStyle(block),
    justifyContent: getJustify(block.justify),
    alignItems: getAlign(block.align),
    flexWrap: block.wrap === false ? "nowrap" : "wrap",
  };

  return (
    <section className="layout-row" style={style}>
      <RenderChildren blocks={block.children} currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
    </section>
  );
}

function ColumnBlock({ block, currentScreen, setCurrentScreen }) {
  const style = {
    ...getLayoutStyle(block),
    flexBasis: block.width || "0",
    flexGrow: block.grow === false ? 0 : 1,
  };

  return (
    <section className="layout-column" style={style}>
      <RenderChildren blocks={block.children} currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
    </section>
  );
}

function GridBlock({ block, currentScreen, setCurrentScreen }) {
  const style = {
    ...getLayoutStyle(block),
    "--columns": Math.max(1, Number(block.columns || 3)),
  };

  return (
    <section className="grid-section" style={style}>
      {block.title ? <h2>{block.title}</h2> : null}
      <div className="layout-grid">
        <RenderChildren blocks={block.children} currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
      </div>
    </section>
  );
}

function SpacerBlock({ block }) {
  return <div style={{ height: toCssSize(block.height, "32px") }} />;
}

function DividerBlock({ block }) {
  return <hr style={{ borderColor: block.color || "#334155", borderWidth: toCssSize(block.thickness, "1px") }} />;
}

function FeaturesBlock({ block }) {
  const items = block.items?.length ? block.items : ["Fast", "Simple", "Responsive"];

  return (
    <section className="features" style={getSurfaceStyle(block)}>
      <h2>{getText(block.title, "Features")}</h2>
      <div className="feature-grid">
        {items.map((item, index) => (
          <article className="card" key={index}>
            <h3>{item}</h3>
            <p>{block.descriptions?.[index] || "A polished generated section."}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function CtaBlock({ block, currentScreen, setCurrentScreen }) {
  const target = getBlockTarget(block, currentScreen);

  return (
    <section className="cta" style={getSurfaceStyle(block)}>
      <h2>{getText(block.title, "Ready to start?")}</h2>
      <button type="button" onClick={() => navigateTo(target, setCurrentScreen)}>
        {getText(block.buttonLabel, "Get Started")}
      </button>
    </section>
  );
}

function UnsupportedBlock({ block }) {
  return (
    <section className="card">
      <h3>Unsupported block</h3>
      <p>{block.type}</p>
    </section>
  );
}

function RenderBlock({ block, currentScreen, setCurrentScreen }) {
  if (!block || !supportedBlockTypes.has(block.type)) {
    return <UnsupportedBlock block={block || { type: "unknown" }} />;
  }

  switch (block.type) {
    case "hero":
      return <HeroBlock block={block} currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />;
    case "banner":
      return <BannerBlock block={block} />;
    case "card":
      return <CardBlock block={block} />;
    case "product-card":
      return <ProductCardBlock block={block} currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />;
    case "button":
      return <ButtonBlock block={block} currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />;
    case "input":
      return <InputBlock block={block} />;
    case "table":
      return <TableBlock block={block} />;
    case "chart":
      return <ChartBlock block={block} />;
    case "container":
      return <ContainerBlock block={block} currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />;
    case "row":
      return <RowBlock block={block} currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />;
    case "column":
      return <ColumnBlock block={block} currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />;
    case "grid":
      return <GridBlock block={block} currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />;
    case "spacer":
      return <SpacerBlock block={block} />;
    case "divider":
      return <DividerBlock block={block} />;
    case "features":
      return <FeaturesBlock block={block} />;
    case "cta":
      return <CtaBlock block={block} currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />;
    default:
      return <UnsupportedBlock block={block} />;
  }
}

export default function App() {
  const screenKeys = useMemo(() => getScreenKeys(appSchema), []);
  const [currentScreen, setCurrentScreen] = useState(() => getInitialScreen(appSchema));
  const screen = appSchema.screens?.[currentScreen] || appSchema.screens?.[screenKeys[0]] || {
    title: "Untitled Screen",
    blocks: [],
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Exported RAPID App</p>
          <h1>{getText(appSchema.title, "RAPID App")}</h1>
        </div>
        <nav aria-label="Screens">
          {screenKeys.map((screenKey) => (
            <button
              key={screenKey}
              type="button"
              className={screenKey === currentScreen ? "active" : ""}
              onClick={() => navigateTo(screenKey, setCurrentScreen)}
            >
              {getText(appSchema.screens[screenKey]?.title, screenKey)}
            </button>
          ))}
        </nav>
      </header>

      <main>
        <div className="screen-title">
          <p>Screen</p>
          <h2>{getText(screen.title, currentScreen)}</h2>
        </div>
        <RenderChildren blocks={screen.blocks} currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
      </main>
    </div>
  );
}
