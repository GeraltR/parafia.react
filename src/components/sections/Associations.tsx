import type { CSSProperties } from "react";
import { useConfig } from "../../context/configHooks";
import { Icon } from "../Icon/icons";
import type { Association } from "../../types/config";

const GRID_COLS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

/**
 * Splits associations into full rows of 4 (preferred) or 3, allowing the very
 * first association to occupy a full-width row by itself when that is the
 * only way to make every subsequent row come out even.
 */
function computeRows(items: Association[]): Association[][] {
  const n = items.length;
  if (n === 0) return [];
  if (n <= 4) return [items];

  let sizes: number[];
  if (n % 4 === 0) {
    sizes = Array(n / 4).fill(4);
  } else if ((n - 1) % 4 === 0) {
    sizes = [1, ...Array((n - 1) / 4).fill(4)];
  } else if (n % 3 === 0) {
    sizes = Array(n / 3).fill(3);
  } else if ((n - 1) % 3 === 0) {
    sizes = [1, ...Array((n - 1) / 3).fill(3)];
  } else {
    const fullRows = Math.floor(n / 4);
    const remainder = n % 4;
    sizes = remainder === 0 ? Array(fullRows).fill(4) : [...Array(fullRows).fill(4), remainder];
  }

  const rows: Association[][] = [];
  let cursor = 0;
  for (const size of sizes) {
    rows.push(items.slice(cursor, cursor + size));
    cursor += size;
  }
  return rows;
}

function AssociationCard({ association, nameStyle }: { association: Association; nameStyle: CSSProperties }) {
  return (
    <a
      href={association.link}
      target="_blank"
      rel="noreferrer"
      className="flex flex-col items-center gap-3 rounded-xl border border-border bg-white p-6 text-center transition-shadow hover:shadow-[0_4px_14px_rgba(13,30,53,.08)]"
    >
      {association.imageUrl ? (
        <img
          src={association.imageUrl}
          alt={association.name}
          className="h-16 w-16 rounded-full object-cover"
        />
      ) : (
        <Icon icon="community" className="h-16 w-16 text-secondary" />
      )}
      <div style={nameStyle} className="font-bold text-primary">
        {association.name}
      </div>
    </a>
  );
}

export function Associations() {
  const { associations } = useConfig();
  const { config, items } = associations;

  if (items.length === 0) {
    return null;
  }

  const nameStyle: CSSProperties = {
    fontFamily: config.nameFont ?? "var(--font-heading)",
    fontSize: config.nameSize ?? "0.9rem",
  };

  const rows = computeRows(items);

  return (
    <section id="ruchy" className="bg-surface-muted py-14">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="mb-5 flex items-baseline justify-between border-b-2 border-primary pb-2.5">
          <h2 className="font-heading text-[1.05rem] font-black tracking-tight text-primary">
            Wspólnoty i stowarzyszenia
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className={`grid gap-4 ${GRID_COLS[row.length] ?? "grid-cols-4"}`}>
              {row.map((association) => (
                <AssociationCard key={association.id} association={association} nameStyle={nameStyle} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
