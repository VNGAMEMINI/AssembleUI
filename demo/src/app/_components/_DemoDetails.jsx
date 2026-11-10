import { formatType } from "../_utils/_appUtils";

export function DemoDetails({ demo }) {
  return (
    <section className="demo-details">
      <div className="demo-detail">
        <span>Category</span>
        <strong>{formatType(demo.type)}</strong>
      </div>

      <div className="demo-detail">
        <span>Element</span>
        <strong>&lt;{demo.name}/&gt;</strong>
      </div>

      <div className="demo-detail">
        <span>Export</span>
        <strong>{demo.name}</strong>
      </div>

      <div className="demo-detail">
        <span>Package</span>
        <strong>@vnallmini/react</strong>
      </div>
    </section>
  );
}
