'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

const RANDOM_ENDPOINTS = [
  'person', 'address', 'phone', 'company', 'product',
  'user', 'post', 'order', 'finance', 'date',
  'internet', 'lorem', 'animal', 'hacker', 'all'
];

type Dictionary = {
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

const dict: Record<'vi' | 'en', Dictionary> = {
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

export default function Home() {
  const [lang, setLang] = useState<'vi' | 'en'>('vi');
  const t = dict[lang];

  const [locale, setLocale] = useState<'vi' | 'en'>('vi');
  const [limit, setLimit] = useState(1);
  const [seed, setSeed] = useState('');

  const [jsonPreview, setJsonPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const [phWidth, setPhWidth] = useState(400);
  const [phHeight, setPhHeight] = useState(300);
  const [phBgColor, setPhBgColor] = useState('ccc');
  const [phTextColor, setPhTextColor] = useState('000');
  const [phText, setPhText] = useState('');
  const [previewImageUrl, setPreviewImageUrl] = useState<string>('');

  // Handle client-side hydration correctly
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleFetchRandom = async (endpoint: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('locale', locale);
      params.set('limit', limit.toString());
      if (seed) params.set('seed', seed);

      const res = await fetch(`/api/random/${endpoint}?${params.toString()}`);
      const data = await res.json();
      setJsonPreview(JSON.stringify(data, null, 2));
    } catch (_error) {
      toast.error(t.fetchError);
      setJsonPreview('');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(
      () => toast.success(t.copySuccess),
      () => toast.error(t.copyFail)
    );
  };

  const generatePlaceholderUrl = (type: 'image' | 'avatar') => {
    const params = new URLSearchParams();
    if (phWidth) params.set('width', phWidth.toString());
    if (phHeight) params.set('height', phHeight.toString());
    if (phBgColor) params.set('bgColor', phBgColor);
    if (phTextColor) params.set('textColor', phTextColor);
    if (phText) params.set('text', phText);

    const url = `/api/placeholder/${type}?${params.toString()}`;
    setPreviewImageUrl(url);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Documentation Playground</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main className="flex-1 bg-gray-50 dark:bg-zinc-950 text-slate-900 dark:text-slate-100 p-6 md:p-10 font-sans">
          <div className="max-w-5xl mx-auto space-y-8">

            {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">{t.title}</h1>
            <p className="text-muted-foreground mt-2">{t.subtitle}</p>
          </div>
          <Button variant="outline" onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}>
            {lang === 'vi' ? 'English' : 'Tiếng Việt'}
          </Button>
        </div>

        <Tabs defaultValue="random" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mb-8">
            <TabsTrigger value="random">{t.randomTab}</TabsTrigger>
            <TabsTrigger value="placeholder">{t.placeholderTab}</TabsTrigger>
          </TabsList>

          {/* RANDOM DATA TAB */}
          <TabsContent value="random" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">

              {/* Controls & Endpoints */}
              <div className="space-y-6 md:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.settings}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>{t.locale}</Label>
                      <div className="flex gap-2">
                        <Button variant={locale === 'vi' ? 'default' : 'outline'} onClick={() => setLocale('vi')} className="w-full">vi</Button>
                        <Button variant={locale === 'en' ? 'default' : 'outline'} onClick={() => setLocale('en')} className="w-full">en</Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>{t.limit}</Label>
                      <Input type="number" min={1} max={50} value={limit} onChange={(e) => setLimit(Number(e.target.value))} />
                    </div>
                    <div className="space-y-2">
                      <Label>{t.seed}</Label>
                      <Input placeholder="e.g. 123" value={seed} onChange={(e) => setSeed(e.target.value)} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t.endpoints}</CardTitle>
                    <CardDescription>Click to test</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {RANDOM_ENDPOINTS.map(ep => (
                        <Badge
                          key={ep}
                          variant="secondary"
                          className="cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 py-1.5 px-3"
                          onClick={() => handleFetchRandom(ep)}
                        >
                          /{ep}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* JSON Preview */}
              <Card className="md:col-span-2 flex flex-col h-full min-h-[500px]">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle>{t.preview}</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(jsonPreview)} disabled={!jsonPreview}>
                    {t.copyCode}
                  </Button>
                </CardHeader>
                <Separator />
                <CardContent className="flex-1 overflow-auto bg-slate-950 text-green-400 p-4 rounded-b-lg font-mono text-sm">
                  {loading ? (
                    <div className="animate-pulse">{t.loading}</div>
                  ) : jsonPreview ? (
                    <pre>{jsonPreview}</pre>
                  ) : (
                    <div className="text-slate-500 italic">{t.noData}</div>
                  )}
                </CardContent>
              </Card>

            </div>
          </TabsContent>

          {/* PLACEHOLDER TAB */}
          <TabsContent value="placeholder" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">

              {/* Settings */}
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>{t.placeholderSettings}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{t.width}</Label>
                      <Input type="number" value={phWidth} onChange={(e) => setPhWidth(Number(e.target.value))} />
                    </div>
                    <div className="space-y-2">
                      <Label>{t.height}</Label>
                      <Input type="number" value={phHeight} onChange={(e) => setPhHeight(Number(e.target.value))} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{t.bgColor}</Label>
                      <Input placeholder="ccc" value={phBgColor} onChange={(e) => setPhBgColor(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>{t.textColor}</Label>
                      <Input placeholder="000" value={phTextColor} onChange={(e) => setPhTextColor(e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>{t.text}</Label>
                    <Input placeholder="Optional text" value={phText} onChange={(e) => setPhText(e.target.value)} />
                  </div>
                  <div className="pt-4 flex flex-col gap-2">
                    <Button onClick={() => generatePlaceholderUrl('image')}>{t.generateImage}</Button>
                    <Button variant="secondary" onClick={() => generatePlaceholderUrl('avatar')}>{t.generateAvatar}</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Preview */}
              <Card className="md:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle>{t.imagePreview}</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(window.location.origin + previewImageUrl)} disabled={!previewImageUrl}>
                    {t.copyUrl}
                  </Button>
                </CardHeader>
                <Separator />
                <CardContent className="flex items-center justify-center p-8 min-h-[400px] bg-slate-100 dark:bg-slate-900 rounded-b-lg">
                  {previewImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={previewImageUrl} alt="Placeholder Preview" className="max-w-full max-h-[400px] shadow-sm border border-slate-200" />
                  ) : (
                    <p className="text-slate-400 italic">No image generated yet.</p>
                  )}
                </CardContent>
              </Card>

            </div>
          </TabsContent>
          </Tabs>
        </div>
      </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
