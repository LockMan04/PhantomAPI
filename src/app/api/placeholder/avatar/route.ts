import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const widthParam = searchParams.get('width');
  const heightParam = searchParams.get('height');
  const width = widthParam ? parseInt(widthParam, 10) : 200;
  const height = heightParam ? parseInt(heightParam, 10) : 200;

  const bgColor = searchParams.get('bgColor') || 'ccc';
  const textColor = searchParams.get('textColor') || '000';
  const text = searchParams.get('text') || 'AV';

  if (isNaN(width) || width <= 0 || width > 4000) {
    return NextResponse.json({ success: false, error: { code: 'INVALID_PARAMS', message: 'Invalid width' } }, { status: 400 });
  }
  if (isNaN(height) || height <= 0 || height > 4000) {
    return NextResponse.json({ success: false, error: { code: 'INVALID_PARAMS', message: 'Invalid height' } }, { status: 400 });
  }

  // Generate SVG with circle for avatar
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="100%" height="100%" fill="#ffffff" />
    <circle cx="${width / 2}" cy="${height / 2}" r="${Math.min(width, height) / 2}" fill="#${bgColor}"/>
    <text x="50%" y="50%" font-family="sans-serif" font-size="${Math.min(width, height) / 3}" font-weight="bold" fill="#${textColor}" text-anchor="middle" dominant-baseline="central">
      ${text}
    </text>
  </svg>`;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
