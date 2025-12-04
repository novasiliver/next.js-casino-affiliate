"use client";

import { Casino } from "@/types/casino";
import Link from "next/link";
import Image from "next/image";

interface Template1Props {
  casino: Casino;
  previewMode?: boolean; // When true, shows hardcoded values (original template)
}

export default function Template1({ casino, previewMode = false }: Template1Props) {
  // Helper to get logo text
  const getLogoText = () => {
    if (casino.logo && !casino.logo.startsWith('/') && !casino.logo.startsWith('http')) {
      return casino.logo.toUpperCase();
    }
    return casino.name.substring(0, 6).toUpperCase();
  };

  // Format number with commas
  const formatNumber = (num: number | undefined) => {
    if (!num) return '0';
    return num.toLocaleString();
  };
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">
        <div className="pt-24 pb-8 border-b border-white/5 bg-slate-950 relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none opacity-30">
                  <div className="absolute top-[-50%] left-[30%] w-[600px] h-[600px] bg-amber-600/20 rounded-full blur-[120px]"></div>
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <nav className="flex items-center text-xs text-slate-500 mb-6 gap-2">
                      <a href="#" className="hover:text-white transition-colors">Home</a>
                      <span data-lucide="chevron-right" className="w-3 h-3"></span>
                      <span className="text-amber-500">{previewMode ? 'Ignite Casino' : casino.name}</span>
                  </nav>
                  <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
                      <div className="flex items-center gap-6">
                          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center shrink-0 shadow-2xl">
                              {previewMode ? (
                                <span className="font-bold text-2xl sm:text-3xl tracking-tighter text-white">IGNITE</span>
                              ) : casino.logo && (casino.logo.startsWith('/') || casino.logo.startsWith('http')) ? (
                                <Image src={casino.logo} alt={casino.name} width={128} height={128} className="object-contain max-w-full max-h-full" />
                              ) : (
                                <span className="font-bold text-2xl sm:text-3xl tracking-tighter text-white">{getLogoText()}</span>
                              )}
                          </div>
                          <div>
                              <div className="flex items-center gap-2 mb-2">
                                  <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{previewMode ? 'Ignite Casino' : casino.name}</h1>
                                  {(previewMode || (casino as any).verifiedBadge) && (
                                    <span data-lucide="badge-check" className="w-6 h-6 text-emerald-400 fill-emerald-400/10"></span>
                                  )}
                              </div>
                              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                                  <div className="flex items-center gap-1">
                                      <span data-lucide="star" className="w-4 h-4 text-amber-500 fill-amber-500"></span>
                                      <span className="font-bold text-white">{previewMode ? '9.8' : casino.rating?.toFixed(1) || '0.0'}</span>
                                      {previewMode ? (
                                        <span className="text-xs text-slate-500">(1,240 votes)</span>
                                      ) : casino.votes && (
                                        <span className="text-xs text-slate-500">({formatNumber(casino.votes)} votes)</span>
                                      )}
                                  </div>
                                  {previewMode ? (
                                    <>
                                      <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                                      <span>Est. 2021</span>
                                      <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                                      <span className="flex items-center gap-1"><span data-lucide="globe" className="w-3 h-3"></span> Global</span>
                                    </>
                                  ) : (
                                    <>
                                      {casino.established && (
                                        <>
                                          <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                                          <span>Est. {casino.established}</span>
                                        </>
                                      )}
                                      {casino.region && (
                                        <>
                                          <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                                          <span className="flex items-center gap-1"><span data-lucide="globe" className="w-3 h-3"></span> {casino.region}</span>
                                        </>
                                      )}
                                    </>
                                  )}
                              </div>
                          </div>
                      </div>
                      <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4">
                          <div className="flex-1 text-center sm:text-right px-4 border-l border-white/10 lg:border-none">
                              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Payout Speed</p>
                              <p className="text-lg font-bold text-white flex items-center justify-center sm:justify-end">
                                {previewMode ? 'Instant' : (casino.payoutSpeed || 'N/A')}
                              </p>
                          </div>
                          {(previewMode || casino.rtp) && (
                            <div className="flex-1 text-center sm:text-right px-4 border-l border-white/10">
                                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Win Rate (RTP)</p>
                                <p className="text-lg font-bold text-white">{previewMode ? '97.4%' : casino.rtp}</p>
                            </div>
                          )}
                          {(previewMode || (casino as any).affiliateLink) && (
                            <a href={previewMode ? '#' : (casino as any).affiliateLink} target={previewMode ? undefined : '_blank'} rel={previewMode ? undefined : 'noopener noreferrer'} className="px-8 py-3 bg-white text-slate-950 font-bold rounded-xl hover:bg-amber-400 transition-colors shadow-lg shadow-white/5 flex items-center justify-center gap-2">
                                Visit Casino <span data-lucide="external-link" className="w-4 h-4"></span>
                            </a>
                          )}
                      </div>
                  </div>
              </div>
          </div>
          {/* Casino Description Section */}
          {(previewMode || casino.description) && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-white/5">
              <div className="max-w-4xl">
                <p className="text-lg text-slate-300 leading-relaxed">
                  {previewMode ? (
                    'Ignite Casino is a premier online gaming destination that combines cutting-edge technology with an extensive library of games. Known for its instant withdrawal processing and crypto-friendly approach, it caters to both casual players and high-rollers seeking a premium casino experience.'
                  ) : (
                    casino.description || 'A comprehensive review of this casino covering all aspects of gameplay, bonuses, and user experience.'
                  )}
                </p>
              </div>
            </div>
          )}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  <div className="lg:col-span-8 space-y-12">
                      <section>
                          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 p-1">
                              <div className="bg-slate-950 rounded-xl p-6 sm:p-8 relative overflow-hidden">
                                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
                                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10">
                                      <div>
                                          <span className="inline-block px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-[10px] font-bold tracking-wider mb-2 border border-amber-500/20">EXCLUSIVE OFFER</span>
                                          <h2 className="text-2xl font-bold text-white mb-2">{previewMode ? 'Welcome Package' : (casino.bonus?.title || 'Welcome Bonus')}</h2>
                                          <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 mb-2">
                                              {previewMode ? '$5,000 + 100 Free Spins' : (casino.bonus?.amount || 'Bonus Available')}
                                          </div>
                                          {previewMode ? (
                                            <p className="text-slate-400 text-sm">Valid on your first 4 deposits. Code: <span className="text-white font-mono bg-slate-800 px-2 py-0.5 rounded border border-white/10">IGNITE200</span></p>
                                          ) : casino.bonus?.details && (
                                            <p className="text-slate-400 text-sm">
                                              {casino.bonus.details}
                                              {casino.bonus.code && (
                                                <> Code: <span className="text-white font-mono bg-slate-800 px-2 py-0.5 rounded border border-white/10">{casino.bonus.code}</span></>
                                              )}
                                            </p>
                                          )}
                                      </div>
                                      {(previewMode || (casino as any).affiliateLink) && (
                                        <a href={previewMode ? '#' : (casino as any).affiliateLink} target={previewMode ? undefined : '_blank'} rel={previewMode ? undefined : 'noopener noreferrer'} className="shrink-0 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition-colors shadow-lg shadow-amber-500/20">
                                            Claim Now
                                        </a>
                                      )}
                                  </div>
                                  {previewMode ? (
                                    <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/5">
                                        <div className="text-center sm:text-left">
                                            <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Wagering</div>
                                            <div className="text-sm font-semibold text-white">35x Bonus</div>
                                        </div>
                                        <div className="text-center sm:text-left">
                                            <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Min Deposit</div>
                                            <div className="text-sm font-semibold text-white">$20.00</div>
                                        </div>
                                        <div className="text-center sm:text-left">
                                            <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Expiry</div>
                                            <div className="text-sm font-semibold text-white">30 Days</div>
                                        </div>
                                    </div>
                                  ) : (casino.bonus?.wagering || casino.bonus?.minDeposit || casino.bonus?.expiry) && (
                                    <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/5">
                                        {casino.bonus.wagering && (
                                          <div className="text-center sm:text-left">
                                              <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Wagering</div>
                                              <div className="text-sm font-semibold text-white">{casino.bonus.wagering}</div>
                                          </div>
                                        )}
                                        {casino.bonus.minDeposit && (
                                          <div className="text-center sm:text-left">
                                              <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Min Deposit</div>
                                              <div className="text-sm font-semibold text-white">{casino.bonus.minDeposit}</div>
                                          </div>
                                        )}
                                        {casino.bonus.expiry && (
                                          <div className="text-center sm:text-left">
                                              <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Expiry</div>
                                              <div className="text-sm font-semibold text-white">{casino.bonus.expiry}</div>
                                          </div>
                                        )}
                                    </div>
                                  )}
                              </div>
                          </div>
                      </section>
                      <section>
                          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                              <span data-lucide="wallet" className="w-5 h-5 text-slate-400"></span> Banking Methods
                          </h2>
                          <div className="overflow-hidden rounded-xl border border-white/5 bg-slate-900/50">
                              <table className="w-full text-left border-collapse">
                                  <thead>
                                      <tr className="bg-slate-900 border-b border-white/5 text-xs text-slate-500 uppercase tracking-wider">
                                          <th className="p-4 font-medium">Method</th>
                                          <th className="p-4 font-medium hidden sm:table-cell">Type</th>
                                          <th className="p-4 font-medium">Time</th>
                                          <th className="p-4 font-medium text-right">Fee</th>
                                      </tr>
                                  </thead>
                                  <tbody className="divide-y divide-white/5 text-sm text-slate-300">
                                      {previewMode ? (
                                        <>
                                          <tr className="group hover:bg-slate-800/50 transition-colors">
                                              <td className="p-4 flex items-center gap-3">
                                                  <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-slate-900"><span data-lucide="bitcoin" className="w-5 h-5"></span></div>
                                                  <span className="font-medium text-white">Bitcoin</span>
                                              </td>
                                              <td className="p-4 hidden sm:table-cell text-slate-500">Crypto</td>
                                              <td className="p-4 text-emerald-400 font-medium">Instant</td>
                                              <td className="p-4 text-right">Free</td>
                                          </tr>
                                          <tr className="group hover:bg-slate-800/50 transition-colors">
                                              <td className="p-4 flex items-center gap-3">
                                                  <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white"><span data-lucide="credit-card" className="w-5 h-5"></span></div>
                                                  <span className="font-medium text-white">Visa / MC</span>
                                              </td>
                                              <td className="p-4 hidden sm:table-cell text-slate-500">Card</td>
                                              <td className="p-4">1-3 Days</td>
                                              <td className="p-4 text-right">2.5%</td>
                                          </tr>
                                          <tr className="group hover:bg-slate-800/50 transition-colors">
                                              <td className="p-4 flex items-center gap-3">
                                                  <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center text-white"><span data-lucide="landmark" className="w-5 h-5"></span></div>
                                                  <span className="font-medium text-white">Bank Transfer</span>
                                              </td>
                                              <td className="p-4 hidden sm:table-cell text-slate-500">Bank</td>
                                              <td className="p-4">3-5 Days</td>
                                              <td className="p-4 text-right">$10</td>
                                          </tr>
                                          <tr className="group hover:bg-slate-800/50 transition-colors">
                                              <td className="p-4 flex items-center gap-3">
                                                  <div className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center text-white font-bold text-[10px]">USDT</div>
                                                  <span className="font-medium text-white">Tether</span>
                                              </td>
                                              <td className="p-4 hidden sm:table-cell text-slate-500">Crypto</td>
                                              <td className="p-4 text-emerald-400 font-medium">Instant</td>
                                              <td className="p-4 text-right">Free</td>
                                          </tr>
                                        </>
                                      ) : casino.banking && casino.banking.length > 0 ? (
                                        casino.banking.map((method, idx) => (
                                          <tr key={idx} className="group hover:bg-slate-800/50 transition-colors">
                                              <td className="p-4 flex items-center gap-3">
                                                  {method.icon ? (
                                                    <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-slate-900">
                                                      <span data-lucide={method.icon} className="w-5 h-5"></span>
                                                    </div>
                                                  ) : (
                                                    <div className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center text-white font-bold text-[10px]">
                                                      {method.name.substring(0, 3).toUpperCase()}
                                                    </div>
                                                  )}
                                                  <span className="font-medium text-white">{method.name}</span>
                                              </td>
                                              <td className="p-4 hidden sm:table-cell text-slate-500">{method.type}</td>
                                              <td className={`p-4 ${method.time?.toLowerCase().includes('instant') ? 'text-emerald-400 font-medium' : ''}`}>
                                                  {method.time}
                                              </td>
                                              <td className="p-4 text-right">{method.fee}</td>
                                          </tr>
                                        ))
                                      ) : (
                                        <tr>
                                            <td colSpan={4} className="p-4 text-center text-slate-500">No banking methods available</td>
                                        </tr>
                                      )}
                                  </tbody>
                              </table>
                          </div>
                      </section>
                      <section>
                          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                              <span data-lucide="gamepad-2" className="w-5 h-5 text-slate-400"></span> Game Selection
                          </h2>
                          {previewMode ? (
                            <>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                                  <div className="p-4 rounded-xl bg-slate-900 border border-white/5 text-center">
                                      <div className="text-2xl font-bold text-white mb-1">3,200+</div>
                                      <div className="text-xs text-slate-500">Slots</div>
                                  </div>
                                  <div className="p-4 rounded-xl bg-slate-900 border border-white/5 text-center">
                                      <div className="text-2xl font-bold text-white mb-1">150+</div>
                                      <div className="text-xs text-slate-500">Live Tables</div>
                                  </div>
                                  <div className="p-4 rounded-xl bg-slate-900 border border-white/5 text-center">
                                      <div className="text-2xl font-bold text-white mb-1">50+</div>
                                      <div className="text-xs text-slate-500">Jackpots</div>
                                  </div>
                                  <div className="p-4 rounded-xl bg-slate-900 border border-white/5 text-center">
                                      <div className="text-2xl font-bold text-white mb-1">24/7</div>
                                      <div className="text-xs text-slate-500">Live Action</div>
                                  </div>
                              </div>
                              <h3 className="text-sm font-medium text-slate-400 mb-4">Top Providers</h3>
                              <div className="flex flex-wrap gap-3">
                                  <span className="px-4 py-2 rounded-lg bg-slate-900 border border-white/10 text-xs font-semibold text-white hover:border-amber-500/50 transition-colors cursor-default">Pragmatic Play</span>
                                  <span className="px-4 py-2 rounded-lg bg-slate-900 border border-white/10 text-xs font-semibold text-white hover:border-amber-500/50 transition-colors cursor-default">Evolution</span>
                                  <span className="px-4 py-2 rounded-lg bg-slate-900 border border-white/10 text-xs font-semibold text-white hover:border-amber-500/50 transition-colors cursor-default">NetEnt</span>
                                  <span className="px-4 py-2 rounded-lg bg-slate-900 border border-white/10 text-xs font-semibold text-white hover:border-amber-500/50 transition-colors cursor-default">NoLimit City</span>
                                  <span className="px-4 py-2 rounded-lg bg-slate-900 border border-white/10 text-xs font-semibold text-white hover:border-amber-500/50 transition-colors cursor-default">Hacksaw</span>
                                  <span className="px-4 py-2 rounded-lg bg-slate-900 border border-white/10 text-xs font-semibold text-white hover:border-amber-500/50 transition-colors cursor-default">Push Gaming</span>
                              </div>
                            </>
                          ) : casino.gameSelection && (
                            <>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                                  <div className="p-4 rounded-xl bg-slate-900 border border-white/5 text-center">
                                      <div className="text-2xl font-bold text-white mb-1">{formatNumber(casino.gameSelection.slots)}+</div>
                                      <div className="text-xs text-slate-500">Slots</div>
                                  </div>
                                  <div className="p-4 rounded-xl bg-slate-900 border border-white/5 text-center">
                                      <div className="text-2xl font-bold text-white mb-1">{formatNumber(casino.gameSelection.liveTables)}+</div>
                                      <div className="text-xs text-slate-500">Live Tables</div>
                                  </div>
                                  <div className="p-4 rounded-xl bg-slate-900 border border-white/5 text-center">
                                      <div className="text-2xl font-bold text-white mb-1">{formatNumber(casino.gameSelection.jackpots)}+</div>
                                      <div className="text-xs text-slate-500">Jackpots</div>
                                  </div>
                                  <div className="p-4 rounded-xl bg-slate-900 border border-white/5 text-center">
                                      <div className="text-2xl font-bold text-white mb-1">{casino.gameSelection.liveAction || '24/7'}</div>
                                      <div className="text-xs text-slate-500">Live Action</div>
                                  </div>
                              </div>
                              {casino.gameSelection.providers && casino.gameSelection.providers.length > 0 && (
                                <>
                                  <h3 className="text-sm font-medium text-slate-400 mb-4">Top Providers</h3>
                                  <div className="flex flex-wrap gap-3">
                                      {casino.gameSelection.providers.map((provider, idx) => (
                                        <span key={idx} className="px-4 py-2 rounded-lg bg-slate-900 border border-white/10 text-xs font-semibold text-white hover:border-amber-500/50 transition-colors cursor-default">
                                            {provider}
                                        </span>
                                      ))}
                                  </div>
                                </>
                              )}
                            </>
                          )}
                      </section>
                      {previewMode ? (
                        <section className="prose prose-invert prose-slate max-w-none prose-headings:font-semibold prose-a:text-amber-500 prose-p:text-slate-400 prose-li:text-slate-400">
                            <h3 className="text-white">User Experience &amp; Mobile</h3>
                            <p>
                                Navigating Ignite Casino is a breeze. The dark-themed interface is easy on the eyes, and categories are intuitively organized. We tested the site on both iPhone 15 and Pixel 7, and the responsive web design performed flawlessly without lag. While there is no downloadable app, the browser experience is so polished you likely won't miss it.
                            </p>
                            <h3 className="text-white">Customer Support</h3>
                            <p>
                                Support is available 24/7 via live chat and email. During our stress test, we received a response on Live Chat within 45 seconds. The agents were knowledgeable about bonus terms and KYC procedures.
                            </p>
                        </section>
                      ) : casino.reviewContent && (casino.reviewContent.userExperience || casino.reviewContent.customerSupport) && (
                        <section className="prose prose-invert prose-slate max-w-none prose-headings:font-semibold prose-a:text-amber-500 prose-p:text-slate-400 prose-li:text-slate-400">
                            {casino.reviewContent.userExperience && (
                              <>
                                <h3 className="text-white">User Experience &amp; Mobile</h3>
                                <p>{casino.reviewContent.userExperience}</p>
                              </>
                            )}
                            {casino.reviewContent.customerSupport && (
                              <>
                                <h3 className="text-white">Customer Support</h3>
                                <p>{casino.reviewContent.customerSupport}</p>
                              </>
                            )}
                        </section>
                      )}
                  </div>
                  <div className="lg:col-span-4 space-y-6">
                      <div className="sticky top-24 space-y-6">
                          <div className="rounded-xl border border-white/5 bg-slate-900/80 p-6 backdrop-blur">
                              <h3 className="text-sm font-semibold text-white mb-6">Rating Breakdown</h3>
                              {previewMode ? (
                                <>
                                  <div className="space-y-4">
                                      <div>
                                          <div className="flex justify-between text-xs mb-1">
                                              <span className="text-slate-400">Fairness &amp; Trust</span>
                                              <span className="text-white font-medium">10/10</span>
                                          </div>
                                          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                              <div className="h-full bg-emerald-500 w-full rounded-full"></div>
                                          </div>
                                      </div>
                                      <div>
                                          <div className="flex justify-between text-xs mb-1">
                                              <span className="text-slate-400">Bonuses &amp; Promos</span>
                                              <span className="text-white font-medium">9.5/10</span>
                                          </div>
                                          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                              <div className="h-full bg-amber-500 w-[95%] rounded-full"></div>
                                          </div>
                                      </div>
                                      <div>
                                          <div className="flex justify-between text-xs mb-1">
                                              <span className="text-slate-400">Game Variety</span>
                                              <span className="text-white font-medium">9.0/10</span>
                                          </div>
                                          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                              <div className="h-full bg-amber-500 w-[90%] rounded-full"></div>
                                          </div>
                                      </div>
                                      <div>
                                          <div className="flex justify-between text-xs mb-1">
                                              <span className="text-slate-400">Support Speed</span>
                                              <span className="text-white font-medium">9.8/10</span>
                                          </div>
                                          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                              <div className="h-full bg-emerald-500 w-[98%] rounded-full"></div>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="mt-8 pt-6 border-t border-white/5">
                                      <a href="#" className="block w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-center rounded-lg hover:shadow-lg hover:shadow-amber-500/20 transition-all">
                                          Play at Ignite
                                      </a>
                                      <p className="text-[10px] text-center text-slate-500 mt-2">T&amp;Cs apply. 18+</p>
                                  </div>
                                </>
                              ) : (
                                <>
                                  {casino.ratingBreakdown && (
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-slate-400">Fairness &amp; Trust</span>
                                                <span className="text-white font-medium">{casino.ratingBreakdown.fairness}/10</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                                <div className="h-full bg-emerald-500" style={{ width: `${(casino.ratingBreakdown.fairness / 10) * 100}%` }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-slate-400">Bonuses &amp; Promos</span>
                                                <span className="text-white font-medium">{casino.ratingBreakdown.bonuses}/10</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                                <div className="h-full bg-amber-500" style={{ width: `${(casino.ratingBreakdown.bonuses / 10) * 100}%` }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-slate-400">Game Variety</span>
                                                <span className="text-white font-medium">{casino.ratingBreakdown.gameVariety}/10</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                                <div className="h-full bg-amber-500" style={{ width: `${(casino.ratingBreakdown.gameVariety / 10) * 100}%` }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-slate-400">Support Speed</span>
                                                <span className="text-white font-medium">{casino.ratingBreakdown.supportSpeed}/10</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                                <div className="h-full bg-emerald-500" style={{ width: `${(casino.ratingBreakdown.supportSpeed / 10) * 100}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                  )}
                                  {(casino as any).affiliateLink && (
                                    <div className="mt-8 pt-6 border-t border-white/5">
                                        <a href={(casino as any).affiliateLink} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-center rounded-lg hover:shadow-lg hover:shadow-amber-500/20 transition-all">
                                            Play at {casino.name}
                                        </a>
                                        <p className="text-[10px] text-center text-slate-500 mt-2">T&amp;Cs apply. 18+</p>
                                    </div>
                                  )}
                                </>
                              )}
                          </div>
                          <div className="rounded-xl border border-white/5 bg-slate-900 p-6">
                              <h3 className="text-sm font-semibold text-white mb-4">Casino Information</h3>
                              {previewMode ? (
                                <ul className="space-y-3">
                                    <li className="flex justify-between text-sm">
                                        <span className="text-slate-500">Established</span>
                                        <span className="text-slate-300">2021</span>
                                    </li>
                                    <li className="flex justify-between text-sm">
                                        <span className="text-slate-500">License</span>
                                        <span className="text-slate-300 flex items-center gap-1">Curacao <span data-lucide="shield-check" className="w-3 h-3 text-emerald-500"></span></span>
                                    </li>
                                    <li className="flex justify-between text-sm">
                                        <span className="text-slate-500">Owner</span>
                                        <span className="text-slate-300">Ignite Gaming N.V.</span>
                                    </li>
                                    <li className="flex justify-between text-sm">
                                        <span className="text-slate-500">Min Deposit</span>
                                        <span className="text-slate-300">$20 / 0.001 BTC</span>
                                    </li>
                                    <li className="flex justify-between text-sm">
                                        <span className="text-slate-500">VPN Friendly</span>
                                        <span className="text-slate-300">Yes</span>
                                    </li>
                                </ul>
                              ) : casino.casinoInfo && (
                                <ul className="space-y-3">
                                    <li className="flex justify-between text-sm">
                                        <span className="text-slate-500">Established</span>
                                        <span className="text-slate-300">{casino.casinoInfo.established}</span>
                                    </li>
                                    {casino.casinoInfo.license && (
                                      <li className="flex justify-between text-sm">
                                          <span className="text-slate-500">License</span>
                                          <span className="text-slate-300 flex items-center gap-1">
                                              {casino.casinoInfo.license} <span data-lucide="shield-check" className="w-3 h-3 text-emerald-500"></span>
                                          </span>
                                      </li>
                                    )}
                                    {casino.casinoInfo.owner && (
                                      <li className="flex justify-between text-sm">
                                          <span className="text-slate-500">Owner</span>
                                          <span className="text-slate-300">{casino.casinoInfo.owner}</span>
                                      </li>
                                    )}
                                    {casino.casinoInfo.minDeposit && (
                                      <li className="flex justify-between text-sm">
                                          <span className="text-slate-500">Min Deposit</span>
                                          <span className="text-slate-300">{casino.casinoInfo.minDeposit}</span>
                                      </li>
                                    )}
                                    <li className="flex justify-between text-sm">
                                        <span className="text-slate-500">VPN Friendly</span>
                                        <span className="text-slate-300">{casino.casinoInfo.vpnFriendly ? 'Yes' : 'No'}</span>
                                    </li>
                                </ul>
                              )}
                          </div>
                          {previewMode ? (
                            <div>
                                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 pl-1">Alternatives</h3>
                                <div className="space-y-3">
                                    <a href="#" className="flex items-center gap-3 p-3 rounded-lg border border-white/5 hover:bg-white/5 transition-colors group">
                                        <div className="w-10 h-10 rounded bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white group-hover:bg-slate-700">ROYAL</div>
                                        <div>
                                            <div className="text-sm font-medium text-white">Royal Fort</div>
                                            <div className="text-[10px] text-emerald-400">300% Bonus</div>
                                        </div>
                                        <span data-lucide="chevron-right" className="w-4 h-4 ml-auto text-slate-600 group-hover:text-white"></span>
                                    </a>
                                    <a href="#" className="flex items-center gap-3 p-3 rounded-lg border border-white/5 hover:bg-white/5 transition-colors group">
                                        <div className="w-10 h-10 rounded bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white group-hover:bg-slate-700">ONYX</div>
                                        <div>
                                            <div className="text-sm font-medium text-white">Onyx Club</div>
                                            <div className="text-[10px] text-emerald-400">5 BTC Welcome</div>
                                        </div>
                                        <span data-lucide="chevron-right" className="w-4 h-4 ml-auto text-slate-600 group-hover:text-white"></span>
                                    </a>
                                </div>
                            </div>
                          ) : casino.alternatives && casino.alternatives.length > 0 && (
                            <div>
                                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 pl-1">Alternatives</h3>
                                <div className="space-y-3">
                                    {casino.alternatives.map((alt, idx) => (
                                      <Link key={idx} href={`/review/${alt.slug}`} className="flex items-center gap-3 p-3 rounded-lg border border-white/5 hover:bg-white/5 transition-colors group">
                                          <div className="w-10 h-10 rounded bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white group-hover:bg-slate-700">
                                              {alt.logo && !alt.logo.startsWith('/') && !alt.logo.startsWith('http') 
                                                ? alt.logo.substring(0, 4).toUpperCase()
                                                : alt.name.substring(0, 4).toUpperCase()}
                                          </div>
                                          <div>
                                              <div className="text-sm font-medium text-white">{alt.name}</div>
                                              <div className="text-[10px] text-emerald-400">{alt.bonus}</div>
                                          </div>
                                          <span data-lucide="chevron-right" className="w-4 h-4 ml-auto text-slate-600 group-hover:text-white"></span>
                                      </Link>
                                    ))}
                                </div>
                            </div>
                          )}
                      </div>
                  </div>
              </div>
          </div>
          {/* Verdict Section - Moved to Bottom */}
          <section className="py-12 border-t border-white/5">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-4xl">
                      <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                          <span data-lucide="gavel" className="w-5 h-5 text-slate-400"></span> Verdict
                      </h2>
                      {previewMode ? (
                        <>
                          <p className="text-slate-400 leading-relaxed mb-8">
                              Ignite Casino has quickly established itself as a market leader, particularly for crypto enthusiasts and players seeking instant withdrawals. With a library exceeding 4,000 games and a user interface that feels modern and snappy, it delivers a premium experience. The welcome bonus is massive, though high-rollers will benefit most from the VIP program.
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-slate-900/50 rounded-xl p-6 border border-emerald-500/20">
                                  <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                      <span data-lucide="thumbs-up" className="w-4 h-4"></span> Hits
                                  </h3>
                                  <ul className="space-y-3">
                                      <li className="flex items-start gap-3 text-sm text-slate-300">
                                          <span data-lucide="check" className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"></span>
                                          Withdrawals processed in under 15 minutes
                                      </li>
                                      <li className="flex items-start gap-3 text-sm text-slate-300">
                                          <span data-lucide="check" className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"></span>
                                          Massive 4,000+ slot &amp; table game library
                                      </li>
                                      <li className="flex items-start gap-3 text-sm text-slate-300">
                                          <span data-lucide="check" className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"></span>
                                          24/7 Live Chat support with &lt; 1m wait
                                      </li>
                                      <li className="flex items-start gap-3 text-sm text-slate-300">
                                          <span data-lucide="check" className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"></span>
                                          High monthly withdrawal limits ($50k+)
                                      </li>
                                  </ul>
                              </div>
                              <div className="bg-slate-900/50 rounded-xl p-6 border border-rose-500/20">
                                  <h3 className="text-sm font-bold text-rose-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                      <span data-lucide="thumbs-down" className="w-4 h-4"></span> Misses
                                  </h3>
                                  <ul className="space-y-3">
                                      <li className="flex items-start gap-3 text-sm text-slate-300">
                                          <span data-lucide="x" className="w-4 h-4 text-rose-500 shrink-0 mt-0.5"></span>
                                          No dedicated mobile app (web app only)
                                      </li>
                                      <li className="flex items-start gap-3 text-sm text-slate-300">
                                          <span data-lucide="x" className="w-4 h-4 text-rose-500 shrink-0 mt-0.5"></span>
                                          Sportsbook odds are average compared to specialists
                                      </li>
                                  </ul>
                              </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {casino.verdict && (
                            <p className="text-slate-400 leading-relaxed mb-8">
                                {casino.verdict}
                            </p>
                          )}
                          {casino.prosCons && (casino.prosCons.pros?.length > 0 || casino.prosCons.cons?.length > 0) && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {casino.prosCons.pros && casino.prosCons.pros.length > 0 && (
                                  <div className="bg-slate-900/50 rounded-xl p-6 border border-emerald-500/20">
                                      <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                          <span data-lucide="thumbs-up" className="w-4 h-4"></span> Hits
                                      </h3>
                                      <ul className="space-y-3">
                                          {casino.prosCons.pros.map((pro, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                                                <span data-lucide="check" className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"></span>
                                                {pro}
                                            </li>
                                          ))}
                                      </ul>
                                  </div>
                                )}
                                {casino.prosCons.cons && casino.prosCons.cons.length > 0 && (
                                  <div className="bg-slate-900/50 rounded-xl p-6 border border-rose-500/20">
                                      <h3 className="text-sm font-bold text-rose-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                          <span data-lucide="thumbs-down" className="w-4 h-4"></span> Misses
                                      </h3>
                                      <ul className="space-y-3">
                                          {casino.prosCons.cons.map((con, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                                                <span data-lucide="x" className="w-4 h-4 text-rose-500 shrink-0 mt-0.5"></span>
                                                {con}
                                            </li>
                                          ))}
                                      </ul>
                                  </div>
                                )}
                            </div>
                          )}
                        </>
                      )}
                  </div>
              </div>
          </section>
          <section className="py-12 border-t border-white/5 bg-slate-900/30">
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h2 className="text-2xl font-semibold text-white mb-8 text-center">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                      <details className="group bg-slate-900 border border-white/5 rounded-xl">
                          <summary className="flex justify-between items-center cursor-pointer p-4 font-medium text-slate-200 list-none">
                              <span>Is Ignite Casino safe to play at?</span>
                              <span className="transition group-open:rotate-180">
                                  <span data-lucide="chevron-down" className="w-4 h-4 text-slate-500"></span>
                              </span>
                          </summary>
                          <div className="text-slate-400 mt-0 px-4 pb-4 text-sm leading-relaxed">
                              Yes. Ignite Casino operates under a valid Curacao gaming license and uses SSL encryption to protect user data. Their games are audited by third-party agencies for fairness.
                          </div>
                      </details>
                      <details className="group bg-slate-900 border border-white/5 rounded-xl">
                          <summary className="flex justify-between items-center cursor-pointer p-4 font-medium text-slate-200 list-none">
                              <span>How long do withdrawals take?</span>
                              <span className="transition group-open:rotate-180">
                                  <span data-lucide="chevron-down" className="w-4 h-4 text-slate-500"></span>
                              </span>
                          </summary>
                          <div className="text-slate-400 mt-0 px-4 pb-4 text-sm leading-relaxed">
                              Crypto withdrawals (Bitcoin, Litecoin, USDT) are typically processed instantly or within 15 minutes. Bank transfers and card withdrawals may take 1-3 business days.
                          </div>
                      </details>
                      <details className="group bg-slate-900 border border-white/5 rounded-xl">
                          <summary className="flex justify-between items-center cursor-pointer p-4 font-medium text-slate-200 list-none">
                              <span>Can I play on my mobile phone?</span>
                              <span className="transition group-open:rotate-180">
                                  <span data-lucide="chevron-down" className="w-4 h-4 text-slate-500"></span>
                              </span>
                          </summary>
                          <div className="text-slate-400 mt-0 px-4 pb-4 text-sm leading-relaxed">
                              Absolutely. The website is fully optimized for mobile browsers on iOS and Android devices, offering the full range of games without needing to download an app.
                          </div>
                      </details>
                  </div>
              </div>
          </section>
    </div>
  );
}
