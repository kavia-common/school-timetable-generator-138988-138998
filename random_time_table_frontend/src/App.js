import React, { useMemo, useState, useEffect } from 'react';
import './App.css';

/**
 * PUBLIC_INTERFACE
 * Main application component for the Random Timetable Generator.
 * Provides a modern UI with inputs for grade/class and subjects, and displays
 * a generated timetable using the Ocean Professional theme.
 */
function App() {
  // Theme handling with persistence
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Form state
  const [grade, setGrade] = useState('Grade 8');
  const [section, setSection] = useState('A');
  const [days, setDays] = useState(5);
  const [periodsPerDay, setPeriodsPerDay] = useState(7);
  const [subjectInput, setSubjectInput] = useState('Math, English, Science, History, Art, PE, Music');
  const [subjects, setSubjects] = useState(['Math', 'English', 'Science', 'History', 'Art', 'PE', 'Music']);
  const [loading, setLoading] = useState(false);
  const [timetable, setTimetable] = useState(null);
  const [error, setError] = useState('');

  const colorPalette = useMemo(
    () => ['#2563EB', '#0EA5E9', '#14B8A6', '#F59E0B', '#10B981', '#F97316', '#8B5CF6', '#EC4899'],
    []
  );

  // PUBLIC_INTERFACE
  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  // PUBLIC_INTERFACE
  function parseSubjects(input) {
    /**
     * Parse a comma-separated list into unique, trimmed subjects.
     */
    return Array.from(
      new Set(
        input
          .split(',')
          .map(s => s.trim())
          .filter(Boolean)
      )
    );
  }

  // PUBLIC_INTERFACE
  function handleSubjectBlur() {
    const parsed = parseSubjects(subjectInput);
    setSubjects(parsed);
  }

  // PUBLIC_INTERFACE
  function getDayNames(count) {
    const base = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return base.slice(0, Math.max(1, Math.min(7, count)));
  }

  // PUBLIC_INTERFACE
  function generateRandomTimetable(opts) {
    /**
     * Generate a random timetable matrix [days][periods] using the provided subjects.
     * Ensures no immediate repetition across consecutive periods in a day.
     */
    const { subjects, days, periods } = opts;
    if (!subjects || subjects.length === 0) return [];
    const result = [];

    for (let d = 0; d < days; d++) {
      const day = [];
      for (let p = 0; p < periods; p++) {
        const available = subjects.filter(s => s !== day[p - 1]); // avoid immediate repeats
        const pool = available.length ? available : subjects;
        const choice = pool[Math.floor(Math.random() * pool.length)];
        day.push(choice);
      }
      result.push(day);
    }
    return result;
  }

  // PUBLIC_INTERFACE
  async function handleGenerate(e) {
    /**
     * Validate input and generate a new timetable; simulates async for UX polish.
     */
    e.preventDefault();
    setError('');
    const parsedSubjects = parseSubjects(subjectInput);
    if (parsedSubjects.length === 0) {
      setError('Please enter at least one subject.');
      return;
    }
    if (days < 1 || days > 7) {
      setError('Days must be between 1 and 7.');
      return;
    }
    if (periodsPerDay < 1 || periodsPerDay > 12) {
      setError('Periods per day must be between 1 and 12.');
      return;
    }

    setLoading(true);
    try {
      await new Promise(res => setTimeout(res, 400)); // simulate processing
      const grid = generateRandomTimetable({
        subjects: parsedSubjects,
        days,
        periods: periodsPerDay,
      });
      setSubjects(parsedSubjects);
      setTimetable({
        meta: {
          grade,
          section,
          days,
          periodsPerDay,
        },
        grid,
      });
    } catch (err) {
      setError('Failed to generate timetable. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  // Helpers for UI
  const dayNames = getDayNames(days);

  return (
    <div className="ocean-app">
      <header className="ocean-header">
        <div className="brand">
          <div className="brand-badge">RT</div>
          <div className="brand-text">
            <h1 className="brand-title">Random Timetable</h1>
            <p className="brand-subtitle">Ocean Professional</p>
          </div>
        </div>

        <div className="actions">
          <button
            className="btn ghost"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </header>

      <main className="ocean-main">
        <section className="panel input-panel">
          <div className="panel-header">
            <h2>Student & Timetable Settings</h2>
            <p>Enter basic details and subjects to generate a weekly schedule.</p>
          </div>

          <form className="form-grid" onSubmit={handleGenerate}>
            <div className="field">
              <label>Grade</label>
              <input
                type="text"
                value={grade}
                onChange={e => setGrade(e.target.value)}
                placeholder="e.g., Grade 8"
              />
            </div>

            <div className="field">
              <label>Class/Section</label>
              <input
                type="text"
                value={section}
                onChange={e => setSection(e.target.value)}
                placeholder="e.g., A"
              />
            </div>

            <div className="field">
              <label>Days per week</label>
              <input
                type="number"
                min={1}
                max={7}
                value={days}
                onChange={e => setDays(Number(e.target.value))}
              />
            </div>

            <div className="field">
              <label>Periods per day</label>
              <input
                type="number"
                min={1}
                max={12}
                value={periodsPerDay}
                onChange={e => setPeriodsPerDay(Number(e.target.value))}
              />
            </div>

            <div className="field field-wide">
              <label>Subjects (comma separated)</label>
              <textarea
                rows={3}
                value={subjectInput}
                onChange={e => setSubjectInput(e.target.value)}
                onBlur={handleSubjectBlur}
                placeholder="Math, English, Science, History, Art, PE, Music"
              />
              <div className="chips">
                {subjects.map((s, i) => (
                  <span
                    key={`${s}-${i}`}
                    className="chip"
                    style={{ background: colorPalette[i % colorPalette.length] + '20', color: '#111827' }}
                  >
                    <span className="chip-dot" style={{ background: colorPalette[i % colorPalette.length] }} />
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="form-actions">
              <button className="btn primary" type="submit" disabled={loading}>
                {loading ? 'Generating…' : 'Generate Timetable'}
              </button>
            </div>

            {error && <div className="alert error">{error}</div>}
          </form>
        </section>

        <section className="panel results-panel">
          <div className="panel-header">
            <h2>Generated Timetable</h2>
            <p>View your randomized schedule below.</p>
          </div>

          {timetable ? (
            <div className="timetable-wrapper">
              <div className="timetable-meta">
                <div>
                  <span className="meta-label">Grade</span>
                  <span className="meta-value">{timetable.meta.grade}</span>
                </div>
                <div>
                  <span className="meta-label">Class</span>
                  <span className="meta-value">{timetable.meta.section}</span>
                </div>
                <div>
                  <span className="meta-label">Days</span>
                  <span className="meta-value">{timetable.meta.days}</span>
                </div>
                <div>
                  <span className="meta-label">Periods/Day</span>
                  <span className="meta-value">{timetable.meta.periodsPerDay}</span>
                </div>
              </div>

              <div className="timetable">
                <div className="timetable-row timetable-head">
                  <div className="cell head sticky-col">Day</div>
                  {Array.from({ length: timetable.meta.periodsPerDay }).map((_, idx) => (
                    <div key={`p${idx}`} className="cell head">
                      P{idx + 1}
                    </div>
                  ))}
                </div>

                {timetable.grid.map((row, rIdx) => (
                  <div key={`r${rIdx}`} className="timetable-row">
                    <div className="cell sticky-col day-label">
                      {dayNames[rIdx]}
                    </div>
                    {row.map((subj, cIdx) => {
                      const paletteIdx = subjects.findIndex(s => s === subj);
                      const color = colorPalette[(paletteIdx >= 0 ? paletteIdx : cIdx) % colorPalette.length];
                      return (
                        <div key={`c${rIdx}-${cIdx}`} className="cell">
                          <div className="subject-pill" style={{ borderColor: color }}>
                            <span className="dot" style={{ background: color }} />
                            {subj}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="placeholder">
              <div className="placeholder-icon">📅</div>
              <p>Your timetable will appear here after generation.</p>
            </div>
          )}
        </section>
      </main>

      <footer className="ocean-footer">
        <span>Built with ❤️ — Ocean Professional Theme</span>
      </footer>
    </div>
  );
}

export default App;
