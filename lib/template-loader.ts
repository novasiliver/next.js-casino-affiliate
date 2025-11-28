import { Casino } from '@/types/casino';
import { ComponentType } from 'react';

// Cache for loaded templates
const templateCache: Record<string, ComponentType<{ casino: Casino; previewMode?: boolean }>> = {};

/**
 * Dynamically loads a template component based on category and component name
 * @param category - Template category (e.g., 'casino', 'post', 'game', 'bonus')
 * @param componentName - Component name (e.g., 'template1', 'premium-review-v2')
 * @returns The loaded template component or null if not found
 */
export async function loadTemplate(
  category: string,
  componentName: string
): Promise<ComponentType<{ casino: Casino; previewMode?: boolean }> | null> {
  const cacheKey = `${category}/${componentName}`;
  
  // Check cache first
  if (templateCache[cacheKey]) {
    return templateCache[cacheKey];
  }

  try {
    // Dynamic import based on category and component name
    const templateModule = await import(`@/components/templates/${category}/${componentName}`);
    const TemplateComponent = templateModule.default as ComponentType<{ casino: Casino; previewMode?: boolean }>;
    
    // Cache the loaded template
    templateCache[cacheKey] = TemplateComponent;
    
    return TemplateComponent;
  } catch (error) {
    console.error(`Failed to load template ${category}/${componentName}:`, error);
    return null;
  }
}

/**
 * Loads the default template for a category
 * @param category - Template category
 * @returns The default template component or null if not found
 */
export async function loadDefaultTemplate(category: string): Promise<ComponentType<{ casino: Casino; previewMode?: boolean }> | null> {
  // Try common default names
  const defaultNames = ['template1', 'default', 'index'];
  
  for (const name of defaultNames) {
    const template = await loadTemplate(category, name);
    if (template) return template;
  }
  
  return null;
}

