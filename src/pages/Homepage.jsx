import { useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../utils/axiosClient';
import { logoutUser } from '../authSlice';

const AVATAR_COLORS = [
  '#4ADE80', // green
  '#60A5FA', // blue
  '#F472B6', // pink
  '#FBBF24', // amber
  '#A78BFA', // purple
  '#22D3EE', // cyan
  '#FB923C', // orange
  '#F87171', // red
];

function getAvatarColor(seed) {
  if (!seed) return AVATAR_COLORS[0];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function Avatar({ user }) {
  const seed = user?._id || user?.emailID || user?.firstName || '';
  const bg = getAvatarColor(seed);
  const letter = (user?.firstName?.[0] || '?').toUpperCase();
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center font-display font-semibold text-sm text-[#0A0B0D]"
      style={{ backgroundColor: bg }}
    >
      {letter}
    </div>
  );
}

const DIFFICULTY_STYLE = {
  easy: 'text-[#4ADE80] border-[#4ADE80]/30 bg-[#4ADE80]/10',
  medium: 'text-[#FBBF24] border-[#FBBF24]/30 bg-[#FBBF24]/10',
  hard: 'text-[#F87171] border-[#F87171]/30 bg-[#F87171]/10',
};

function DifficultyBadge({ difficulty }) {
  const style = DIFFICULTY_STYLE[difficulty?.toLowerCase()] || 'text-[#8A8F98] border-[#2A2D33] bg-[#2A2D33]/40';
  return (
    <span className={`text-xs font-mono-custom px-2.5 py-1 rounded-md border ${style}`}>
      {difficulty}
    </span>
  );
}

// Normalizes a problem's tags field to an array, since it may arrive as
// either a single string ("array") or an array (["array", "dp"]).
function normalizeTags(tags) {
  if (!tags) return [];
  return Array.isArray(tags) ? tags : [tags];
}

const TAG_LABELS = {
  array: 'Array',
  linkedlist: 'Linked List',
  graph: 'Graph',
  dp: 'Dynamic Programming',
  string: 'String',
  tree: 'Tree',
};

function StatCard({ label, value, accent }) {
  return (
    <div className="bg-[#202123] border border-[#2A2D33] rounded-lg px-5 py-4 flex-1 min-w-30">
      <p className="text-xs font-mono-custom text-[#8A8F98] mb-1.5">{label}</p>
      <p className="font-display font-semibold text-2xl" style={accent ? { color: accent } : undefined}>
        {value}
      </p>
    </div>
  );
}

function Homepage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [filters, setFilters] = useState({
    difficulty: 'all',
    tag: 'all',
    status: 'all'
  });
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const { data } = await axiosClient.get('/problem/getAllProblem');
        // Shuffle the problems to display them in random order
        for (let i = data.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [data[i], data[j]] = [data[j], data[i]];
        }
        setProblems(data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    const fetchSolvedProblems = async () => {
      try {
        const { data } = await axiosClient.get('/problem/problemSolvedByUser');
        setSolvedProblems(data);
      } catch (error) {
        console.error('Error fetching solved problems:', error);
      }
    };

    fetchProblems();
    if (user) fetchSolvedProblems();
  }, [user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    setSolvedProblems([]);
  };

  const filteredProblems = problems.filter(problem => {
    const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
    const tagMatch = filters.tag === 'all' || normalizeTags(problem.tags).includes(filters.tag);
    const statusMatch = filters.status === 'all' ||
                      solvedProblems.some(sp => sp._id === problem._id);
    const searchMatch = search.trim() === '' ||
                      problem.title.toLowerCase().includes(search.trim().toLowerCase());
    return difficultyMatch && tagMatch && statusMatch && searchMatch;
  });

  const difficultyCounts = useMemo(() => {
    const counts = { easy: 0, medium: 0, hard: 0 };
    problems.forEach(p => {
      const d = p.difficulty?.toLowerCase();
      if (counts[d] !== undefined) counts[d] += 1;
    });
    return counts;
  }, [problems]);

  return (
    <div className="min-h-screen bg-[#171718] text-[#EDEDED] font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Space Grotesk', system-ui, sans-serif; }
        .font-mono-custom { font-family: 'JetBrains Mono', ui-monospace, monospace; }
      `}</style>

      {/* Navigation Bar */}
      <nav className="border-b border-[#2A2D33] px-6 py-4 flex items-center justify-between">
        <NavLink to="/" className="font-display font-semibold text-2xl tracking-tight">
          Erical<span className="text-[#4ADE80]">Code</span>
        </NavLink>

        <div className="dropdown dropdown-end relative group">
          <button tabIndex={0} className="flex items-center gap-2 focus:outline-none">
            <Avatar user={user} />
          </button>
          <ul
            tabIndex={0}
            className="absolute right-0 mt-2 w-44 bg-[#131519] border border-[#2A2D33] rounded-md shadow-xl py-1 opacity-0 invisible group-focus-within:opacity-100 group-focus-within:visible transition-all z-10"
          >
            <li className="px-3 py-2 text-xs text-[#8A8F98] border-b border-[#2A2D33]">
              {user?.firstName}
            </li>
            {user?.role === 'admin' && (
              <li>
                <NavLink
                  to="/admin"
                  className="block px-3 py-2 text-sm hover:bg-[#1A1C20] transition-colors"
                >
                  Admin
                </NavLink>
              </li>
            )}
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-sm text-[#F87171] hover:bg-[#1A1C20] transition-colors"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Welcome header */}
        <div className="mb-8">
          <p className="text-xs font-mono-custom text-[#4ADE80] mb-1">
            {solvedProblems.length > 0 ? 'welcome back' : 'welcome'}
          </p>
          <h1 className="font-display font-semibold text-3xl">
            {user?.firstName ? `Hey, ${user.firstName}.` : 'Hey there.'}{' '}
            <span className="text-[#8A8F98] font-normal">Let's do it.</span>
          </h1>
        </div>

        {/* Overall stats row */}
        <div className="flex flex-wrap gap-3 mb-8">
          <StatCard label="Solved" value={solvedProblems.length} accent="#4ADE80" />
          <StatCard label="Total problems" value={problems.length} />
          <StatCard label="Easy" value={difficultyCounts.easy} accent="#4ADE80" />
          <StatCard label="Medium" value={difficultyCounts.medium} accent="#FBBF24" />
          <StatCard label="Hard" value={difficultyCounts.hard} accent="#F87171" />
        </div>

        {/* Filters + Search */}
        <div className="flex flex-wrap items-center gap-3 mb-8 justify-between">
          <div className="flex flex-wrap gap-3">
            <select
              className="bg-[#131519] border border-[#2A2D33] rounded-md px-3 py-2 text-sm text-[#EDEDED] outline-none focus:border-[#4ADE80] transition-colors"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="all">All Problems</option>
              <option value="solved">Solved Problems</option>
            </select>

            <select
              className="bg-[#131519] border border-[#2A2D33] rounded-md px-3 py-2 text-sm text-[#EDEDED] outline-none focus:border-[#4ADE80] transition-colors"
              value={filters.difficulty}
              onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <select
              className="bg-[#131519] border border-[#2A2D33] rounded-md px-3 py-2 text-sm text-[#EDEDED] outline-none focus:border-[#4ADE80] transition-colors"
              value={filters.tag}
              onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
            >
              <option value="all">All Tags</option>
              <option value="array">Array</option>
              <option value="linkedlist">Linked List</option>
              <option value="graph">Graph</option>
              <option value="dp">DP</option>
              <option value="string">String</option>
              <option value="tree">Tree</option>

            </select>
          </div>

          {/* Search - right aligned */}
          <div className="relative w-full sm:w-64">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8A8F98]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search problems..."
              className="w-full bg-[#131519] border border-[#2A2D33] rounded-md pl-9 pr-8 py-2 text-sm text-[#EDEDED] placeholder:text-[#5A5D63] outline-none focus:border-[#4ADE80] transition-colors"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8A8F98] hover:text-[#EDEDED] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Problems List */}
        <div className="grid gap-3">
          {filteredProblems.map(problem => (
            <div
              key={problem._id}
              className="bg-[#202123] border border-[#2A2D33] rounded-lg px-5 py-4 hover:border-[#4A4D53] transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <NavLink
                  to={`/problem/${problem._id}`}
                  className="font-display font-medium text-lg hover:text-[#4ADE80] transition-colors"
                >
                  {problem.title}
                </NavLink>
                {solvedProblems.some(sp => sp._id === problem._id) && (
                  <span className="flex items-center gap-1 text-xs font-mono-custom text-[#4ADE80] border border-[#4ADE80]/30 bg-[#4ADE80]/10 rounded-md px-2.5 py-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Solved
                  </span>
                )}
              </div>

              <div className="flex gap-2 flex-wrap">
                <DifficultyBadge difficulty={problem.difficulty} />
                {normalizeTags(problem.tags).map(tag => (
                  <span
                    key={tag}
                    className="text-xs font-mono-custom px-2.5 py-1 rounded-md border border-[#2A2D33] text-[#8A8F98]"
                  >
                    {TAG_LABELS[tag?.toLowerCase()] || tag}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {filteredProblems.length === 0 && (
            <p className="text-[#8A8F98] text-sm text-center py-12">
              No problems match these filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Homepage;