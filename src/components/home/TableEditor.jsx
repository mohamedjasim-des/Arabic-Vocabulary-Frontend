import { useEffect, useState } from "react";
import WordRow from "./WordRow";
import {
  createWord,
  getWords,
  updateWord,
  deleteWord
} from "../../utils/api";
import { Search } from "lucide-react";


export default function TableEditor() {
  const [rows, setRows] = useState([]);
  const [duplicateArabic, setDuplicateArabic] = useState(new Set());
  const [scrolledToBottom, setScrolledToBottom] = useState(false);

  const [search, setSearch] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);


  const createEmptyEntry = () => ({
    arabic: "",
    english: "",
    tamil: "",
    note: ""
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
          note: m.tense || ""
        }))
      }));

      setRows(formatted);
      setFilteredRows(formatted);
    })();
  }, []);

  /* ================= DUPLICATE CHECK ================= */
  useEffect(() => {
    const seen = {};
    const duplicates = new Set();

    rows.forEach(row => {
      row.entries.forEach(e => {
        if (!e.arabic) return;
        const key = e.arabic.trim().toLowerCase();
        if (!key || key === "-") return;

        if (seen[key]) duplicates.add(key);
        else seen[key] = true;
      });
    });

    setDuplicateArabic(duplicates);
  }, [rows]);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredRows(rows);
      return;
    }
    const q = search.toLowerCase();
    const filtered = rows
      .map(row => {
        const matchedEntries = row.entries.filter(e =>
          e.arabic?.toLowerCase().includes(q) ||
          e.english?.toLowerCase().includes(q) ||
          e.tamil?.toLowerCase().includes(q) ||
          e.note?.toLowerCase().includes(q)
        );
        if (matchedEntries.length > 0) {
          return {
            ...row,
            entries: matchedEntries
          };
        }
        return null;
      })
      .filter(Boolean);
    setFilteredRows(filtered);
  }, [search, rows]);



  /* ================= SCROLL ================= */
  useEffect(() => {
    if (rows.length === 0 || scrolledToBottom) return;
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    setScrolledToBottom(true);
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
        tamil: e.tamil?.trim() || "-"
      }))
    });
  };

  /* ================= DELETE ================= */
  const deleteRow = async id => {
    const row = rows.find(r => r.id === id);
    if (!row?._id) return;

    setRows(prev => prev.filter(r => r.id !== id));
    await deleteWord(row._id);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="pb-5 flex justify-end sticky top-20 z-20 bg-gray-50">
        <div className="relative w-full md:w-1/2 lg:w-1/3">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search Arabic / English / Tamil / Note"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="
              w-full pl-10 pr-4 py-2
              border rounded
              bg-gray-50
              focus:ring-2 focus:ring-blue-500
              focus:outline-none
            "
          />
        </div>
      </div>

      <div className="bg-white border">
        <table className="w-full text-sm border-collapse">
          <thead className="hidden md:table-header-group bg-gray-100 sticky top-35 z-20">
            <tr>
              <th className="p-3">S.No</th>
              <th className="p-3 font-arabic text-lg">العربية</th>
              <th className="p-3">English</th>
              <th className="p-3 font-tamil">தமிழ்</th>
              <th className="p-3">Note</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map(row => (
              <WordRow
                key={row.id}
                row={row}
                onChange={updateRow}
                onDelete={deleteRow}
                createEmptyEntry={createEmptyEntry}
                duplicateArabic={duplicateArabic}
              />
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={addSerial}
        className="w-full py-1 bg-transparent text-blue-700 hover:bg-blue-500 hover:text-white border border-blue-700 border-t-0"
      >
        + Add New Serial No
      </button>
    </div>
  );
}
