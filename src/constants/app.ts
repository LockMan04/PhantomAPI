export const RANDOM_ENDPOINTS = [
  'person', 'address', 'phone', 'company', 'product',
  'user', 'post', 'order', 'cart', 'store', 'finance', 'date',
  'internet', 'lorem', 'animal', 'hacker', 'all'
];

export type Dictionary = {
  title: string;
  subtitle: string;
  randomTab: string;
  placeholderTab: string;
  settings: string;
  locale: string;
  limit: string;
  seed: string;
  endpoints: string;
  preview: string;
  copySuccess: string;
  copyFail: string;
  copyCode: string;
  fetchError: string;
  placeholderSettings: string;
  width: string;
  height: string;
  bgColor: string;
  textColor: string;
  text: string;
  generateImage: string;
  generateAvatar: string;
  imagePreview: string;
  copyUrl: string;
  noData: string;
  loading: string;
};

export const dict: Record<'vi' | 'en', Dictionary> = {
  vi: {
    title: 'Random Placeholder API',
    subtitle: 'Công cụ tạo dữ liệu giả và ảnh placeholder cực nhanh',
    randomTab: 'Dữ liệu Ngẫu nhiên',
    placeholderTab: 'Ảnh Placeholder',
    settings: 'Cài đặt',
    locale: 'Ngôn ngữ (vi/en)',
    limit: 'Số lượng (1-50)',
    seed: 'Seed (tùy chọn)',
    endpoints: 'Danh sách API',
    preview: 'Xem trước JSON',
    copySuccess: 'Đã sao chép vào clipboard!',
    copyFail: 'Không thể sao chép!',
    copyCode: 'Sao chép JSON',
    fetchError: 'Lỗi khi gọi API',
    placeholderSettings: 'Tùy chỉnh Ảnh',
    width: 'Chiều rộng (px)',
    height: 'Chiều cao (px)',
    bgColor: 'Màu nền (Hex không có #)',
    textColor: 'Màu chữ (Hex không có #)',
    text: 'Văn bản (tùy chọn)',
    generateImage: 'Tạo Ảnh',
    generateAvatar: 'Tạo Avatar',
    imagePreview: 'Xem trước Ảnh',
    copyUrl: 'Sao chép URL Ảnh',
    noData: 'Chưa có dữ liệu, hãy chọn một API bên trái.',
    loading: 'Đang tải...',
  },
  en: {
    title: 'Random Placeholder API',
    subtitle: 'Blazing fast fake data and image placeholder generator',
    randomTab: 'Random Data',
    placeholderTab: 'Placeholder Images',
    settings: 'Settings',
    locale: 'Locale (vi/en)',
    limit: 'Limit (1-50)',
    seed: 'Seed (optional)',
    endpoints: 'API Endpoints',
    preview: 'JSON Preview',
    copySuccess: 'Copied to clipboard!',
    copyFail: 'Failed to copy!',
    copyCode: 'Copy JSON',
    fetchError: 'Error fetching API',
    placeholderSettings: 'Image Customization',
    width: 'Width (px)',
    height: 'Height (px)',
    bgColor: 'Background Color (Hex without #)',
    textColor: 'Text Color (Hex without #)',
    text: 'Text (optional)',
    generateImage: 'Generate Image',
    generateAvatar: 'Generate Avatar',
    imagePreview: 'Image Preview',
    copyUrl: 'Copy Image URL',
    noData: 'No data yet. Click an endpoint on the left.',
    loading: 'Loading...',
  }
};
