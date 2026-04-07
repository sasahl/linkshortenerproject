import { getLinkByShortCode } from "@/data/links";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ shortcode: string }> }
) {
  const { shortcode } = await params;
  const link = await getLinkByShortCode(shortcode);

  if (!link) {
    return new NextResponse("Not found", { status: 404 });
  }

  return NextResponse.redirect(link.originalUrl, { status: 302 });
}
