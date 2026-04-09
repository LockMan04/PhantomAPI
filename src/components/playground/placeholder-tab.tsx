import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Dictionary } from "@/constants/app"

interface PlaceholderTabProps {
  t: Dictionary;
  phWidth: number;
  setPhWidth: (val: number) => void;
  phHeight: number;
  setPhHeight: (val: number) => void;
  phBgColor: string;
  setPhBgColor: (val: string) => void;
  phTextColor: string;
  setPhTextColor: (val: string) => void;
  phText: string;
  setPhText: (val: string) => void;
  previewImageUrl: string;
  generatePlaceholderUrl: (type: 'image' | 'avatar') => void;
  copyToClipboard: (text: string) => void;
}

export function PlaceholderTab({
  t,
  phWidth, setPhWidth,
  phHeight, setPhHeight,
  phBgColor, setPhBgColor,
  phTextColor, setPhTextColor,
  phText, setPhText,
  previewImageUrl,
  generatePlaceholderUrl,
  copyToClipboard
}: PlaceholderTabProps) {
  return (
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
          <Button variant="ghost" size="sm" onClick={() => copyToClipboard(typeof window !== 'undefined' ? window.location.origin + previewImageUrl : '')} disabled={!previewImageUrl}>
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
  );
}
