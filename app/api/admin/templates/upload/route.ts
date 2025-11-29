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
    const camelCase = attr.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    return ` data${camelCase.charAt(0).toUpperCase() + camelCase.slice(1)}=`;
  });

  // Step 11: Handle template variables with nested paths
  // Handle {{casino.data.bonus.amount}} style variables - with optional chaining for safety
  reactCode = reactCode.replace(/\{\{casino\.data\.(\w+(?:\.\w+)*)\}\}/g, (match, path) => {
    const parts = path.split('.');
    // Add optional chaining for nested properties
    const jsxPath = parts.map((p: string, i: number) => i === 0 ? p : `?.${p}`).join('');
    return `{casino.data?.${jsxPath}}`;
  });
  
  // Handle {{casino.bonus.amount}} style variables (flattened structure)
  reactCode = reactCode.replace(/\{\{casino\.(\w+(?:\.\w+)*)\}\}/g, (match, path) => {
    const parts = path.split('.');
    if (parts.length > 1) {
      // Add optional chaining for nested properties
      const jsxPath = parts.map((p: string, i: number) => i === 0 ? p : `?.${p}`).join('');
      return `{casino.${jsxPath}}`;
    }
    return `{casino.${path}}`;
  });
  
  // Handle simple {{variable}} style (for any other variables)
  reactCode = reactCode.replace(/\{\{(\w+)\}\}/g, '{$1}');

  // Step 12: Convert self-closing tags
  reactCode = reactCode.replace(/<(\w+)([^>]*)\s*\/>/g, '<$1$2 />');

  // Step 13: Handle HTML comments (remove or convert)
  reactCode = reactCode.replace(/<!--[\s\S]*?-->/g, '');

  // Step 14: Convert href="#" to href="/" or use Link component (will need manual review)
  // For now, keep as is but note that Next.js Link should be used for internal links

  // Step 15: Handle img tags - convert to Next.js Image component (optional, can be manual)
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

  // Wrap in React component
  const componentCode = `"use client";

import { ${propsInterface} } from "@/types/casino";
import Link from "next/link";
import Image from "next/image";

interface ${componentName}Props {
  casino: ${propsInterface};
}

export default function ${componentName}({ casino }: ${componentName}Props) {
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
    const componentName = template.component || template.slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
    
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

