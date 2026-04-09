import { NextRequest, NextResponse } from 'next/server';
import { getFaker, generators, ResourceType, Locale } from '@/lib/faker';

// A helper for uniform response formatting
function sendResponse(data: unknown, meta: Record<string, unknown>) {
  return NextResponse.json({
    success: true,
    data,
    meta: {
      fake: true,
      forTestingOnly: true,
      generatedAt: new Date().toISOString(),
      ...meta,
    },
  });
}

function sendError(code: string, message: string, status = 400) {
  return NextResponse.json(
    {
      success: false,
      error: { code, message },
    },
    { status }
  );
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ resource: string }> }
) {
  const { resource } = await params;
  const searchParams = request.nextUrl.searchParams;

  const locale = (searchParams.get('locale') || 'en') as Locale;
  if (locale !== 'en' && locale !== 'vi') {
    return sendError('INVALID_PARAMS', 'Locale must be either "en" or "vi"');
  }

  const limitParam = searchParams.get('limit');
  const limit = limitParam ? parseInt(limitParam, 10) : 1;
  if (isNaN(limit) || limit < 1 || limit > 50) {
    return sendError('INVALID_PARAMS', 'Limit must be a number between 1 and 50');
  }

  const seed = searchParams.get('seed') || undefined;

  const metaParams = {
    locale,
    seed: !!seed,
  };

  const fakerInstance = getFaker(locale, seed);

  if (resource === 'all') {
    const allData: Record<string, unknown[]> = {};
    for (const key of Object.keys(generators) as ResourceType[]) {
      const generator = generators[key];
      allData[key] = Array.from({ length: limit }, () => generator(fakerInstance));
    }
    return sendResponse(allData, metaParams);
  }

  if (resource in generators) {
    const generator = generators[resource as ResourceType];
    const data =
      limit === 1
        ? generator(fakerInstance)
        : Array.from({ length: limit }, () => generator(fakerInstance));

    return sendResponse(data, metaParams);
  }

  return sendError(
    'INVALID_RESOURCE',
    `Resource "${resource}" not found. Valid resources are: ${Object.keys(generators).join(
      ', '
    )}, all`
  );
}
