import { Trash2 } from "lucide-react";

const ALL_TENSES = ["past", "present", "future"];

export default function WordRow({ row, onChange, onDelete, duplicateArabic }) {

  const updateEntry = (index, field, value) => {
    let updated = row.entries.map((e, i) =>
      i === index ? { ...e, [field]: value } : e
    );

    if (
      index === 0 &&
      field === "note" &&
      ALL_TENSES.includes(value.toLowerCase()) &&
      row.entries.length === 1
    ) {
      const base = updated[0];
      updated = ALL_TENSES.map(tense => ({
        ...base,
        note: tense
      }));
    }

    onChange(row.id, updated);
  };

  const font_size = (field) => {
    switch (field) {
      case "arabic":
        return "font-arabic font-medium text-base leading-none tracking-[0.01em] text-right";
      case "tamil":
        return "font-tamil font-light text-[14px] leading-[100%] tracking-[1%]";
      default:
        return "font-english font-normal text-sm leading-none tracking-[0.01em]";
    }
  };

  const font = (field) => {
    switch (field) {
      case "arabic":
        return "Scheherazade New, serif";
      case "tamil":
        return "Sawarabi Gothic, sans-serif";
      default:
        return "Poppins, sans-serif";
    }
  };

  return (
    <>
      {row.entries.map((entry, index) => (
        <tr
          key={index}
          className="border-t border-gray-200 md:table-row block relative"
        >
          {/* S.NO + MOBILE DELETE */}
          <td className="p-3 font-medium block md:table-cell relative">
            {index === 0 && (
              <>
                <span className="md:hidden text-xs text-gray-500 block">
                  S.No
                </span>

                {/* MOBILE DELETE BUTTON */}
                <button
                  onClick={() => onDelete(row.id)}
                  className="
                    md:hidden
                    absolute top-2 right-2
                    p-2 rounded-full
                    bg-red-100 hover:bg-red-200
                    text-red-600
                  "
                >
                  <Trash2 size={16} />
                </button>
              </>
            )}
            {index === 0 ? row.id : ""}
          </td>

          {/* INPUT FIELDS */}
          {["arabic", "english", "tamil", "note"].map(field => (
            <td key={field} className="p-2 block md:table-cell">
              <span className="md:hidden text-xs font-medium text-gray-500 mb-1 block capitalize">
                {field}
              </span>
              <input
                className={`
                  w-full px-3 py-2 border rounded
                  focus:ring-2
                  ${font_size(field)}
                  ${
                    field === "arabic" &&
                    duplicateArabic.has(entry.arabic?.trim().toLowerCase())
                      ? "border-red-500 bg-red-50 focus:ring-red-500"
                      : "focus:ring-blue-500"
                  }
                `}
                style={{ fontFamily: font(field) }}
                value={entry[field]}
                onChange={e => updateEntry(index, field, e.target.value)}
              />

            </td>
          ))}

          {/* DESKTOP DELETE */}
          <td className="p-2 hidden md:table-cell text-center">
            {index === 0 && (
              <button
                onClick={() => onDelete(row.id)}
                className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600"
              >
                <Trash2 size={16} />
              </button>
            )}
          </td>
        </tr>
      ))}
    </>
  );
}
