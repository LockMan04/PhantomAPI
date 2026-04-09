'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
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
import { dict } from "@/constants/app"
import { ThemeToggle } from "@/components/theme-toggle"
import { RandomDataTab } from "@/components/playground/random-data-tab"
import { PlaceholderTab } from "@/components/playground/placeholder-tab"

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
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="outline" onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}>
              {lang === 'vi' ? 'English' : 'Tiếng Việt'}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="random" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mb-8">
            <TabsTrigger value="random">{t.randomTab}</TabsTrigger>
            <TabsTrigger value="placeholder">{t.placeholderTab}</TabsTrigger>
          </TabsList>

          <TabsContent value="random" className="space-y-6">
            <RandomDataTab
              t={t}
              locale={locale} setLocale={setLocale}
              limit={limit} setLimit={setLimit}
              seed={seed} setSeed={setSeed}
              jsonPreview={jsonPreview}
              loading={loading}
              handleFetchRandom={handleFetchRandom}
              copyToClipboard={copyToClipboard}
            />
          </TabsContent>

          <TabsContent value="placeholder" className="space-y-6">
            <PlaceholderTab
              t={t}
              phWidth={phWidth} setPhWidth={setPhWidth}
              phHeight={phHeight} setPhHeight={setPhHeight}
              phBgColor={phBgColor} setPhBgColor={setPhBgColor}
              phTextColor={phTextColor} setPhTextColor={setPhTextColor}
              phText={phText} setPhText={setPhText}
              previewImageUrl={previewImageUrl}
              generatePlaceholderUrl={generatePlaceholderUrl}
              copyToClipboard={copyToClipboard}
            />
          </TabsContent>
        </Tabs>
        </div>
      </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
