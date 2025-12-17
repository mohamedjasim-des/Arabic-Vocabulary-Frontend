import { Plus, Trash2 } from "lucide-react";

const ALL_TENSES = ["past", "present", "future"];

export default function WordRow({ row, onChange, onDelete, createEmptyEntry }) {

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

  const font = (field) => {   // fixed arrow function
    switch (field) {
      case "arabic":
        return "font-arabic text-lg text-right rtl"; // added RTL
      case "english":
        return "font-english";
      case "tamil":
        return "font-tamil";
      default:
        return "";
    }
  }

  return (
    <>
      {row.entries.map((entry, index) => (
        <tr key={index} className="border-t border-gray-200">
          <td className="p-3 text-center font-medium">
            {index === 0 ? row.id : ""}
          </td>

          {["arabic", "english", "tamil", "note"].map(field => (
            <td key={field} className="p-2">
              <input
                className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 ${font(field)}`}
                value={entry[field]}
                onChange={e =>
                  updateEntry(index, field, e.target.value)
                }
              />
            </td>
          ))}

          <td className="p-2 flex gap-2 items-center justify-center ">
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
