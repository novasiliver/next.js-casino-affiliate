"use client";

import { useState } from "react";
import FilterBar from "./FilterBar";
import FilterableCasinoList from "./FilterableCasinoList";

type FilterType = 'trending' | 'fast-payouts' | 'crypto-only' | 'live-dealer';

interface CasinoListWithFiltersProps {
  casinos: any[];
}

export default function CasinoListWithFilters({ casinos }: CasinoListWithFiltersProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('trending');

  return (
    <>
      <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      
      {/* Main Content: Casino Grid */}
      <section id="top-list" className="py-12 bg-slate-950 scroll-mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FilterableCasinoList casinos={casinos} filter={activeFilter} />
        </div>
      </section>
    </>
  );
}

