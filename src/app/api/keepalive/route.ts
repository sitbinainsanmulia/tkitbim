import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    // Melakukan query ringan untuk memastikan Supabase tetap aktif
    const { data, error } = await supabase
      .from('site_settings')
      .select('id')
      .limit(1);

    if (error) {
      return NextResponse.json(
        { status: 'error', message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        status: 'success', 
        message: 'Supabase is awake!', 
        timestamp: new Date().toISOString() 
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { status: 'error', message: err.message },
      { status: 500 }
    );
  }
}
