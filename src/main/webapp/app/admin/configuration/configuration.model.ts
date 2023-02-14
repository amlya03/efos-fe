/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
export interface ConfigProps {
  contexts: Contexts;
}

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export interface Contexts {
  [key: string]: Context;
}

export interface Context {
  beans: Beans;
  parentId?: any;
}

export interface Beans {
  [key: string]: Bean;
}

export interface Bean {
  prefix: string;
  properties: any;
}

export interface Env {
  activeProfiles?: string[];
  propertySources: PropertySource[];
}

export interface PropertySource {
  name: string;
  properties: Properties;
}

export interface Properties {
  [key: string]: Property;
}

export interface Property {
  value: string;
  origin?: string;
}
