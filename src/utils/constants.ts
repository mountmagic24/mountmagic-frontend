export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://mountmagic.page/api';

export const APP_NAME = 'Mount Magic';

export const ROLES = {
  ADMIN: 'admin',
  CONTENT_MANAGER: 'content_manager',
  TAXI_MANAGER: 'taxi_manager',
  CD_MANAGER: 'cd_manager',
  USER: 'user',
};

export const SERVICE_CATEGORIES = {
  TAXI: 'taxi',
  DOCUMENT_SERVICES: 'document-services',
  TOUR: 'tour',
  ACCOMMODATION: 'accommodation',
};

export const BLOG_STATUSES = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
};

export const TOKEN_STORAGE_KEY = 'mm_auth_token';
