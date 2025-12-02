import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// Map category to directory name
const categoryToDir: Record<string, string> = {
  'Casino Review Page Template': 'casino',
  'Post Page Template': 'post',
  'Game Page Template': 'game',
  'Bonus Page Template': 'bonus',
};

// Preview value mapping for casino fields
// Maps casino field paths to their default preview values (used when previewMode=true)
const previewValueMap: Record<string, string> = {
  'name': 'Ignite Casino',
  'rating': '9.8',
  'payoutSpeed': 'Instant',
  'rtp': '97.4%',
  'established': '2021',
  'region': 'Global',
  'votes': '1,240',
  'bonus.title': 'Welcome Package',
  'bonus.amount': '$5,000 + 100 Free Spins',
  'bonus.details': 'Valid on your first 4 deposits. Code: IGNITE200',
  'bonus.code': 'IGNITE200',
  'bonus.wagering': '35x Bonus',
  'bonus.minDeposit': '$20.00',
  'bonus.expiry': '30 Days',
  'verdict': 'Ignite Casino has quickly established itself as a market leader, particularly for crypto enthusiasts and players seeking instant withdrawals. With a library exceeding 4,000 games and a user interface that feels modern and snappy, it delivers a premium experience. The welcome bonus is massive, though high-rollers will benefit most from the VIP program.',
  'casinoInfo.established': '2021',
  'casinoInfo.license': 'Curacao',
  'casinoInfo.owner': 'Ignite Gaming N.V.',
  'casinoInfo.minDeposit': '$20 / 0.001 BTC',
  'casinoInfo.vpnFriendly': 'Yes',
  'ratingBreakdown.fairness': '10',
  'ratingBreakdown.bonuses': '9.5',
  'ratingBreakdown.gameVariety': '9.0',
  'ratingBreakdown.supportSpeed': '9.8',
};

// Helper function to get preview value for a field path
function getPreviewValue(fieldPath: string): string | null {
  return previewValueMap[fieldPath] || null;
}

// Create reverse mapping from preview values to field paths
// Returns array of [value, fieldPath] pairs, sorted by value length (longest first)
function createReversePreviewMap(): Array<[string, string]> {
  const reverseMap: Array<[string, string]> = [];
  
  for (const [fieldPath, previewValue] of Object.entries(previewValueMap)) {
    reverseMap.push([previewValue, fieldPath]);
  }
  
  // Sort by value length (longest first) to handle partial matches correctly
  return reverseMap.sort((a, b) => b[0].length - a[0].length);
}

// Convert HTML to React component
function htmlToReactComponent(html: string, componentName: string, propsInterface: string): string {
  let reactCode = html;

  // Step 1: Extract body content (remove DOCTYPE, html, head, body tags)
  // Remove DOCTYPE
  reactCode = reactCode.replace(/<!DOCTYPE[^>]*>/gi, '');
  
  // Extract content from <body> tag
  const bodyMatch = reactCode.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (bodyMatch) {
    reactCode = bodyMatch[1];
  } else {
    // If no body tag, try to extract from html tag
    const htmlMatch = reactCode.match(/<html[^>]*>([\s\S]*)<\/html>/i);
    if (htmlMatch) {
      reactCode = htmlMatch[1];
      // Remove head content
      reactCode = reactCode.replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '');
    }
  }

  // Step 2: Extract and handle style tags
  const styleMatches: string[] = [];
  reactCode = reactCode.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (match, styleContent) => {
    styleMatches.push(styleContent.trim());
    return ''; // Remove style tag from body
  });

  // Step 3: Remove script tags (external scripts should be handled via Next.js Script component)
  reactCode = reactCode.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  reactCode = reactCode.replace(/<script[^>]*\/>/gi, '');

  // Step 4: Remove link tags (external stylesheets should be in _app.tsx or layout)
  reactCode = reactCode.replace(/<link[^>]*>/gi, '');

  // Step 5: Remove meta tags
  reactCode = reactCode.replace(/<meta[^>]*>/gi, '');

  // Step 6: Remove title tag
  reactCode = reactCode.replace(/<title[^>]*>[\s\S]*?<\/title>/gi, '');

  // Step 7: Convert HTML attributes to React/JSX format
  // class -> className
  reactCode = reactCode.replace(/\s+class=/g, ' className=');
  
  // for -> htmlFor
  reactCode = reactCode.replace(/\s+for=/g, ' htmlFor=');
  
  // tabindex -> tabIndex
  reactCode = reactCode.replace(/\s+tabindex=/g, ' tabIndex=');
  
  // readonly -> readOnly
  reactCode = reactCode.replace(/\s+readonly(?=\s|>)/g, ' readOnly');
  
  // colspan -> colSpan
  reactCode = reactCode.replace(/\s+colspan=/g, ' colSpan=');
  
  // rowspan -> rowSpan
  reactCode = reactCode.replace(/\s+rowspan=/g, ' rowSpan=');
  
  // maxlength -> maxLength
  reactCode = reactCode.replace(/\s+maxlength=/g, ' maxLength=');
  
  // autocomplete -> autoComplete
  reactCode = reactCode.replace(/\s+autocomplete=/g, ' autoComplete=');
  
  // autofocus -> autoFocus
  reactCode = reactCode.replace(/\s+autofocus(?=\s|>)/g, ' autoFocus');
  
  // contenteditable -> contentEditable
  reactCode = reactCode.replace(/\s+contenteditable=/g, ' contentEditable=');

  // Step 8: Convert event handlers
  reactCode = reactCode.replace(/\s+onclick="([^"]+)"/gi, ' onClick={() => { $1 }}');
  reactCode = reactCode.replace(/\s+onchange="([^"]+)"/gi, ' onChange={() => { $1 }}');
  reactCode = reactCode.replace(/\s+onsubmit="([^"]+)"/gi, ' onSubmit={() => { $1 }}');
  reactCode = reactCode.replace(/\s+onfocus="([^"]+)"/gi, ' onFocus={() => { $1 }}');
  reactCode = reactCode.replace(/\s+onblur="([^"]+)"/gi, ' onBlur={() => { $1 }}');
  reactCode = reactCode.replace(/\s+onmouseover="([^"]+)"/gi, ' onMouseOver={() => { $1 }}');
  reactCode = reactCode.replace(/\s+onmouseout="([^"]+)"/gi, ' onMouseOut={() => { $1 }}');

  // Step 9: Handle i tags with data-lucide BEFORE converting data attributes
  // Convert <i data-lucide="..."> to <span data-lucide="...">
  // Handle both data-lucide (kebab-case) and dataLucide (camelCase) versions
  reactCode = reactCode.replace(/<i\s+([^>]*?)data-lucide="([^"]+)"([^>]*)>/gi, (match, before, lucideValue, after) => {
    // Preserve other attributes, convert class to className
    let otherAttrs = (before + after).trim().replace(/\s+class=/g, ' className=');
    return `<span ${otherAttrs ? otherAttrs + ' ' : ''}data-lucide="${lucideValue}">`;
  });
  // Also handle already camelCased version (dataLucide)
  reactCode = reactCode.replace(/<i\s+([^>]*?)dataLucide="([^"]+)"([^>]*)>/gi, (match, before, lucideValue, after) => {
    let otherAttrs = (before + after).trim().replace(/\s+class=/g, ' className=');
    return `<span ${otherAttrs ? otherAttrs + ' ' : ''}data-lucide="${lucideValue}">`;
  });
  // Convert any remaining <i> tags to <span> (for safety - handles cases without data-lucide)
  reactCode = reactCode.replace(/<i\s+([^>]*)>/gi, (match, attrs) => {
    // Convert class to className in attributes
    const fixedAttrs = attrs.replace(/\s+class=/g, ' className=');
    return `<span ${fixedAttrs}>`;
  });
  // Convert all closing </i> tags to </span> (important: do this after all <i> tag replacements)
  reactCode = reactCode.replace(/<\/i>/gi, '</span>');

  // Step 10: Convert data attributes to camelCase (but keep data-lucide as kebab-case for now)
  reactCode = reactCode.replace(/\s+data-([a-z-]+)=/g, (match, attr) => {
    // Don't convert data-lucide to camelCase, keep it as data-lucide
    if (attr === 'lucide') {
      return match; // Keep as data-lucide
    }
    const camelCase = attr.replace(/-([a-z])/g, (g: string) => g[1].toUpperCase());
    return ` data${camelCase.charAt(0).toUpperCase() + camelCase.slice(1)}=`;
  });

  // Step 11: Handle template variables with nested paths and wrap with previewMode conditionals
  // Handle {{casino.data.bonus.amount}} style variables - with optional chaining for safety
  reactCode = reactCode.replace(/\{\{casino\.data\.(\w+(?:\.\w+)*)\}\}/g, (match, path) => {
    const parts = path.split('.');
    // Add optional chaining for nested properties
    const jsxPath = parts.map((p: string, i: number) => i === 0 ? p : `?.${p}`).join('');
    const previewValue = getPreviewValue(path);
    if (previewValue) {
      // Escape special characters in preview value
      const escapedPreview = previewValue
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'")
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\t/g, '\\t');
      return `{previewMode ? '${escapedPreview}' : casino.data?.${jsxPath}}`;
    }
    return `{casino.data?.${jsxPath}}`;
  });
  
  // Handle {{casino.bonus.amount}} style variables (flattened structure) with previewMode
  reactCode = reactCode.replace(/\{\{casino\.(\w+(?:\.\w+)*)\}\}/g, (match, path) => {
    const parts = path.split('.');
    let jsxPath: string;
    let previewValue: string | null = null;
    
    if (parts.length > 1) {
      // Add optional chaining for nested properties
      jsxPath = parts.map((p: string, i: number) => i === 0 ? p : `?.${p}`).join('');
      // Try to get preview value for nested path (e.g., "bonus.amount")
      previewValue = getPreviewValue(path);
    } else {
      jsxPath = path;
      previewValue = getPreviewValue(path);
    }
    
    // Special handling for rating field (needs formatting like template1)
    if (path === 'rating') {
      return `{previewMode ? '9.8' : casino.rating?.toFixed(1) || '0.0'}`;
    }
    
    // For votes, just return the value (formatting should be in HTML structure)
    if (path === 'votes') {
      return `{previewMode ? 1240 : casino.votes}`;
    }
    
    // Wrap with previewMode conditional if preview value exists
    if (previewValue) {
      // Escape special characters in preview value for JSX string
      const escapedPreview = previewValue
        .replace(/\\/g, '\\\\')  // Escape backslashes
        .replace(/'/g, "\\'")    // Escape single quotes
        .replace(/\n/g, '\\n')   // Escape newlines
        .replace(/\r/g, '\\r')   // Escape carriage returns
        .replace(/\t/g, '\\t');  // Escape tabs
      return `{previewMode ? '${escapedPreview}' : casino.${jsxPath}}`;
    }
    
    return `{casino.${jsxPath}}`;
  });
  
  // Handle simple {{variable}} style (for any other variables)
  reactCode = reactCode.replace(/\{\{(\w+)\}\}/g, '{$1}');

  // Step 12: Replace hardcoded preview values with previewMode conditionals
  // First, do pattern-based replacements for common casino data patterns
  
  // Pattern 1: Logo text in logo containers (all caps text in logo divs)
  // Match: <div...logo...><span>IGNITE</span></div> or similar patterns
  // Replace with proper logo image checking logic
  const logoPattern = /(<div[^>]*(?:logo|w-\d+|h-\d+)[^>]*>[\s\S]*?<span[^>]*>)([A-Z]{2,20})(<\/span>[\s\S]*?<\/div>)/gi;
  const logoReplacements: Array<{index: number, length: number, replacement: string}> = [];
  let logoMatch;
  while ((logoMatch = logoPattern.exec(reactCode)) !== null) {
    const matchIndex = logoMatch.index;
    const beforeContext = reactCode.substring(0, matchIndex);
    const lastOpenBrace = beforeContext.lastIndexOf('{');
    const lastCloseBrace = beforeContext.lastIndexOf('}');
    if (lastOpenBrace <= lastCloseBrace) {
      const escapedLogo = logoMatch[2].replace(/'/g, "\\'");
      // Replace with proper logo rendering: check for image first, then fallback to text
      // This ensures logos are always displayed as images when available
      const logoReplacement = `${logoMatch[1]}{previewMode ? (
                                <span className="font-bold text-2xl sm:text-3xl tracking-tighter text-white">${escapedLogo}</span>
                              ) : casino.logo && (casino.logo.startsWith('/') || casino.logo.startsWith('http')) ? (
                                <Image src={casino.logo} alt={casino.name} width={128} height={128} className="object-contain max-w-full max-h-full" />
                              ) : (
                                <span className="font-bold text-2xl sm:text-3xl tracking-tighter text-white">{getLogoText()}</span>
                              )}${logoMatch[3]}`;
      logoReplacements.push({
        index: matchIndex,
        length: logoMatch[0].length,
        replacement: logoReplacement
      });
    }
  }
  logoReplacements.reverse().forEach(({index, length, replacement}) => {
    reactCode = reactCode.substring(0, index) + replacement + reactCode.substring(index + length);
  });
  
  // Pattern 1b: Also catch standalone logo text that might not be in a logo container div
  // Match patterns like: <span>LUCKY</span> in contexts that suggest it's a logo
  const standaloneLogoPattern = /(>|^|\s)([A-Z]{2,20})(<|$|\s)/g;
  const standaloneLogoReplacements: Array<{index: number, length: number, replacement: string}> = [];
  let standaloneMatch;
  // Only process if we haven't already replaced this as part of a logo container
  const processedIndices = new Set(logoReplacements.map(r => r.index));
  while ((standaloneMatch = standaloneLogoPattern.exec(reactCode)) !== null) {
    const matchIndex = standaloneMatch.index;
    // Skip if this was already processed as part of a logo container
    let wasProcessed = false;
    for (const logoRep of logoReplacements) {
      if (matchIndex >= logoRep.index && matchIndex < logoRep.index + logoRep.length) {
        wasProcessed = true;
        break;
      }
    }
    if (wasProcessed) continue;
    
    const beforeContext = reactCode.substring(0, matchIndex);
    const lastOpenBrace = beforeContext.lastIndexOf('{');
    const lastCloseBrace = beforeContext.lastIndexOf('}');
    // Only process if it looks like it could be a logo (in a container with size classes)
    const hasSizeContext = /(w-\d+|h-\d+|rounded|bg-|border)/.test(beforeContext.substring(Math.max(0, beforeContext.length - 200)));
    if (lastOpenBrace <= lastCloseBrace && hasSizeContext) {
      const escapedLogo = standaloneMatch[2].replace(/'/g, "\\'");
      const logoReplacement = `${standaloneMatch[1]}{previewMode ? '${escapedLogo}' : casino.logo && (casino.logo.startsWith('/') || casino.logo.startsWith('http')) ? (
                                <Image src={casino.logo} alt={casino.name} width={128} height={128} className="object-contain max-w-full max-h-full" />
                              ) : getLogoText()}${standaloneMatch[3]}`;
      standaloneLogoReplacements.push({
        index: matchIndex,
        length: standaloneMatch[0].length,
        replacement: logoReplacement
      });
    }
  }
  standaloneLogoReplacements.reverse().forEach(({index, length, replacement}) => {
    reactCode = reactCode.substring(0, index) + replacement + reactCode.substring(index + length);
  });
  
  // Pattern 2: "Est. YYYY" pattern (already handled above, but handle standalone years)
  const estPattern = /Est\.\s*(\d{4})/gi;
  const estReplacements: Array<{index: number, length: number, replacement: string}> = [];
  let estMatch;
  while ((estMatch = estPattern.exec(reactCode)) !== null) {
    const matchIndex = estMatch.index;
    const beforeContext = reactCode.substring(0, matchIndex);
    const lastOpenBrace = beforeContext.lastIndexOf('{');
    const lastCloseBrace = beforeContext.lastIndexOf('}');
    if (lastOpenBrace <= lastCloseBrace) {
      estReplacements.push({
        index: matchIndex,
        length: estMatch[0].length,
        replacement: `Est. {previewMode ? '${estMatch[1]}' : casino.established || ''}`
      });
    }
  }
  estReplacements.reverse().forEach(({index, length, replacement}) => {
    reactCode = reactCode.substring(0, index) + replacement + reactCode.substring(index + length);
  });
  
  // Pattern 3: Text after globe icon (region)
  const globePattern = /(<span[^>]*data-lucide="globe"[^>]*>[\s\S]*?<\/span>[\s]*)([A-Z][a-z]+)/g;
  const globeReplacements: Array<{index: number, length: number, replacement: string}> = [];
  let globeMatch;
  while ((globeMatch = globePattern.exec(reactCode)) !== null) {
    const matchIndex = globeMatch.index;
    const beforeContext = reactCode.substring(0, matchIndex);
    const lastOpenBrace = beforeContext.lastIndexOf('{');
    const lastCloseBrace = beforeContext.lastIndexOf('}');
    if (lastOpenBrace <= lastCloseBrace) {
      const escapedRegion = globeMatch[2].replace(/'/g, "\\'");
      globeReplacements.push({
        index: matchIndex,
        length: globeMatch[0].length,
        replacement: `${globeMatch[1]}{previewMode ? '${escapedRegion}' : casino.region || ''}`
      });
    }
  }
  globeReplacements.reverse().forEach(({index, length, replacement}) => {
    reactCode = reactCode.substring(0, index) + replacement + reactCode.substring(index + length);
  });
  
  // Pattern 4: Rating patterns like "9.8/10" or "9.8 / 10"
  const ratingSlashPattern = /(\d+\.\d+)\s*\/\s*10/g;
  const ratingReplacements: Array<{index: number, length: number, replacement: string}> = [];
  let ratingMatch;
  while ((ratingMatch = ratingSlashPattern.exec(reactCode)) !== null) {
    const matchIndex = ratingMatch.index;
    const beforeContext = reactCode.substring(0, matchIndex);
    const lastOpenBrace = beforeContext.lastIndexOf('{');
    const lastCloseBrace = beforeContext.lastIndexOf('}');
    if (lastOpenBrace <= lastCloseBrace) {
      ratingReplacements.push({
        index: matchIndex,
        length: ratingMatch[0].length,
        replacement: `{previewMode ? '${ratingMatch[1]}' : casino.rating?.toFixed(1) || '0.0'}/10`
      });
    }
  }
  ratingReplacements.reverse().forEach(({index, length, replacement}) => {
    reactCode = reactCode.substring(0, index) + replacement + reactCode.substring(index + length);
  });
  
  // Pattern 5: Standalone votes patterns like "(1,240 votes)" or "1,240 votes"
  const votesStandalonePattern = /\(?(\d{1,3}(?:,\d{3})*)\s+votes\)?/gi;
  const votesReplacements: Array<{index: number, length: number, replacement: string}> = [];
  let votesMatch;
  while ((votesMatch = votesStandalonePattern.exec(reactCode)) !== null) {
    const matchIndex = votesMatch.index;
    const beforeContext = reactCode.substring(0, matchIndex);
    const lastOpenBrace = beforeContext.lastIndexOf('{');
    const lastCloseBrace = beforeContext.lastIndexOf('}');
    if (lastOpenBrace <= lastCloseBrace) {
      votesReplacements.push({
        index: matchIndex,
        length: votesMatch[0].length,
        replacement: `{previewMode ? '${votesMatch[0]}' : casino.votes ? '(' + formatNumber(casino.votes) + ' votes)' : ''}`
      });
    }
  }
  votesReplacements.reverse().forEach(({index, length, replacement}) => {
    reactCode = reactCode.substring(0, index) + replacement + reactCode.substring(index + length);
  });
  
  // Pattern 6: Replace casino name mentions in descriptive text
  // Match patterns like "Navigating Ignite Casino..." or "Is Ignite Casino safe..."
  const casinoNamePattern = /(Ignite Casino|IGNITE CASINO)/gi;
  const nameReplacements: Array<{index: number, length: number, replacement: string}> = [];
  let nameMatch;
  const nameRegex = new RegExp(casinoNamePattern.source, 'g');
  while ((nameMatch = nameRegex.exec(reactCode)) !== null) {
    const matchIndex = nameMatch.index;
    const beforeContext = reactCode.substring(0, matchIndex);
    
    // Skip if inside JSX expression
    const lastOpenBrace = beforeContext.lastIndexOf('{');
    const lastCloseBrace = beforeContext.lastIndexOf('}');
    if (lastOpenBrace > lastCloseBrace) continue;
    
    // Skip if inside attribute
    const lastEquals = beforeContext.lastIndexOf('=');
    const lastQuote = Math.max(
      beforeContext.lastIndexOf('"'),
      beforeContext.lastIndexOf("'"),
      beforeContext.lastIndexOf('`')
    );
    if (lastEquals > lastQuote && lastQuote > -1) continue;
    
    // Skip if already in previewMode conditional
    if (beforeContext.includes('previewMode') && beforeContext.lastIndexOf('previewMode') > lastCloseBrace) {
      const afterPreviewMode = reactCode.substring(beforeContext.lastIndexOf('previewMode'), matchIndex);
      if (afterPreviewMode.includes('?')) continue;
    }
    
    nameReplacements.push({
      index: matchIndex,
      length: nameMatch[0].length,
      replacement: `{previewMode ? 'Ignite Casino' : casino.name}`
    });
  }
  
  // Apply name replacements from end to start
  nameReplacements.reverse().forEach(({index, length, replacement}) => {
    reactCode = reactCode.substring(0, index) + replacement + reactCode.substring(index + length);
  });
  
  // Now do exact match replacements
  const reverseMap = createReversePreviewMap();
  
  for (const [previewValue, fieldPath] of reverseMap) {
    // Skip if this value was already converted as a template variable
    // (check if it's already wrapped in previewMode conditional or in a JSX expression)
    const escapedForRegex = previewValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const alreadyConvertedPattern = new RegExp(`(previewMode\\s*\\?\\s*['"]${escapedForRegex}['"]|\\{casino\\.|\\{previewMode)`, 'gi');
    if (alreadyConvertedPattern.test(reactCode)) {
      // Check more carefully - if the value appears but is NOT in a previewMode conditional, we should still replace it
      const valueInExpression = new RegExp(`\\{[^}]*${escapedForRegex}[^}]*\\}`, 'gi');
      const allOccurrences = reactCode.match(new RegExp(escapedForRegex, 'gi'));
      const inExpressions = reactCode.match(valueInExpression);
      // If all occurrences are in expressions, skip
      if (allOccurrences && inExpressions && allOccurrences.length === inExpressions.length) {
        continue;
      }
    }
    
    // Escape special regex characters in preview value
    const escapedValue = previewValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Build the JSX path for the field
    const parts = fieldPath.split('.');
    let jsxPath: string;
    if (parts.length > 1) {
      jsxPath = parts.map((p: string, i: number) => i === 0 ? p : `?.${p}`).join('');
    } else {
      jsxPath = fieldPath;
    }
    
    // Handle special cases
    if (fieldPath === 'rating') {
      // Rating needs special formatting
      const ratingPattern = new RegExp(`(>|\\s)${escapedValue}(<|\\s|\\()`, 'g');
      reactCode = reactCode.replace(ratingPattern, (match, before, after) => {
        return `${before}{previewMode ? '9.8' : casino.rating?.toFixed(1) || '0.0'}${after}`;
      });
      continue;
    }
    
    if (fieldPath === 'votes') {
      // Votes is a number, handle "(1,240 votes)" pattern
      const votesPattern = new RegExp(`\\(${escapedValue}\\s+votes\\)`, 'gi');
      reactCode = reactCode.replace(votesPattern, (match) => {
        return `{previewMode ? '(1,240 votes)' : casino.votes ? '(' + formatNumber(casino.votes) + ' votes)' : ''}`;
      });
      continue;
    }
    
    if (fieldPath === 'established') {
      // Handle "Est. 2021" pattern
      const estPattern = new RegExp(`Est\\.\\s*${escapedValue}`, 'gi');
      reactCode = reactCode.replace(estPattern, (match) => {
        return `Est. {previewMode ? '2021' : casino.established}`;
      });
      // Also handle standalone "2021" in context
      const standalonePattern = new RegExp(`(>|\\s)${escapedValue}(<|\\s|\\()`, 'g');
      reactCode = reactCode.replace(standalonePattern, (match, before, after) => {
        // Only replace if it's not already part of "Est. 2021"
        if (!reactCode.includes(`Est. {previewMode ? '2021' : casino.established}`)) {
          return `${before}{previewMode ? '2021' : casino.established}${after}`;
        }
        return match;
      });
      continue;
    }
    
    // For verdict and other long text, replace entire text blocks
    if (fieldPath === 'verdict' || previewValue.length > 50) {
      // Match the value as a complete text node (between > and <, not in attributes)
      const longTextPattern = new RegExp(`(>|\\s)${escapedValue.replace(/\s+/g, '\\s+')}(<|\\s)`, 'gs');
      const longReplacements: Array<{index: number, length: number, replacement: string}> = [];
      
      let match;
      while ((match = longTextPattern.exec(reactCode)) !== null) {
        const matchIndex = match.index;
        const beforeContext = reactCode.substring(0, matchIndex);
        
        // Check if we're inside a JSX expression { ... }
        const lastOpenBrace = beforeContext.lastIndexOf('{');
        const lastCloseBrace = beforeContext.lastIndexOf('}');
        if (lastOpenBrace > lastCloseBrace) {
          // We're inside a JSX expression, skip
          continue;
        }
        
        // Check if we're inside an attribute
        const lastEquals = beforeContext.lastIndexOf('=');
        const lastQuote = Math.max(
          beforeContext.lastIndexOf('"'),
          beforeContext.lastIndexOf("'"),
          beforeContext.lastIndexOf('`')
        );
        
        // Skip if inside an attribute
        if (lastEquals > lastQuote && lastQuote > -1) {
          continue;
        }
        
        // Skip if already in a previewMode conditional
        const beforePreviewMode = beforeContext.lastIndexOf('previewMode');
        if (beforePreviewMode > -1) {
          const afterPreviewMode = reactCode.substring(beforePreviewMode, matchIndex);
          if (afterPreviewMode.includes('?')) {
            continue;
          }
        }
        
        const escapedPreview = previewValue
          .replace(/\\/g, '\\\\')
          .replace(/'/g, "\\'")
          .replace(/\n/g, '\\n')
          .replace(/\r/g, '\\r')
          .replace(/\t/g, '\\t');
        
        const replacement = `${match[1]}{previewMode ? '${escapedPreview}' : casino.${jsxPath} || ''}${match[2]}`;
        longReplacements.push({
          index: matchIndex,
          length: match[0].length,
          replacement
        });
      }
      
      // Apply replacements from end to start
      longReplacements.reverse().forEach(({index, length, replacement}) => {
        reactCode = reactCode.substring(0, index) + replacement + reactCode.substring(index + length);
      });
      continue;
    }
    
    // For shorter values, replace in text content only (not in attributes)
    // Use a more reliable approach: process from end to start to avoid index issues
    const textContentPattern = new RegExp(`(>|^|\\s)${escapedValue}(<|$|\\s|\\()`, 'g');
    const replacements: Array<{index: number, length: number, replacement: string}> = [];
    
    let match;
    while ((match = textContentPattern.exec(reactCode)) !== null) {
      const matchIndex = match.index;
      const beforeContext = reactCode.substring(0, matchIndex);
      
      // Check if we're inside a JSX expression { ... }
      const lastOpenBrace = beforeContext.lastIndexOf('{');
      const lastCloseBrace = beforeContext.lastIndexOf('}');
      if (lastOpenBrace > lastCloseBrace) {
        // We're inside a JSX expression, skip
        continue;
      }
      
      // Check if we're inside an attribute
      const lastEquals = beforeContext.lastIndexOf('=');
      const lastQuote = Math.max(
        beforeContext.lastIndexOf('"'),
        beforeContext.lastIndexOf("'"),
        beforeContext.lastIndexOf('`')
      );
      
      // Skip if inside an attribute
      if (lastEquals > lastQuote && lastQuote > -1) {
        continue;
      }
      
      // Skip if inside className or other common attributes
      const attributePattern = /(className|href|src|alt|id|data-\w+)\s*=\s*["'][^"']*$/;
      if (attributePattern.test(beforeContext)) {
        continue;
      }
      
      // Skip if already in a previewMode conditional
      const beforePreviewMode = beforeContext.lastIndexOf('previewMode');
      if (beforePreviewMode > -1) {
        const afterPreviewMode = reactCode.substring(beforePreviewMode, matchIndex);
        if (afterPreviewMode.includes('?')) {
          continue;
        }
      }
      
      // Escape special characters in preview value
      const escapedPreview = previewValue
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'")
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\t/g, '\\t');
      
      // Build replacement - always use empty string fallback
      const replacement = `{previewMode ? '${escapedPreview}' : casino.${jsxPath} || ''}`;
      replacements.push({
        index: matchIndex,
        length: match[0].length,
        replacement: match[1] + replacement + match[2]
      });
    }
    
    // Apply replacements from end to start to preserve indices
    replacements.reverse().forEach(({index, length, replacement}) => {
      reactCode = reactCode.substring(0, index) + replacement + reactCode.substring(index + length);
    });
  }
  
  // Step 12.5: Final pass - catch any remaining hardcoded demo values
  // Common demo values that should be replaced with empty strings
  const commonDemoValues = [
    'Instant', 'Global', 'Curacao', 'IGNITE', 'IGNITE200',
    'Welcome Package', '$5,000', '100 Free Spins', '35x Bonus',
    '$20.00', '30 Days', 'Ignite Gaming N.V.'
  ];
  
  for (const demoValue of commonDemoValues) {
    const escapedDemo = demoValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const demoPattern = new RegExp(`(>|^|\\s)${escapedDemo}(<|$|\\s|\\()`, 'g');
    const finalReplacements: Array<{index: number, length: number, replacement: string}> = [];
    
    let match;
    while ((match = demoPattern.exec(reactCode)) !== null) {
      const matchIndex = match.index;
      const beforeContext = reactCode.substring(0, matchIndex);
      
      // Skip if already in JSX expression or previewMode conditional
      const lastOpenBrace = beforeContext.lastIndexOf('{');
      const lastCloseBrace = beforeContext.lastIndexOf('}');
      if (lastOpenBrace > lastCloseBrace) continue;
      
      // Skip if in attribute
      const lastEquals = beforeContext.lastIndexOf('=');
      const lastQuote = Math.max(
        beforeContext.lastIndexOf('"'),
        beforeContext.lastIndexOf("'"),
        beforeContext.lastIndexOf('`')
      );
      if (lastEquals > lastQuote && lastQuote > -1) continue;
      
      // Skip if already in previewMode conditional
      if (beforeContext.includes('previewMode') && beforeContext.lastIndexOf('previewMode') > lastCloseBrace) {
        const afterPreviewMode = reactCode.substring(beforeContext.lastIndexOf('previewMode'), matchIndex);
        if (afterPreviewMode.includes('?')) continue;
      }
      
      // Replace with empty string when previewMode=false
      const escapedDemoValue = demoValue.replace(/'/g, "\\'");
      finalReplacements.push({
        index: matchIndex,
        length: match[0].length,
        replacement: `${match[1]}{previewMode ? '${escapedDemoValue}' : ''}${match[2]}`
      });
    }
    
    // Apply final replacements from end to start
    finalReplacements.reverse().forEach(({index, length, replacement}) => {
      reactCode = reactCode.substring(0, index) + replacement + reactCode.substring(index + length);
    });
  }

  // Step 13: Convert self-closing tags
  reactCode = reactCode.replace(/<(\w+)([^>]*)\s*\/>/g, '<$1$2 />');

  // Step 14: Handle HTML comments (remove or convert)
  reactCode = reactCode.replace(/<!--[\s\S]*?-->/g, '');

  // Step 15: Convert href="#" to href="/" or use Link component (will need manual review)
  // For now, keep as is but note that Next.js Link should be used for internal links

  // Step 16: Handle img tags - convert to Next.js Image component (optional, can be manual)
  // For now, keep as regular img tags but add alt if missing
  reactCode = reactCode.replace(/<img([^>]*?)(?:\s+alt=([^"'\s>]+))?([^>]*)>/gi, (match, before, alt, after) => {
    if (!alt && !match.includes('alt=')) {
      return `<img${before}${after} alt="" />`;
    }
    return match;
  });

  // Step 16: Build the component with extracted styles
  // Process styles - escape backticks and template literals
  const processedStyles = styleMatches.map(style => {
    return style
      .replace(/`/g, '\\`')
      .replace(/\${/g, '\\${')
      .replace(/\n/g, '\\n');
  }).join('\\n');

  const stylesSection = styleMatches.length > 0 
    ? `      <style dangerouslySetInnerHTML={{ __html: \`${processedStyles}\` }} />\n` 
    : '';

  // Clean up the code - preserve indentation but normalize
  const cleanedCode = reactCode.trim()
    .split('\n')
    .map(line => {
      const trimmed = line.trim();
      if (!trimmed) return '';
      // Count leading spaces/tabs
      const indent = line.match(/^(\s*)/)?.[1]?.length || 0;
      // Normalize to 2 spaces per level (minimum 2 spaces for content)
      const indentLevel = Math.max(1, Math.floor(indent / 2));
      return ' '.repeat(indentLevel * 2) + trimmed;
    })
    .filter(line => line.length > 0)
    .join('\n');

  // Wrap in React component WITH previewMode support
  const componentCode = `"use client";

import { ${propsInterface} } from "@/types/casino";
import Link from "next/link";
import Image from "next/image";

interface ${componentName}Props {
  casino: ${propsInterface};
  previewMode?: boolean; // When true, shows hardcoded values (original template)
}

export default function ${componentName}({ casino, previewMode = false }: ${componentName}Props) {
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
${stylesSection}${cleanedCode.split('\n').map(line => '      ' + line).join('\n')}
    </div>
  );
}
`;
  
  return componentCode;
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const templateId = formData.get('templateId') as string | null;
    const category = formData.get('category') as string;
    
    // For new templates, get data from form
    const name = formData.get('name') as string | null;
    const slug = formData.get('slug') as string | null;
    const component = formData.get('component') as string | null;
    const description = formData.get('description') as string | null;
    const isActive = formData.get('isActive') === 'true';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!category) {
      return NextResponse.json({ error: 'Category required' }, { status: 400 });
    }

    // Validate file type
    if (!file.name.endsWith('.html')) {
      return NextResponse.json({ error: 'File must be an HTML file' }, { status: 400 });
    }

    let template;
    let finalTemplateId: string;

    // If no templateId, create a new template first
    if (!templateId) {
      if (!name || !slug || !component) {
        return NextResponse.json({ 
          error: 'Name, slug, and component are required for new templates' 
        }, { status: 400 });
      }

      template = await prisma.template.create({
        data: {
          name,
          slug,
          component,
          category,
          description: description || null,
          isActive: isActive ?? true,
        },
      });
      finalTemplateId = template.id;
    } else {
      // Get existing template from database
      template = await prisma.template.findUnique({
        where: { id: templateId },
      });

      if (!template) {
        return NextResponse.json({ error: 'Template not found' }, { status: 404 });
      }
      finalTemplateId = templateId;
    }

    // Read HTML content
    const htmlContent = await file.text();
    
    // Get directory for category
    const categoryDir = categoryToDir[category] || 'casino';
    const templatesDir = join(process.cwd(), 'components', 'templates', categoryDir);
    
    // Create directory if it doesn't exist
    if (!existsSync(templatesDir)) {
      await mkdir(templatesDir, { recursive: true });
    }

    // Use component name from template or generate from slug
    // Sanitize to ensure valid TypeScript identifier (no spaces, PascalCase)
    let componentName = template.component || template.slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
    
    // Remove spaces and ensure PascalCase
    componentName = componentName
      .split(/\s+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
    
    // Remove any non-alphanumeric characters except underscore
    componentName = componentName.replace(/[^a-zA-Z0-9_]/g, '');
    
    // Ensure it starts with a letter
    if (componentName && !/^[a-zA-Z]/.test(componentName)) {
      componentName = 'Template' + componentName;
    }
    
    // Fallback if empty
    if (!componentName) {
      componentName = 'Template';
    }
    
    // Convert HTML to React component
    const reactComponent = htmlToReactComponent(htmlContent, componentName, 'Casino');
    
    // Save component file
    const componentFileName = `${template.slug}.tsx`;
    const filePath = join(templatesDir, componentFileName);
    await writeFile(filePath, reactComponent, 'utf-8');

    // Update template in database with component name
    const updatedTemplate = await prisma.template.update({
      where: { id: finalTemplateId },
      data: {
        component: componentFileName.replace('.tsx', ''),
      },
    });

    return NextResponse.json({
      success: true,
      component: componentFileName.replace('.tsx', ''),
      slug: updatedTemplate.slug,
      templateId: finalTemplateId,
      message: 'Template uploaded and converted successfully',
    });
  } catch (error) {
    console.error('Error uploading template:', error);
    return NextResponse.json(
      { error: 'Failed to upload template' },
      { status: 500 }
    );
  }
}

