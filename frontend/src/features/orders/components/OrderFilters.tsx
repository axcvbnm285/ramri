"use client";

interface Props {
  search: string;
  setSearch: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
}

export default function OrderFilters({ search, setSearch, status, setStatus }: Props) {
  return (
    <div className="rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <input
          type="text"
          placeholder="Search order #, customer, phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border dark:border-gray-700 px-4 py-2 outline-none focus:ring-2 focus:ring-nepal-maroon dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border dark:border-gray-700 px-4 py-2 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
        >
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="DISPATCHED">Dispatched</option>
          <option value="RECEIVED">Received</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>
    </div>
  );
}
