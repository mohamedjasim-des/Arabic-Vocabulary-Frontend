import { useEffect, useState } from "react";
import WordRow from "./WordRow";
import {
  createWord,
  getWords,
  updateWord,
  deleteWord
} from "../../utils/api";

export default function TableEditor() {
  const [rows, setRows] = useState([]);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);

  const createEmptyEntry = () => ({
    arabic: "",
    english: "",
    tamil: "",
    note: "",
  });

  /* ================= FETCH ================= */
  useEffect(() => {
    (async () => {
      const res = await getWords();

      const formatted = res.data.data.map(w => ({
        id: w.sNo,
        _id: w._id,
        entries: w.meanings.map(m => ({
          arabic: m.arabic || "",
          english: m.english || "",
          tamil: m.tamil || "",
          note: m.tense || "",
        })),
      }));

      setRows(formatted);
    })();
  }, []);

  useEffect(() => {
    
    if (rows.length === 0 || scrolledToBottom) return;
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
    if(!scrolledToBottom) setScrolledToBottom(true);
  }, [rows]);

  /* ================= ADD ================= */
  const addSerial = async () => {
    const payload = {
      sNo: rows.length + 1,
      rootWord: "-",
      note: "Noun",
      meanings: [
        {
          tense: "-",
          arabic: "-",
          english: "-",
          tamil: "-",
        },
      ],
    };

    const res = await createWord(payload);

    setRows(prev => [
      ...prev,
      {
        id: res.data.data.sNo,
        _id: res.data.data._id,
        entries: [{
          arabic: "",
          english: "",
          tamil: "",
          note: "",
        }],
      },
    ]);
  };

  /* ================= UPDATE ================= */
  const updateRow = async (id, updatedEntries) => {
    const row = rows.find(r => r.id === id);
    if (!row?._id) return;
    setRows(prev =>
      prev.map(r =>
        r.id === id ? { ...r, entries: updatedEntries } : r
      )
    );
    await updateWord(row._id, {
      meanings: updatedEntries.map(e => ({
        tense: e.note?.trim() || "-",
        arabic: e.arabic?.trim() || "-",
        english: e.english?.trim() || "-",
        tamil: e.tamil?.trim() || "-",
      })),
    });
  };


  /* ================= DELETE ================= */
  const deleteRow = async (id) => {
    const row = rows.find(r => r.id === id);
    if (!row?._id) return;

    // optimistic UI
    setRows(prev => prev.filter(r => r.id !== id));

    await deleteWord(row._id);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white border">
        <table className="w-full text-sm border-collapse">
          <thead className="hidden md:table-header-group bg-gray-100 sticky top-20 z-20">
            <tr>
              <th className="p-3 font-english">S.No</th>
              <th className="p-3 font-arabic text-lg">العربية</th>
              <th className="p-3 font-english">English</th>
              <th className="p-3 font-tamil">தமிழ்</th>
              <th className="p-3 font-english">Note</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <WordRow
                key={row.id}
                row={row}
                onChange={updateRow}
                onDelete={deleteRow}
                createEmptyEntry={createEmptyEntry}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center">
        <button
          onClick={addSerial}
          className="w-full py-1 bg-transaparent text-blue-700 rounded-b-lg hover:bg-blue-500 hover:text-white border border-blue-700 border-t-0"
        >
          + Add New Serial No
        </button>
      </div>
    </div>
  );
}
