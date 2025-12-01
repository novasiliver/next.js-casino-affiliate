"use client";

import { useMemo } from "react";
import CasinoCard from "./CasinoCard";

type FilterType = 'trending' | 'fast-payouts' | 'crypto-only' | 'live-dealer';

interface FilterableCasinoListProps {
  casinos: any[];
  filter: FilterType;
}

export default function FilterableCasinoList({ casinos, filter }: FilterableCasinoListProps) {
  const filteredCasinos = useMemo(() => {
    return casinos.filter((casino) => {
      const data = casino.data || {};
      const tags = data.tags || [];
      const payoutSpeed = data.payoutSpeed || data.casinoInfo?.payoutSpeed || '';
      const gameSelection = data.gameSelection || {};

      switch (filter) {
        case 'fast-payouts':
          // Check for instant/fast payout indicators
          const payoutSpeedLower = payoutSpeed.toLowerCase();
          const hasFastPayout = 
            payoutSpeedLower.includes('instant') ||
            payoutSpeedLower.includes('fast') ||
            payoutSpeedLower.includes('under 24') ||
            payoutSpeedLower.includes('within 24') ||
            payoutSpeedLower.includes('< 24') ||
            tags.some((tag: string) => {
              const tagLower = tag.toLowerCase();
              return (
                tagLower.includes('instant payout') ||
                tagLower.includes('fast payout') ||
                tagLower.includes('quick withdrawal') ||
                tagLower.includes('instant withdrawal')
              );
            });
          return hasFastPayout;

        case 'crypto-only':
          // Check for crypto-friendly indicators
          const hasCrypto = 
            data.cryptoFriendly === true ||
            tags.some((tag: string) => {
              const tagLower = tag.toLowerCase();
              return (
                tagLower.includes('crypto') ||
                tagLower.includes('bitcoin') ||
                tagLower.includes('cryptocurrency') ||
                tagLower.includes('crypto friendly')
              );
            }) ||
            // Check banking methods for crypto
            (data.banking && Array.isArray(data.banking) && 
              data.banking.some((method: any) => {
                const methodName = (method.name || '').toLowerCase();
                return (
                  methodName.includes('bitcoin') ||
                  methodName.includes('crypto') ||
                  methodName.includes('ethereum') ||
                  methodName.includes('litecoin')
                );
              })
            );
          return hasCrypto;

        case 'live-dealer':
          // Check for live dealer indicators
          const hasLiveDealer = 
            (gameSelection.liveTables && gameSelection.liveTables > 0) ||
            tags.some((tag: string) => {
              const tagLower = tag.toLowerCase();
              return (
                tagLower.includes('live dealer') ||
                tagLower.includes('live casino') ||
                tagLower.includes('live games') ||
                tagLower.includes('live tables')
              );
            });
          return hasLiveDealer;

        case 'trending':
        default:
          // Show all casinos (sorted by rank/rating already)
          return true;
      }
    });
  }, [casinos, filter]);

  if (filteredCasinos.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400 mb-4">No casinos found matching this filter.</p>
        <p className="text-sm text-slate-500">Try selecting a different filter option.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredCasinos.map((casino, index) => (
        <CasinoCard
          key={casino.slug}
          rank={casino.rank || index + 1}
          name={casino.name}
          logo={casino.logo}
          rating={casino.rating}
          bonus={casino.bonus}
          bonusDetails={casino.bonusDetails}
          tags={casino.tags}
          isFeatured={index === 0 && filter === 'trending'}
          slug={casino.slug}
          description={casino.description}
        />
      ))}
    </div>
  );
}

