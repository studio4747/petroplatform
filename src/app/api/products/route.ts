import { NextResponse } from 'next/server';
import { getFilteredProducts } from '@/lib/actions';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const substance = searchParams.get('substance') || undefined;
  const quantity = searchParams.get('quantity') || undefined;
  const industry = searchParams.get('industry') || undefined;

  const products = await getFilteredProducts({
    substance,
    quantity,
    industry,
  });

  return NextResponse.json(products);
}
