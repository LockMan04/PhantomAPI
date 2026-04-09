import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RANDOM_ENDPOINTS, Dictionary } from "@/constants/app"

interface RandomDataTabProps {
  t: Dictionary;
  locale: 'vi' | 'en';
  setLocale: (val: 'vi' | 'en') => void;
  limit: number;
  setLimit: (val: number) => void;
  seed: string;
  setSeed: (val: string) => void;
  jsonPreview: string;
  loading: boolean;
  handleFetchRandom: (endpoint: string) => void;
  copyToClipboard: (text: string) => void;
}

export function RandomDataTab({
  t,
  locale,
  setLocale,
  limit,
  setLimit,
  seed,
  setSeed,
  jsonPreview,
  loading,
  handleFetchRandom,
  copyToClipboard
}: RandomDataTabProps) {
  return (
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
  );
}
