import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode-svg';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const text = searchParams.get('text');
  if (!text) {
    return NextResponse.json(
      { success: false, error: { code: 'MISSING_TEXT', message: 'The "text" parameter is required' } },
      { status: 400 }
    );
  }

  const sizeParam = searchParams.get('size');
  const size = sizeParam ? parseInt(sizeParam, 10) : 300;
  if (isNaN(size) || size < 1 || size > 1000) {
    return NextResponse.json(
      { success: false, error: { code: 'INVALID_SIZE', message: 'Size must be between 1 and 1000' } },
      { status: 400 }
    );
  }

  const marginParam = searchParams.get('margin');
  const margin = marginParam ? parseInt(marginParam, 10) : 2;
  if (isNaN(margin) || margin < 0 || margin > 100) {
    return NextResponse.json(
      { success: false, error: { code: 'INVALID_MARGIN', message: 'Margin must be between 0 and 100' } },
      { status: 400 }
    );
  }

  // Color hex codes should be prefixed with # if not already.
  let color = searchParams.get('color') || '#000000';
  if (color && !color.startsWith('#') && /^[0-9A-Fa-f]{3,8}$/.test(color)) {
    color = `#${color}`;
  }

  let bgColor = searchParams.get('bgColor') || '#ffffff';
  if (bgColor && !bgColor.startsWith('#') && /^[0-9A-Fa-f]{3,8}$/.test(bgColor)) {
    bgColor = `#${bgColor}`;
  }

  try {
    const qrcode = new QRCode({
      content: text,
      width: size,
      height: size,
      padding: margin,
      color: color,
      background: bgColor,
      ecl: 'M', // Error correction level
    });

    const svg = qrcode.svg();

    return new NextResponse(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('QR Code generation error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'GENERATION_FAILED', message: 'Failed to generate QR code' } },
      { status: 500 }
    );
  }
}
