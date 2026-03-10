import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const options = [
  { value: "all",       label: "All",             icon: "⚡" },
  { value: "series",    label: "Web Series",       icon: "📺" },
  { value: "hindi",     label: "Hindi Movies",     icon: "🎬" },
  { value: "bengali",   label: "Bengali Movies",   icon: "🎭" },
  { value: "hollywood", label: "Hollywood",        icon: "🌟" },
];

function FilterDropdown({ filter, setFilter }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  const selected = options.find((o) => o.value === filter) || options[0];

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const choose = (val) => {
    setFilter(val);
    setOpen(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');

        .fd-root {
          position: relative;
          display: inline-block;
          font-family: 'DM Sans', sans-serif;
          user-select: none;
          min-width: 200px;
        }

        /* ── Trigger button ── */
        .fd-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 10px;
          border: 1.5px solid rgba(0,0,0,0.09);
          background: rgba(255,255,255,0.95);
          color: #333;
          font-size: 14px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          box-shadow: 0 1px 6px rgba(0,0,0,0.06);
          outline: none;
        }
        .dark .fd-trigger {
          background: rgba(15,18,28,0.95);
          border-color: rgba(255,255,255,0.09);
          color: #e0e0e0;
          box-shadow: 0 1px 8px rgba(0,0,0,0.3);
        }
        .fd-trigger:hover,
        .fd-trigger.open {
          border-color: #F58C1E;
          box-shadow: 0 0 0 3px rgba(245,140,30,0.12);
        }

        .fd-trigger-icon { font-size: 16px; line-height: 1; }
        .fd-trigger-label { flex: 1; text-align: left; }

        .fd-trigger-tag {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.08em;
          padding: 2px 7px;
          border-radius: 99px;
          background: linear-gradient(135deg, #F58C1E, #e07010);
          color: #fff;
          text-transform: uppercase;
        }

        .fd-chevron {
          font-size: 11px;
          color: #aaa;
          transition: transform 0.25s cubic-bezier(.34,1.56,.64,1), color 0.2s;
          margin-left: 2px;
        }
        .fd-trigger.open .fd-chevron {
          transform: rotate(180deg);
          color: #F58C1E;
        }

        /* ── Dropdown panel ── */
        .fd-panel {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          z-index: 50;
          border-radius: 12px;
          border: 1.5px solid rgba(0,0,0,0.08);
          background: rgba(255,255,255,0.98);
          box-shadow: 0 12px 40px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08);
          overflow: hidden;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .dark .fd-panel {
          background: rgba(14,17,26,0.98);
          border-color: rgba(255,255,255,0.08);
          box-shadow: 0 12px 40px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.3);
        }

        /* header inside panel */
        .fd-panel-header {
          padding: 10px 14px 8px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #bbb;
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }
        .dark .fd-panel-header {
          color: #555;
          border-bottom-color: rgba(255,255,255,0.05);
        }

        /* option row */
        .fd-option {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          color: #444;
          transition: background 0.15s, color 0.15s;
          position: relative;
          border: none;
          background: transparent;
          width: 100%;
          text-align: left;
          font-family: 'DM Sans', sans-serif;
        }
        .dark .fd-option { color: #ccc; }

        .fd-option:hover {
          background: rgba(245,140,30,0.07);
          color: #F58C1E;
        }
        .fd-option.selected {
          color: #F58C1E;
          background: rgba(245,140,30,0.08);
        }
        .dark .fd-option.selected {
          background: rgba(245,140,30,0.1);
        }

        .fd-option-icon { font-size: 15px; line-height: 1; }
        .fd-option-label { flex: 1; }

        .fd-option-check {
          font-size: 13px;
          color: #F58C1E;
          font-weight: 700;
          flex-shrink: 0;
        }

        /* active left bar */
        .fd-option.selected::before {
          content: '';
          position: absolute;
          left: 0; top: 20%; bottom: 20%;
          width: 3px;
          border-radius: 0 2px 2px 0;
          background: linear-gradient(to bottom, #F58C1E, #2EC4B6);
        }

        /* divider between options */
        .fd-option + .fd-option {
          border-top: 1px solid rgba(0,0,0,0.04);
        }
        .dark .fd-option + .fd-option {
          border-top-color: rgba(255,255,255,0.04);
        }
      `}</style>

      <div className="fd-root" ref={rootRef}>
        {/* Trigger */}
        <button
          className={`fd-trigger${open ? " open" : ""}`}
          onClick={() => setOpen((p) => !p)}
        >
          <span className="fd-trigger-icon">{selected.icon}</span>
          <span className="fd-trigger-label">{selected.label}</span>
          {selected.value !== "all" && (
            <span className="fd-trigger-tag">Active</span>
          )}
          <span className="fd-chevron">▼</span>
        </button>

        {/* Dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              className="fd-panel"
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0,  scale: 1    }}
              exit={{    opacity: 0, y: -8, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
            >
              <div className="fd-panel-header">Filter by category</div>

              {options.map((opt, i) => (
                <motion.button
                  key={opt.value}
                  className={`fd-option${filter === opt.value ? " selected" : ""}`}
                  onClick={() => choose(opt.value)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0  }}
                  transition={{ delay: i * 0.045, type: "spring", stiffness: 350, damping: 26 }}
                >
                  <span className="fd-option-icon">{opt.icon}</span>
                  <span className="fd-option-label">{opt.label}</span>
                  {filter === opt.value && (
                    <span className="fd-option-check">✓</span>
                  )}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default FilterDropdown;